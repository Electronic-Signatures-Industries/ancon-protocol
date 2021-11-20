package keeper

import (
	"context"
	"fmt"
	"strings"

	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/anconprotocol/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) ChangeOwner(goCtx context.Context, msg *types.MsgChangeOwner) (*types.MsgChangeOwnerResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	owner, err :=
		k.ApplyOwner(ctx, msg.Creator, msg.NewOwner)

	if err != nil {
		return nil, err
	}

	ctx.EventManager().EmitEvents(sdk.Events{
		sdk.NewEvent(
			types.ChangeOwnerEvent,
			sdk.NewAttribute("NewOwner", msg.NewOwner),
		),
	})

	return &types.MsgChangeOwnerResponse{
		Did:   owner.Did,
		Owner: msg.NewOwner,
	}, nil
}

func (k msgServer) GrantAttribute(goCtx context.Context, msg *types.MsgSetAttribute) (*types.MsgSetAttributeResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	k.ApplyAttribute(ctx, msg)

	until := msg.Validity + uint64(ctx.BlockTime().Unix())
	ctx.EventManager().EmitEvents(sdk.Events{
		sdk.NewEvent(
			types.SetAttributeEvent,
			sdk.NewAttribute("Identity", msg.Creator),
			sdk.NewAttribute("Name", strings.Join(msg.Name, ",")),
			sdk.NewAttribute("Value", strings.Join(msg.Value, ",")),
			sdk.NewAttribute("ValidTo", fmt.Sprint(until)),
			sdk.NewAttribute("Height", fmt.Sprint(ctx.BlockHeight())),
		),
	})

	return &types.MsgSetAttributeResponse{
		Ok: true,
	}, nil
}

func (k msgServer) GrantDelegate(goCtx context.Context, msg *types.MsgGrantDelegate) (*types.MsgGrantDelegateResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	k.ApplyDelegate(ctx, msg)

	until := msg.Validity + uint64(ctx.BlockTime().Unix())
	ctx.EventManager().EmitEvents(sdk.Events{
		sdk.NewEvent(
			types.SetAttributeEvent,
			sdk.NewAttribute("Creator", msg.Creator),
			sdk.NewAttribute("Did", msg.Did),
			sdk.NewAttribute("Delegate", string(msg.Delegate)),
			sdk.NewAttribute("DelegateType", string(msg.DelegateType)),
			sdk.NewAttribute("ValidTo", fmt.Sprint(until)),
			sdk.NewAttribute("Height", fmt.Sprint(ctx.BlockHeight())),
		),
	})

	_ = ctx

	return &types.MsgGrantDelegateResponse{
		Ok: true,
	}, nil
}
func (k msgServer) RevokeAttribute(goCtx context.Context, msg *types.MsgRevokeAttribute) (*types.MsgRevokeAttributeResponse, error) {

	ctx := sdk.UnwrapSDKContext(goCtx)

	k.RemoveAttribute(ctx, msg)

	ctx.EventManager().EmitEvents(sdk.Events{
		sdk.NewEvent(
			types.SetAttributeEvent,
			sdk.NewAttribute("Creator", msg.Creator),
			sdk.NewAttribute("Name", string(msg.Name)),
			sdk.NewAttribute("Value", string(msg.Value)),
			//			sdk.NewAttribute("ValidTo", fmt.Sprint(until)),
			sdk.NewAttribute("Height", fmt.Sprint(ctx.BlockHeight())),
		),
	})

	_ = ctx

	return &types.MsgRevokeAttributeResponse{
		Ok: true,
	}, nil
}

func (k msgServer) RevokeDelegate(goCtx context.Context, msg *types.MsgRevokeDelegate) (*types.MsgRevokeDelegateResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	k.RemoveDelegate(ctx, msg)

	until := msg.Validity + uint64(ctx.BlockTime().Unix())
	ctx.EventManager().EmitEvents(sdk.Events{
		sdk.NewEvent(
			types.SetAttributeEvent,
			sdk.NewAttribute("Identity", msg.Creator),
			sdk.NewAttribute("Name", string(msg.Delegate)),
			sdk.NewAttribute("Value", string(msg.DelegateType)),
			sdk.NewAttribute("ValidTo", fmt.Sprint(until)),
			sdk.NewAttribute("Height", fmt.Sprint(ctx.BlockHeight())),
		),
	})

	_ = ctx

	return &types.MsgRevokeDelegateResponse{
		Ok: true,
	}, nil
}

func (k msgServer) CreateDid(goCtx context.Context, msg *types.MsgCreateDid) (*types.MsgCreateDidResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	err := msg.ValidateBasic()
	if err != nil {
		return nil, err
	}

	didOwner, err := k.AddDid(ctx, msg)
	if err != nil {
		return nil, err
	}

	var addr string
	if msg.DidType == "web" {
		addr, _, err =
			k.ParseDIDWeb(didOwner.Did, false)
		if err != nil {
			return nil, err
		}
	}
	ctx.EventManager().EmitEvents(sdk.Events{
		sdk.NewEvent(
			types.SetAttributeEvent,
			sdk.NewAttribute("Identity", msg.Creator),
			sdk.NewAttribute("Did", string(didOwner.Did)),
			sdk.NewAttribute("Height", fmt.Sprint(ctx.BlockHeight())),
		),
	})
	return &types.MsgCreateDidResponse{
		Cid: didOwner.Cid,
		Did: didOwner.Did,
		Url: addr,
	}, err
}

func (k msgServer) UpdateDid(goCtx context.Context, msg *types.MsgUpdateDid) (*types.MsgUpdateDidResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	//Revoke DID relationship / acces

	// owners[identity] = newOwner;
	//   emit DIDOwnerChanged(identity, newOwner, changed[identity]);
	//   changed[identity] = block.number;
	// TODO: Handling the message
	_ = ctx

	// Did := res.did

	return &types.MsgUpdateDidResponse{}, nil
}

func (k msgServer) RevokeDid(goCtx context.Context, msg *types.MsgRevokeDid) (*types.MsgRevokeDidResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	k.RemoveDid(ctx, msg.Did)

	ctx.EventManager().EmitEvents(sdk.Events{
		sdk.NewEvent(
			"revoke_did",
			sdk.NewAttribute("Identity", msg.Creator),
			sdk.NewAttribute("Did", string(msg.Did)),
			sdk.NewAttribute("Height", fmt.Sprint(ctx.BlockHeight())),
		),
	})

	_ = ctx

	return &types.MsgRevokeDidResponse{
		Ok: true,
	}, nil
}

// Example 1: Example did:web DID document

// {
//   "@context": "https://www.w3.org/ns/did/v1",
//   "id": "did:web:example.com",
//   "verificationMethod": [{
//      "id": "did:web:example.com#owner",
//      "type": "Secp256k1VerificationKey2018",
//      "owner": "did:web:example.com",
//      "ethereumAddress": "0xb9c5714089478a327f09197987f16f9e5d936e8a"
//   }],
//   "authentication": [
//      "did:web:example.com#owner"
//   ]
// }
