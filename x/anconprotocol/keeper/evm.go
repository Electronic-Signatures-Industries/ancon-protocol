package keeper

import (
	"math/big"

	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/common"
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

type MintTrustedContentHook struct {
	anconprotocolKeeper Keeper
}

func NewBankSendHook(anconprotocolKeeper Keeper) *MintTrustedContentHook {
	return &MintTrustedContentHook{
		anconprotocolKeeper: anconprotocolKeeper,
	}
}

func (h MintTrustedContentHook) PostTxProcessing(ctx sdk.Context, txHash common.Hash, logs []*ethtypes.Log) error {
	for _, log := range logs {
		if len(log.Topics) == 0 || log.Topics[0] != MintTrustedContentEvent.ID {
			continue
		}
		if !ContractAllowed(log.Address) {
			// Check the contract whitelist to prevent accidental native call.
			continue
		}
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
