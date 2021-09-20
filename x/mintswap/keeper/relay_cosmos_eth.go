package keeper

import (
	anconTypes "github.com/Electronic-Signatures-Industries/ancon-protocol/x/anconprotocol/types"
	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/mintswap/types"
	"github.com/armon/go-metrics"
	"github.com/cosmos/cosmos-sdk/telemetry"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	clienttypes "github.com/cosmos/cosmos-sdk/x/ibc/core/02-client/types"
	channeltypes "github.com/cosmos/cosmos-sdk/x/ibc/core/04-channel/types"
	host "github.com/cosmos/cosmos-sdk/x/ibc/core/24-host"
	coretypes "github.com/cosmos/cosmos-sdk/x/ibc/core/types"
	"github.com/spf13/cast"
)

func (k Keeper) SendMintSwap(
	ctx sdk.Context,
	sourcePort,
	sourceChannel string,
	metadataRef string,
	tokeName string,
	tokenSymbol string,
	didOwner string,
	price string, // TODO: NFT props
	sender sdk.AccAddress,
	receiver string,
	timeoutHeight clienttypes.Height,
	timeoutTimestamp uint64,
) error {

	// TODO:Use msg.ValidateBasic
	// if !k.GetSendEnabled(ctx) {
	// 	return types.ErrSendDisabled
	// }

	sourceChannelEnd, found := k.channelKeeper.GetChannel(ctx, sourcePort, sourceChannel)
	if !found {
		return sdkerrors.Wrapf(channeltypes.ErrChannelNotFound, "port ID (%s) channel ID (%s)", sourcePort, sourceChannel)
	}

	destinationPort := sourceChannelEnd.GetCounterparty().GetPortID()
	destinationChannel := sourceChannelEnd.GetCounterparty().GetChannelID()

	// get the next sequence
	sequence, found := k.channelKeeper.GetNextSequenceSend(ctx, sourcePort, sourceChannel)
	if !found {
		return sdkerrors.Wrapf(
			channeltypes.ErrSequenceSendNotFound,
			"source port: %s, source channel: %s", sourcePort, sourceChannel,
		)
	}

	// begin createOutgoingPacket logic
	// See spec for this logic: https://github.com/cosmos/ibc/tree/master/spec/app/ics-020-fungible-token-transfer#packet-relay
	channelCap, ok := k.scopedKeeper.GetCapability(ctx, host.ChannelCapabilityPath(sourcePort, sourceChannel))
	if !ok {
		return sdkerrors.Wrap(channeltypes.ErrChannelCapabilityNotFound, "module does not own channel capability")
	}

	// NOTE: denomination and hex hash correctness checked during msg.ValidateBasic

	labels := []metrics.Label{
		telemetry.NewLabel(coretypes.LabelDestinationPort, destinationPort),
		telemetry.NewLabel(coretypes.LabelDestinationChannel, destinationChannel),
	}

	// NOTE: SendTransfer simply sends the denomination as it exists on its own
	// chain inside the packet data. The receiving chain will perform denom
	// prefixing as necessary.

	// Verifies token symbol / denom id is from source chain
	// XDVNFT = ETH = true
	// XDVNFT = Cosmos = false
	// types.SenderChainIsSource(sourcePort, sourceChannel, fullDenomPath)
	if types.SenderChainIsSource(sourcePort, sourceChannel, tokenSymbol) {
		_, err := k.anconKeeper.GetObject(ctx, &anconTypes.QueryResourceRequest{Cid: metadataRef})
		// if MetadataUri Ancon
		// MintTrustedContent / Metadata
		// cid
		if err != nil {
			return sdkerrors.Wrap(anconTypes.ErrInvalidTokenURI, "Metadata must be stored in ancon protocol")
		} else {

		}
	} else {
		// Burn NFTs
		// labels = append(labels, telemetry.NewLabel(coretypes.LabelSource, "false"))

		// // transfer the coins to the module account and burn them
	}

	packetData := types.MintSwapData{
		Sender:      string(sender),
		MetadataRef: metadataRef,
		TokenName:   tokeName,
		TokenSymbol: tokenSymbol,
		Recipient:   receiver,
		DidOwner:    didOwner,
		Price:       cast.ToUint64(price),
	}

	packet := channeltypes.NewPacket(
		packetData.GetBytes(),
		sequence,
		sourcePort,
		sourceChannel,
		destinationPort,
		destinationChannel,
		timeoutHeight,
		timeoutTimestamp,
	)

	if err := k.channelKeeper.SendPacket(ctx, channelCap, packet); err != nil {
		return err
	}

	defer func() {
		telemetry.IncrCounterWithLabels(
			[]string{"ibc", types.ModuleName, "send"},
			1,
			labels,
		)
	}()

	return nil
}

