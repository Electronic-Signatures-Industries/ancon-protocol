package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	types "github.com/cosmos/cosmos-sdk/x/ibc/core/02-client/types"
)

var _ sdk.Msg = &MsgMintSwap{}

func NewMsgMintSwap(creator string, path string, content string, mode string, time string, content_type string, did string, from string) *MsgMintSwap {
	return &MsgMintSwap{
		SourcePort:       "",
		SourceChannel:    "",
		MetadataRef:      "",
		Sender:           "",
		Receiver:         "",
		TokenName:        "",
		TokenSymbol:      "",
		DidOwner:         did,
		Price:            0,
		TimeoutHeight:    types.Height{},
		TimeoutTimestamp: 0,
	}
}

func (msg *MsgMintSwap) Route() string {
	return RouterKey
}

func (msg *MsgMintSwap) Type() string {
	return "MsgMintSwap"
}

func (msg *MsgMintSwap) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Sender)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgMintSwap) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgMintSwap) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Sender)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
