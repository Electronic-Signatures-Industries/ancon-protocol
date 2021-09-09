package types

import (
	"github.com/cosmos/cosmos-sdk/codec"
	cdctypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/msgservice"
)

func RegisterCodec(cdc *codec.LegacyAmino) {
	// this line is used by starport scaffolding # 2

	cdc.RegisterConcrete(&MsgChangeOwner{}, "anconprotocol/ChangeOwner", nil)
	cdc.RegisterConcrete(&MsgGrantDelegate{}, "anconprotocol/GrantDelegate", nil)
	cdc.RegisterConcrete(&MsgGrantAttribute{}, "anconprotocol/GrantAttribute", nil)
	cdc.RegisterConcrete(&MsgRevokeDelegate{}, "anconprotocol/RevokeDelegate", nil)
	cdc.RegisterConcrete(&MsgRevokeAttribute{}, "anconprotocol/RevokeAttribute", nil)

	cdc.RegisterConcrete(&MsgMetadata{}, "anconprotocol/Metadata", nil)

	cdc.RegisterConcrete(&MsgFile{}, "anconprotocol/File", nil)

}

func RegisterInterfaces(registry cdctypes.InterfaceRegistry) {
	// this line is used by starport scaffolding # 3
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgGrantDelegate{},
		&MsgGrantAttribute{},
		&MsgRevokeDelegate{},
		&MsgRevokeAttribute{},
		&MsgChangeOwner{},
		&MsgMetadata{},
		&MsgFile{},
	)

	msgservice.RegisterMsgServiceDesc(registry, &_Msg_serviceDesc)
}

var (
	amino     = codec.NewLegacyAmino()
	ModuleCdc = codec.NewProtoCodec(cdctypes.NewInterfaceRegistry())
)
