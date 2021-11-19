package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

var _ sdk.Msg = &MsgAnchorCid{}
var _ sdk.Msg = &MsgFile{}
var _ sdk.Msg = &MsgUpdateMetadataOwnership{}
var _ sdk.Msg = &MsgMetadata{}
var _ sdk.Msg = &MsgMintTrustedContent{}
var _ sdk.Msg = &MsgSendMetadataOwnership{}

var _ sdk.Msg = &MsgRoyaltyInfo{}

func NewMsgAnchorCid(creator, path, codec string, payload []byte, isJsonSchema bool) *MsgAnchorCid {
	return &MsgAnchorCid{
		Creator:      creator,
	}
}

func (msg *MsgAnchorCid) Route() string {
	return RouterKey
}

func (msg *MsgAnchorCid) Type() string {
	return "AnchorCid"
}

func (msg *MsgAnchorCid) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgAnchorCid) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgAnchorCid) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}

func NewMsgSendMetadataOwnership(from sdk.AccAddress, did string, tokenDidAddress string, tokenId int64, didRecipient, uri string) *MsgSendMetadataOwnership {
	return &MsgSendMetadataOwnership{
		Creator: from.String(),
		Data: &AguaclaraPacketData{
			Creator:      did,
			TokenAddress: tokenDidAddress,
			TokenId:      string(tokenId),
			DidRecipient: didRecipient,
			ToMetadata:   uri,
		},
	}
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

func NewMsgUpdateMetadataOwnership(hash string, previousOwner, newOwner, chainId, recipientChainId string) *MsgUpdateMetadataOwnership {
	return &MsgUpdateMetadataOwnership{
		Hash:             hash,
		PreviousOwner:    previousOwner,
		NewOwner:         newOwner,
		CurrentChainId:   chainId,
		RecipientChainId: recipientChainId,
		Sender:           "",
	}
}

func (msg *MsgUpdateMetadataOwnership) Route() string {
	return RouterKey
}

func (msg *MsgUpdateMetadataOwnership) Type() string {
	return "UpdateMetadataOwnership"
}

func (msg *MsgUpdateMetadataOwnership) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Sender)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgUpdateMetadataOwnership) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpdateMetadataOwnership) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Sender)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}

func NewMsgMintTrustedResource(creator string, path string, content string, mode string, time string, content_type string, did string, from string) *MsgMintTrustedResource {
	return &MsgMintTrustedResource{
		Creator:                 creator,
		MetadataRef:             "",
		DidOwner:                did,
		DenomId:                 did,
		Name:                    "",
		Recipient:               "",
		ResourceWhitelistAccess: []string{},
		ResourceLocation:        "",
	}
}

func (msg *MsgMintTrustedResource) Route() string {
	return RouterKey
}

func (msg *MsgMintTrustedResource) Type() string {
	return "TrustedResource"
}

func (msg *MsgMintTrustedResource) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgMintTrustedResource) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgMintTrustedResource) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
func NewMsgRoyaltyInfo(creator string, path string, content string, mode string, time string, content_type string, did string, from string) *MsgRoyaltyInfo {
	return &MsgRoyaltyInfo{
		Creator:              creator,
		Receiver:             "",
		RoyaltyFeePercentage: 0,
		MetadataRef:          "",
		DenomId:              did,
	}
}

func (msg *MsgRoyaltyInfo) Route() string {
	return RouterKey
}

func (msg *MsgRoyaltyInfo) Type() string {
	return "RoyaltyInfo"
}

func (msg *MsgRoyaltyInfo) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgRoyaltyInfo) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgRoyaltyInfo) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}

func NewMsgMintTrustedContent(creator string, path string, content string, mode string, time string, content_type string, did string, from string) *MsgMintTrustedContent {
	return &MsgMintTrustedContent{
		Creator:     creator,
		MetadataRef: "",
		DidOwner:    did,
		DenomId:     did,
		Name:        "",
		Recipient:   "",
	}
}

func (msg *MsgMintTrustedContent) Route() string {
	return RouterKey
}

func (msg *MsgMintTrustedContent) Type() string {
	return "TrustedContent"
}

func (msg *MsgMintTrustedContent) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgMintTrustedContent) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgMintTrustedContent) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}

	return nil
}

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
	if len(msg.ContentType) == 0 {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidType, "invalid content type (%s)", err)
	}
	return nil
}

func NewMsgMetadata(creator, name, description, image, owner, parent string,
	sources, links []string, verified_credential_ref, did, from string) *MsgMetadata {
	return &MsgMetadata{
		Creator:               creator,
		Name:                  name,
		Description:           description,
		Image:                 image,
		Owner:                 owner,
		Parent:                parent,
		AdditionalSources:     sources,
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
	if (msg.Name) == "" {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidType, "invalid name type (%s)", err)
	}
	if (msg.Description) == "" {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidType, "invalid description address (%s)", err)
	}

	return nil
}
