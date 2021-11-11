package types

import (
	"github.com/cosmos/cosmos-sdk/codec"
	"github.com/cosmos/cosmos-sdk/codec/types"
	cryptocodec "github.com/cosmos/cosmos-sdk/crypto/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/msgservice"
)

var (
	amino     = codec.NewLegacyAmino()
	ModuleCdc = codec.NewAminoCodec(amino)
)

func init() {
	RegisterLegacyAminoCodec(amino)
	cryptocodec.RegisterCrypto(amino)
	amino.Seal()
}

func RegisterLegacyAminoCodec(cdc *codec.LegacyAmino) {
	cdc.RegisterInterface((*TokenI)(nil), nil)

	cdc.RegisterConcrete(&Token{}, "ancon-protocol/token/Token", nil)

	cdc.RegisterConcrete(&MsgIssueToken{}, "ancon-protocol/token/MsgIssueToken", nil)
	cdc.RegisterConcrete(&MsgEditToken{}, "ancon-protocol/token/MsgEditToken", nil)
	cdc.RegisterConcrete(&MsgMintToken{}, "ancon-protocol/token/MsgMintToken", nil)
	cdc.RegisterConcrete(&MsgBurnToken{}, "ancon-protocol/token/MsgBurnToken", nil)
	cdc.RegisterConcrete(&MsgTransferTokenOwner{}, "ancon-protocol/token/MsgTransferTokenOwner", nil)
}

func RegisterInterfaces(registry types.InterfaceRegistry) {
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgIssueToken{},
		&MsgEditToken{},
		&MsgMintToken{},
		&MsgBurnToken{},
		&MsgTransferTokenOwner{},
	)
	registry.RegisterInterface(
		"ancon-protocol.token.TokenI",
		(*TokenI)(nil),
		&Token{},
	)

	msgservice.RegisterMsgServiceDesc(registry, &_Msg_serviceDesc)
}
