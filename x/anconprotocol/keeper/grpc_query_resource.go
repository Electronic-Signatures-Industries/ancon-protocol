package keeper

import (
	"bytes"
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

	// TODO: validate cid
	// if !k.HasMultihash(ctx, req.Cid) {
	// 	return nil, sdkerrors.ErrKeyNotFound
	// }

	// TODO: get ipld object (path traversal later)
	// n, err := k.GetObject(ctx, parsecid)

	var buf bytes.Buffer
	// if parsecid.Prefix().Codec == 0x71 {
	// dag-cbor
	// dagcbor.Encode(n, &buf)
	// file.Data = buf.Bytes()
	// }

	return &types.QueryResourceResponse{File: &file}, nil
}
