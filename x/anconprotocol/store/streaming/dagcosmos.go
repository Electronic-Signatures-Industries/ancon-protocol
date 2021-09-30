package streaming

import (
	"context"
	"fmt"
	"os"
	"path/filepath"
	"sync"

	carv1 "github.com/ipld/go-car"
	carv2 "github.com/ipld/go-car/v2"
	linkstore "github.com/proofzero/go-ipld-linkstore"

	"github.com/ipfs/go-cid"
	"github.com/ipld/go-ipld-prime"
	"github.com/ipld/go-ipld-prime/fluent"
	cidlink "github.com/ipld/go-ipld-prime/linking/cid"
	"github.com/ipld/go-ipld-prime/node/basicnode"
	"github.com/ipld/go-ipld-prime/traversal/selector"
	"github.com/ipld/go-ipld-prime/traversal/selector/builder"
	abci "github.com/tendermint/tendermint/abci/types"

	"github.com/cosmos/cosmos-sdk/codec"
	"github.com/cosmos/cosmos-sdk/store/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
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
	// if err := isDirWriteable(writeDir); err != nil {
	// 	return nil, err
	// }
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

// ListenBeginBlock satisfies the Hook interface
// It writes out the received BeginBlock request and response and the resulting state changes out to a file as described
// in the above the naming schema
func (fss *DagCosmosStreamingService) ListenBeginBlock(ctx sdk.Context, req abci.RequestBeginBlock, res abci.ResponseBeginBlock) error {
	// generate the new file
	dstFile := fss.getBeginBlockFilePath(req)

	//pt := bindnode.Prototype(req.ByzantineValidators, GetHeaderType().)

	head := fluent.MustBuildMap(basicnode.Prototype.Map, 2, func(na fluent.MapAssembler) {
		na.AssembleEntry("chain_id").AssignString(req.Header.ChainID)
		na.AssembleEntry("hash").AssignString(string(req.Hash))
	})

	// lc := bindnode.Wrap(&req.LastCommitInfo, nil)
	// ev := bindnode.Wrap(&req.ByzantineValidators, nil)

	// fss.sls.MustStore(ipld.LinkContext{}, GetLinkPrototype(), ev)

	ssb := builder.NewSelectorSpecBuilder(basicnode.Prototype.Any)

	// the graph assembled above looks as follows, in order:
	// nd3 -> [c, nd2 -> [nd1 -> a, b, nd1 -> a]]
	// this selector starts at n3, and traverses a link at index 1 (nd2, the second link, zero indexed)
	// it then recursively traverses all of its children
	// the only node skipped is 'c' -- link at index 0 immediately below nd3
	// the purpose is simply to show we are not writing the entire dag underneath
	// nd3
	selector := ssb.ExploreFields(func(efsb builder.ExploreFieldsSpecBuilder) {
		efsb.Insert("Links",
			ssb.ExploreIndex(1, ssb.ExploreRecursive(selector.RecursionLimitNone(), ssb.ExploreAll(ssb.ExploreRecursiveEdge()))))
	}).Node()

	link := fss.sls.MustComputeLink(GetLinkPrototype(), head)
	fss.sls.MustStore(ipld.LinkContext{}, GetLinkPrototype(), head)
	// fss.sls.MustStore(ipld.LinkContext{}, GetLinkPrototype(), lc)
	//	hashnode := fss.sls.MustStore(ipld.LinkContext{}, GetLinkPrototype(), h)
	car := carv1.NewSelectiveCar(context.Background(),
		fss.sls.ReadStore, // <- special sauce block format access to prime nodes.
		[]carv1.Dag{{

			// CID of the root node of the DAG to traverse.
			Root:     link.(cidlink.Link).Cid,
			Selector: selector,
			// Traversal convenience selector that gives us "everything".
			// Selector: everything(),
		}})
	file, _ := os.Create(dstFile)
	car.Write(file)

	v2file := append([]byte(dstFile), []byte("v2")...)

	carv2.WrapV1File(dstFile, string(v2file))
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
