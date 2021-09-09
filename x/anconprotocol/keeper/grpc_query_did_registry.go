package keeper

import (
	"context"

	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/anconprotocol/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) Nonce(goCtx context.Context, req *types.QueryNonceRequest) (*types.QueryNonceResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Process the query
	_ = ctx

	return &types.QueryNonceResponse{}, nil
}

func (k Keeper) GetAttributes(goCtx context.Context, req *types.QueryGetAttributesRequest) (*types.QueryGetAttributesResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Process the query
	_ = ctx

	return &types.QueryGetAttributesResponse{}, nil
}

func (k Keeper) IdentifyOwner(goCtx context.Context, req *types.QueryIdentifyOwnerRequest) (*types.QueryIdentifyOwnerResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Process the query
	_ = ctx

	return &types.QueryIdentifyOwnerResponse{}, nil
}

func (k Keeper) ReadDelegate(goCtx context.Context, req *types.QueryGetDelegateRequest) (*types.QueryGetDelegateResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Process the query
	_ = ctx

	return &types.QueryGetDelegateResponse{}, nil
}
