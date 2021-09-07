package types

import (
	fmt "fmt"
	time "time"

	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

// NewGenesisState constructs a new GenesisState instance
func NewGenesisState(params Params, htlcs []HTLC, Supplies []AssetSupply, previousBlockTime time.Time, collections []Collection) *GenesisState {
	return &GenesisState{
		Params:            params,
		Htlcs:             htlcs,
		Supplies:          Supplies,
		PreviousBlockTime: previousBlockTime,
		Collections:       collections,
	}
}

// DefaultGenesisState gets the raw genesis message for testing
func DefaultGenesisState() *GenesisState {
	return &GenesisState{
		Params:            DefaultParams(),
		Htlcs:             []HTLC{},
		Supplies:          DefaultAssetSupplies(),
		PreviousBlockTime: DefaultPreviousBlockTime,
		Collections:       []Collection{},
	}
}

// ValidateGenesis validates the provided HTLC genesis state to ensure the expected invariants holds.
func ValidateGenesis(data GenesisState) error {
	if err := data.Params.Validate(); err != nil {
		return err
	}

	ids := map[string]bool{}
	for _, htlc := range data.Htlcs {
		if ids[htlc.Id] {
			return fmt.Errorf("found duplicate htlc ID %s", htlc.Id)
		}

		if htlc.State != Open {
			return sdkerrors.Wrap(ErrHTLCNotOpen, htlc.Id)
		}

		if err := htlc.Validate(); err != nil {
			return err
		}

		ids[htlc.Id] = true
	}

	supplyDenoms := map[string]bool{}
	for _, supply := range data.Supplies {
		if err := supply.Validate(); err != nil {
			return err
		}
		if supplyDenoms[supply.CurrentSupply.Denom] {
			return fmt.Errorf("found duplicate denom in asset supplies %s", supply.CurrentSupply.Denom)
		}
		supplyDenoms[supply.CurrentSupply.Denom] = true
	}

	for _, c := range data.Collections {
		if err := ValidateDenomID(c.Denom.Name); err != nil {
			return err
		}

		for _, nft := range c.NFTs {
			if nft.GetOwner().Empty() {
				return sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, "missing owner")
			}

			if err := ValidateTokenID(nft.GetID()); err != nil {
				return err
			}

			if err := ValidateTokenURI(nft.GetURI()); err != nil {
				return err
			}
		}
	}
	return nil
}
