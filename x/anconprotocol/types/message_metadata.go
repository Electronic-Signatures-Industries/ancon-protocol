package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

var _ sdk.Msg = &MsgMetadata{}

func NewMsgMetadata(creator string, name string, description string, image string, owner string, parent string, sources string, links string, verified_credential_ref string, did string, from string) *MsgMetadata {
	return &MsgMetadata{
		Creator:               creator,
		Name:                  name,
		Description:           description,
		Image:                 image,
		Owner:                 owner,
		Parent:                parent,
		Sources:               sources,
		Links:                 links,
		VerifiedCredentialRef: verified_credential_ref,
		Did:                   did,
		From:                  from,
	}
}

func (msg *MsgMetadata) Route() string {
	return RouterKey
}

func (msg *MsgMetadata) Type() string {
	return "Metadata"
}

func (msg *MsgMetadata) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgMetadata) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgMetadata) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	if sdk.IsAlphaNumeric(msg.Name) {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidType, "invalid name type (%s)", err)
	}
	if sdk.IsAlphaNumeric(msg.Description) {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidType, "invalid description address (%s)", err)
	}

	return nil
}
