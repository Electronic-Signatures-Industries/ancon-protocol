package types

import (
	"github.com/cosmos/cosmos-sdk/codec"
	cdctypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/msgservice"
)

func RegisterCodec(cdc *codec.LegacyAmino) {
	// this line is used by starport scaffolding # 2
cdc.RegisterConcrete(&MsgNonce{}, "anconprotocol/Nonce", nil)

cdc.RegisterConcrete(&MsgNonce{}, "anconprotocol/Nonce", nil)

	cdc.RegisterConcrete(&MsgChangeOwner{}, "anconprotocol/ChangeOwner", nil)
	cdc.RegisterConcrete(&MsgAddDelegate{}, "anconprotocol/AddDelegate", nil)
	cdc.RegisterConcrete(&MsgSetAttribute{}, "anconprotocol/SetAttribute", nil)
	cdc.RegisterConcrete(&MsgRevokeDelegate{}, "anconprotocol/RevokeDelegate", nil)

	cdc.RegisterConcrete(&MsgMetadata{}, "anconprotocol/Metadata", nil)

	cdc.RegisterConcrete(&MsgFile{}, "anconprotocol/File", nil)

}

func RegisterInterfaces(registry cdctypes.InterfaceRegistry) {
	// this line is used by starport scaffolding # 3
registry.RegisterImplementations((*sdk.Msg)(nil),
	&MsgNonce{},
)
registry.RegisterImplementations((*sdk.Msg)(nil),
	&MsgNonce{},
)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgAddDelegate{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgRevokeDelegate{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgChangeOwner{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgSetAttribute{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgMetadata{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgFile{},
	)

	msgservice.RegisterMsgServiceDesc(registry, &_Msg_serviceDesc)
}

var (
	amino     = codec.NewLegacyAmino()
	ModuleCdc = codec.NewProtoCodec(cdctypes.NewInterfaceRegistry())
)
