package streaming

import (
	"fmt"
	"os"
	"sync"
	"testing"

	"github.com/cosmos/cosmos-sdk/codec"
	codecTypes "github.com/cosmos/cosmos-sdk/codec/types"
	"github.com/cosmos/cosmos-sdk/store/types"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/stretchr/testify/require"
	abci "github.com/tendermint/tendermint/abci/types"
	types1 "github.com/tendermint/tendermint/proto/tendermint/types"
)

var (
	dagcosmosInterfaceRegistry                     = codecTypes.NewInterfaceRegistry()
	dagcosmosTestMarshaller                        = codec.NewProtoCodec(dagcosmosInterfaceRegistry)
	testDagCosmosStreamingService                  *DagCosmosStreamingService
	testDagCosmosListener1, testDagCosmosListener2 types.WriteListener
	dagemptyContext                                = sdk.Context{}

	// testDagCosmos abci message types
	dagmockHash                = []byte{1, 2, 3, 4, 5, 6, 7, 8, 9}
	testDagCosmosBeginBlockReq = abci.RequestBeginBlock{
		Header: types1.Header{
			Height: 1,
		},
		ByzantineValidators: []abci.Evidence{},
		Hash:                mockHash,
		LastCommitInfo: abci.LastCommitInfo{
			Round: 1,
			Votes: []abci.VoteInfo{},
		},
	}
	dagtestBeginBlockRes = abci.ResponseBeginBlock{
		Events: []abci.Event{
			{
				Type: "testEventType1",
			},
			{
				Type: "testEventType2",
			},
		},
	}
	dagtestEndBlockReq = abci.RequestEndBlock{
		Height: 1,
	}
	dagtestEndBlockRes = abci.ResponseEndBlock{
		Events:                []abci.Event{},
		ConsensusParamUpdates: &abci.ConsensusParams{},
		ValidatorUpdates:      []abci.ValidatorUpdate{},
	}
	dagmockTxBytes1      = []byte{9, 8, 7, 6, 5, 4, 3, 2, 1}
	dagtestDeliverTxReq1 = abci.RequestDeliverTx{
		Tx: mockTxBytes1,
	}
	dagmockTxBytes2      = []byte{8, 7, 6, 5, 4, 3, 2}
	dagtestDeliverTxReq2 = abci.RequestDeliverTx{
		Tx: mockTxBytes2,
	}
	dagmockTxResponseData1 = []byte{1, 3, 5, 7, 9}
	dagtestDeliverTxRes1   = abci.ResponseDeliverTx{
		Events:    []abci.Event{},
		Code:      1,
		Codespace: "mockCodeSpace",
		Data:      mockTxResponseData1,
		GasUsed:   2,
		GasWanted: 3,
		Info:      "mockInfo",
		Log:       "mockLog",
	}
	dagmockTxResponseData2 = []byte{1, 3, 5, 7, 9}
	dagtestDeliverTxRes2   = abci.ResponseDeliverTx{
		Events:    []abci.Event{},
		Code:      1,
		Codespace: "mockCodeSpace",
		Data:      mockTxResponseData2,
		GasUsed:   2,
		GasWanted: 3,
		Info:      "mockInfo",
		Log:       "mockLog",
	}

	// mock store keys
	dagmockStoreKey1 = sdk.NewKVStoreKey("mockStore1")
	dagmockStoreKey2 = sdk.NewKVStoreKey("mockStore2")

	// file stuff
	dagtestPrefix = "testPrefix"
	dagtestDir    = "/home/rogelio/.ancon-protocold/.test"

	// mock state changes
	dagmockKey1   = []byte{1, 2, 3}
	dagmockValue1 = []byte{3, 2, 1}
	dagmockKey2   = []byte{2, 3, 4}
	dagmockValue2 = []byte{4, 3, 2}
	dagmockKey3   = []byte{3, 4, 5}
	dagmockValue3 = []byte{5, 4, 3}
)

