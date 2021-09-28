package app

import (
	"fmt"
	"strings"
	"sync"

	servertypes "github.com/cosmos/cosmos-sdk/server/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/spf13/cast"
	abci "github.com/tendermint/tendermint/abci/types"

	store "github.com/cosmos/cosmos-sdk/store/types"
	"github.com/cosmos/cosmos-sdk/types"
)

// StreamingListener interface used to hook into the ABCI message processing of the BaseApp
type StreamingListener interface {
	// ListenBeginBlock updates the streaming service with the latest BeginBlock messages
	ListenBeginBlock(ctx types.Context, req abci.RequestBeginBlock, res abci.ResponseBeginBlock) error
	// ListenEndBlock updates the steaming service with the latest EndBlock messages
	ListenEndBlock(ctx types.Context, req abci.RequestEndBlock, res abci.ResponseEndBlock) error
	// ListenDeliverTx updates the steaming service with the latest DeliverTx messages
	ListenDeliverTx(ctx types.Context, req abci.RequestDeliverTx, res abci.ResponseDeliverTx) error
}

// StreamingService interface for registering WriteListeners with the BaseApp and updating the service with the ABCI messages using the hooks
type StreamingService interface {
	// Stream is the streaming service loop, awaits kv pairs and writes them to some destination stream or file
	Stream(wg *sync.WaitGroup, quitChan <-chan struct{})
	// Listeners returns the streaming service's listeners for the BaseApp to register
	Listeners() map[types.StoreKey][]store.WriteListener
	// StreamingListener interface for hooking into the ABCI messages from inside the BaseApp
	StreamingListener
}

// StreamingServiceConstructor is used to construct a streaming service
type StreamingServiceConstructor func(opts servertypes.AppOptions, keys []sdk.StoreKey) (StreamingService, error)

// StreamingServiceType enum for specifying the type of StreamingService
type StreamingServiceType int

const (
	Unknown StreamingServiceType = iota
	File
	// add more in the future
)

// NewStreamingServiceType returns the StreamingServiceType corresponding to the provided name
func NewStreamingServiceType(name string) StreamingServiceType {
	switch strings.ToLower(name) {
	case "file", "f":
		return File
	default:
		return Unknown
	}
}

// String returns the string name of a StreamingServiceType
func (sst StreamingServiceType) String() string {
	switch sst {
	case File:
		return "file"
	default:
		return ""
	}
}

// StreamingServiceConstructorLookupTable is a mapping of StreamingServiceTypes to StreamingServiceConstructors
var StreamingServiceConstructorLookupTable = map[StreamingServiceType]StreamingServiceConstructor{
	File: FileStreamingConstructor,
}

// NewStreamingServiceConstructor returns the StreamingServiceConstructor corresponding to the provided name
func NewStreamingServiceConstructor(name string) (StreamingServiceConstructor, error) {
	ssType := NewStreamingServiceType(name)
	if ssType == Unknown {
		return nil, fmt.Errorf("unrecognized streaming service name %s", name)
	}
	if constructor, ok := StreamingServiceConstructorLookupTable[ssType]; ok {
		return constructor, nil
	}
	return nil, fmt.Errorf("streaming service constructor of type %s not found", ssType.String())
}

// FileStreamingConstructor is the StreamingServiceConstructor function for creating a FileStreamingService
func FileStreamingConstructor(opts servertypes.AppOptions, keys []sdk.StoreKey) (StreamingService, error) {
	filePrefix := cast.ToString(opts.Get("streamers.file.prefix"))
	fileDir := cast.ToString(opts.Get("streamers.file.writeDir"))
	return streaming.NewFileStreamingService(fileDir, filePrefix, keys), nil
}
