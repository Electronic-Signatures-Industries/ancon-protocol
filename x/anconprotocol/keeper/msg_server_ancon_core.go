package keeper

import (
	"context"

	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/anconprotocol/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// ChangeMetadataOwnership
//TODO: emit event
func (k msgServer) ChangeMetadataOwnership(goCtx context.Context, msg *types.MsgChangeMetadataOwnership) (*types.MsgChangeMetadataOwnershipResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	err := msg.ValidateBasic()
	if err != nil {
		return nil, err
	}

	lnk, _ := k.ChangeOwnerMetadata(
		ctx, msg.Hash, msg.PreviousOwner, msg.NewOwner, msg.CurrentChainId, msg.RecipientChainId,
	)

	return &types.MsgChangeMetadataOwnershipResponse{
		Cid: lnk,
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
