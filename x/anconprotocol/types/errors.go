package types

// DONTCOVER

import (
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

// x/anconprotocol module sentinel errors
var (
	ErrInvalidProof       = sdkerrors.Register(ModuleName, 2, "invalid proof")
	ErrInvalidPrefix      = sdkerrors.Register(ModuleName, 3, "invalid prefix")
	ErrInvalidMerkleProof = sdkerrors.Register(ModuleName, 4, "invalid merkle proof")
)
