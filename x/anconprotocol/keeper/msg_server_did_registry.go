package keeper

import (
	"context"

	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/anconprotocol/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) ChangeOwner(goCtx context.Context, msg *types.MsgChangeOwner) (*types.MsgChangeOwnerResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	res, err := k.ApplyChangeOwner(ctx, msg)

	if err != nil {
		return nil, err
	}

	ctx.EventManager().EmitEvents(sdk.Events{
		sdk.NewEvent(
			types.ChangeOwnerEvent,
			sdk.NewAttribute("Identity", res.Identity),
			sdk.NewAttribute("Owner", res.Owner),
			sdk.NewAttribute("Height", string(res.PreviousChange)),
		),
	})

	_ = ctx

	return &types.MsgChangeOwnerResponse{
		Identity:       res.Identity,
		Owner:          res.Owner,
		PreviousChange: res.PreviousChange,
	}, nil
}

func (k msgServer) GrantAttribute(goCtx context.Context, msg *types.MsgGrantAttribute) (*types.MsgGrantAttributeResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	// owners[identity] = newOwner;
	//   emit DIDOwnerChanged(identity, newOwner, changed[identity]);
	//   changed[identity] = block.number;
	// TODO: Handling the message
	_ = ctx

	return &types.MsgGrantAttributeResponse{}, nil
}

func (k msgServer) GrantDelegate(goCtx context.Context, msg *types.MsgGrantDelegate) (*types.MsgGrantDelegateResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	// owners[identity] = newOwner;
	//   emit DIDOwnerChanged(identity, newOwner, changed[identity]);
	//   changed[identity] = block.number;
	// TODO: Handling the message
	_ = ctx

	return &types.MsgGrantDelegateResponse{}, nil
}
func (k msgServer) RevokeAttribute(goCtx context.Context, msg *types.MsgRevokeAttribute) (*types.MsgRevokeAttributeResponse, error) {

	return &types.MsgRevokeAttributeResponse{}, nil
}

func (k msgServer) RevokeDelegate(goCtx context.Context, msg *types.MsgRevokeDelegate) (*types.MsgRevokeDelegateResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	// owners[identity] = newOwner;
	//   emit DIDOwnerChanged(identity, newOwner, changed[identity]);
	//   changed[identity] = block.number;
	// TODO: Handling the message
	_ = ctx

	return &types.MsgRevokeDelegateResponse{}, nil
}