func TestDagCosmosIntermediateWriter(t *testing.T) {
	outChan := make(chan []byte, 0)
	iw := NewIntermediateWriter(outChan)
	require.IsType(t, &IntermediateWriter{}, iw)
	testBytes := []byte{1, 2, 3, 4, 5}
	var length int
	var err error
	waitChan := make(chan struct{}, 0)
	go func() {
		length, err = iw.Write(testBytes)
		waitChan <- struct{}{}
	}()
	receivedBytes := <-outChan
	<-waitChan
	require.Equal(t, len(testBytes), length)
	require.Equal(t, testBytes, receivedBytes)
	require.Nil(t, err)
}

func TestDagCosmosDagCosmosStreamingService(t *testing.T) {
	err := os.Mkdir(dagtestDir, 0700)
	// require.Nil(t, err)
	defer os.RemoveAll(dagtestDir)

	testKeys := []sdk.StoreKey{mockStoreKey1, mockStoreKey2}
	testDagCosmosStreamingService, err = NewDagCosmosStreamingService(dagtestDir, testPrefix, testKeys, dagcosmosTestMarshaller)
	require.Nil(t, err)
	require.IsType(t, &DagCosmosStreamingService{}, testDagCosmosStreamingService)
	require.Equal(t, testPrefix, testDagCosmosStreamingService.filePrefix)
	require.Equal(t, dagtestDir, testDagCosmosStreamingService.writeDir)
	require.Equal(t, fileTestMarshaller, testDagCosmosStreamingService.codec)
	testDagCosmosListener1 = testDagCosmosStreamingService.listeners[mockStoreKey1][0]
	testDagCosmosListener2 = testDagCosmosStreamingService.listeners[mockStoreKey2][0]
	wg := new(sync.WaitGroup)
	quitChan := make(chan struct{})
	testDagCosmosStreamingService.Stream(wg, quitChan)
	testDagCosmosListenBeginBlock(t)
	testDagCosmosListenDeliverTx1(t)
	testDagCosmosListenDeliverTx2(t)
	testDagCosmosListenEndBlock(t)
	close(quitChan)
	wg.Wait()
}

func testDagCosmosListenBeginBlock(t *testing.T) {
	expectedBeginBlockReqBytes, err := fileTestMarshaller.Marshal(&testBeginBlockReq)
	require.Nil(t, err)
	expectedBeginBlockResBytes, err := fileTestMarshaller.Marshal(&testBeginBlockRes)
	require.Nil(t, err)

	// write state changes
	testDagCosmosListener1.OnWrite(mockStoreKey1, mockKey1, mockValue1, false)
	testDagCosmosListener2.OnWrite(mockStoreKey2, mockKey2, mockValue2, false)
	testDagCosmosListener1.OnWrite(mockStoreKey1, mockKey3, mockValue3, false)

	// expected KV pairs
	expectedKVPair1, err := fileTestMarshaller.Marshal(&types.StoreKVPair{
		StoreKey: mockStoreKey1.Name(),
		Key:      mockKey1,
		Value:    mockValue1,
		Delete:   false,
	})
	require.Nil(t, err)
	expectedKVPair2, err := fileTestMarshaller.Marshal(&types.StoreKVPair{
		StoreKey: mockStoreKey2.Name(),
		Key:      mockKey2,
		Value:    mockValue2,
		Delete:   false,
	})
	require.Nil(t, err)
	expectedKVPair3, err := fileTestMarshaller.Marshal(&types.StoreKVPair{
		StoreKey: mockStoreKey1.Name(),
		Key:      mockKey3,
		Value:    mockValue3,
		Delete:   false,
	})
	require.Nil(t, err)

	// send the ABCI messages
	err = testDagCosmosStreamingService.ListenBeginBlock(emptyContext, testBeginBlockReq, testBeginBlockRes)
	require.Nil(t, err)

	// load the file, checking that it was created with the expected name
	fileName := fmt.Sprintf("%s-block-%d-begin", testPrefix, testBeginBlockReq.GetHeader().Height)
	fileBytes, err := readInFile(fileName)
	require.Nil(t, err)

	// segment the file into the separate gRPC messages and check the correctness of each
	segments, err := segmentBytes(fileBytes)
	require.Nil(t, err)
	require.Equal(t, 5, len(segments))
	require.Equal(t, expectedBeginBlockReqBytes, segments[0])
	require.Equal(t, expectedKVPair1, segments[1])
	require.Equal(t, expectedKVPair2, segments[2])
	require.Equal(t, expectedKVPair3, segments[3])
	require.Equal(t, expectedBeginBlockResBytes, segments[4])
}

