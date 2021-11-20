package did

import (
	"crypto/ecdsa"
	"crypto/elliptic"
	"crypto/rand"
	"testing"

	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/anconprotocol/keeper"
	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/anconprotocol/types"
	anconapp "github.com/tharsis/ethermint/app"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/codec"
	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	"github.com/cosmos/cosmos-sdk/crypto/keyring"
	"github.com/cosmos/cosmos-sdk/store"
	storetypes "github.com/cosmos/cosmos-sdk/store/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	paramstypes "github.com/cosmos/cosmos-sdk/x/params/types"
	"github.com/ethereum/go-ethereum/common"
	"github.com/stretchr/testify/require"
	"github.com/stretchr/testify/suite"
	"github.com/tendermint/tendermint/libs/log"
	tmproto "github.com/tendermint/tendermint/proto/tendermint/types"
	tmdb "github.com/tendermint/tm-db"

	_ "embed"

	ethtypes "github.com/ethereum/go-ethereum/core/types"
)

type KeeperTestSuite struct {
	suite.Suite

	ctx         sdk.Context
	app         *anconapp.EthermintApp
	queryClient types.QueryClient
	address     common.Address
	consAddress sdk.ConsAddress

	// for generate test tx
	clientCtx client.Context
	ethSigner ethtypes.Signer

	appCodec codec.Codec
	signer   keyring.Signer
}

/// DoSetupTest setup test environment, it uses`require.TestingT` to support both `testing.T` and `testing.B`.

func setupKeeper(t testing.TB) (*keeper.Keeper, sdk.Context) {
	storeKey := sdk.NewKVStoreKey(types.StoreKey)
	memStoreKey := storetypes.NewMemoryStoreKey(types.MemStoreKey)

	db := tmdb.NewMemDB()
	stateStore := store.NewCommitMultiStore(db)
	stateStore.MountStoreWithDB(storeKey, sdk.StoreTypeIAVL, db)
	stateStore.MountStoreWithDB(memStoreKey, sdk.StoreTypeMemory, nil)
	require.NoError(t, stateStore.LoadLatestVersion())
	registry := codectypes.NewInterfaceRegistry()

	keeper := keeper.NewTestKeeper(codec.NewProtoCodec(registry), storeKey, memStoreKey,
		paramstypes.NewSubspace(
			codec.NewProtoCodec(registry),
			nil, storeKey, memStoreKey, "test",
		), nil, nil, map[string]bool{})

	ctx := sdk.NewContext(stateStore, tmproto.Header{}, false, log.NewNopLogger())
	return &keeper, ctx
}

func Test_DID_Web(t *testing.T) {
	keeper, ctx := setupKeeper(t)
	ecKey, err := ecdsa.GenerateKey(elliptic.P256(), rand.Reader)
	require.NoError(t, err)

	ecKeyBytes := elliptic.Marshal(elliptic.P256(), ecKey.X, ecKey.Y)

	payload := types.MsgCreateDid{
		Creator:        "cosmos1ec02plr0mddj7r9x3kgh9phunz34t69twpley6",
		VanityName:     "alice",
		DidType:        "web",
		PublicKeyBytes: ecKeyBytes,
	}
	res, err := keeper.AddDid(ctx, &payload)

	if err != nil {
		require.NoError(t, err)
	}
	doc, _ := keeper.GetDid(ctx, res.Cid)

	a, c, e := keeper.ParseDIDWeb(res.Did, false)
	require.Equal(t, a, c, e, doc)
	//	require.Equal(t, route, doc)
}
func Test_DID_Key(t *testing.T) {
	keeper, ctx := setupKeeper(t)
	// ecKey, err := ecdsa.GenerateKey(elliptic.P256(), rand.Reader)
	// require.NoError(t, err)

	// ecKeyBytes := elliptic.Marshal(elliptic.P256(), ecKey.X, ecKey.Y)

	payload := types.MsgCreateDid{
		Creator:    "cosmos1ec02plr0mddj7r9x3kgh9phunz34t69twpley6",
		VanityName: "wonderland",
		DidType:    "key",
		// PublicKeyBytes: ecKeyBytes,
	}
	res, err := keeper.AddDid(ctx, &payload)

	if err != nil {
		require.NoError(t, err)
	}
	doc, _ := keeper.GetDid(ctx, res.Cid)
	route, _ := keeper.GetDidWebRoute(ctx, payload.VanityName)
	require.Equal(t, route, doc)
}

