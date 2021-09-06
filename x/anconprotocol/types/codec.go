package types

import (
	"github.com/cosmos/cosmos-sdk/codec"
	cdctypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/cosmos/cosmos-sdk/types/msgservice"
)

func RegisterCodec(cdc *codec.LegacyAmino) {
	// this line is used by starport scaffolding # 2
	cdc.RegisterConcrete(&MsgMetadata{}, "anconprotocol/Metadata", nil)

	cdc.RegisterConcrete(&MsgFile{}, "anconprotocol/File", nil)

	cdc.RegisterConcrete(&MsgCreateHTLC{}, "anconprotocol/CreateHTLC", nil)
	cdc.RegisterConcrete(&MsgClaimHTLC{}, "anconprotocol/ClaimHTLC", nil)
	cdc.RegisterConcrete(&MsgIssueDenom{}, "anconprotocol/IssueDenom", nil)
	cdc.RegisterConcrete(&MsgEditNFT{}, "anconprotocol/EditNFT", nil)
	cdc.RegisterConcrete(&MsgBurnNFT{}, "anconprotocol/BurnNFT", nil)
	cdc.RegisterConcrete(&MsgTransferDenom{}, "anconprotocol/TransferDenom", nil)

}

func RegisterInterfaces(registry cdctypes.InterfaceRegistry) {
	// this line is used by starport scaffolding # 3
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgMetadata{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgFile{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgClaimHTLC{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgCreateHTLC{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgIssueDenom{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgTransferDenom{},
	)

	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgBurnNFT{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgEditNFT{},
	)
	msgservice.RegisterMsgServiceDesc(registry, &_Msg_serviceDesc)
}

var (
	amino     = codec.NewLegacyAmino()
	ModuleCdc = codec.NewProtoCodec(cdctypes.NewInterfaceRegistry())
)
