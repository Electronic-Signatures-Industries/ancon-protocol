package keeper_test

import (
	"context"
	"testing"

	keepertest "github.com/Electronic-Signatures-Industries/ancon-protocol/testutil/keeper"
	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/aguaclara/keeper"
	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/aguaclara/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func setupMsgServer(t testing.TB) (types.MsgServer, context.Context) {
	k, ctx := keepertest.AguaclaraKeeper(t)
	return keeper.NewMsgServerImpl(*k), sdk.WrapSDKContext(ctx)
}
