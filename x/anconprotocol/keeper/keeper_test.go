package keeper

import (
	"crypto/ecdsa"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"math/big"
	"strings"
	"testing"

	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/anconprotocol/types"
	txtypes "github.com/cosmos/cosmos-sdk/types/tx"
	"github.com/hyperledger/aries-framework-go/pkg/doc/verifiable"
	anconapp "github.com/tharsis/ethermint/app"
	evmtypes "github.com/tharsis/ethermint/x/evm/types"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/codec"
	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	"github.com/cosmos/cosmos-sdk/crypto/keyring"
	"github.com/cosmos/cosmos-sdk/store"
	storetypes "github.com/cosmos/cosmos-sdk/store/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	paramstypes "github.com/cosmos/cosmos-sdk/x/params/types"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/common/hexutil"
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

func Test_Convert_From_Base64_To_Bytes(t *testing.T) {
	data := "0xf906cd8080808080b90680000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000006367b2261757468496e666f4279746573223a7b2274797065223a22427566666572222c2264617461223a5b31302c37382c31302c37302c31302c33312c34372c39392c3131312c3131352c3130392c3131312c3131352c34362c39392c3131342c3132312c3131322c3131362c3131312c34362c3131352c3130312c39392c3131322c35302c35332c35342c3130372c34392c34362c38302c3131372c39382c37352c3130312c3132312c31382c33352c31302c33332c322c39322c3232392c34382c3134362c33352c3130342c3233302c38372c3233382c39342c3232332c3232322c3138362c31312c33332c3235312c3235302c3133332c31342c3137332c3137372c3234382c38332c38362c34302c372c3131302c3136372c3134372c3233302c34392c35352c31382c342c31302c322c382c312c31382c31382c31302c31322c31302c372c39372c3131322c3130342c3131312c3131362c3131312c3131302c31382c312c35322c31362c3139322c3135342c31325d7d2c22626f64794279746573223a7b2274797065223a22427566666572222c2264617461223a5b31302c3136382c312c31302c36372c34372c36392c3130382c3130312c39392c3131362c3131342c3131312c3131302c3130352c39392c38332c3130352c3130332c3131302c39372c3131362c3131372c3131342c3130312c3131352c37332c3131302c3130302c3131372c3131352c3131362c3131342c3130352c3130312c3131352c34362c39372c3131302c39392c3131312c3131302c3131322c3131342c3131312c3131362c3131312c39392c3131312c3130382c34362c39372c3131302c39392c3131312c3131302c3131322c3131342c3131312c3131362c3131312c39392c3131312c3130382c34362c37372c3131352c3130332c37302c3130352c3130382c3130312c31382c39372c31302c34332c3130312c3131362c3130342c3130392c34392c3132302c35302c35312c3131322c39392c3132302c39372c3130372c3131372c3130382c3131322c3131332c35352c35322c3131342c35352c3130362c3131382c35372c35322c35362c3130372c3130372c35372c34382c39372c3131322c3131382c35342c3130322c34382c3130372c35352c3131352c35372c35322c35312c3132322c31382c31302c3130352c3131302c3130302c3130312c3132302c34362c3130342c3131362c3130392c3130382c32362c352c3130342c3130312c3130382c3130382c3131312c34322c31332c34392c35342c35312c35322c34382c35372c34392c35332c34392c35312c35312c35372c35332c35302c31362c39372c3131322c3131322c3130382c3130352c39392c39372c3131362c3130352c3131312c3131302c34372c3130362c3131352c3131312c3131305d7d2c227369676e617475726573223a5b7b2230223a31322c2231223a34332c2232223a3131382c2233223a3137322c2234223a37302c2235223a34392c2236223a3137322c2237223a3131362c2238223a31382c2239223a3130392c223130223a3133332c223131223a35372c223132223a3137302c223133223a34312c223134223a3233302c223135223a31362c223136223a3132382c223137223a3132312c223138223a3134362c223139223a3138392c223230223a3233372c223231223a3135322c223232223a37382c223233223a3131352c223234223a3231302c223235223a37362c223236223a3133342c223237223a3231322c223238223a3231372c223239223a3130352c223330223a32322c223331223a33352c223332223a34312c223333223a3138392c223334223a3135382c223335223a3135352c223336223a3132342c223337223a3133362c223338223a3233372c223339223a3134362c223430223a3134342c223431223a35382c223432223a3231342c223433223a3133332c223434223a3138312c223435223a32342c223436223a3131382c223437223a3139392c223438223a3130312c223439223a3131342c223530223a33332c223531223a3139392c223532223a3233382c223533223a3230382c223534223a3135302c223535223a37302c223536223a3132372c223537223a36302c223538223a33302c223539223a34342c223630223a3234382c223631223a38342c223632223a3232372c223633223a3234337d5d7d00000000000000000000824674a03f75f5e11a6b3dd14e8a2225dd9a99e3ff7e23820d5f1894b61c4d8ffa4a2960a068b865708550358d26e80205c142c86e24e3caac45e1478ca9e19d02ea287aaa"

	ethToHex := hexutil.MustDecode(data)

	tx := evmtypes.MsgEthereumTx{}

	tx.Unmarshal(ethToHex)

	// https://github.com/ethereum/go-ethereum/blob/master/accounts/abi/unpack_test.go
	def := fmt.Sprintf(`[{ "name" : "method", "type": "function", "outputs": %s}]`,
		`[{"name": "raw", "type": "bytes"}]`)
	abi, err := abi.JSON(strings.NewReader(def))
	if err != nil {
		fmt.Errorf("invalid ABI definition %s: %v", def, err)
	}
	encb := tx.AsTransaction().Data()
	if err != nil {
		fmt.Errorf("invalid hex %s: %v", encb, err)
	}
	var txr txtypes.TxRaw
	err = abi.UnpackIntoInterface(&txr, "method", encb)

	// if err != nil {
	// 	e.logger.Error("dataToString", err, msgEthTx.AsTransaction().Data())
	// 	return err
	// }
	// var payload map[string]interface{}

	// if err := json.Unmarshal([]byte(dataToString), &payload); err != nil {
	// 	e.logger.Error("failed to query evm params", "error", err.Error())
	// }
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

	// lnk = "bafyreiamh4lbph4e7jtwuk2fwato6y6jk67v4mmra4x4rxhjjzn7xa5uiq"
	x := &types.QueryResourceRequest{Cid: lnk}
	om, _ := keeper.GetObject(ctx, x)

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
