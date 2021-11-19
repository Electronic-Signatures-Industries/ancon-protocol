package keeper

import (
	"bytes"
	"context"
	"crypto/sha256"

	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/anconprotocol/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/fxamacker/cbor/v2"
	"github.com/hyperledger/aries-framework-go/pkg/doc/did"
	"github.com/ipld/go-ipld-prime/codec/dagcbor"
	"github.com/spf13/cast"
	// "github.com/hyperledger/aries-framework-go/pkg/vdr"
	// "github.com/hyperledger/aries-framework-go/pkg/vdr/httpbinding"
)

func (k msgServer) AnchorCidWithProof(goCtx context.Context, msg *types.MsgAnchorCidWithProof) (*types.MsgAnchorCidWithProofResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	var err error

	err = msg.ValidateBasic()
	if err != nil {
		return nil, err
	}

	sender := k.GetDIDOwner(ctx, msg.Did)
	node, err := k.GetDid(ctx, sender.Cid)
	var buf bytes.Buffer

	dagcbor.Encode(node, &buf)

	var d []byte
	cbor.Unmarshal(buf.Bytes(), d)
	if err != nil {

		return nil, err
	}
	diddoc, err := did.ParseDocument(d)

	k.SetAnchor(ctx, diddoc.ID, msg.Cid, msg.Key)
	return &types.MsgAnchorCidWithProofResponse{
		Ok: true,
	}, nil

}

func (k msgServer) AnchorCid(goCtx context.Context, msg *types.MsgAnchorCid) (*types.MsgAnchorCidResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	var err error

	err = msg.ValidateBasic()
	if err != nil {
		return nil, err
	}

	s := append([]byte(msg.Creator), msg.Cid...)
	s = append([]byte(s), msg.Key...)
	s = append([]byte(s), ctx.ChainID()...)

	challenge := sha256.Sum256(s)

	return &types.MsgAnchorCidResponse{
		Challenge: cast.ToString(challenge),
		Reason:    "Invalid call, request a proof and then call AnchorCidWithProof",
	}, nil
}

// SendMetadataOwnership
//TODO: emit event
func (k msgServer) SendMetadataOwnership(goCtx context.Context, msg *types.MsgSendMetadataOwnership) (*types.MsgSendMetadataOwnershipResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	err := msg.ValidateBasic()
	if err != nil {
		return nil, err
	}

	lnk, _ := k.CreateSendMetadataPacket(
		ctx, sdk.AccAddress(msg.Creator), msg.Data,
	)

	return &types.MsgSendMetadataOwnershipResponse{
		Cid: lnk,
	}, nil
}

// UpdateMetadataOwnership
//TODO: emit event
func (k msgServer) UpdateMetadataOwnership(goCtx context.Context, msg *types.MsgUpdateMetadataOwnership) (*types.MsgUpdateMetadataOwnershipResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	err := msg.ValidateBasic()
	if err != nil {
		return nil, err
	}

	lnk, _ := k.ChangeOwnerMetadata(
		ctx, msg.Hash, msg.PreviousOwner, msg.NewOwner, msg.CurrentChainId, msg.RecipientChainId,
	)
	// httpbinding.New()
	lnkPacket, err := k.CreateSendMetadataPacket(ctx,
		sdk.AccAddress(msg.Sender), &types.AguaclaraPacketData{
			Creator:          msg.PreviousOwner,
			TokenAddress:     msg.TokenAddress,
			TokenId:          msg.TokenId,
			DidRecipient:     msg.NewOwner,
			ToMetadata:       lnk,
			Hash:             msg.Hash,
			CurrentChainId:   msg.CurrentChainId,
			RecipientChainId: msg.CurrentChainId,
		})
	if err != nil {
		return nil, err
	}

	return &types.MsgUpdateMetadataOwnershipResponse{
		MetadataRef: lnk,
		PacketRef:   lnkPacket,
	}, nil
}

// Metadata
//TODO: emit event
func (k msgServer) Metadata(goCtx context.Context, msg *types.MsgMetadata) (*types.MsgMetadataResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	err := msg.ValidateBasic()
	if err != nil {
		return nil, err
	}

	lnk, _ := k.AddMetadata(
		ctx,
		msg,
	)

	return &types.MsgMetadataResponse{
		Cid: lnk,
	}, nil
}

func (k msgServer) RoyaltyInfo(goCtx context.Context, msg *types.MsgRoyaltyInfo) (*types.MsgRoyaltyInfoResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	err := msg.ValidateBasic()
	if err != nil {
		return nil, err
	}

	k.AddRoyaltyInfo(
		ctx,
		msg,
	)

	return &types.MsgRoyaltyInfoResponse{}, nil
}

//TODO: emit event
func (k msgServer) MintTrustedContent(goCtx context.Context, msg *types.MsgMintTrustedContent) (*types.MsgMintTrustedContentResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	err := msg.ValidateBasic()
	if err != nil {
		return nil, err
	}

	k.AddTrustedContent(
		ctx,
		msg,
	)

	return &types.MsgMintTrustedContentResponse{}, nil
}

//TODO: emit event
func (k msgServer) MintTrustedResource(goCtx context.Context, msg *types.MsgMintTrustedResource) (*types.MsgMintTrustedResourceResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	err := msg.ValidateBasic()
	if err != nil {
		return nil, err
	}

	k.AddTrustedResource(
		ctx,
		msg,
	)

	return &types.MsgMintTrustedResourceResponse{}, nil
}

//TODO: emit event
func (k msgServer) File(goCtx context.Context, msg *types.MsgFile) (*types.MsgFileResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	err := msg.ValidateBasic()
	if err != nil {
		return nil, err
	}
	lnk, _ := k.AddFile(
		ctx,
		msg,
	)

	return &types.MsgFileResponse{
		Hash: lnk,
	}, nil
}
