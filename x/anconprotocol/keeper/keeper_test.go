package keeper

import (
	"crypto/ecdsa"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"math/big"
	"testing"

	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/anconprotocol/types"
	"github.com/hyperledger/aries-framework-go/pkg/doc/verifiable"
	anconapp "github.com/tharsis/ethermint/app"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/codec"
	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	"github.com/cosmos/cosmos-sdk/crypto/keyring"
	"github.com/cosmos/cosmos-sdk/store"
	"github.com/cosmos/cosmos-sdk/store/iavl"
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
	"github.com/ethereum/go-ethereum/ethclient"
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

	st := ctx.MultiStore().GetKVStore(keeper.storeKey).(*iavl.Store)
	id := st.Commit()

	lnk, _ = keeper.AddMetadata(ctx, &f[0])

	id = st.Commit()
	require.NotEqual(t, id, nil)
	// lnk = "bafyreiamh4lbph4e7jtwuk2fwato6y6jk67v4mmra4x4rxhjjzn7xa5uiq"
	x := &types.QueryResourceRequest{Cid: lnk}
	om, _ := keeper.GetObject(ctx, x)
	r, p, _ := keeper.GetMetadataProof(ctx, fmt.Sprintf("%s", lnk), "")

	require.NotNil(t, r)
	require.NotNil(t, p)
	var cborPayload []byte
	cborPayload, _ = base64.RawStdEncoding.DecodeString(om.Data)

	var output types.IPLDMetadataStore
	_ = cbor.Unmarshal(cborPayload, &output)
	require.Equal(t, output.Did, f[0].Did)
}

func Test_ChangeMetadata_JSON(t *testing.T) {
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

	updlnk, _ := keeper.ChangeOwnerMetadata(ctx, lnk, f[0].Owner, f[0].Did, "", "")

	r, p, _ := keeper.GetMetadataProof(ctx, fmt.Sprintf("%s", updlnk), "")

	require.NotNil(t, r)
	require.NotNil(t, p)

	// lnk = "bafyreiamh4lbph4e7jtwuk2fwato6y6jk67v4mmra4x4rxhjjzn7xa5uiq"
	x := &types.QueryResourceRequest{Cid: updlnk}
	om, _ := keeper.GetObject(ctx, x)

	var cborPayload []byte
	cborPayload, _ = base64.RawStdEncoding.DecodeString(om.Data)

	var output types.IPLDMetadataStore
	_ = cbor.Unmarshal(cborPayload, &output)
	require.Equal(t, output.Owner, f[0].Did)
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

	evm_hook_abi := CreateMetadataAbi()
	inputs := evm_hook_abi.Events["_anconCreateMetadata"].Inputs

	pck, err := inputs.Pack(
		common.HexToAddress("0xEb44e9278f552580EB80431c9e64F103fBE7a7e7"),
		"did:ethr:0xeeC58E89996496640c8b5898A7e0218E9b6E90cB",
		"testMetadata",
		"metadata description",
		"bafyreicztwstn4ujtsnabjabn3hj7mvbhsgrvefbh37ddnx4w2pvghvsfm",
		"",
		"[\"QmSnuWmxptJZdLJpKRarxBMS2Ju2oANVrgbr2xWbie9b2D\"]",
		"[\"QmSnuWmxptJZdLJpKRarxBMS2Ju2oANVrgbr2xWbie9b2D\"]",
	)
	require.Equal(t, err, nil)

	log := &ethtypes.Log{
		Address:     common.HexToAddress("0xecf8f87f810ecf450940c9f60066b4a7a501d6a7"),
		BlockHash:   common.HexToHash("0x656c34545f90a730a19008c0e7a7cd4fb3895064b48d6d69761bd5abad681056"),
		BlockNumber: 2019236,
		Data:        pck,
		Index:       2,
		TxIndex:     3,
		TxHash:      common.HexToHash("0x3b198bfd5d2907285af009e9ae84a0ecd63677110d89d7e030251acb87f6487e"),
		Topics: []common.Hash{
			evm_hook_abi.Events["_anconCreateMetadata"].ID,
		},
	}
	err = hook.PostTxProcessing(ctx, log.TxHash, []*ethtypes.Log{log})

	require.Equal(t, err, nil)
}
func Test_ExecuteTransaction(
	t *testing.T,
) {
	_, ctx := setupKeeper(t)
	client, err := ethclient.Dial("http://localhost:8646")

	//	inputs := evm_hook_abi.Events["_anconCreateMetadata"].Inputs
	//ganache mnemonic for testing purposes
	//Acc 0x762e2386Cf62a597db3Bac1d3092da24400a00d1
	//Pkey 0xd99d1aa5a610528926846e187774c7a680cd5d0f12ba31fee0dde4bdc565f700
	//err = hook.PostTxProcessing(ctx, log.TxHash, []*ethtypes.Log{log})
	pkeyint := new(big.Int)
	pkeyint.SetString("d99d1aa5a610528926846e187774c7a680cd5d0f12ba31fee0dde4bdc565f700", 16)

	_, err = ExecuteTransaction(
		ctx,
		RecieveCrossmintRequest{
			vc:           verifiable.Credential{},
			v:            0,
			r:            []byte{},
			s:            []byte{},
			metadataHash: "",
			to:           "",
			newOwner:     "",
		},
		common.HexToAddress("0x762e2386Cf62a597db3Bac1d3092da24400a00d1"),
		client,
		big.NewInt(3),
		&ecdsa.PrivateKey{
			D: pkeyint,
		},
		common.HexToAddress("0x762e2386Cf62a597db3Bac1d3092da24400a00d1"),
		int64(0),
	)

	require.Equal(t, err, nil)
}
