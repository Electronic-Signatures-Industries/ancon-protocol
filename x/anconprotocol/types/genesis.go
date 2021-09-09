package types

import (
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

// NewGenesisState constructs a new GenesisState instance
func NewGenesisState(collections []Collection) *GenesisState {
	return &GenesisState{
		Collections: collections,
	}
}

// DefaultGenesisState gets the raw genesis message for testing
func DefaultGenesisState() *GenesisState {
	return &GenesisState{
		Collections: []Collection{},
	}
}

// ValidateGenesis validates the provided HTLC genesis state to ensure the expected invariants holds.
func ValidateGenesis(data GenesisState) error {

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
