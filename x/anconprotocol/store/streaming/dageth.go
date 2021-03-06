package streaming

import (
	"fmt"
	"os"
	"path/filepath"
	"sync"

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

var _ StreamingService = &DagEthStreamingService{}

// StreamingService is a concrete implementation of StreamingService that writes state changes out to files
type DagEthStreamingService struct {
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
}

// DagEthIntermediateWriter is used so that we do not need to update the underlying io.Writer inside the StoreKVPairWriteListener
// everytime we begin writing to a new file
type DagEthIntermediateWriter struct {
	outChan chan<- []byte
}

// NewIntermediateWriter create an instance of an intermediateWriter that sends to the provided channel
func NewDagEthIntermediateWriter(outChan chan<- []byte) *DagEthIntermediateWriter {
	return &DagEthIntermediateWriter{
		outChan: outChan,
	}
}

// Write satisfies io.Writer
func (iw *DagEthIntermediateWriter) Write(b []byte) (int, error) {
	iw.outChan <- b
	return len(b), nil
}

// NewDagEthStreamingService creates a new StreamingService for the provided writeDir, (optional) filePrefix, and storeKeys
func NewDagEthStreamingService(writeDir, filePrefix string, storeKeys []sdk.StoreKey, c codec.BinaryCodec) (*DagEthStreamingService, error) {
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
	return &DagEthStreamingService{
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
func (fss *DagEthStreamingService) Listeners() map[sdk.StoreKey][]types.WriteListener {
	return fss.listeners
}

// ListenBeginBlock satisfies the Hook interface
// It writes out the received BeginBlock request and response and the resulting state changes out to a file as described
// in the above the naming schema
func (fss *DagEthStreamingService) ListenBeginBlock(ctx sdk.Context, req abci.RequestBeginBlock, res abci.ResponseBeginBlock) error {
	// generate the new file
	dstFile, err := fss.openBeginBlockFile(req)
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

func (fss *DagEthStreamingService) openBeginBlockFile(req abci.RequestBeginBlock) (*os.File, error) {
	fss.currentBlockNumber = req.GetHeader().Height
	fss.currentTxIndex = 0
	fileName := fmt.Sprintf("block-%d-begin", fss.currentBlockNumber)
	if fss.filePrefix != "" {
		fileName = fmt.Sprintf("%s-%s", fss.filePrefix, fileName)
	}
	return os.OpenFile(filepath.Join(fss.writeDir, fileName), os.O_CREATE|os.O_WRONLY, 0600)
}

// ListenDeliverTx satisfies the Hook interface
// It writes out the received DeliverTx request and response and the resulting state changes out to a file as described
// in the above the naming schema
func (fss *DagEthStreamingService) ListenDeliverTx(ctx sdk.Context, req abci.RequestDeliverTx, res abci.ResponseDeliverTx) error {
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

func (fss *DagEthStreamingService) openDeliverTxFile() (*os.File, error) {
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
func (fss *DagEthStreamingService) ListenEndBlock(ctx sdk.Context, req abci.RequestEndBlock, res abci.ResponseEndBlock) error {
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

func (fss *DagEthStreamingService) openEndBlockFile() (*os.File, error) {
	fileName := fmt.Sprintf("block-%d-end", fss.currentBlockNumber)
	if fss.filePrefix != "" {
		fileName = fmt.Sprintf("%s-%s", fss.filePrefix, fileName)
	}
	return os.OpenFile(filepath.Join(fss.writeDir, fileName), os.O_CREATE|os.O_WRONLY, 0600)
}

// Stream spins up a goroutine select loop which awaits length-prefixed binary encoded KV pairs and caches them in the order they were received
// Do we need this and an intermediate writer? We could just write directly to the buffer on calls to Write
// But then we don't support a Stream interface, which could be needed for other types of streamers
func (fss *DagEthStreamingService) Stream(wg *sync.WaitGroup) {
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
func (fss *DagEthStreamingService) Close() error {
	close(fss.quitChan)
	return nil
}
