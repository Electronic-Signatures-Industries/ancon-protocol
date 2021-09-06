package keeper

import (
	"context"

    "github.com/Electronic-Signatures-Industries/ancon-protocol/x/anconprotocol/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)


func (k msgServer) Nonce(goCtx context.Context,  msg *types.MsgNonce) (*types.MsgNonceResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

    // TODO: Handling the message
    _ = ctx

	return &types.MsgNonceResponse{}, nil
}
