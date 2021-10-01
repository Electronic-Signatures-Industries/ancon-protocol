package streaming

import (
	"context"
	"fmt"
	"os"
	"path/filepath"
	"sync"

	"github.com/multiformats/go-multihash"
	linkstore "github.com/proofzero/go-ipld-linkstore"
	"github.com/spf13/cast"

	"github.com/ipfs/go-cid"
	carv1 "github.com/ipld/go-car"
	"github.com/ipld/go-ipld-prime"
	"github.com/ipld/go-ipld-prime/codec/dagcbor"
	"github.com/ipld/go-ipld-prime/datamodel"
	"github.com/ipld/go-ipld-prime/fluent"
	cidlink "github.com/ipld/go-ipld-prime/linking/cid"
	"github.com/ipld/go-ipld-prime/multicodec"
	"github.com/ipld/go-ipld-prime/node/basicnode"
	"github.com/ipld/go-ipld-prime/traversal/selector/builder"
	abci "github.com/tendermint/tendermint/abci/types"

	"github.com/cosmos/cosmos-sdk/codec"
	"github.com/cosmos/cosmos-sdk/store/iavl"
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

// StreamingService is a concrete implementation of StreamingService that writes state changes out to files
type DagCosmosStreamingService struct {
	sls                *linkstore.StorageLinkSystem
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
	currentHeader      types.Header
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
	sls := linkstore.NewStorageLinkSystemWithNewStorage(cidlink.DefaultLinkSystem())
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

func MustCreateHashCidLink(hash []byte) (cidlink.Link, error) {
	return cidlink.Link{}, nil
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

func (fss *DagCosmosStreamingService) BuildTx(tx []byte) datamodel.Node {
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

// ListenBeginBlock satisfies the Hook interface
// It writes out the received BeginBlock request and response and the resulting state changes out to a file as described
// in the above the naming schema
func (fss *DagCosmosStreamingService) ListenBeginBlock(ctx sdk.Context, req abci.RequestBeginBlock, res abci.ResponseBeginBlock) error {
	// generate the new file
	dstFile := fss.getBeginBlockFilePath(req)

	// TODO: Need to add developer comments!
	head := fss.BuildHeaderMap(&req)

	lsys := fss.sls
	c := ipld.LinkContext{Ctx: ctx.Context()}
	p := GetLinkPrototype()

	// Store header
	link, err := lsys.Store(c, p, head)
	if err != nil {
		return err
	}

	// Missing ByzantineValidators

	// Store LastCommitMap
	lc := fss.BuildLastCommitMap(&req)
	fss.sls.MustStore(c, p, lc)

	// Write CAR	
	fss.WriteCAR(link.(cidlink.Link).Cid, dstFile)
	// v2file := append([]byte(dstFile), []byte("v2")...)
	// carv2.WrapV1File(dstFile, string(v2file))
	return nil
}

func (fss *DagCosmosStreamingService) getBeginBlockFilePath(req abci.RequestBeginBlock) string {
	fss.currentBlockNumber = req.GetHeader().Height
	fss.currentTxIndex = 0
	fss.currentHeader = nil
	fileName := fmt.Sprintf("block-%d-begin.car", fss.currentBlockNumber)
	if fss.filePrefix != "" {
		fileName = fmt.Sprintf("%s-%s", fss.filePrefix, fileName)
	}
	fss.currentHeader = req.GetHeader
	return filepath.Join(fss.writeDir, fileName)
}

// ListenDeliverTx satisfies the Hook interface
// It writes out the received DeliverTx request and response and the resulting state changes out to a file as described
// in the above the naming schema
func (fss *DagCosmosStreamingService) ListenDeliverTx(ctx sdk.Context, req abci.RequestDeliverTx, res abci.ResponseDeliverTx) error {
	// generate the new file
	dstFile := fss.getDeliverTxFilePath(req)

	head := fss.BuildHeaderMap(&req)

	lsys := fss.sls
	linkCtx := ipld.LinkContext{Ctx: ctx.Context()}
	lp := GetLinkPrototype()

	// Store header
	link, err := lsys.Store(linkCtx, lp, head)
	if err != nil {
		return err
	}

	// Store Tx - Translate to MsgEthereumTx
	lc := fss.BuildTx(&req.GetTx())
	fss.sls.MustStore(c, p, lc)


	// Write CAR	
	fss.WriteCAR(link.(cidlink.Link).Cid, dstFile)
	// v2file := append([]byte(dstFile), []byte("v2")...)
	// carv2.WrapV1File(dstFile, string(v2file))
	return nil
}

func (fss *DagCosmosStreamingService) getDeliverTxFilePath() string {
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
	dstFile := fss.getEndBlockFilePath(req)

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
	
	// set key
	ctx.KVStore("evm").Set("/bla", "foo")
	// Get Proof

	iavlStore := ctx.MultiStore().(*iavl.Store)
	// Get Proof
	proofres := iavlStore.Query(abci.RequestQuery{
		Path:  "/key", // required path to get key/value+proof
		Data:  []byte("MYKEY"),
		Prove: true,
	})

	proofres.ProofOps

	// Enviar a GetProof modificado que acepte proof ops proof.go - GetProofsByKey
	// Store in IPLD Dag one or both existence proof
	// Vector Commitments
	
	head := fss.BuildHeaderMap(&req)

	lsys := fss.sls
	linkCtx := ipld.LinkContext{Ctx: ctx.Context()}
	lp := GetLinkPrototype()

	// Store header
	link, err := lsys.Store(linkCtx, lp, head)
	if err != nil {
		return err
	}

	// Store LastCommitMap
	lc := fss.BuildTx(&req.GetTx())
	fss.sls.MustStore(c, p, lc)


	// Write CAR	
	fss.WriteCAR(link.(cidlink.Link).Cid, dstFile)
	// v2file := append([]byte(dstFile), []byte("v2")...)
	// carv2.WrapV1File(dstFile, string(v2file))
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

// WriteCAR
func (fss *DagCosmosStreamingService) WriteCAR(root cid.Cid, filename string) error {
	ssb := builder.NewSelectorSpecBuilder(basicnode.Prototype.Any)
	selector := ssb.ExploreAll(ssb.Matcher()).Node()

	car := carv1.NewSelectiveCar(context.Background(),
		fss.sls.ReadStore,
		[]carv1.Dag{{
			Root:     root,
			Selector: selector,
		}})
	file, err := os.Create(filename)
	if err != nil {
		return err
	}
	err = car.Write(file)
	if err != nil {
		return err
	}

	return nil
