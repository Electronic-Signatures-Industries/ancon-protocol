package keeper

import (
	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/pki/types"
)

var _ types.QueryServer = Keeper{}
