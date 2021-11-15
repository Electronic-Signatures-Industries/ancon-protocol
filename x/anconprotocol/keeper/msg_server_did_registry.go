package keeper

import (
	"context"
	"fmt"
	"net/url"
	"strings"

	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/anconprotocol/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/hyperledger/aries-framework-go/pkg/doc/did"
)

func (k msgServer) ChangeOwner(goCtx context.Context, msg *types.MsgChangeOwner) (*types.MsgChangeOwnerResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	k.ApplyOwner(ctx, msg)

	ctx.EventManager().EmitEvents(sdk.Events{
		sdk.NewEvent(
			types.ChangeOwnerEvent,
			sdk.NewAttribute("Identity", msg.Identity),
			sdk.NewAttribute("NewOwner", msg.NewOwner),
		),
	})

	_ = ctx

	return &types.MsgChangeOwnerResponse{
		Identity: msg.Identity,
		Owner:    msg.NewOwner,
	}, nil
}

func (k msgServer) GrantAttribute(goCtx context.Context, msg *types.MsgGrantAttribute) (*types.MsgGrantAttributeResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	k.ApplyAttribute(ctx, msg)

	until := msg.Validity + uint64(ctx.BlockTime().Unix())
	ctx.EventManager().EmitEvents(sdk.Events{
		sdk.NewEvent(
			types.SetAttributeEvent,
			sdk.NewAttribute("Identity", msg.Creator),
			sdk.NewAttribute("Name", string(msg.Name)),
			sdk.NewAttribute("Value", string(msg.Value)),
			sdk.NewAttribute("ValidTo", fmt.Sprint(until)),
			sdk.NewAttribute("Height", fmt.Sprint(ctx.BlockHeight())),
		),
	})

	_ = ctx

	return &types.MsgGrantAttributeResponse{
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
			sdk.NewAttribute("Identity", msg.Identity),
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
			sdk.NewAttribute("Identity", msg.Creator),
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

	// owners[identity] = newOwner;
	//   emit DIDOwnerChanged(identity, newOwner, changed[identity]);
	//   changed[identity] = block.number;
	// TODO: Handling the message
	_ = ctx

	//creator := msg.Creator
	addr, host, err := parseDIDWeb(didOwner.Owner, false)

	// Did := res.addDid

	return &types.MsgCreateDidResponse{
		Cid: didOwner.Cid,
		Did: didOwner.Identity,
		Url: string(append([]byte(host), addr...)),
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
			types.SetAttributeEvent,
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

const (
	defaultPath  = "/.well-known/did.json"
	documentPath = "/did.json"
)

func parseDIDWeb(id string, useHTTP bool) (string, string, error) {
	var address, host string

	parsedDID, err := did.Parse(id)
	if err != nil {
		return address, host, fmt.Errorf("invalid did, does not conform to generic did standard --> %w", err)
	}

	pathComponents := strings.Split(parsedDID.MethodSpecificID, ":")

	pathComponents[0], err = url.QueryUnescape(pathComponents[0])
	if err != nil {
		return address, host, fmt.Errorf("error parsing did:web did")
	}

	host = strings.Split(pathComponents[0], ":")[0]

	protocol := "https://"
	if useHTTP {
		protocol = "http://"
	}

	switch len(pathComponents) {
	case 1:
		address = protocol + pathComponents[0] + defaultPath
	default:
		address = protocol + strings.Join(pathComponents, "/") + documentPath
	}

	return address, host, nil
}
