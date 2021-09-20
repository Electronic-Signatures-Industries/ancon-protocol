package keeper

import (
	"context"

	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/mintswap/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/spf13/cast"
)

type msgServer struct {
	Keeper
}

// NewMsgServerImpl returns an implementation of the MsgServer interface
// for the provided Keeper.
func NewMsgServerImpl(keeper Keeper) types.MsgServer {
	return &msgServer{Keeper: keeper}
}

var _ types.MsgServer = msgServer{}

func (k msgServer) MintSwap(goCtx context.Context, msg *types.MsgMintSwap) (*types.MsgMintSwapResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	err := msg.ValidateBasic()
	if err != nil {
		return nil, err
	}

	_, found := k.anconKeeper.GetDenom(ctx, msg.TokenSymbol)

	if !found {
		return nil, sdkerrors.Wrapf(sdkerrors.ErrKeyNotFound, "Denom not found or invalid ")
	}

	owner := k.anconKeeper.GetOwner(ctx, sdk.AccAddress(msg.Sender), msg.TokenSymbol)

	if owner.Address != msg.Sender {
		return nil, sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "Invalid sender address: %s", owner.Address)
	}

	//TODO: if token cloning or swap (if swap it must be burned)
	//TODO: validate if metadata ref is the same as the token metadata ref (optional)

	if err := k.SendMintSwap(
		ctx, msg.SourcePort, msg.SourceChannel, msg.MetadataRef, msg.TokenName, msg.TokenSymbol,
		msg.DidOwner, cast.ToString(msg.Price), sdk.AccAddress(msg.Sender), msg.Receiver,
		msg.TimeoutHeight, msg.TimeoutTimestamp,
	); err != nil {
		return nil, err
	}

	// k.Logger(ctx).Info("IBC NFT", "token", msg.Token.Denom, "amount", msg.Token.Amount.String(), "sender", msg.Sender, "receiver", msg.Receiver)

	// ctx.EventManager().EmitEvents(sdk.Events{
	// 	sdk.NewEvent(
	// 		types.EventTypeTransfer,
	// 		sdk.NewAttribute(sdk.AttributeKeySender, msg.Sender),
	// 		sdk.NewAttribute(types.AttributeKeyReceiver, msg.Receiver),
	// 	),
	// 	sdk.NewEvent(
	// 		sdk.EventTypeMessage,
	// 		sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
	// 	),
	// })

	return &types.MsgMintSwapResponse{}, nil

}
