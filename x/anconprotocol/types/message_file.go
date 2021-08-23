package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

var _ sdk.Msg = &MsgFile{}

func NewMsgFile(creator string, path string, content string, mode string, time string, content_type string, did string, from string) *MsgFile {
	return &MsgFile{
		Creator:     creator,
		Path:        path,
		Content:     content,
		Mode:        mode,
		Time:        time,
		ContentType: content_type,
		Did:         did,
		From:        from,
	}
}

func (msg *MsgFile) Route() string {
	return RouterKey
}

func (msg *MsgFile) Type() string {
	return "File"
}

func (msg *MsgFile) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgFile) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgFile) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
