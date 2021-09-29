package keeper

import (
	"math/big"

	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/anconprotocol/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/common"
	ethtypes "github.com/ethereum/go-ethereum/core/types"
)

var (
	// MintTrustedContentEvent represent the signature of
	// `event _anconMintTrustedContest(address recipient, uint256 amount, string denom)`
	MintTrustedContentEvent abi.Event
)

func init() {
	addressType, _ := abi.NewType("address", "", nil)
	uint256Type, _ := abi.NewType("uint256", "", nil)
	stringType, _ := abi.NewType("string", "", nil)
	MintTrustedContentEvent = abi.NewEvent(
		"_anconMintTrustedContest",
		"_anconMintTrustedContest",
		false,
		abi.Arguments{abi.Argument{
			Name:    "recipient",
			Type:    addressType,
			Indexed: false,
		}, abi.Argument{
			Name:    "amount",
			Type:    uint256Type,
			Indexed: false,
		}, abi.Argument{
			Name:    "denom",
			Type:    stringType,
			Indexed: false,
		}},
	)
}

// Event Hooks
// These can be utilized to customize evm transaction processing.

// EvmHooks event hooks for evm tx processing
type EvmHooks interface {
	// Must be called after tx is processed successfully, if return an error, the whole transaction is reverted.
	PostTxProcessing(ctx sdk.Context, txHash common.Hash, logs []*ethtypes.Log) error
}

type MintTrustedContentHook struct {
	anconprotocolKeeper Keeper
	metadata_ref        string
	token_id            uint64
	token_symbol        string
	recipient           sdk.AccAddress // from (msg.sender)
}

type BurnTrustedContentHook struct {
	anconprotocolKeeper Keeper
}

type EscrowTrustedContentHook struct {
	anconprotocolKeeper Keeper
}

type ClaimTrustedContentHook struct {
	anconprotocolKeeper Keeper
}

func NewMintTrustedContentHook(anconprotocolKeeper Keeper) *MintTrustedContentHook {
	return &MintTrustedContentHook{
		anconprotocolKeeper: anconprotocolKeeper,
	}
}

// func (h MintTrustedContentHook) PostTxProcessing(ctx sdk.Context, txHash common.Hash, logs []*ethtypes.Log) error {
// 	for _, log := range logs {
// 		if len(log.Topics) == 0 || log.Topics[0] != MintTrustedContentEvent.ID {
// 			continue
// 		}
// 		if !ContractAllowed(log.Address) {
// 			// Check the contract whitelist to prevent accidental native call.
// 			continue
// 		}
// //whitelist all data
// 		unpacked, err := MintTrustedContentEvent.Inputs.Unpack(log.Data)
// 		if err != nil {
// 			log.Warn("log signature matches but failed to decode")
// 			continue
// 		}
// 		contract := sdk.AccAddress(log.Address.Bytes())
// 		recipient := sdk.AccAddress(unpacked[0].(common.Address).Bytes())
// 		coins := sdk.NewCoins(sdk.NewCoin(unpacked[2].(string), sdk.NewIntFromBigInt(unpacked[1].(*big.Int))))
// 		err = h.anconprotocolKeeper.SendCoins(ctx, contract, recipient, coins)
// 		if err != nil {
// 			return err
// 		}
// 	}
// 	return nil
// }

func (h MintTrustedContentHook) MintTrustedContent(ctx sdk.Context, msg *types.MsgMintTrustedContent, logs []*ethtypes.Log) error {
	for _, log := range logs {
		if len(log.Topics) == 0 || log.Topics[0] != MintTrustedContentEvent.ID {
			continue
		}
		if !ContractAllowed(log.Address) {
			// Check the contract whitelist to prevent accidental native call.
			continue
		}
		//whitelist all data
		unpacked, err := MintTrustedContentEvent.Inputs.Unpack(log.Data)
		if err != nil {
			log.Warn("log signature matches but failed to decode")
			continue
		}
		contract := sdk.AccAddress(log.Address.Bytes())
		recipient := sdk.AccAddress(unpacked[0].(common.Address).Bytes())
		coins := sdk.NewCoins(sdk.NewCoin(unpacked[2].(string), sdk.NewIntFromBigInt(unpacked[1].(*big.Int))))
		err = h.anconprotocolKeeper.SendCoins(ctx, contract, recipient, coins)
		if err != nil {
			return err
		}
	}
	return nil
}

// mint trusted content event
// metadata ref, token id, token symbol, recipient, from (msg.sender)
//generates a voucher to claim on the other blockchain
//dag will real-time synchronize voucher proof
//validator approves transaction, & transaction service will emit to smartcontract
//solidity contract that validates the voucher and tx
//testing can be done with arbitrary ganache pub key
//voucher id is sent by cosmos event
//msg claim voucher, and emit a cosmos event if claim true
