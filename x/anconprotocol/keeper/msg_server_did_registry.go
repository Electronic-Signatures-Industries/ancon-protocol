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

	res, err := k.ApplyChangeOwner(ctx, msg)

	if err != nil {
		return nil, err
	}

	ctx.EventManager().EmitEvents(sdk.Events{
		sdk.NewEvent(
			types.ChangeOwnerEvent,
			sdk.NewAttribute("Identity", res.Identity),
			sdk.NewAttribute("Owner", res.Owner),
			sdk.NewAttribute("Height", fmt.Sprint(res.PreviousChange)),
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

	_, err := k.ApplyAttribute(ctx, msg)

	if err != nil {
		return nil, err
	}

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

func (k msgServer) CreateDid(goCtx context.Context, msg *types.MsgCreateDid) (*types.MsgCreateDidResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	err := msg.ValidateBasic()
	if err != nil {
		return nil, err
	}

	did, err := k.AddDid(ctx, msg)
	//Revoke DID relationship / acces

	// owners[identity] = newOwner;
	//   emit DIDOwnerChanged(identity, newOwner, changed[identity]);
	//   changed[identity] = block.number;
	// TODO: Handling the message
	_ = ctx

	creator := msg.Creator
	addr, did, err := parseDIDWeb(creator, false)

	// Did := res.did

	return &types.MsgCreateDidResponse{
		Cid: addr,
		Did: did,
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

	//Revoke DID relationship / acces

	// owners[identity] = newOwner;
	//   emit DIDOwnerChanged(identity, newOwner, changed[identity]);
	//   changed[identity] = block.number;
	// TODO: Handling the message
	_ = ctx

	// Did := res.did

	return &types.MsgRevokeDidResponse{}, nil
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
