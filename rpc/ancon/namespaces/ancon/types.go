package ancon

import "github.com/ethereum/go-ethereum/accounts/abi"

func CreateMetadataAbiMethod() abi.Method {
	addressType, _ := abi.NewType("address", "", nil)
	//bytesAType, _ := abi.NewType("bytes[]", "", nil)
	//bytesType, _ := abi.NewType("bytes", "", nil)
	stringType, _ := abi.NewType("string", "", nil)
	method := abi.NewMethod(
		"CreateMetadata",
		"CreateMetadata",
		abi.Function,
		"nonpayable",
		false,
		false,
		abi.Arguments{abi.Argument{
			Name:    "owner",
			Type:    addressType,
			Indexed: false,
		}, abi.Argument{
			Name:    "did",
			Type:    stringType,
			Indexed: false,
		}, abi.Argument{
			Name:    "name",
			Type:    stringType,
			Indexed: false,
		}, abi.Argument{
			Name:    "description",
			Type:    stringType,
			Indexed: false,
		}, abi.Argument{
			Name:    "image",
			Type:    stringType,
			Indexed: false,
		}, abi.Argument{
			Name:    "parent",
			Type:    stringType,
			Indexed: false,
		}, abi.Argument{
			Name:    "sources",
			Type:    stringType,
			Indexed: false,
		}, abi.Argument{
			Name:    "links",
			Type:    stringType,
			Indexed: false,
		}},
		abi.Arguments{},
	)

	return method
}
