package app

import (
	"fmt"
	"strings"

	servertypes "github.com/cosmos/cosmos-sdk/server/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/spf13/cast"
)

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
