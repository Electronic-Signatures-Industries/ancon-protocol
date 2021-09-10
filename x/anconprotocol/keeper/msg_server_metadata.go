package keeper

import (
	"context"

	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/anconprotocol/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) Metadata(goCtx context.Context, msg *types.MsgMetadata) (*types.MsgMetadataResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	// TODO: Requries the
	// k.Has
	// msg.ValidateBasic
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
	// TODO: Requries the
	// k.Has
	// msg.ValidateBasic
	// lnk, _ := k.AddMetadata(
	// 	ctx,
	// 	msg,
	// )

	return &types.MsgRoyaltyInfoResponse{}, nil
}

// function royaltyInfo(
// 	uint256 _tokenId,
// 	uint256 _salePrice
// ) external view returns (
// 	address receiver,
// 	uint256 royaltyAmount
// );