func testDagCosmosListenDeliverTx1(t *testing.T) {
	expectedDeliverTxReq1Bytes, err := fileTestMarshaller.Marshal(&testDeliverTxReq1)
	require.Nil(t, err)
	expectedDeliverTxRes1Bytes, err := fileTestMarshaller.Marshal(&testDeliverTxRes1)
	require.Nil(t, err)

	// write state changes
	testDagCosmosListener1.OnWrite(mockStoreKey1, mockKey1, mockValue1, false)
	testDagCosmosListener2.OnWrite(mockStoreKey2, mockKey2, mockValue2, false)
	testDagCosmosListener1.OnWrite(mockStoreKey2, mockKey3, mockValue3, false)

	// expected KV pairs
	expectedKVPair1, err := fileTestMarshaller.Marshal(&types.StoreKVPair{
		StoreKey: mockStoreKey1.Name(),
		Key:      mockKey1,
		Value:    mockValue1,
		Delete:   false,
	})
	require.Nil(t, err)
	expectedKVPair2, err := fileTestMarshaller.Marshal(&types.StoreKVPair{
		StoreKey: mockStoreKey2.Name(),
		Key:      mockKey2,
		Value:    mockValue2,
		Delete:   false,
	})
	require.Nil(t, err)
	expectedKVPair3, err := fileTestMarshaller.Marshal(&types.StoreKVPair{
		StoreKey: mockStoreKey2.Name(),
		Key:      mockKey3,
		Value:    mockValue3,
		Delete:   false,
	})
	require.Nil(t, err)

	// send the ABCI messages
	err = testDagCosmosStreamingService.ListenDeliverTx(emptyContext, testDeliverTxReq1, testDeliverTxRes1)
	require.Nil(t, err)

	// load the file, checking that it was created with the expected name
	fileName := fmt.Sprintf("%s-block-%d-tx-%d", testPrefix, testBeginBlockReq.GetHeader().Height, 0)
	fileBytes, err := readInFile(fileName)
	require.Nil(t, err)

	// segment the file into the separate gRPC messages and check the correctness of each
	segments, err := segmentBytes(fileBytes)
	require.Nil(t, err)
	require.Equal(t, 5, len(segments))
	require.Equal(t, expectedDeliverTxReq1Bytes, segments[0])
	require.Equal(t, expectedKVPair1, segments[1])
	require.Equal(t, expectedKVPair2, segments[2])
	require.Equal(t, expectedKVPair3, segments[3])
	require.Equal(t, expectedDeliverTxRes1Bytes, segments[4])
}

