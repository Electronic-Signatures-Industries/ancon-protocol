package keeper

import (
	"context"

	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/anconprotocol/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) RegisterRelay(goCtx context.Context, msg *types.MsgRegisterRelay) (*types.MsgRegisterRelayResponse, error) {
	//	ctx := sdk.UnwrapSDKContext(goCtx)

	// err := msg.ValidateBasic()
	// if err != nil {
	// 	return nil, err
	// }

	// k.AddInitiateSwap(
	// 	ctx,
	// 	msg,
	// )

	return &types.MsgRegisterRelayResponse{}, nil
}

func (k msgServer) MintSwap(goCtx context.Context, msg *types.MsgMintSwap) (*types.MsgMintSwapResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	err := msg.ValidateBasic()
	if err != nil {
		return nil, err
	}

	// k.RequestLazyMint(
	// 	ctx,
	// 	&types.MsgMintTrustedContent{},
	// )

	k.AddInitiateSwap(ctx, &types.MsgInitiateSwap{})

	return &types.MsgMintSwapResponse{}, nil
}
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

func (k msgServer) SendCrossMintTrusted(goCtx context.Context, msg *types.MsgSendCrossMintTrusted) (*types.MsgSendCrossMintTrustedResponse, error) {
	//	ctx := sdk.UnwrapSDKContext(goCtx)

	err := msg.ValidateBasic()
	//TODO: validate content & meta transaction data
	if err != nil {
		return nil, err
	}

	// k.ApplySendCrossMintTrusted(
	// 	ctx,
	// 	msg,
	// )
	//TODO: emit an event before return

	return &types.MsgSendCrossMintTrustedResponse{}, nil
}

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