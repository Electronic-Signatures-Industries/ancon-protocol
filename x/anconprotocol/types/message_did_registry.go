package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

var _ sdk.Msg = &MsgChangeOwner{}
var _ sdk.Msg = &MsgGrantDelegate{}
var _ sdk.Msg = &MsgRevokeDelegate{}
var _ sdk.Msg = &MsgSetAttribute{}
var _ sdk.Msg = &MsgRevokeAttribute{}

var _ sdk.Msg = &MsgBurnNFT{}
var _ sdk.Msg = &MsgEditNFT{}
var _ sdk.Msg = &MsgTransferNFT{}
var _ sdk.Msg = &MsgMintNFT{}

var _ sdk.Msg = &MsgCreateDid{}
var _ sdk.Msg = &MsgUpdateDid{}
var _ sdk.Msg = &MsgRevokeDid{}

func NewMsgCreateDid(creator string) *MsgCreateDid {
	return &MsgCreateDid{
		Creator: creator,
	}
}

func (msg *MsgCreateDid) Route() string {
	return RouterKey
}

func (msg *MsgCreateDid) Type() string {
	return "CreateDid"
}

func (msg *MsgCreateDid) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgCreateDid) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgCreateDid) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
func NewMsgRevokeDid(creator string) *MsgRevokeDid {
	return &MsgRevokeDid{
		Creator: creator,
	}
}

func (msg *MsgRevokeDid) Route() string {
	return RouterKey
}

func (msg *MsgRevokeDid) Type() string {
	return "RevokeDid"
}

func (msg *MsgRevokeDid) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgRevokeDid) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgRevokeDid) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
func NewMsgUpdateDid(creator string) *MsgUpdateDid {
	return &MsgUpdateDid{
		Creator: creator,
	}
}

func (msg *MsgUpdateDid) Route() string {
	return RouterKey
}

func (msg *MsgUpdateDid) Type() string {
	return "UpdateDid"
}

func (msg *MsgUpdateDid) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgUpdateDid) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpdateDid) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}

func NewMsgChangeOwner(creator string) *MsgChangeOwner {
	return &MsgChangeOwner{
		Creator: creator,
	}
}

func (msg *MsgChangeOwner) Route() string {
	return RouterKey
}

func (msg *MsgChangeOwner) Type() string {
	return "ChangeOwner"
}

func (msg *MsgChangeOwner) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgChangeOwner) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgChangeOwner) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}

func NewMsgSetAttribute(creator string) *MsgSetAttribute {
	return &MsgSetAttribute{
		Creator: creator,
	}
}

func (msg *MsgSetAttribute) Route() string {
	return RouterKey
}

func (msg *MsgSetAttribute) Type() string {
	return "SetAttribute"
}

func (msg *MsgSetAttribute) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgSetAttribute) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgSetAttribute) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}

func NewMsgGrantDelegate(creator string) *MsgGrantDelegate {
	return &MsgGrantDelegate{
		Creator: creator,
	}
}

func (msg *MsgGrantDelegate) Route() string {
	return RouterKey
}

func (msg *MsgGrantDelegate) Type() string {
	return "GrantDelegate"
}

func (msg *MsgGrantDelegate) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgGrantDelegate) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgGrantDelegate) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}

func NewMsgRevokeDelegate(creator string) *MsgRevokeDelegate {
	return &MsgRevokeDelegate{
		Creator: creator,
	}
}

func (msg *MsgRevokeDelegate) Route() string {
	return RouterKey
}

func (msg *MsgRevokeDelegate) Type() string {
	return "RevokeDelegate"
}

func (msg *MsgRevokeDelegate) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgRevokeDelegate) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgRevokeDelegate) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}

func NewMsgRevokeAttribute(creator string) *MsgRevokeAttribute {
	return &MsgRevokeAttribute{
		Creator: creator,
	}
}

func (msg *MsgRevokeAttribute) Route() string {
	return RouterKey
}

func (msg *MsgRevokeAttribute) Type() string {
	return "RevokeAttribute"
}

func (msg *MsgRevokeAttribute) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgRevokeAttribute) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgRevokeAttribute) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
