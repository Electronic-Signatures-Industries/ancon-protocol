package streaming

import (
	"bytes"
	"fmt"
	"path/filepath"
	"sync"

	blocks "github.com/ipfs/go-block-format"
	"github.com/ipfs/go-merkledag"

	carv2 "github.com/ipld/go-car/v2"
	"github.com/ipld/go-car/v2/blockstore"

	"github.com/ipfs/go-cid"
	"github.com/ipld/go-ipld-prime"
	"github.com/ipld/go-ipld-prime/codec/dagcbor"
	cidlink "github.com/ipld/go-ipld-prime/linking/cid"
	"github.com/ipld/go-ipld-prime/storage"
	abci "github.com/tendermint/tendermint/abci/types"
	tmtypes "github.com/tendermint/tendermint/types"

	"github.com/cosmos/cosmos-sdk/codec"
	"github.com/cosmos/cosmos-sdk/store/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	dagcosmos "github.com/vulcanize/go-codec-dagcosmos"
	"github.com/vulcanize/go-codec-dagcosmos/header"
	_ "github.com/vulcanize/go-codec-dagcosmos/header"
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
	listeners          map[sdk.StoreKey][]types.WriteListener // the listeners that will be initialized with BaseApp
	srcChan            <-chan []byte                          // the channel that all of the WriteListeners write their data out to
	filePrefix         string                                 // optional prefix for each of the generated files
	writeDir           string                                 // directory to write files into
	codec              codec.BinaryCodec                      // marshaller used for re-marshalling the ABCI messages to write them out to the destination files
	stateCache         [][]byte                               // cache the protobuf binary encoded StoreKVPairs in the order they are received
	stateCacheLock     *sync.Mutex                            // mutex for the state cache
	currentBlockNumber int64                                  // the current block number
	currentTxIndex     int64                                  // the index of the current tx
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
	return &DagCosmosStreamingService{
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

func (fss *DagCosmosStreamingService) GetLinkPrototype() ipld.LinkPrototype {
	// tip: 0x0129 dag-json
	return cidlink.LinkPrototype{cid.Prefix{
		Version:  1,
		Codec:    0x71, // dag-cbor
		MhType:   0x12, // sha2-256
		MhLength: 32,   // sha2-256 hash has a 32-byte sum.
	}}

}
func (fss *DagCosmosStreamingService) WriteBeginBlockCAR(dst string, headerBlock ipld.Node) error {

	lsys := cidlink.DefaultLinkSystem()
	lp := fss.GetLinkPrototype()
	var blockList []blocks.Block

	store := storage.Memory{}
	lsys.StorageReadOpener = (&store).OpenRead
	lsys.StorageWriteOpener = (&store).OpenWrite

	var bufdata bytes.Buffer
	_ = dagcbor.Encode(headerBlock, &bufdata)

	link := lsys.MustComputeLink(lp, headerBlock)
	c, _ := cid.Decode(link.String())
	roots := []cid.Cid{c}

	rwbs, err := blockstore.OpenReadWrite(dst, roots, carv2.UseDataPadding(1413), carv2.UseIndexPadding(42))
	if err != nil {
		return err
	}

	blockList = append(blockList, merkledag.NewRawNode(bufdata.Bytes()))
	if err := rwbs.PutMany(blockList); err != nil {
		return err
	}
	fmt.Printf("Successfully wrote %v blocks into the blockstore.\n", len(blockList))

	// Any blocks put can be read back using the same blockstore instance.
	/*block, err := rwbs.Get(c)
	if err != nil {
		return err
	}
	fmt.Printf("Read back block just put with raw value of `%v`.\n", string(block.RawData()))
	*/

	// Finalize the blockstore to flush out the index and make a complete CARv2.
	if err := rwbs.Finalize(); err != nil {
		return err
	}

	return nil
}

func (fss *DagCosmosStreamingService) WriteDeliverTxCAR(dst string, responseDeliverTxNode ipld.Node, tx ipld.Node) error {

	lsys := cidlink.DefaultLinkSystem()
	lp := fss.GetLinkPrototype()
	var blockList []blocks.Block

	path := ipld.ParsePath("/result")
	link, err := lsys.Store(
		ipld.LinkContext{LinkPath: path}, lp, responseDeliverTxNode,
	)
	if err != nil {
		return err
	}
	delivertxLink, _ := cid.Decode(link.String())

	txpath := ipld.ParsePath("/tx")
	txlink, err := lsys.Store(
		ipld.LinkContext{LinkPath: txpath}, lp, tx,
	)
	if err != nil {
		return err
	}
	txLink, _ := cid.Decode(txlink.String())

	roots := []cid.Cid{delivertxLink, txLink}

	rwbs, err := blockstore.OpenReadWrite(dst, roots, carv2.UseDataPadding(1413), carv2.UseIndexPadding(42))
	if err != nil {
		return err
	}

	if err := rwbs.PutMany(blockList); err != nil {
		return err
	}
	fmt.Printf("Successfully wrote %v blocks into the blockstore.\n", len(blockList))

	// Any blocks put can be read back using the same blockstore instance.
	/*block, err := rwbs.Get(c)
	if err != nil {
		return err
	}
	fmt.Printf("Read back block just put with raw value of `%v`.\n", string(block.RawData()))
	*/

	// Finalize the blockstore to flush out the index and make a complete CARv2.
	if err := rwbs.Finalize(); err != nil {
		return err
	}

	return nil
}

// ListenBeginBlock satisfies the Hook interface
// It writes out the received BeginBlock request and response and the resulting state changes out to a file as described
// in the above the naming schema
func (fss *DagCosmosStreamingService) ListenBeginBlock(ctx sdk.Context, req abci.RequestBeginBlock, res abci.ResponseBeginBlock) error {
	// generate the new file
	dstFile := fss.getBeginBlockFilePath(req)
	// write req to file
	var headerNode ipld.Node

	head := tmtypes.Header{
		Version: req.Header.Version,
		ChainID: req.Header.ChainID,
		Height:  req.Header.Height,
		Time:    req.Header.Time,
		LastBlockID: tmtypes.BlockID{
			Hash: req.Header.LastBlockId.Hash,
			PartSetHeader: tmtypes.PartSetHeader{
				Total: req.Header.LastBlockId.PartSetHeader.Total,
				Hash:  req.Header.LastBlockId.PartSetHeader.Hash,
			},
		},
		LastCommitHash:     req.Header.LastCommitHash,
		DataHash:           req.Header.DataHash,
		ValidatorsHash:     req.Header.ValidatorsHash,
		NextValidatorsHash: req.Header.NextValidatorsHash,
		ConsensusHash:      req.Header.ConsensusHash,
		AppHash:            req.Header.AppHash,
		LastResultsHash:    req.Header.LastResultsHash,
		EvidenceHash:       req.Header.EvidenceHash,
		ProposerAddress:    req.Header.ProposerAddress,
	}
	err := head.ValidateBasic()
	if err != nil {
		///			return err
	}

	lbBuilder := dagcosmos.Type.Header.NewBuilder()
	if err := header.DecodeHeader(lbBuilder, head); err != nil {
		fmt.Errorf("unable to decode light block into an IPLD node: %v", err)
	}
	headerNode = lbBuilder.Build()

	// Missing evidence
	return fss.WriteBeginBlockCAR(dstFile, headerNode)
}

func (fss *DagCosmosStreamingService) getBeginBlockFilePath(req abci.RequestBeginBlock) string {
	fss.currentBlockNumber = req.GetHeader().Height
	fss.currentTxIndex = 0
	fileName := fmt.Sprintf("block-%d-begin", fss.currentBlockNumber)
	if fss.filePrefix != "" {
		fileName = fmt.Sprintf("%s-%s", fss.filePrefix, fileName)
	}
	return filepath.Join(fss.writeDir, fileName)
}

// ListenDeliverTx satisfies the Hook interface
// It writes out the received DeliverTx request and response and the resulting state changes out to a file as described
// in the above the naming schema
func (fss *DagCosmosStreamingService) ListenDeliverTx(ctx sdk.Context, req abci.RequestDeliverTx, res abci.ResponseDeliverTx) error {
	// // Just need to translate Tx protobuf to ipld node
	// // generate the new file
	// dstFile := fss.getDeliverTxFilePath()

	// builder := dagcosmos.Type.ResponseDeliverTx.NewBuilder()
	// var resultNode ipld.Node
	// err := dagcosmosresult.DecodeParams(builder, res)
	// if err != nil {
	// 	return err
	// }
	// resultNode = builder.Build()

	// txb := dagcosmos.Type.Tx.NewBuilder()
	// txb.AssignBytes(req.GetTx())
	// txNode := txb.Build()

	// return fss.WriteDeliverTxCAR(dstFile, txNode, resultNode)

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
	// no-op
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
func (fss *DagCosmosStreamingService) Stream(wg *sync.WaitGroup, quitChan <-chan struct{}) {
	wg.Add(1)
	go func() {
		defer wg.Done()
		for {
			select {
			case <-quitChan:
				return
			case by := <-fss.srcChan:
				fss.stateCacheLock.Lock()
				fss.stateCache = append(fss.stateCache, by)
				fss.stateCacheLock.Unlock()
			}
		}
	}()
}
