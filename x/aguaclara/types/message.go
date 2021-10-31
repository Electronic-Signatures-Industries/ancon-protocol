package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

var _ sdk.Msg = &MsgSendMetadataOwnership{}

// var _ sdk.Msg = &MsgRoyaltyInfo{}
// var _ sdk.Msg = &MsgMintTrustedResource{}

func NewMsgSendMetadataOwnership(creator string, path string, content string, mode string, time string, content_type string, did string, from string) *MsgSendMetadataOwnership {
	return &MsgSendMetadataOwnership{}
}

func (s *AguaclaraPacketData) EthereumDecode(data []byte) {

}

func (s *AguaclaraPacketData) EthereumEncode() []byte {
	return []byte{}
}

func (msg *MsgSendMetadataOwnership) Route() string {
	return RouterKey
}

func (msg *MsgSendMetadataOwnership) Type() string {
	return "SendMetadataOwnership"
}

func (msg *MsgSendMetadataOwnership) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgSendMetadataOwnership) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgSendMetadataOwnership) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
