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

func (k msgServer) SetAttribute(goCtx context.Context, msg *types.MsgSetAttribute) (*types.MsgSetAttributeResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	// owners[identity] = newOwner;
	//   emit DIDOwnerChanged(identity, newOwner, changed[identity]);
	//   changed[identity] = block.number;
	// TODO: Handling the message
	_ = ctx

	return &types.MsgSetAttributeResponse{}, nil
}

func (k msgServer) AddDelegate(goCtx context.Context, msg *types.MsgAddDelegate) (*types.MsgAddDelegateResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	// owners[identity] = newOwner;
	//   emit DIDOwnerChanged(identity, newOwner, changed[identity]);
	//   changed[identity] = block.number;
	// TODO: Handling the message
	_ = ctx

	return &types.MsgAddDelegateResponse{}, nil
}

// event DIDDelegateChanged(
// 	address indexed identity,
// 	bytes32 delegateType,
// 	address delegate,
// 	uint validTo,
// 	uint previousChange
// );

// function validDelegate(address identity, bytes32 delegateType, address delegate) public view returns(bool) {
// 	uint validity = delegates[identity][keccak256(delegateType)][delegate];
// 	return (validity > now);
// }

// function addDelegate(address identity, address actor, bytes32 delegateType, address delegate, uint validity) internal onlyOwner(identity, actor) {
// 	delegates[identity][keccak256(delegateType)][delegate] = now + validity;
// 	emit DIDDelegateChanged(identity, delegateType, delegate, now + validity, changed[identity]);
// 	changed[identity] = block.number;
// }

// function addDelegate(address identity, bytes32 delegateType, address delegate, uint validity) public {
// 	addDelegate(identity, msg.sender, delegateType, delegate, validity);
// }

func (k msgServer) RevokeDelegate(goCtx context.Context, msg *types.MsgRevokeDelegate) (*types.MsgRevokeDelegateResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	// owners[identity] = newOwner;
	//   emit DIDOwnerChanged(identity, newOwner, changed[identity]);
	//   changed[identity] = block.number;
	// TODO: Handling the message
	_ = ctx

	return &types.MsgRevokeDelegateResponse{}, nil
}

func (k msgServer) Nonce(goCtx context.Context, msg *types.MsgNonce) (*types.MsgNonceResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	_ = ctx

	return &types.MsgNonceResponse{}, nil
}
