package keeper

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
)

type (
	DidKeeper struct {
		owners   sdk.StoreKey
		delegate sdk.StoreKey
		nonce    sdk.StoreKey

		// this line is used by starport scaffolding # ibc/keeper/attribute
	}
)

func NewDidKeeper(
	owners sdk.StoreKey,
	// this line is used by starport scaffolding # ibc/keeper/parameter
) *DidKeeper {
	return &DidKeeper{
		owners: owners,
	}
}
