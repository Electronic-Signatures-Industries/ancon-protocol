package dataunion

import (
	"testing"

	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/anconprotocol/keeper"
	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/anconprotocol/types"
	"github.com/fxamacker/cbor/v2"
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

	keeper := keeper.NewKeeper(codec.NewProtoCodec(registry), storeKey, memStoreKey,
		paramstypes.NewSubspace(
			codec.NewProtoCodec(registry),
			nil, storeKey, memStoreKey, "test",
		), nil, nil, map[string]bool{}, stateStore)

	ctx := sdk.NewContext(stateStore, tmproto.Header{}, false, log.NewNopLogger())
	return &keeper, ctx
}

func Test_RoundtripCBOR_JSONStore(t *testing.T) {
	keeper, ctx := setupKeeper(t)

	payload := `{
		"creator": "cosmos1ec02plr0mddj7r9x3kgh9phunz34t69twpley6",
		"dataUnion": {
			"name":        "Acme SA",
			"didIdentity": "did:web:acme-sa",
			"active":      true,
			"creator":     "cosmos1ec02plr0mddj7r9x3kgh9phunz34t69twpley6"
		}
	}`

	bz, _ := cbor.Marshal(payload)
	lnk, err := keeper.AddOffchainCBOR(ctx, "/", bz)

	if err != nil {
		require.NoError(t, err)
	}

	content, _ := keeper.ReadOffchainCBOR(ctx, "/", lnk)

	var w interface{}

	cbor.Unmarshal(content, &w)
	// x := &types.QueryGetDidRequest{
	// 	Name: "wonderland",;
	// }
	// doc, _ := keeper.GetDid(ctx, res.Cid)
	// route, _ := keeper.GetDidRoute(ctx, x.Name)

	//	require.Equal(t, (w).([]byte), []byte(`{"creator":"cosmos1ec02plr0mddj7r9x3kgh9phunz34t69twpley6","dataUnion":{"active":true,"creator":"cosmos1ec02plr0mddj7r9x3kgh9phunz34t69twpley6","didIdentity":"did:web:acme-sa","name":"Acme SA"}}`))
}

func Test_Add_Data_Union(t *testing.T) {
	keeper, ctx := setupKeeper(t)

	payload := types.MsgAddDataUnion{
		Creator: "cosmos1ec02plr0mddj7r9x3kgh9phunz34t69twpley6",
		DataUnion: &types.DataUnion{
			Name:    "Acme SA",
			Did:     "did:web:acme-sa",
			Active:  true,
			Creator: "cosmos1ec02plr0mddj7r9x3kgh9phunz34t69twpley6",
		},
	}
	res, err := keeper.ApplyDataUnion(ctx, &payload)

	if err != nil {
		require.NoError(t, err)
	}
	// x := &types.QueryGetDidRequest{
	// 	Name: "wonderland",
	// }
	// doc, _ := keeper.GetDid(ctx, res.Cid)
	// route, _ := keeper.GetDidRoute(ctx, x.Name)
	require.Equal(t, res, "bafyreia2sb3x4uexdgp7vfvprr2yhxhqu4el6swkihjybfofrp4om3nw74")
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
	route, _ := keeper.ReadAnyDid(ctx, res.Did)
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
	route, _ := keeper.ReadAnyDid(ctx, res.Did)
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
	route, _ := keeper.ReadAnyDid(ctx, res.Did)
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
	route, _ := keeper.ReadAnyDid(ctx, res.Did)
	require.Equal(t, route, doc)

	keeper.ApplyOwner(ctx,
		"cosmos1h6s0yrj7xasau79tn397mxx4auu25yzll89ptl",
		"cosmos1ec02plr0mddj7r9x3kgh9phunz34t69twpley6",
	)

	res2 := keeper.GetDIDOwner(ctx, "cosmos1h6s0yrj7xasau79tn397mxx4auu25yzll89ptl")

	require.NotEqual(t, res.Did, res2.Did)

}

func Test_Compute_Data_Contract(t *testing.T) {
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

	payload2 := `{
		"firstName": "Alice",
		"lastName": "In Wonderland"
	}`

	schemaData := (`{
		"$id": "https://qri.io/schema/",
		"$comment" : "sample comment",
		"title": "Person",
		"type": "object",
		"properties": {
			"firstName": {
				"type": "string"
			},
			"lastName": {
				"type": "string"
			},
			"age": {
				"description": "Age in years",
				"type": "integer",
				"minimum": 0
			},
			"friends": {
			  "type" : "array",
			  "items" : { "title" : "REFERENCE", "$ref" : "#" }
			}
		},
		"required": ["firstName", "lastName"]
	  }`)

	lnk, err := keeper.AddOffchainJSON(ctx, "", payload2)

	// Schema
	schemaCid, _ := keeper.ApplySchema(ctx, &types.MsgAddSchema{
		Creator: payload.Creator,
		Did:     res.Did,
		Schema:  []byte(schemaData),
	})

	keeper.SetAnchor(ctx, res.Did, lnk.String(), lnk.String())

	contract := ` [payload.lastName, payload.firstName, inputs.say, did,  chain_id]`
	contractCid, _ := keeper.ApplyDataContract(ctx, &types.MsgAddDataContract{
		Creator: payload.Creator,
		Did:     res.Did,
		Data:    []byte(contract),
	})

	inputs := `{ "index": 0, "numb": 1, "tres": "3", "say": "Hola" }`
	args := ((inputs))
	out, err := keeper.ExecuteDataContractTransaction(ctx, &types.MsgComputeDataContract{
		Creator:       payload.Creator,
		Did:           res.Did,
		InputCid:      lnk.String(),
		SchemaCid:     schemaCid,
		ToCid:         contractCid,
		JsonArguments: args,
	})

	s, err := keeper.ReadOffchainJSON(ctx, "", out)

	require.Equal(t, s, "")
	require.NoError(t, err)

}
