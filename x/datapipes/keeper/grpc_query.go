package keeper

import (
	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/datapipes/types"
)

var _ types.QueryServer = Keeper{}
