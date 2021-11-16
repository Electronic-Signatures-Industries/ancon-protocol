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

	cdc.RegisterConcrete(&MsgCreateDid{}, "anconprotocol/CreateDid", nil)
	cdc.RegisterConcrete(&MsgUpdateDid{}, "anconprotocol/UpdateDid", nil)
	cdc.RegisterConcrete(&MsgRevokeDid{}, "anconprotocol/RevokeDid", nil)

	cdc.RegisterConcrete(&MsgChangeOwner{}, "anconprotocol/ChangeOwner", nil)
	cdc.RegisterConcrete(&MsgGrantDelegate{}, "anconprotocol/GrantDelegate", nil)
	cdc.RegisterConcrete(&MsgGrantAttribute{}, "anconprotocol/GrantAttribute", nil)
	cdc.RegisterConcrete(&MsgRevokeDelegate{}, "anconprotocol/RevokeDelegate", nil)
	cdc.RegisterConcrete(&MsgRevokeAttribute{}, "anconprotocol/RevokeAttribute", nil)

	cdc.RegisterConcrete(&MsgMetadata{}, "anconprotocol/Metadata", nil)
	cdc.RegisterConcrete(&MsgUpdateMetadataOwnership{}, "anconprotocol/UpdateMetadataOwnership", nil)

	cdc.RegisterConcrete(&MsgFile{}, "anconprotocol/File", nil)

	cdc.RegisterConcrete(&MsgIssueDenom{}, "anconprotocol/IssueDenom", nil)
	cdc.RegisterConcrete(&MsgEditNFT{}, "anconprotocol/EditNFT", nil)
	cdc.RegisterConcrete(&MsgBurnNFT{}, "anconprotocol/BurnNFT", nil)
	cdc.RegisterConcrete(&MsgTransferDenom{}, "anconprotocol/TransferDenom", nil)
	cdc.RegisterConcrete(&MsgSendMetadataOwnership{}, "anconprotocol/SendMetadataOwnership", nil)

	cdc.RegisterConcrete(&MsgAddDataUnion{}, "anconprotocol/AddDataUnion", nil)
	cdc.RegisterConcrete(&MsgUpdateDataUnion{}, "anconprotocol/UpdateDataUnion", nil)
	cdc.RegisterConcrete(&MsgRemoveDataUnion{}, "anconprotocol/RemoveDataUnion", nil)
	cdc.RegisterConcrete(&MsgAddDataSource{}, "anconprotocol/AddDataSource", nil)
	cdc.RegisterConcrete(&MsgRemoveDataSource{}, "anconprotocol/RemoveDataSource", nil)
	cdc.RegisterConcrete(&MsgUpdateDataSource{}, "anconprotocol/UpdateDataSource", nil)
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
		&MsgIssueDenom{},
		&MsgTransferNFT{},
		&MsgTransferDenom{},
		&MsgBurnNFT{},
		&MsgEditNFT{},
		&MsgCreateDid{},
		&MsgUpdateDid{},
		&MsgRevokeDid{},
		&MsgUpdateMetadataOwnership{},
		&MsgSendMetadataOwnership{},
		&MsgAddDataSource{},
		&MsgUpdateDataSource{},
		&MsgRemoveDataSource{},
		&MsgAddDataUnion{},
		&MsgRemoveDataUnion{},
		&MsgUpdateDataUnion{},
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
func MustMarshalSupply(cdc codec.Codec, supply uint64) []byte {
	supplyWrap := gogotypes.UInt64Value{Value: supply}
	return cdc.MustMarshal(&supplyWrap)
}

// return th supply
func MustUnMarshalSupply(cdc codec.Codec, value []byte) uint64 {
	var supplyWrap gogotypes.UInt64Value
	cdc.MustUnmarshal(value, &supplyWrap)
	return supplyWrap.Value
}

// return the tokenID protobuf code
func MustMarshalTokenID(cdc codec.Codec, tokenID string) []byte {
	tokenIDWrap := gogotypes.StringValue{Value: tokenID}
	return cdc.MustMarshal(&tokenIDWrap)
}

// return th tokenID
func MustUnMarshalTokenID(cdc codec.Codec, value []byte) string {
	var tokenIDWrap gogotypes.StringValue
	cdc.MustUnmarshal(value, &tokenIDWrap)
	return tokenIDWrap.Value
}
