package streaming

import (
	"bytes"
	"fmt"
	blocks "github.com/ipfs/go-block-format"
	"io"
	"os"
	"path/filepath"
	"sync"

	carv2 "github.com/ipld/go-car/v2"
	"github.com/ipld/go-car/v2/blockstore"

	"github.com/ipfs/go-cid"
	"github.com/ipld/go-ipld-prime"
	cidlink "github.com/ipld/go-ipld-prime/linking/cid"
	abci "github.com/tendermint/tendermint/abci/types"
	tmtypes "github.com/tendermint/tendermint/types"

	"github.com/cosmos/cosmos-sdk/codec"
	"github.com/cosmos/cosmos-sdk/store/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/vulcanize/go-codec-dagcosmos/header"
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

func (fss *DagCosmosStreamingService) WriteCAR(dst string, headerBlock ipld.Node) error {

	// tip: 0x0129 dag-json
	lp := cidlink.LinkPrototype{cid.Prefix{
		Version:  1,
		Codec:    0x71, // dag-cbor
		MhType:   0x12, // sha2-256
		MhLength: 32,   // sha2-256 hash has a 32-byte sum.
	}}

	lsys := cidlink.DefaultLinkSystem()
	var blockList []blocks.Block
	//   you just need a function that conforms to the ipld.BlockWriteOpener interface.
	lsys.StorageWriteOpener = func(lnkCtx ipld.LinkContext) (io.Writer, ipld.BlockWriteCommitter, error) {
		// change prefix
		buf := bytes.Buffer{}
		return &buf, func(lnk ipld.Link) error {
			if lnkCtx.LinkPath.String() == "/header" {
				blockList = append(blockList, blocks.NewBlock(buf.Bytes()))
			}
			return nil
		}, nil
	}
	path := ipld.ParsePath("/header")
	link, err := lsys.Store(
		ipld.LinkContext{LinkPath: path}, lp, headerBlock,
	)
	if err != nil {
		return err
	}
	c, _ := cid.Decode(link.String())
	roots := []cid.Cid{c}

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
	h, err := tmtypes.HeaderFromProto(&req.Header)
	if err != nil {
		return err
	}
	err = header.EncodeHeader(&h, headerNode)
	if err != nil {
		return err
	}

	// var list []ipld.Node
	// var commit *tmtypes.EvidenceList
	// for _, e := range req.ByzantineValidators {

	// 	if e.Type == abci.EvidenceType_DUPLICATE_VOTE {

	// 		// dupe := &tmtypes.DuplicateVoteEvidence{
	// 		// 	VoteA:       e.,
	// 		// 	VoteB:            &tmtypes.Vote{},
	// 		// 	TotalVotingPower: 0,
	// 		// 	ValidatorPower:   0,
	// 		// 	Timestamp:        time.Time{},
	// 		// }
	// 		ev, err = tmtypes.EvidenceToProto(&e.(*tmtypes.DuplicateVoteEvidence))
	// 		if err != nil {
	// 			return err
	// 		}
	// 		err = evidence.EncodeLightEvidence(e.Type == tmtypes.DuplicateVoteEvidence).EncodeHeader(&h, n)
	// 		if err != nil {
	// 			return err
	// 		}
	// 	} else if e.Type == abci.EvidenceType_LIGHT_CLIENT_ATTACK {

	// 		ev, err = tmtypes.EvidenceFromProto(e)
	// 		if err != nil {
	// 			return err
	// 		}
	// 		err = evidence.EncodeLightEvidence(e.Type == tmtypes.DuplicateVoteEvidence).EncodeHeader(&h, n)
	// 		if err != nil {
	// 			return err
	// 		}
	// 	}
	// }
	return fss.WriteCAR(dstFile, headerNode)
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
	// Just need to translate Tx protobuf to ipld node
	// generate the new file
	dstFile, err := fss.openDeliverTxFile()
	if err != nil {
		return err
	}
	// write req to file
	lengthPrefixedReqBytes, err := fss.codec.MarshalLengthPrefixed(&req)
	if err != nil {
		return err
	}
	if _, err = dstFile.Write(lengthPrefixedReqBytes); err != nil {
		return err
	}
	// write all state changes cached for this stage to file
	fss.stateCacheLock.Lock()
	for _, stateChange := range fss.stateCache {
		if _, err = dstFile.Write(stateChange); err != nil {
			fss.stateCache = nil
			fss.stateCacheLock.Unlock()
			return err
		}
	}
	// reset cache
	fss.stateCache = nil
	fss.stateCacheLock.Unlock()
	// write res to file
	lengthPrefixedResBytes, err := fss.codec.MarshalLengthPrefixed(&res)
	if err != nil {
		return err
	}
	if _, err = dstFile.Write(lengthPrefixedResBytes); err != nil {
		return err
	}
	// close file
	return dstFile.Close()
}

func (fss *DagCosmosStreamingService) openDeliverTxFile() (*os.File, error) {
	fileName := fmt.Sprintf("block-%d-tx-%d", fss.currentBlockNumber, fss.currentTxIndex)
	if fss.filePrefix != "" {
		fileName = fmt.Sprintf("%s-%s", fss.filePrefix, fileName)
	}
	fss.currentTxIndex++
	return os.OpenFile(filepath.Join(fss.writeDir, fileName), os.O_CREATE|os.O_WRONLY, 0600)
}

// ListenEndBlock satisfies the Hook interface
// It writes out the received EndBlock request and response and the resulting state changes out to a file as described
// in the above the naming schema
func (fss *DagCosmosStreamingService) ListenEndBlock(ctx sdk.Context, req abci.RequestEndBlock, res abci.ResponseEndBlock) error {
	// generate the new file
	dstFile, err := fss.openEndBlockFile()
	if err != nil {
		return err
	}
	// write req to file
	lengthPrefixedReqBytes, err := fss.codec.MarshalLengthPrefixed(&req)
	if err != nil {
		return err
	}
	if _, err = dstFile.Write(lengthPrefixedReqBytes); err != nil {
		return err
	}
	// write all state changes cached for this stage to file
	fss.stateCacheLock.Lock()
	for _, stateChange := range fss.stateCache {
		if _, err = dstFile.Write(stateChange); err != nil {
			fss.stateCache = nil
			fss.stateCacheLock.Unlock()
			return err
		}
	}
	// reset cache
	fss.stateCache = nil
	fss.stateCacheLock.Unlock()
	// write res to file
	lengthPrefixedResBytes, err := fss.codec.MarshalLengthPrefixed(&res)
	if err != nil {
		return err
	}
	if _, err = dstFile.Write(lengthPrefixedResBytes); err != nil {
		return err
	}
	// close file
	return dstFile.Close()
}

func (fss *DagCosmosStreamingService) openEndBlockFile() (*os.File, error) {
	fileName := fmt.Sprintf("block-%d-end", fss.currentBlockNumber)
	if fss.filePrefix != "" {
		fileName = fmt.Sprintf("%s-%s", fss.filePrefix, fileName)
	}
	return os.OpenFile(filepath.Join(fss.writeDir, fileName), os.O_CREATE|os.O_WRONLY, 0600)
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
