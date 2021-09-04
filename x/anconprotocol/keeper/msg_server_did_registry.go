package keeper

import (
	"context"

	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/anconprotocol/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) ChangeOwner(goCtx context.Context, msg *types.MsgDidRegistry) (*types.MsgDidRegistryResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	// owners[identity] = newOwner;
  //   emit DIDOwnerChanged(identity, newOwner, changed[identity]);
  //   changed[identity] = block.number;
	// TODO: Handling the message
	_ = ctx

	return &types.MsgDidRegistryResponse{}, nil
}
