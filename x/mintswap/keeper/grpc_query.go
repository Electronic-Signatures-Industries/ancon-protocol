package keeper

import (
	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/mintswap/types"
)

var _ types.QueryServer = Keeper{}
