package streaming

import (
	"context"
	"fmt"
	"strings"

	"github.com/cosmos/cosmos-sdk/codec"
	serverTypes "github.com/cosmos/cosmos-sdk/server/types"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/spf13/cast"
)

// ServiceConstructor is used to construct a streaming service
type ServiceConstructor func(ctx context.Context, opts serverTypes.AppOptions, keys []sdk.StoreKey, marshaller codec.BinaryCodec) (StreamingService, error)

// ServiceType enum for specifying the type of StreamingService
type ServiceType int

const (
	Unknown ServiceType = iota
	File
	// add more in the future
	DagCosmos
	DagEth
)

// NewStreamingServiceType returns the streaming.ServiceType corresponding to the provided name
func NewStreamingServiceType(name string) ServiceType {
	switch strings.ToLower(name) {
	case "dagcosmos", "c":
		return DagCosmos
	case "dageth", "e":
		return DagCosmos
	case "file", "f":
		return File
	default:
		return Unknown
	}
}

// String returns the string name of a streaming.ServiceType
func (sst ServiceType) String() string {
	switch sst {
	case DagCosmos:
		return "dagcosmos"
	case DagEth:
		return "dageth"
	case File:
		return "file"
	default:
		return ""
	}
}

// ServiceConstructorLookupTable is a mapping of streaming.ServiceTypes to streaming.ServiceConstructors
var ServiceConstructorLookupTable = map[ServiceType]ServiceConstructor{
	File:      FileStreamingConstructor,
	DagCosmos: DagCosmosStreamingConstructor,
	DagEth:    DagEthStreamingConstructor,
}

// NewServiceConstructor returns the streaming.ServiceConstructor corresponding to the provided name
func NewServiceConstructor(name string) (ServiceConstructor, error) {
	ssType := NewStreamingServiceType(name)
	if ssType == Unknown {
		return nil, fmt.Errorf("unrecognized streaming service name %s", name)
	}
	if constructor, ok := ServiceConstructorLookupTable[ssType]; ok && constructor != nil {
		return constructor, nil
	}
	return nil, fmt.Errorf("streaming service constructor of type %s not found", ssType.String())
}

// DagCosmosStreamingConstructor is the streaming.ServiceConstructor function for creating a DagCosmosStreamingService
func DagCosmosStreamingConstructor(ctx context.Context, opts serverTypes.AppOptions, keys []sdk.StoreKey, marshaller codec.BinaryCodec) (StreamingService, error) {
	filePrefix := cast.ToString(opts.Get("streamers.dagcosmos.prefix"))
	fileDir := cast.ToString(opts.Get("streamers.dagcosmos.writeDir"))
	return NewDagCosmosStreamingService(ctx, fileDir, filePrefix, keys, marshaller)
}

// DagEthStreamingConstructor is the streaming.ServiceConstructor function for creating a DagEthStreamingService
func DagEthStreamingConstructor(ctx context.Context, opts serverTypes.AppOptions, keys []sdk.StoreKey, marshaller codec.BinaryCodec) (StreamingService, error) {
	filePrefix := cast.ToString(opts.Get("streamers.dageth.prefix"))
	fileDir := cast.ToString(opts.Get("streamers.dageth.writeDir"))
	return NewDagEthStreamingService(fileDir, filePrefix, keys, marshaller)
}

// FileStreamingConstructor is the streaming.ServiceConstructor function for creating a FileStreamingService
func FileStreamingConstructor(ctx context.Context, opts serverTypes.AppOptions, keys []sdk.StoreKey, marshaller codec.BinaryCodec) (StreamingService, error) {
	filePrefix := cast.ToString(opts.Get("streamers.file.prefix"))
	fileDir := cast.ToString(opts.Get("streamers.file.writeDir"))
	return NewStreamingService(fileDir, filePrefix, keys, marshaller)
}
