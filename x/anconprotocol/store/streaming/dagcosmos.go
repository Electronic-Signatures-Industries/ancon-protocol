package streaming

import (
	"fmt"
	"path/filepath"
	"sync"

	"github.com/multiformats/go-multihash"
	"github.com/spf13/cast"
	evmtypes "github.com/tharsis/ethermint/x/evm/types"

	"github.com/ipfs/go-cid"

	"github.com/ipld/go-ipld-prime"
	"github.com/ipld/go-ipld-prime/codec/dagcbor"
	"github.com/ipld/go-ipld-prime/datamodel"
	"github.com/ipld/go-ipld-prime/fluent"
	"github.com/ipld/go-ipld-prime/linking"
	cidlink "github.com/ipld/go-ipld-prime/linking/cid"
	"github.com/ipld/go-ipld-prime/multicodec"
	"github.com/ipld/go-ipld-prime/node/basicnode"
	abci "github.com/tendermint/tendermint/abci/types"

	"github.com/cosmos/cosmos-sdk/codec"
	"github.com/cosmos/cosmos-sdk/store/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

/*
The naming schema and data format for the files this service writes out to is as such:
After every `BeginBlock` request a new file is created with the name `block-{N}-begin`, where N is the block number. All
subsequent state changes are written out to this file until the first `DeliverTx` request is received. At the head of these files,
the length-prefixed protobuf encoded `BeginBlock` request is written, and the response is written at the tail.
After every `DeliverTx` request a new file is created with the name `block-{N}-tx-{M}` where N is the block number and M
is the tx number in the block (i.e. 0, 1, 2...). All subsequent state changes are written out to this file until the next
`DeliverTx` request is received or an `EndBlock` request is received. At the head of these files, the length-prefixed protobuf
encoded `DeliverTx` request is written, and the response is written at the tail.
After every `EndBlock` request a new file is created with the name `block-{N}-end`, where N is the block number. All
subsequent state changes are written out to this file until the next `BeginBlock` request is received. At the head of these files,
the length-prefixed protobuf encoded `EndBlock` request is written, and the response is written at the tail.
*/

var _ StreamingService = &DagCosmosStreamingService{}

type StreamingHooks struct {
}

// StreamingService is a concrete implementation of StreamingService that writes state changes out to files
type DagCosmosStreamingService struct {
	sls                linking.LinkSystem
	listeners          map[sdk.StoreKey][]types.WriteListener // the listeners that will be initialized with BaseApp
	srcChan            <-chan []byte                          // the channel that all of the WriteListeners write their data out to
	filePrefix         string                                 // optional prefix for each of the generated files
	writeDir           string                                 // directory to write files into
	codec              codec.BinaryCodec                      // marshaller used for re-marshalling the ABCI messages to write them out to the destination files
	stateCache         [][]byte                               // cache the protobuf binary encoded StoreKVPairs in the order they are received
	stateCacheLock     *sync.Mutex                            // mutex for the state cache
	currentBlockNumber int64                                  // the current block number
	currentTxIndex     int64                                  // the index of the current tx
	quitChan           chan struct{}                          // channel to synchronize closure
	currentRoot        cid.Cid                                // chain genesis state Hash
}

// DagCosmosIntermediateWriter is used so that we do not need to update the underlying io.Writer inside the StoreKVPairWriteListener
// everytime we begin writing to a new file
type DagCosmosIntermediateWriter struct {
	outChan chan<- []byte
}

// NewIntermediateWriter create an instance of an intermediateWriter that sends to the provided channel
func NewDagCosmosIntermediateWriter(outChan chan<- []byte) *DagCosmosIntermediateWriter {
	return &DagCosmosIntermediateWriter{
		outChan: outChan,
	}
}

// Write satisfies io.Writer
func (iw *DagCosmosIntermediateWriter) Write(b []byte) (int, error) {
	iw.outChan <- b
	return len(b), nil
}
func init() {
	multicodec.RegisterEncoder(0x71, dagcbor.Encode)
	multicodec.RegisterDecoder(0x71, dagcbor.Decode)

}

// NewStreamingService creates a new StreamingService for the provided writeDir, (optional) filePrefix, and storeKeys
func NewDagCosmosStreamingService(writeDir, filePrefix string, storeKeys []sdk.StoreKey, c codec.BinaryCodec) (*DagCosmosStreamingService, error) {
	listenChan := make(chan []byte)
	iw := NewIntermediateWriter(listenChan)
	listener := types.NewStoreKVPairWriteListener(iw, c)
	listeners := make(map[sdk.StoreKey][]types.WriteListener, len(storeKeys))
	// in this case, we are using the same listener for each Store
	for _, key := range storeKeys {
		listeners[key] = append(listeners[key], listener)
	}
	// check that the writeDir exists and is writeable so that we can catch the error here at initialization if it is not
	// we don't open a dstFile until we receive our first ABCI message
	if err := isDirWriteable(writeDir); err != nil {
		return nil, err
	}

	sls := (cidlink.DefaultLinkSystem())

	return &DagCosmosStreamingService{
		sls:            sls,
		listeners:      listeners,
		srcChan:        listenChan,
		filePrefix:     filePrefix,
		writeDir:       writeDir,
		codec:          c,
		stateCache:     make([][]byte, 0),
		stateCacheLock: new(sync.Mutex),
	}, nil
}

// Listeners returns the StreamingService's underlying WriteListeners, use for registering them with the BaseApp
func (fss *DagCosmosStreamingService) Listeners() map[sdk.StoreKey][]types.WriteListener {
	return fss.listeners
}

func GetLinkPrototype() ipld.LinkPrototype {
	// tip: 0x0129 dag-json
	return cidlink.LinkPrototype{cid.Prefix{
		Version:  1,
		Codec:    0x71, // dag-cbor
		MhType:   0x12, // sha2-256
		MhLength: 32,   // sha2-256 hash has a 32-byte sum.
	}}
}

func GetCurrentCidRoot(hash []byte) cidlink.Link {
	return CreateHashCidLink(hash)
}

func CreateHashCidLink(hash []byte) cidlink.Link {
	lchMh, err := multihash.Encode(hash, GetLinkPrototype().(cidlink.LinkPrototype).MhType)
	if err != nil {
		return cidlink.Link{}
	}
	// TODO: switch to use CommitTree codec type
	lcCID := cid.NewCidV1(GetLinkPrototype().(cidlink.LinkPrototype).Codec, lchMh)
	lcLinkCID := cidlink.Link{Cid: lcCID}
	return lcLinkCID
}

func (fss *DagCosmosStreamingService) BuildHeaderMap(req *abci.RequestBeginBlock) datamodel.Node {
	node := fluent.MustBuildMap(basicnode.Prototype.Map, 14, func(na fluent.MapAssembler) {
		na.AssembleEntry("chain_id").AssignString(req.Header.ChainID)
		na.AssembleEntry("hash").AssignString(string(req.Hash))
		na.AssembleEntry("height").AssignInt(req.Header.Height)
		na.AssembleEntry("last_commit_link").AssignLink(CreateHashCidLink(req.Header.LastCommitHash))
		na.AssembleEntry("data_link").AssignLink(CreateHashCidLink(req.Header.DataHash))
		na.AssembleEntry("validators_link").AssignLink(CreateHashCidLink(req.Header.ProposerAddress))
		na.AssembleEntry("next_validators_link").AssignLink(CreateHashCidLink(req.Header.NextValidatorsHash))

		na.AssembleEntry("consensus_link").AssignLink(CreateHashCidLink(req.Header.ConsensusHash))
		na.AssembleEntry("app_link").AssignLink(CreateHashCidLink(req.Header.AppHash))
		na.AssembleEntry("last_result_link").AssignLink(CreateHashCidLink(req.Header.LastCommitHash))
		na.AssembleEntry("evidence_link").AssignLink(CreateHashCidLink(req.Header.EvidenceHash))

		na.AssembleEntry("version_app").AssignInt(int64(req.Header.Version.App))
		na.AssembleEntry("version_block").AssignInt(int64(req.Header.Version.Block))
		na.AssembleEntry("time").AssignInt(int64(req.Header.Time.Unix()))
		na.AssembleEntry("proposer_address").AssignString(string(req.Header.ProposerAddress))

		na.AssembleEntry("last_block_id").CreateMap(3, func(la fluent.MapAssembler) {
			la.AssembleEntry("hash").AssignLink(CreateHashCidLink(req.Header.LastBlockId.Hash))
			la.AssembleEntry("partsetheader_link").AssignLink(CreateHashCidLink(req.Header.LastBlockId.PartSetHeader.Hash))
			la.AssembleEntry("partsetheader_total").AssignInt((int64(req.Header.LastBlockId.PartSetHeader.Total)))
		})

	})
	return node
}

func (fss *DagCosmosStreamingService) BuildLastCommitMap(req *abci.RequestBeginBlock) datamodel.Node {
	node := fluent.MustBuildMap(basicnode.Prototype.Map, -1, func(na fluent.MapAssembler) {
		na.AssembleEntry("round").AssignInt(cast.ToInt64(req.LastCommitInfo.Round))

		// Vote
		if len(req.LastCommitInfo.Votes) > 0 {
			na.AssembleEntry("votes").CreateList(int64(len(req.LastCommitInfo.Votes)), func(la fluent.ListAssembler) {
				for i := 0; i < len(req.LastCommitInfo.Votes); i++ {
					v := req.LastCommitInfo.Votes[i]
					la.AssembleValue().CreateMap(3, func(m fluent.MapAssembler) {

						m.AssembleEntry("signed_last_block").AssignBool(v.SignedLastBlock)
						m.AssembleEntry("validator_address").AssignBytes(v.Validator.Address)
						m.AssembleEntry("validator_power").AssignInt(v.Validator.Power)
					})
				}
			})

		}
	})
	return node
}

func (fss *DagCosmosStreamingService) BuildTx(tx evmtypes.MsgEthereumTx) datamodel.Node {
	data := tx.AsTransaction()
	if data != nil {
		node := fluent.MustBuildMap(basicnode.Prototype.Map, 12, func(na fluent.MapAssembler) {
			na.AssembleEntry("size").AssignFloat(tx.Size_)
			na.AssembleEntry("hash").AssignString(tx.Hash)
			na.AssembleEntry("from").AssignString(tx.From)
			na.AssembleEntry("chain_id").AssignString(data.ChainId().String())
			na.AssembleEntry("cost").AssignString(data.Cost().String())
			na.AssembleEntry("gas_price").AssignString(data.GasPrice().String())
			na.AssembleEntry("gas").AssignString(string(data.Gas()))
			na.AssembleEntry("nonce").AssignString(string(data.Nonce()))
			na.AssembleEntry("value").AssignString(data.Value().String())
			na.AssembleEntry("tx_type").AssignInt(int64(data.Type()))
			na.AssembleEntry("data").AssignBytes((data.Data()))
			na.AssembleEntry("to").AssignString(data.To().Hex())
		})
		return node
	} else {
		return nil
	}
}

// ListenBeginBlock satisfies the Hook interface
// It writes out the received BeginBlock request and response and the resulting state changes out to a file as described
// in the above the naming schema
func (fss *DagCosmosStreamingService) ListenBeginBlock(ctx sdk.Context, req abci.RequestBeginBlock, res abci.ResponseBeginBlock) error {
	// generate the new file
	// dstFile := fss.getBeginBlockFilePath(req)

	// head := fss.BuildHeaderMap(&req)

	// lsys := fss.sls
	// c := ipld.LinkContext{Ctx: ctx.Context()}
	// lp := GetLinkPrototype()

	// // Store header
	// _, err := lsys.Store(c, lp, head)
	// if err != nil {
	// 	return err
	// }

	// if req.Header.Height == 0 {
	// 	fss.currentRoot = GetCurrentCidRoot(req.Hash).Cid
	// }
	// // Missing ByzantineValidators

	// // Store LastCommitMap
	// lc := fss.BuildLastCommitMap(&req)
	// fss.sls.MustStore(c, lp, lc)

	// fmt.Printf("Current root cid %s for height %s\n", fss.currentRoot, ctx.BlockHeight())

	// // Write CAR
	// fss.WriteCAR(fss.currentRoot, dstFile)
	return nil
}

func (fss *DagCosmosStreamingService) getBeginBlockFilePath(req abci.RequestBeginBlock) string {
	fss.currentBlockNumber = req.GetHeader().Height
	fss.currentTxIndex = 0
	fileName := fmt.Sprintf("block-%d-begin.car", fss.currentBlockNumber)
	if fss.filePrefix != "" {
		fileName = fmt.Sprintf("%s-%s", fss.filePrefix, fileName)
	}
	return filepath.Join(fss.writeDir, fileName)
}

// ListenDeliverTx satisfies the Hook interface
// It writes out the received DeliverTx request and response and the resulting state changes out to a file as described
// in the above the naming schema
func (fss *DagCosmosStreamingService) ListenDeliverTx(ctx sdk.Context, req abci.RequestDeliverTx, res abci.ResponseDeliverTx) error {
	// generate the new file
	// dstFile := fss.getDeliverTxFilePath(req)

	// linkCtx := ipld.LinkContext{Ctx: ctx.Context()}
	// lp := GetLinkPrototype()

	// if req.Tx != nil {
	// 	// Store Tx - Translate to MsgEthereumTx
	// 	msg := evmtypes.MsgEthereumTx{}
	// 	msg.Unmarshal(req.Tx)
	// 	tx := fss.BuildTx(msg)

	// 	if tx != nil {
	// 		fss.sls.MustStore(linkCtx, lp, tx)

	// 		// Write CAR
	// 		fss.WriteCAR(fss.currentRoot, dstFile)
	// 	}
	// }
	return nil
}

func (fss *DagCosmosStreamingService) getDeliverTxFilePath(req abci.RequestDeliverTx) string {
	fileName := fmt.Sprintf("block-%d-tx-%d.car", fss.currentBlockNumber, fss.currentTxIndex)
	if fss.filePrefix != "" {
		fileName = fmt.Sprintf("%s-%s", fss.filePrefix, fileName)
	}
	fss.currentTxIndex++
	return filepath.Join(fss.writeDir, fileName)
}

// ListenEndBlock satisfies the Hook interface
// It writes out the received EndBlock request and response and the resulting state changes out to a file as described
// in the above the naming schema
func (fss *DagCosmosStreamingService) ListenEndBlock(ctx sdk.Context, req abci.RequestEndBlock, res abci.ResponseEndBlock) error {
	// generate the new file
	//	dstFile := fss.getEndBlockFilePath()

	// Store Height - height_at_end_block
	// req.Height

	// res.ConsensusParamUpdates
	// res.ConsensusParamUpdates.Block.MaxBytes
	// res.ConsensusParamUpdates.Block.MaxBytes
	// res.ConsensusParamUpdates.Evidence.MaxAgeDuration
	// res.ConsensusParamUpdates.Evidence.MaxAgeNumBlocks
	// res.ConsensusParamUpdates.Evidence.MaxBytes
	// res.ConsensusParamUpdates.Validator.PubKeyTypes
	// res.ConsensusParamUpdates.Version.AppVersion

	// res.Events[0].Attributes
	// res.Events[0].Type
	// res.ValidatorUpdates
	// res.GetValidatorUpdates()[0].Power
	// res.GetValidatorUpdates()[0].PubKey

	// proofs := proofres.ProofOps

	// // Enviar a GetProof modificado que acepte proof ops proof.go - GetProofsByKey
	// // Store in IPLD Dag one or both existence proof
	// // Vector Commitments

	// head := fss.BuildHeaderMap(&reqBegin)

	// lsys := fss.sls
	// linkCtx := ipld.LinkContext{Ctx: ctx.Context()}
	// lp := GetLinkPrototype()

	// // Store header
	// link, err := lsys.Store(linkCtx, lp, head)
	// if err != nil {
	// 	return err
	// }

	// // Store LastCommitMap
	// lc := fss.BuildTx(ctx.TxBytes(), &reqBegin)
	// fss.sls.MustStore(c, p, lc)

	// // Write CAR
	//	fss.WriteCAR(link.(cidlink.Link).Cid, dstFile)
	return nil
}

func (fss *DagCosmosStreamingService) getEndBlockFilePath() string {
	fileName := fmt.Sprintf("block-%d-end.car", fss.currentBlockNumber)
	if fss.filePrefix != "" {
		fileName = fmt.Sprintf("%s-%s", fss.filePrefix, fileName)
	}
	return filepath.Join(fss.writeDir, fileName)
}

// Stream spins up a goroutine select loop which awaits length-prefixed binary encoded KV pairs and caches them in the order they were received
// Do we need this and an intermediate writer? We could just write directly to the buffer on calls to Write
// But then we don't support a Stream interface, which could be needed for other types of streamers
func (fss *DagCosmosStreamingService) Stream(wg *sync.WaitGroup) {
	fss.quitChan = make(chan struct{})
	wg.Add(1)
	go func() {
		defer wg.Done()
		for {
			select {
			case <-fss.quitChan:
				return
			case by := <-fss.srcChan:
				fss.stateCacheLock.Lock()
				fss.stateCache = append(fss.stateCache, by)
				fss.stateCacheLock.Unlock()
			}
		}
	}()
}

// Close satisfies the io.Closer interface, which satisfies the baseapp.StreamingService interface
func (fss *DagCosmosStreamingService) Close() error {
	close(fss.quitChan)
	return nil
}

