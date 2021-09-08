package types

import (
	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/anconprotocol/exported"
	"github.com/cosmos/cosmos-sdk/codec"
	cdctypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"

	gogotypes "github.com/gogo/protobuf/types"

	"github.com/cosmos/cosmos-sdk/types/msgservice"
)

func RegisterCodec(cdc *codec.LegacyAmino) {
	// this line is used by starport scaffolding # 2
	cdc.RegisterConcrete(&MsgMetadata{}, "anconprotocol/Metadata", nil)

	cdc.RegisterConcrete(&MsgFile{}, "anconprotocol/File", nil)

	cdc.RegisterConcrete(&MsgIssueDenom{}, "anconprotocol/IssueDenom", nil)
	cdc.RegisterConcrete(&MsgEditNFT{}, "anconprotocol/EditNFT", nil)
	cdc.RegisterConcrete(&MsgBurnNFT{}, "anconprotocol/BurnNFT", nil)
	cdc.RegisterConcrete(&MsgTransferDenom{}, "anconprotocol/TransferDenom", nil)

}

func RegisterInterfaces(registry cdctypes.InterfaceRegistry) {
	// this line is used by starport scaffolding # 3
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgMetadata{},
		&MsgFile{},
		&MsgIssueDenom{},
		&MsgTransferNFT{},
		&MsgTransferDenom{},
		&MsgBurnNFT{},
		&MsgEditNFT{},
	)
	registry.RegisterImplementations((*exported.NFT)(nil),
		&BaseNFT{},
	)
	msgservice.RegisterMsgServiceDesc(registry, &_Msg_serviceDesc)
}

var (
	amino     = codec.NewLegacyAmino()
	ModuleCdc = codec.NewProtoCodec(cdctypes.NewInterfaceRegistry())
)

// return supply protobuf code
func MustMarshalSupply(cdc codec.Marshaler, supply uint64) []byte {
	supplyWrap := gogotypes.UInt64Value{Value: supply}
	return cdc.MustMarshalBinaryBare(&supplyWrap)
}

// return th supply
func MustUnMarshalSupply(cdc codec.Marshaler, value []byte) uint64 {
	var supplyWrap gogotypes.UInt64Value
	cdc.MustUnmarshalBinaryBare(value, &supplyWrap)
	return supplyWrap.Value
}

// return the tokenID protobuf code
func MustMarshalTokenID(cdc codec.Marshaler, tokenID string) []byte {
	tokenIDWrap := gogotypes.StringValue{Value: tokenID}
	return cdc.MustMarshalBinaryBare(&tokenIDWrap)
}

// return th tokenID
func MustUnMarshalTokenID(cdc codec.Marshaler, value []byte) string {
	var tokenIDWrap gogotypes.StringValue
	cdc.MustUnmarshalBinaryBare(value, &tokenIDWrap)
	return tokenIDWrap.Value
}