func Test_DID_Delegate(t *testing.T) {
	keeper, ctx := setupKeeper(t)
	// ecKey, err := ecdsa.GenerateKey(elliptic.P256(), rand.Reader)
	// require.NoError(t, err)

	// ecKeyBytes := elliptic.Marshal(elliptic.P256(), ecKey.X, ecKey.Y)

	payload := types.MsgCreateDid{
		Creator:    "cosmos1ec02plr0mddj7r9x3kgh9phunz34t69twpley6",
		VanityName: "wonderland",
		DidType:    "key",
		// PublicKeyBytes: ecKeyBytes,
	}
	res, err := keeper.AddDid(ctx, &payload)

	if err != nil {
		require.NoError(t, err)
	}
	doc, _ := keeper.GetDid(ctx, res.Cid)
	route, _ := keeper.GetDidWebRoute(ctx, payload.VanityName)
	require.Equal(t, route, doc)

	keeper.ApplyDelegate(ctx, &types.MsgGrantDelegate{
		Delegate:     "did:web:ancon:alice",
		DelegateType: "web",
		Validity:     100000000,
		Creator:      payload.Creator,
		Did:          "cosmos1h6s0yrj7xasau79tn397mxx4auu25yzll89ptl",
	})

	res2 := keeper.GetDelegate(ctx, "cosmos1h6s0yrj7xasau79tn397mxx4auu25yzll89ptl")

	require.NotEqual(t, res.Did, res2.Did)
}

func Test_DID_ChangeOwner(t *testing.T) {
	keeper, ctx := setupKeeper(t)
	// ecKey, err := ecdsa.GenerateKey(elliptic.P256(), rand.Reader)
	// require.NoError(t, err)

	// ecKeyBytes := elliptic.Marshal(elliptic.P256(), ecKey.X, ecKey.Y)

	payload := types.MsgCreateDid{
		Creator:    "cosmos1ec02plr0mddj7r9x3kgh9phunz34t69twpley6",
		VanityName: "wonderland",
		DidType:    "key",
		// PublicKeyBytes: ecKeyBytes,
	}
	res, err := keeper.AddDid(ctx, &payload)

	if err != nil {
		require.NoError(t, err)
	}
	doc, _ := keeper.GetDid(ctx, res.Cid)
	route, _ := keeper.GetDidWebRoute(ctx, payload.VanityName)
	require.Equal(t, route, doc)

	keeper.ApplyOwner(ctx,
		"cosmos1ec02plr0mddj7r9x3kgh9phunz34t69twpley6",
		"cosmos1h6s0yrj7xasau79tn397mxx4auu25yzll89ptl",
	)

	res2 := keeper.GetDIDOwner(ctx, "cosmos1h6s0yrj7xasau79tn397mxx4auu25yzll89ptl")

	require.Equal(t, res.Did, res2.Did)

}
func Test_DID_ChangeOwner_NotFound(t *testing.T) {
	keeper, ctx := setupKeeper(t)
	// ecKey, err := ecdsa.GenerateKey(elliptic.P256(), rand.Reader)
	// require.NoError(t, err)

	// ecKeyBytes := elliptic.Marshal(elliptic.P256(), ecKey.X, ecKey.Y)

	payload := types.MsgCreateDid{
		Creator:    "cosmos1ec02plr0mddj7r9x3kgh9phunz34t69twpley6",
		VanityName: "wonderland",
		DidType:    "key",
		// PublicKeyBytes: ecKeyBytes,
	}
	res, err := keeper.AddDid(ctx, &payload)

	if err != nil {
		require.NoError(t, err)
	}
	doc, _ := keeper.GetDid(ctx, res.Cid)
	route, _ := keeper.GetDidWebRoute(ctx, payload.VanityName)
	require.Equal(t, route, doc)

	keeper.ApplyOwner(ctx,
		"cosmos1h6s0yrj7xasau79tn397mxx4auu25yzll89ptl",
		"cosmos1ec02plr0mddj7r9x3kgh9phunz34t69twpley6",
	)

	res2 := keeper.GetDIDOwner(ctx, "cosmos1h6s0yrj7xasau79tn397mxx4auu25yzll89ptl")

	require.NotEqual(t, res.Did, res2.Did)

}
