package types

import (
	"github.com/ethereum/go-ethereum/accounts/abi"
)

// ToAbiUnpacked
func (s *AguaclaraPacketData) ToAbiUnpacked(data []byte) ([]interface{}, error) {
	builder := NewPacketBuilder()
	res, err := builder.UnpackValues(data)
	if err != nil {
		return nil, err
	}
	return res, nil
}

// ToAbiPacked
func (s *AguaclaraPacketData) ToAbiPacked(args ...interface{}) ([]byte, error) {
	builder := NewPacketBuilder()
	res, err := builder.PackValues(args)
	if err != nil {
		return nil, err
	}
	return res, nil
}

func NewPacketBuilder() *abi.Arguments {

	addrType, _ := abi.NewType("address", "", nil)
	uintType, _ := abi.NewType("uint", "", nil)
	stringType, _ := abi.NewType("string", "", nil)
	model := abi.Arguments{
		{
			Name:    "creator",
			Type:    addrType,
			Indexed: false,
		},
		{
			Name:    "tokenAddress",
			Type:    addrType,
			Indexed: false,
		},
		{
			Name:    "tokenId",
			Type:    uintType,
			Indexed: false,
		},
		{
			Name:    "didRecipient",
			Type:    stringType,
			Indexed: false,
		},
		{
			Name:    "toMetadata",
			Type:    stringType,
			Indexed: false,
		},
	}

	return &model
}
