package types

import (
	"github.com/ethereum/go-ethereum/accounts/abi"
)

var (

	// event _anconSendCrossmintRequest(
	//     uint256 recipientChainId,
	//     string fromTokenNft,
	//     string toTokenNft,
	//     string metadataHash,
	//     string fromOwner,
	//     string toOwner,
	//     string permitHash,
	//     string permitSignature
	// );
	RecieveCrossmintCallback abi.Method
)

func (s *AguaclaraPacketData) EthereumDecode(data []byte) {

}

func (s *AguaclaraPacketData) EthereumEncode() []byte {
	return []byte{}
}

func NewPacketBuilder() *abi.Argument {
	model, _ := abi.NewType("AguaclaraPacketData", "", []abi.ArgumentMarshaling{
		abi.ArgumentMarshaling{
			Name:         "creator",
			Type:         "address",
			InternalType: "",
			Components:   []abi.ArgumentMarshaling{},
			Indexed:      false,
		},
		abi.ArgumentMarshaling{
			Name:         "tokenAddress",
			Type:         "address",
			InternalType: "",
			Components:   []abi.ArgumentMarshaling{},
			Indexed:      false,
		},
		abi.ArgumentMarshaling{
			Name:         "tokenId",
			Type:         "uint",
			InternalType: "",
			Components:   []abi.ArgumentMarshaling{},
			Indexed:      false,
		},
		abi.ArgumentMarshaling{
			Name:         "didRecipient",
			Type:         "string",
			InternalType: "",
			Components:   []abi.ArgumentMarshaling{},
			Indexed:      false,
		},
		abi.ArgumentMarshaling{
			Name:         "toMetadata",
			Type:         "string",
			InternalType: "",
			Components:   []abi.ArgumentMarshaling{},
			Indexed:      false,
		},
	})

	return &abi.Argument{
		Name:    "",
		Type:    model,
		Indexed: false,
	}
}
