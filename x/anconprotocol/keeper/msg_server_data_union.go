package keeper

import (
	"context"

	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/anconprotocol/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) AddDataSource(goCtx context.Context, msg *types.MsgAddDataSource) (*types.MsgAddDataSourceResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// owner, err :=
	// 	k.ApplyOwner(ctx, msg.Creator, msg.NewOwner)

	// if err != nil {
	// 	return nil, err
	// }

	ctx.EventManager().EmitEvents(sdk.Events{
		sdk.NewEvent(
			types.ChangeOwnerEvent,
			//sdk.NewAttribute("NewOwner", msg.NewOwner),
		),
	})

	return &types.MsgAddDataSourceResponse{}, nil
}
func (k msgServer) UpdateDataSource(goCtx context.Context, msg *types.MsgUpdateDataSource) (*types.MsgUpdateDataSourceResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// owner, err :=
	// 	k.ApplyOwner(ctx, msg.Creator, msg.NewOwner)

	// if err != nil {
	// 	return nil, err
	// }

	ctx.EventManager().EmitEvents(sdk.Events{
		sdk.NewEvent(
			types.ChangeOwnerEvent,
			//sdk.NewAttribute("NewOwner", msg.NewOwner),
		),
	})

	return &types.MsgUpdateDataSourceResponse{}, nil
}
func (k msgServer) RemoveDataSource(goCtx context.Context, msg *types.MsgRemoveDataSource) (*types.MsgRemoveDataSourceResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// owner, err :=
	// 	k.ApplyOwner(ctx, msg.Creator, msg.NewOwner)

	// if err != nil {
	// 	return nil, err
	// }

	ctx.EventManager().EmitEvents(sdk.Events{
		sdk.NewEvent(
			types.ChangeOwnerEvent,
			//sdk.NewAttribute("NewOwner", msg.NewOwner),
		),
	})

	return &types.MsgRemoveDataSourceResponse{}, nil
}
func (k msgServer) AddDataUnion(goCtx context.Context, msg *types.MsgAddDataUnion) (*types.MsgAddDataUnionResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	lnk, err :=
		k.ApplyDataUnion(ctx, msg)

	if err != nil {
		return nil, err
	}

	ctx.EventManager().EmitEvents(sdk.Events{
		sdk.NewEvent(
			"add_data_union",
			sdk.NewAttribute("link", lnk),
		),
	})

	return &types.MsgAddDataUnionResponse{}, nil
}
func (k msgServer) RemoveDataUnion(goCtx context.Context, msg *types.MsgRemoveDataUnion) (*types.MsgRemoveDataUnionResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// owner, err :=
	// 	k.ApplyOwner(ctx, msg.Creator, msg.NewOwner)

	// if err != nil {
	// 	return nil, err
	// }

	ctx.EventManager().EmitEvents(sdk.Events{
		sdk.NewEvent(
			types.ChangeOwnerEvent,
			//sdk.NewAttribute("NewOwner", msg.NewOwner),
		),
	})

	return &types.MsgRemoveDataUnionResponse{}, nil
}
func (k msgServer) UpdateDataUnion(goCtx context.Context, msg *types.MsgUpdateDataUnion) (*types.MsgUpdateDataUnionResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// owner, err :=
	// 	k.ApplyOwner(ctx, msg.Creator, msg.NewOwner)

	// if err != nil {
	// 	return nil, err
	// }

	ctx.EventManager().EmitEvents(sdk.Events{
		sdk.NewEvent(
			types.ChangeOwnerEvent,
			//sdk.NewAttribute("NewOwner", msg.NewOwner),
		),
	})

	return &types.MsgUpdateDataUnionResponse{}, nil
}
