package aguaclara_test

import (
	"testing"

	keepertest "github.com/Electronic-Signatures-Industries/ancon-protocol/testutil/keeper"
	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/aguaclara"
	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/aguaclara/types"
	"github.com/stretchr/testify/require"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		PortId: types.PortID,
		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.AguaclaraKeeper(t)
	aguaclara.InitGenesis(ctx, *k, genesisState)
	got := aguaclara.ExportGenesis(ctx, *k)
	require.NotNil(t, got)

	require.Equal(t, genesisState.PortId, got.PortId)
	// this line is used by starport scaffolding # genesis/test/assert
}
