package keeper

import (
	"context"

	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/anconprotocol/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) Resource(goCtx context.Context, req *types.QueryResourceRequest) (*types.QueryResourceResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Process the query
	_ = ctx

	return &types.QueryResourceResponse{}, nil
}
