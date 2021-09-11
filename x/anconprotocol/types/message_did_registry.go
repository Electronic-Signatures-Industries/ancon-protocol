package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

var _ sdk.Msg = &MsgChangeOwner{}
var _ sdk.Msg = &MsgGrantDelegate{}
var _ sdk.Msg = &MsgRevokeDelegate{}
var _ sdk.Msg = &MsgGrantAttribute{}
var _ sdk.Msg = &MsgRevokeAttribute{}

var _ sdk.Msg = &MsgBurnNFT{}
var _ sdk.Msg = &MsgEditNFT{}
var _ sdk.Msg = &MsgTransferNFT{}
var _ sdk.Msg = &MsgMintNFT{}

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

func NewMsgSetAttribute(creator string) *MsgGrantAttribute {
	return &MsgGrantAttribute{
		Creator: creator,
	}
}

func (msg *MsgGrantAttribute) Route() string {
	return RouterKey
}

func (msg *MsgGrantAttribute) Type() string {
	return "SetAttribute"
}

func (msg *MsgGrantAttribute) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgGrantAttribute) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgGrantAttribute) ValidateBasic() error {
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
	return "AddDelegate"
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
	return "RevokeDelegate"
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
