package keeper

import (
	"context"
	"testing"

	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/datapipes/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func setupMsgServer(t testing.TB) (types.MsgServer, context.Context) {
	keeper, ctx := setupKeeper(t)
	return NewMsgServerImpl(*keeper), sdk.WrapSDKContext(ctx)
}
