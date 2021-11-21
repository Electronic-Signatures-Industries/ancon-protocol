package keeper

import (
	"context"

	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/anconprotocol/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/spf13/cast"
	// "github.com/hyperledger/aries-framework-go/pkg/vdr"
	// "github.com/hyperledger/aries-framework-go/pkg/vdr/httpbinding"
)

func (k msgServer) AnchorCidWithProof(goCtx context.Context, msg *types.MsgAnchorCidWithProof) (*types.MsgAnchorCidWithProofResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	var err error

	err = msg.ValidateBasic()
	if err != nil {
		return nil, err
	}

	err = k.ApplyAnchorCidWithProof(ctx, msg)
	if err != nil {
		return nil, err
	}
	ctx.EventManager().EmitEvents(sdk.Events{
		sdk.NewEvent(
			"AnchorCidWithProofCompleted",
			sdk.NewAttribute("Done", "true"),
		),
	})
	return &types.MsgAnchorCidWithProofResponse{
		Ok: true,
	}, nil

}

func (k msgServer) AnchorCid(goCtx context.Context, msg *types.MsgAnchorCid) (*types.MsgAnchorCidResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	var err error

	err = msg.ValidateBasic()
	if err != nil {
		return nil, err
	}

	// TODO needs to be replaced with more robust proofs
	challenge := k.CalculateAnchorChallenge(ctx, msg.Creator, msg.Cid, msg.Key)

	ctx.EventManager().EmitEvents(sdk.Events{
		sdk.NewEvent(
			"AnchorCidRequested",
			sdk.NewAttribute("Challenge", string(challenge)),
		),
	})

	return &types.MsgAnchorCidResponse{
		Challenge: cast.ToString(challenge),
		Reason:    "Invalid call, request a proof and then call AnchorCidWithProof",
	}, nil
}

// SendMetadataOwnership
//TODO: emit event
func (k msgServer) SendMetadataOwnership(goCtx context.Context, msg *types.MsgSendMetadataOwnership) (*types.MsgSendMetadataOwnershipResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	err := msg.ValidateBasic()
	if err != nil {
		return nil, err
	}

	lnk, _ := k.CreateSendMetadataPacket(
		ctx, sdk.AccAddress(msg.Creator), msg.Data,
	)
	ctx.EventManager().EmitEvents(sdk.Events{
		sdk.NewEvent(
			"MetadataOwnershipSent",
			sdk.NewAttribute("PacketToBeSent", lnk),
		),
	})

	return &types.MsgSendMetadataOwnershipResponse{
		Cid: lnk,
	}, nil
}

// UpdateMetadataOwnership
func (k msgServer) UpdateMetadataOwnership(goCtx context.Context, msg *types.MsgUpdateMetadataOwnership) (*types.MsgUpdateMetadataOwnershipResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	err := msg.ValidateBasic()
	if err != nil {
		return nil, err
	}

	lnk, _ := k.ChangeOwnerMetadata(
		ctx, msg.Hash, msg.PreviousOwner, msg.NewOwner, msg.CurrentChainId, msg.RecipientChainId,
	)
	// httpbinding.New()
	lnkPacket, err := k.CreateSendMetadataPacket(ctx,
		sdk.AccAddress(msg.Sender), &types.AguaclaraPacketData{
			Creator:          msg.PreviousOwner,
			TokenAddress:     msg.TokenAddress,
			TokenId:          msg.TokenId,
			DidRecipient:     msg.NewOwner,
			ToMetadata:       lnk,
			Hash:             msg.Hash,
			CurrentChainId:   msg.CurrentChainId,
			RecipientChainId: msg.CurrentChainId,
		})
	if err != nil {
		return nil, err
	}
	ctx.EventManager().EmitEvents(sdk.Events{
		sdk.NewEvent(
			"MetadataOwnershipUpdated",
			sdk.NewAttribute("MetadataRef", lnk),
			sdk.NewAttribute("PacketRef", lnkPacket),
		),
	})
	return &types.MsgUpdateMetadataOwnershipResponse{
		MetadataRef: lnk,
		PacketRef:   lnkPacket,
	}, nil
}

// Metadata
//TODO: emit event
func (k msgServer) Metadata(goCtx context.Context, msg *types.MsgMetadata) (*types.MsgMetadataResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	err := msg.ValidateBasic()
	if err != nil {
		return nil, err
	}

	lnk, _ := k.AddMetadata(
		ctx,
		msg,
	)
	ctx.EventManager().EmitEvents(sdk.Events{
		sdk.NewEvent(
			"MetadataCreated",
			sdk.NewAttribute("Cid", lnk),
		),
	})

	return &types.MsgMetadataResponse{
		Cid: lnk,
	}, nil
}

func (k msgServer) RoyaltyInfo(goCtx context.Context, msg *types.MsgRoyaltyInfo) (*types.MsgRoyaltyInfoResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	err := msg.ValidateBasic()
	if err != nil {
		return nil, err
	}

	cid, err := k.AddRoyaltyInfo(
		ctx,
		msg,
	)

	ctx.EventManager().EmitEvents(sdk.Events{
		sdk.NewEvent(
			"RoyaltyInfoAdded",
			sdk.NewAttribute("Cid", cid),
		),
	})
	return &types.MsgRoyaltyInfoResponse{}, nil
}

//TODO: emit event
func (k msgServer) MintTrustedContent(goCtx context.Context, msg *types.MsgMintTrustedContent) (*types.MsgMintTrustedContentResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	err := msg.ValidateBasic()
	if err != nil {
		return nil, err
	}

	cid, err := k.AddTrustedContent(
		ctx,
		msg,
	)
	ctx.EventManager().EmitEvents(sdk.Events{
		sdk.NewEvent(
			"MintTrustedContent",
			sdk.NewAttribute("Cid", cid),
		),
	})
	return &types.MsgMintTrustedContentResponse{}, nil
}

//TODO: emit event
func (k msgServer) MintTrustedResource(goCtx context.Context, msg *types.MsgMintTrustedResource) (*types.MsgMintTrustedResourceResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	err := msg.ValidateBasic()
	if err != nil {
		return nil, err
	}

	cid, err := k.AddTrustedResource(
		ctx,
		msg,
	)
	ctx.EventManager().EmitEvents(sdk.Events{
		sdk.NewEvent(
			"MintTrustedResource",
			sdk.NewAttribute("Cid", cid),
		),
	})
	return &types.MsgMintTrustedResourceResponse{}, nil
}

//TODO: emit event
func (k msgServer) File(goCtx context.Context, msg *types.MsgFile) (*types.MsgFileResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	err := msg.ValidateBasic()
	if err != nil {
		return nil, err
	}
	lnk, _ := k.AddFile(
		ctx,
		msg,
	)

	return &types.MsgFileResponse{
		Hash: lnk,
	}, nil
}
