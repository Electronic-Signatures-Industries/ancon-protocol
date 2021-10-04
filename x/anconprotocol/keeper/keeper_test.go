package keeper

import (
	"encoding/base64"
	"encoding/json"
	"testing"

	anconapp "github.com/Electronic-Signatures-Industries/ancon-evm/app"
	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/anconprotocol/types"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/codec"
	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	"github.com/cosmos/cosmos-sdk/crypto/keyring"
	"github.com/cosmos/cosmos-sdk/store"
	storetypes "github.com/cosmos/cosmos-sdk/store/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	paramstypes "github.com/cosmos/cosmos-sdk/x/params/types"
	"github.com/ethereum/go-ethereum/common"
	cbor "github.com/fxamacker/cbor/v2"
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

func setupKeeper(t testing.TB) (*Keeper, sdk.Context) {
	storeKey := sdk.NewKVStoreKey(types.StoreKey)
	memStoreKey := storetypes.NewMemoryStoreKey(types.MemStoreKey)

	db := tmdb.NewMemDB()
	stateStore := store.NewCommitMultiStore(db)
	stateStore.MountStoreWithDB(storeKey, sdk.StoreTypeIAVL, db)
	stateStore.MountStoreWithDB(memStoreKey, sdk.StoreTypeMemory, nil)
	require.NoError(t, stateStore.LoadLatestVersion())
	registry := codectypes.NewInterfaceRegistry()

	keeper := NewTestKeeper(codec.NewProtoCodec(registry), storeKey, memStoreKey,
		paramstypes.NewSubspace(
			codec.NewProtoCodec(registry),
			nil, storeKey, memStoreKey, "test",
		), nil, nil, nil, map[string]bool{})

	ctx := sdk.NewContext(stateStore, tmproto.Header{}, false, log.NewNopLogger())
	return &keeper, ctx
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
	f[0].Creator = "cosmos1ec02plr0mddj7r9x3kgh9phunz34t69twpley6"
	f[0].Description = "NFT Metadata"
	f[0].Did = "did:ethr:0xeeC58E89996496640c8b5898A7e0218E9b6E90cB"
	f[0].Image = "bafyreicztwstn4ujtsnabjabn3hj7mvbhsgrvefbh37ddnx4w2pvghvsfm"
	f[0].Owner = "did:key:z8mWaJHXieAVxxLagBpdaNWFEBKVWmMiE"
	f[0].Parent = ""
	f[0].VerifiedCredentialRef = ""
	f[0].Sources = "[\"QmSnuWmxptJZdLJpKRarxBMS2Ju2oANVrgbr2xWbie9b2D\"]"
	f[0].Links = "[]"
	f[0].From = "gggggggggggggg"

	lnk, _ := keeper.AddMetadata(ctx, &f[0])

	var res []byte
	// lnk = "bafyreiamh4lbph4e7jtwuk2fwato6y6jk67v4mmra4x4rxhjjzn7xa5uiq"
	x := &types.QueryResourceRequest{Cid: lnk}
	om, _ := keeper.GetObject(ctx, x)

	var cborPayload []byte
	cborPayload, _ = base64.RawStdEncoding.DecodeString(om.Data)

	var output types.IPLDMetadataStore
	_ = cbor.Unmarshal(cborPayload, &output)
	res, _ = json.Marshal(output)
	require.Equal(t, output, res)
}

func TestTrustedContent(t *testing.T) {
	keeper, ctx := setupKeeper(t)
	f := make([]types.MsgMetadata, 1)
	f[0].Creator = "cosmos1ec02plr0mddj7r9x3kgh9phunz34t69twpley6"
	f[0].Description = "NFT Metadata"
	f[0].Did = "did:ethr:0xeeC58E89996496640c8b5898A7e0218E9b6E90cB"
	f[0].Image = "bafyreicztwstn4ujtsnabjabn3hj7mvbhsgrvefbh37ddnx4w2pvghvsfm"
	f[0].Owner = "did:key:z8mWaJHXieAVxxLagBpdaNWFEBKVWmMiE"
	f[0].Parent = ""
	f[0].VerifiedCredentialRef = ""
	f[0].Sources = "[\"QmSnuWmxptJZdLJpKRarxBMS2Ju2oANVrgbr2xWbie9b2D\"]"
	f[0].Links = "[]"
	f[0].From = "gggggggggggggg"

	lnk, _ := keeper.AddMetadata(ctx, &f[0])

	reqDenom := types.MsgIssueDenom{
		Id:               "ancon",
		Name:             "anconprotocol",
		Schema:           "",
		Sender:           "cosmos1ec02plr0mddj7r9x3kgh9phunz34t69twpley6",
		Symbol:           "ancon",
		MintRestricted:   false,
		UpdateRestricted: false,
	}

	// Issue token
	err := keeper.IssueDenom(ctx, reqDenom.Id, reqDenom.Name, reqDenom.Schema, reqDenom.Symbol,
		sdk.AccAddress(reqDenom.Sender), false, false)
	require.Equal(t, nil, err)
	acct, _ := sdk.AccAddressFromBech32(f[0].Creator)
	// Mint
	err = keeper.MintNFT(ctx, reqDenom.Id, "1", "anconnft", lnk, "",
		acct)
	require.Equal(t, nil, err)
	found := keeper.HasNFT(ctx, reqDenom.Id, "1")
	require.Equal(t, true, found)
	items := keeper.GetNFTs(ctx, reqDenom.Id)
	require.Equal(t, lnk, items[0].GetURI())
	// require.Equal(t, output, res)
}

func TestTrustedContent_CrossMint(t *testing.T) {
	keeper, ctx := setupKeeper(t)
	f := make([]types.MsgMetadata, 1)
	f[0].Creator = "cosmos1ec02plr0mddj7r9x3kgh9phunz34t69twpley6"
	f[0].Description = "NFT Metadata"
	f[0].Did = "did:ethr:0xeeC58E89996496640c8b5898A7e0218E9b6E90cB"
	f[0].Image = "bafyreicztwstn4ujtsnabjabn3hj7mvbhsgrvefbh37ddnx4w2pvghvsfm"
	f[0].Owner = "did:key:z8mWaJHXieAVxxLagBpdaNWFEBKVWmMiE"
	f[0].Parent = ""
	f[0].VerifiedCredentialRef = ""
	f[0].Sources = "[\"QmSnuWmxptJZdLJpKRarxBMS2Ju2oANVrgbr2xWbie9b2D\"]"
	f[0].Links = "[]"
	f[0].From = "gggggggggggggg"

	lnk, _ := keeper.AddMetadata(ctx, &f[0])

	tokenName := "nftToken"

	err := keeper.IssueDenom(ctx, tokenName, tokenName, "", "ancon",
		sdk.AccAddress("cosmos1ec02plr0mddj7r9x3kgh9phunz34t69twpley6"), false, false)

	if err != nil {
		t.Error("TestTrustedContent_CrossMint could not issue token")
	}

	tokenID, _ := keeper.AddTrustedContent(
		ctx,
		&types.MsgMintTrustedContent{
			Creator:     "cosmos1ec02plr0mddj7r9x3kgh9phunz34t69twpley6",
			MetadataRef: lnk,
			DenomId:     tokenName,
			Name:        tokenName,
			Recipient:   "cosmos1ec02plr0mddj7r9x3kgh9phunz34t69twpley6",
			DidOwner:    "did:ethr:0xeeC58E89996496640c8b5898A7e0218E9b6E90cB",
			LazyMint:    false,
		},
	)

	if len(tokenID) == 0 {
		t.Error("TestTrustedContent_CrossMint could not add trusted content")
	}

	if !keeper.HasNFT(ctx, tokenName, tokenID) {
		t.Error("TestTrustedContent_CrossMint could not find NFT")
	}

}

func TestTrustedContent_Voucher(t *testing.T) {
	keeper, ctx := setupKeeper(t)
	f := make([]types.MsgMetadata, 1)
	f[0].Creator = "cosmos1ec02plr0mddj7r9x3kgh9phunz34t69twpley6"
	f[0].Description = "NFT Metadata"
	f[0].Did = "did:ethr:0xeeC58E89996496640c8b5898A7e0218E9b6E90cB"
	f[0].Image = "bafyreicztwstn4ujtsnabjabn3hj7mvbhsgrvefbh37ddnx4w2pvghvsfm"
	f[0].Owner = "did:key:z8mWaJHXieAVxxLagBpdaNWFEBKVWmMiE"
	f[0].Parent = ""
	f[0].VerifiedCredentialRef = ""
	f[0].Sources = "[\"QmSnuWmxptJZdLJpKRarxBMS2Ju2oANVrgbr2xWbie9b2D\"]"
	f[0].Links = "[]"
	f[0].From = "gggggggggggggg"

	lnk, _ := keeper.AddMetadata(ctx, &f[0])

	tokenName := "nftToken"

	err := keeper.IssueDenom(ctx, tokenName, tokenName, "", "ancon",
		sdk.AccAddress("cosmos1ec02plr0mddj7r9x3kgh9phunz34t69twpley6"), false, false)

	if err != nil {
		t.Error("TestTrustedContent_Voucher could not issue token")
	}

	voucher, _ := keeper.AddTrustedContent(
		ctx,
		&types.MsgMintTrustedContent{
			Creator:     "cosmos1ec02plr0mddj7r9x3kgh9phunz34t69twpley6",
			MetadataRef: lnk,
			DenomId:     tokenName,
			Name:        tokenName,
			Recipient:   "cosmos1ec02plr0mddj7r9x3kgh9phunz34t69twpley6",
			DidOwner:    "did:ethr:0xeeC58E89996496640c8b5898A7e0218E9b6E90cB",
			LazyMint:    true,
		},
	)

	if len(voucher) == 0 {
		t.Error("TestTrustedContent_Voucher could not add trusted content [voucher]")
	}

	// if !keeper.HasNFT(ctx, tokenName, voucher) {
	// 	t.Error("TestTrustedContent_Voucher could not find NFT")
	// }

}

func Test_AddMetadata_EVM_Hook(t *testing.T) {
	keeper, ctx := setupKeeper(t)
	hook := NewCreateMetadataHook(*keeper)

	event := CreateMetadataAbi()
	pck, _ := event.Pack(
		"_anconCreateMetadata",
		"0xEb44e9278f552580EB80431c9e64F103fBE7a7e7",
		"did:ethr:0xeeC58E89996496640c8b5898A7e0218E9b6E90cB",
		"testMetadata",
		"metadata description",
		"bafyreicztwstn4ujtsnabjabn3hj7mvbhsgrvefbh37ddnx4w2pvghvsfm",
		"",
		"[\"QmSnuWmxptJZdLJpKRarxBMS2Ju2oANVrgbr2xWbie9b2D\"]",
		"[]",
	)

	log := &ethtypes.Log{
		Address:     common.HexToAddress("0xecf8f87f810ecf450940c9f60066b4a7a501d6a7"),
		BlockHash:   common.HexToHash("0x656c34545f90a730a19008c0e7a7cd4fb3895064b48d6d69761bd5abad681056"),
		BlockNumber: 2019236,
		Data:        pck,
		Index:       2,
		TxIndex:     3,
		TxHash:      common.HexToHash("0x3b198bfd5d2907285af009e9ae84a0ecd63677110d89d7e030251acb87f6487e"),
		Topics: []common.Hash{
			common.HexToHash("0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"),
			common.HexToHash("0x00000000000000000000000080b2c9d7cbbf30a1b0fc8983c647d754c6525615"),
		},
	}

	err := hook.PostTxProcessing(ctx, log.TxHash, []*ethtypes.Log{log})

	require.Equal(t, err, nil)
}

// func TestTrustedContent_VoucherQuery(t *testing.T) {
// 	keeper, ctx := setupKeeper(t)
// 	f := make([]types.MsgMetadata, 1)
// 	f[0].Creator = "cosmos1ec02plr0mddj7r9x3kgh9phunz34t69twpley6"
// 	f[0].Description = "NFT Metadata"
// 	f[0].Did = "did:ethr:0xeeC58E89996496640c8b5898A7e0218E9b6E90cB"
// 	f[0].Image = "bafyreicztwstn4ujtsnabjabn3hj7mvbhsgrvefbh37ddnx4w2pvghvsfm"
// 	f[0].Owner = "did:key:z8mWaJHXieAVxxLagBpdaNWFEBKVWmMiE"
// 	f[0].Parent = ""
// 	f[0].VerifiedCredentialRef = ""
// 	f[0].Sources = "[\"QmSnuWmxptJZdLJpKRarxBMS2Ju2oANVrgbr2xWbie9b2D\"]"
// 	f[0].Links = "[]"
// 	f[0].From = "gggggggggggggg"

// 	lnk, _ := keeper.AddMetadata(ctx, &f[0])

// 	tokenName := "nftToken"

// 	err := keeper.IssueDenom(ctx, tokenName, tokenName, "", "ancon",
// 		sdk.AccAddress("cosmos1ec02plr0mddj7r9x3kgh9phunz34t69twpley6"), false, false)

// 	if err != nil {
// 		t.Error("TestTrustedContent_VoucherQuery could not issue token")
// 	}

// 	voucherID, _ := keeper.AddTrustedContent(
// 		ctx,
// 		&types.MsgMintTrustedContent{
// 			Creator:     "cosmos1ec02plr0mddj7r9x3kgh9phunz34t69twpley6",
// 			MetadataRef: lnk,
// 			DenomId:     tokenName,
// 			Name:        tokenName,
// 			Recipient:   "cosmos1ec02plr0mddj7r9x3kgh9phunz34t69twpley6",
// 			DidOwner:    "did:ethr:0xeeC58E89996496640c8b5898A7e0218E9b6E90cB",
// 			LazyMint:    true,
// 			R:           "", //metadata-ref + DenomID + Name + Recipient
// 			S:           "",
// 			V:           0,
// 		},
// 	)

// 	if len(voucherID) == 0 {
// 		t.Error("TestTrustedContent_VoucherQuery could not add trusted content [voucher]")
// 	}

// 	// GetVoucher should be offchain
// 	voucher, err := keeper.GetVoucher(ctx.Context(), voucherID)
// 	if err != nil {
// 		t.Error("TestTrustedContent_VoucherQuery could not find voucher")
// 	}

// 	_ = voucher

// 	// this step should be a smart contract
// 	_ = keeper.AddTrustedContentWithProof(ctx, voucher["GetVoucher"], voucher["voucher"])

// 	// if !keeper.HasNFT(ctx, tokenName, tokenID) {
// 	// 	t.Error("TestTrustedContent_VoucherQuery could not find NFT")
// 	// }

// }