// OnRecvPacket
func (k Keeper) OnRecvPacket(ctx sdk.Context, packet channeltypes.Packet, data types.MintswapPacketData) error {
	// validate packet data upon receiving
	// if err := data.ValidateBasic(); err != nil {
	// 	return err
	// }
	// if !k.GetReceiveEnabled(ctx) {
	// 	return types.ErrReceiveDisabled
	// }

	// decode the receiver address
	res := data.GetData()
	_, err := sdk.AccAddressFromBech32(res.Recipient)
	if err != nil {
		return err
	}

	labels := []metrics.Label{
		telemetry.NewLabel(coretypes.LabelSourcePort, packet.GetSourcePort()),
		telemetry.NewLabel(coretypes.LabelSourceChannel, packet.GetSourceChannel()),
	}

	// This is the prefix that would have been prefixed to the denomination
	// on sender chain IF and only if the token originally came from the
	// receiving chain.
	//
	// NOTE: We use SourcePort and SourceChannel here, because the counterparty
	// chain would have prefixed with DestPort and DestChannel when originally
	// receiving this coin as seen in the "sender chain is the source" condition.

	// Implement ReceiverChainIsSource
	if types.ReceiverChainIsSource(packet.SourcePort, packet.SourceChannel, res.TokenSymbol) {
		// sender chain is not the source, unescrow tokens
		defer func() {
			telemetry.IncrCounterWithLabels(
				[]string{"ibc", types.ModuleName, "receive"},
				1,
				append(
					labels, telemetry.NewLabel(coretypes.LabelSource, "true"),
				),
			)
		}()

		return nil
	}

	// sender chain is the source, mint vouchers/nfts
	k.anconKeeper.MintNFT(ctx, res.TokenSymbol, "1", "", res.MetadataRef, "", sdk.AccAddress(res.Recipient))
	// ctx.EventManager().EmitEvent(
	// 	sdk.NewEvent(
	// 		types.EventTypeDenomTrace,
	// 		sdk.NewAttribute(types.AttributeKeyTraceHash, traceHash.String()),
	// 		sdk.NewAttribute(types.AttributeKeyDenom, voucherDenom),
	// 	),
	// )

	//after emiting the event, transfer the recipient
	return nil
}

// OnAcknowledgementPacket responds to the the success or failure of a packet
// acknowledgement written on the receiving chain. If the acknowledgement
// was a success then nothing occurs. If the acknowledgement failed, then
// the sender is refunded their tokens using the refundPacketToken function.
func (k Keeper) OnAcknowledgementPacket(ctx sdk.Context, packet channeltypes.Packet, data types.MintSwapData, ack channeltypes.Acknowledgement) error {
	switch ack.Response.(type) {
	// case *channeltypes.Acknowledgement_Error:
	// 	return k.refundPacketToken(ctx, packet, data)
	default:
		// the acknowledgement succeeded on the receiving chain so nothing
		// needs to be executed and no error needs to be returned
		return nil
	}
}

// OnTimeoutPacket refunds the sender since the original packet sent was
// never received and has been timed out.
func (k Keeper) OnTimeoutPacket(ctx sdk.Context, packet channeltypes.Packet, data types.MintSwapData) error {
	return nil
}
