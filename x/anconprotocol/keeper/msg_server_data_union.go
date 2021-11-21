package keeper

import (
	"context"

	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/anconprotocol/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) AddDataSource(goCtx context.Context, msg *types.MsgAddDataSource) (*types.MsgAddDataSourceResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	lnk, err :=
		k.ApplyDataSource(ctx, msg)

	if err != nil {
		return nil, err
	}

	ctx.EventManager().EmitEvents(sdk.Events{
		sdk.NewEvent(
			"DataSourceAdded",
			sdk.NewAttribute("link", lnk),
		),
	})
	return &types.MsgAddDataSourceResponse{}, nil
}
func (k msgServer) UpdateDataSource(goCtx context.Context, msg *types.MsgUpdateDataSource) (*types.MsgUpdateDataSourceResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	lnk, err := k.ModifyDataSource(ctx, msg)
	if err != nil {
		return nil, err
	}

	ctx.EventManager().EmitEvents(sdk.Events{
		sdk.NewEvent(
			"DataSourceUpdated",
			sdk.NewAttribute("Cid", lnk),
		),
	})

	return &types.MsgUpdateDataSourceResponse{Cid: lnk}, nil
}
func (k msgServer) RemoveDataSource(goCtx context.Context, msg *types.MsgRemoveDataSource) (*types.MsgRemoveDataSourceResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	k.DeleteDataSource(ctx, msg)
	ctx.EventManager().EmitEvents(sdk.Events{
		sdk.NewEvent(
			"DataSourceRemoved",
			sdk.NewAttribute("Cid", msg.Cid),
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
			"DataUnionAdded",
			sdk.NewAttribute("link", lnk),
		),
	})

	return &types.MsgAddDataUnionResponse{}, nil
}
func (k msgServer) RemoveDataUnion(goCtx context.Context, msg *types.MsgRemoveDataUnion) (*types.MsgRemoveDataUnionResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	k.DeleteDataUnion(ctx, msg)
	ctx.EventManager().EmitEvents(sdk.Events{
		sdk.NewEvent(
			"DataUnionRemoved",
			sdk.NewAttribute("Cid", msg.Cid),
		),
	})

	return &types.MsgRemoveDataUnionResponse{}, nil
}
func (k msgServer) UpdateDataUnion(goCtx context.Context, msg *types.MsgUpdateDataUnion) (*types.MsgUpdateDataUnionResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	lnk, err := k.ModifyDataUnion(ctx, msg)
	if err != nil {
		return nil, err
	}

	ctx.EventManager().EmitEvents(sdk.Events{
		sdk.NewEvent(
			"DataUnionUpdated",
			sdk.NewAttribute("Cid", lnk),
		),
	})

	return &types.MsgUpdateDataUnionResponse{Cid: lnk}, nil
}
