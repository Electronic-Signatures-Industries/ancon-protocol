package keeper

import (
	"context"

	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/aguaclara/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	clienttypes "github.com/cosmos/ibc-go/v2/modules/core/02-client/types"
	channeltypes "github.com/cosmos/ibc-go/v2/modules/core/04-channel/types"
	host "github.com/cosmos/ibc-go/v2/modules/core/24-host"
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

// SendMetadataOwnership
//TODO: emit event
func (k msgServer) SendMetadataOwnership(goCtx context.Context, msg *types.MsgSendMetadataOwnership) (*types.MsgSendMetadataOwnershipResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	err := msg.ValidateBasic()
	if err != nil {
		return nil, err
	}

	sourceChannelEnd, found := k.channelKeeper.GetChannel(ctx, msg.PortId, msg.ChannelId)
	if !found {
		return nil, sdkerrors.Wrapf(channeltypes.ErrChannelNotFound, "port ID (%s) channel ID (%s)", msg.PortId, msg.ChannelId)
	}

	destinationPort := sourceChannelEnd.GetCounterparty().GetPortID()
	destinationChannel := sourceChannelEnd.GetCounterparty().GetChannelID()

	// get the next sequence
	sequence, found := k.channelKeeper.GetNextSequenceSend(ctx, msg.PortId, msg.ChannelId)
	if !found {
		return nil, sdkerrors.Wrapf(
			channeltypes.ErrSequenceSendNotFound,
			"source port: %s, source channel: %s", msg.PortId, msg.ChannelId,
		)
	}

	// begin createOutgoingPacket logic
	// See spec for this logic: https://github.com/cosmos/ibc/tree/master/spec/app/ics-020-fungible-token-transfer#packet-relay
	channelCap, ok := k.scopedKeeper.GetCapability(ctx, host.ChannelCapabilityPath(msg.PortId, msg.ChannelId))
	if !ok {
		return nil, sdkerrors.Wrap(channeltypes.ErrChannelCapabilityNotFound, "module does not own channel capability")
	}

	err = k.TrasmitIbcPacket(ctx,
		msg.PortId, msg.ChannelId,
		destinationPort, destinationChannel,
		clienttypes.ZeroHeight(),
		5000, sequence,
		msg.Data, channelCap)
	if err != nil {
		return nil, err
	}

	return &types.MsgSendMetadataOwnershipResponse{}, nil
}
