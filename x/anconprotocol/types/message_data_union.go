package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

var _ sdk.Msg = &MsgAddDataSource{}
var _ sdk.Msg = &MsgAddDataUnion{}
var _ sdk.Msg = &MsgUpdateDataSource{}
var _ sdk.Msg = &MsgUpdateDataUnion{}
var _ sdk.Msg = &MsgRemoveDataSource{}
var _ sdk.Msg = &MsgRemoveDataUnion{}

func NewAddDataSource(creator string, union DataSource) *MsgAddDataSource {
	return &MsgAddDataSource{
		DataSource: &union,
	}
}

func (msg *MsgAddDataSource) Route() string {
	return RouterKey
}

func (msg *MsgAddDataSource) Type() string {
	return "AddDataSource"
}

func (msg *MsgAddDataSource) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgAddDataSource) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgAddDataSource) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
func NewUpdateDataSource(id uint64, creator string, name, description string, anchors []uint64) *MsgUpdateDataSource {
	return &MsgUpdateDataSource{
		Creator:     creator,
		Id:          id,
		Name:        name,
		Description: description,
		Anchors:     anchors,
	}
}

func (msg *MsgUpdateDataSource) Route() string {
	return RouterKey
}

func (msg *MsgUpdateDataSource) Type() string {
	return "UpdateDataSource"
}

func (msg *MsgUpdateDataSource) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgUpdateDataSource) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpdateDataSource) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
func NewRemoveDataSource(creator string, id uint64) *MsgRemoveDataSource {
	return &MsgRemoveDataSource{
		Creator: creator,
		Id:      id,
	}
}

func (msg *MsgRemoveDataSource) Route() string {
	return RouterKey
}

func (msg *MsgRemoveDataSource) Type() string {
	return "RemoveDataSource"
}

func (msg *MsgRemoveDataSource) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgRemoveDataSource) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgRemoveDataSource) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}

func NewAddDataUnion(creator string, union DataUnion) *MsgAddDataUnion {
	return &MsgAddDataUnion{
		DataUnion: &union,
	}
}

func (msg *MsgAddDataUnion) Route() string {
	return RouterKey
}

func (msg *MsgAddDataUnion) Type() string {
	return "AddDataUnion"
}

func (msg *MsgAddDataUnion) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgAddDataUnion) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgAddDataUnion) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}

func NewRemoveDataUnion(creator string, id uint64) *MsgRemoveDataUnion {
	return &MsgRemoveDataUnion{
		Creator: creator,
		Id:      id,
	}
}

func (msg *MsgRemoveDataUnion) Route() string {
	return RouterKey
}

func (msg *MsgRemoveDataUnion) Type() string {
	return "RemoveDataUnion"
}

func (msg *MsgRemoveDataUnion) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgRemoveDataUnion) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgRemoveDataUnion) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
func NewUpdateDataUnion(creator string, id uint64, name, profileRef string, dataSources []uint64) *MsgUpdateDataUnion {
	return &MsgUpdateDataUnion{
		Creator:     creator,
		Id:          id,
		Name:        name,
		ProfileRef:  profileRef,
		DataSources: dataSources,
	}
}

func (msg *MsgUpdateDataUnion) Route() string {
	return RouterKey
}

func (msg *MsgUpdateDataUnion) Type() string {
	return "UpdateDataUnion"
}

func (msg *MsgUpdateDataUnion) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgUpdateDataUnion) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpdateDataUnion) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
