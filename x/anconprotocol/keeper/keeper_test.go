package keeper

import (
	"encoding/json"
	"testing"

	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/anconprotocol/types"
	"github.com/cosmos/cosmos-sdk/codec"
	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	"github.com/cosmos/cosmos-sdk/store"
	storetypes "github.com/cosmos/cosmos-sdk/store/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/require"
	"github.com/tendermint/tendermint/libs/log"
	tmproto "github.com/tendermint/tendermint/proto/tendermint/types"
	tmdb "github.com/tendermint/tm-db"
)

func setupKeeper(t testing.TB) (*Keeper, sdk.Context) {
	storeKey := sdk.NewKVStoreKey(types.StoreKey)
	memStoreKey := storetypes.NewMemoryStoreKey(types.MemStoreKey)

	db := tmdb.NewMemDB()
	stateStore := store.NewCommitMultiStore(db)
	stateStore.MountStoreWithDB(storeKey, sdk.StoreTypeIAVL, db)
	stateStore.MountStoreWithDB(memStoreKey, sdk.StoreTypeMemory, nil)
	require.NoError(t, stateStore.LoadLatestVersion())

	registry := codectypes.NewInterfaceRegistry()
	keeper := NewKeeper(codec.NewProtoCodec(registry), storeKey, memStoreKey)

	ctx := sdk.NewContext(stateStore, tmproto.Header{}, false, log.NewNopLogger())
	return keeper, ctx
}

func Test_AddFile_JSON(t *testing.T) {
	keeper, ctx := setupKeeper(t)
	f := make([]types.MsgFile, 1)
	f[0].Creator = "rogelio"
	f[0].Content = "Hello World"
	f[0].ContentType = "application/octet-stream"
	f[0].Time = "1"
	lnk, _ := keeper.AddFile(ctx, &f[0])

	x := &types.QueryResourceRequest{Cid: lnk}
	n, _ := keeper.GetObject(ctx, x)
	var match map[string]interface{}
	json.Unmarshal([]byte(n.Data), &match)
	require.Equal(t, match["content"], f[0].Content)
}

func Test_AddMetadata_JSON(t *testing.T) {
	keeper, ctx := setupKeeper(t)
	f := make([]types.MsgMetadata, 1)
	f[0].Creator = "rogelio"
	f[0].Description = "NFT Metadata"
	f[0].Did = "did:ethr:0xeeC58E89996496640c8b5898A7e0218E9b6E90cB"
	f[0].Image = "https://ancon.dao.pa/render.png"
	f[0].Owner = "did:key:z8mWaJHXieAVxxLagBpdaNWFEBKVWmMiE"
	f[0].Parent = "QmdmQXB2mzChmMeKY47C43LxUdg1NDJ5MWcKMKxDu7RgQm"
	f[0].VerifiedCredentialRef = "QmdmQXB2mzChmMeKY47C43LxUdg1NDJ5MWcKMKxDu7RgQm"
	f[0].Sources = "[\"QmSnuWmxptJZdLJpKRarxBMS2Ju2oANVrgbr2xWbie9b2D\",\"z8mWaJHXieAVxxLagBpdaNWFEBKVWmMiE\",\"QmdmQXB2mzChmMeKY47C43LxUdg1NDJ5MWcKMKxDu7RgQm\"]"
	f[0].Links = "[\"QmSnuWmxptJZdLJpKRarxBMS2Ju2oANVrgbr2xWbie9b2D\",\"z8mWaJHXieAVxxLagBpdaNWFEBKVWmMiE\",\"QmdmQXB2mzChmMeKY47C43LxUdg1NDJ5MWcKMKxDu7RgQm\"]"

	lnk, _ := keeper.AddMetadata(ctx, &f[0])

	x := &types.QueryResourceRequest{Cid: lnk}
	n, _ := keeper.GetObject(ctx, x)
	var match map[string]interface{}
	json.Unmarshal([]byte(n.Data), &match)
	require.Equal(t, match["image"], f[0].Image)
}