func testDagCosmosListenDeliverTx2(t *testing.T) {
	expectedDeliverTxReq2Bytes, err := fileTestMarshaller.Marshal(&testDeliverTxReq2)
	require.Nil(t, err)
	expectedDeliverTxRes2Bytes, err := fileTestMarshaller.Marshal(&testDeliverTxRes2)
	require.Nil(t, err)

	// write state changes
	testDagCosmosListener1.OnWrite(mockStoreKey2, mockKey1, mockValue1, false)
	testDagCosmosListener2.OnWrite(mockStoreKey1, mockKey2, mockValue2, false)
	testDagCosmosListener1.OnWrite(mockStoreKey2, mockKey3, mockValue3, false)

	// expected KV pairs
	expectedKVPair1, err := fileTestMarshaller.Marshal(&types.StoreKVPair{
		StoreKey: mockStoreKey2.Name(),
		Key:      mockKey1,
		Value:    mockValue1,
		Delete:   false,
	})
	require.Nil(t, err)
	expectedKVPair2, err := fileTestMarshaller.Marshal(&types.StoreKVPair{
		StoreKey: mockStoreKey1.Name(),
		Key:      mockKey2,
		Value:    mockValue2,
		Delete:   false,
	})
	require.Nil(t, err)
	expectedKVPair3, err := fileTestMarshaller.Marshal(&types.StoreKVPair{
		StoreKey: mockStoreKey2.Name(),
		Key:      mockKey3,
		Value:    mockValue3,
		Delete:   false,
	})
	require.Nil(t, err)

	// send the ABCI messages
	err = testDagCosmosStreamingService.ListenDeliverTx(emptyContext, testDeliverTxReq2, testDeliverTxRes2)
	require.Nil(t, err)

	// load the file, checking that it was created with the expected name
	fileName := fmt.Sprintf("%s-block-%d-tx-%d", testPrefix, testBeginBlockReq.GetHeader().Height, 1)
	fileBytes, err := readInFile(fileName)
	require.Nil(t, err)

	// segment the file into the separate gRPC messages and check the correctness of each
	segments, err := segmentBytes(fileBytes)
	require.Nil(t, err)
	require.Equal(t, 5, len(segments))
	require.Equal(t, expectedDeliverTxReq2Bytes, segments[0])
	require.Equal(t, expectedKVPair1, segments[1])
	require.Equal(t, expectedKVPair2, segments[2])
	require.Equal(t, expectedKVPair3, segments[3])
	require.Equal(t, expectedDeliverTxRes2Bytes, segments[4])
}

func testDagCosmosListenEndBlock(t *testing.T) {
	expectedEndBlockReqBytes, err := fileTestMarshaller.Marshal(&testEndBlockReq)
	require.Nil(t, err)
	expectedEndBlockResBytes, err := fileTestMarshaller.Marshal(&testEndBlockRes)
	require.Nil(t, err)

	// write state changes
	testDagCosmosListener1.OnWrite(mockStoreKey1, mockKey1, mockValue1, false)
	testDagCosmosListener2.OnWrite(mockStoreKey1, mockKey2, mockValue2, false)
	testDagCosmosListener1.OnWrite(mockStoreKey2, mockKey3, mockValue3, false)

	// expected KV pairs
	expectedKVPair1, err := fileTestMarshaller.Marshal(&types.StoreKVPair{
		StoreKey: mockStoreKey1.Name(),
		Key:      mockKey1,
		Value:    mockValue1,
		Delete:   false,
	})
	require.Nil(t, err)
	expectedKVPair2, err := fileTestMarshaller.Marshal(&types.StoreKVPair{
		StoreKey: mockStoreKey1.Name(),
		Key:      mockKey2,
		Value:    mockValue2,
		Delete:   false,
	})
	require.Nil(t, err)
	expectedKVPair3, err := fileTestMarshaller.Marshal(&types.StoreKVPair{
		StoreKey: mockStoreKey2.Name(),
		Key:      mockKey3,
		Value:    mockValue3,
		Delete:   false,
	})
	require.Nil(t, err)

	// send the ABCI messages
	err = testDagCosmosStreamingService.ListenEndBlock(emptyContext, testEndBlockReq, testEndBlockRes)
	require.Nil(t, err)

	// load the file, checking that it was created with the expected name
	fileName := fmt.Sprintf("%s-block-%d-end", testPrefix, testEndBlockReq.Height)
	fileBytes, err := readInFile(fileName)
	require.Nil(t, err)

	// segment the file into the separate gRPC messages and check the correctness of each
	segments, err := segmentBytes(fileBytes)
	require.Nil(t, err)
	require.Equal(t, 5, len(segments))
	require.Equal(t, expectedEndBlockReqBytes, segments[0])
	require.Equal(t, expectedKVPair1, segments[1])
	require.Equal(t, expectedKVPair2, segments[2])
	require.Equal(t, expectedKVPair3, segments[3])
	require.Equal(t, expectedEndBlockResBytes, segments[4])
}
