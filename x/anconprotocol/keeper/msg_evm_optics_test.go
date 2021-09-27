package keeper

import (
	"math/big"
	"testing"

	"github.com/cosmos/cosmos-sdk/crypto/keyring"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core"
	"github.com/ethereum/go-ethereum/params"
	"github.com/stretchr/testify/require"

	evmtypes "github.com/Electronic-Signatures-Industries/ancon-evm/x/evm/types"
	ethtypes "github.com/ethereum/go-ethereum/core/types"
)

var templateAccessListTx = &ethtypes.AccessListTx{
	GasPrice: big.NewInt(1),
	Gas:      21000,
	To:       &common.Address{},
	Value:    big.NewInt(0),
	Data:     []byte{},
}

var templateLegacyTx = &ethtypes.LegacyTx{
	GasPrice: big.NewInt(1),
	Gas:      21000,
	To:       &common.Address{},
	Value:    big.NewInt(0),
	Data:     []byte{},
}

func newNativeMessage(
	nonce uint64,
	blockHeight int64,
	address common.Address,
	cfg *params.ChainConfig,
	krSigner keyring.Signer,
	ethSigner ethtypes.Signer,
	isLegacy bool,
) (core.Message, error) {
	msgSigner := ethtypes.MakeSigner(cfg, big.NewInt(blockHeight))

	var ethTx *ethtypes.Transaction
	if isLegacy {
		templateLegacyTx.Nonce = nonce
		ethTx = ethtypes.NewTx(templateLegacyTx)
	} else {
		templateAccessListTx.Nonce = nonce
		ethTx = ethtypes.NewTx(templateAccessListTx)
	}

	msg := &evmtypes.MsgEthereumTx{}
	msg.FromEthereumTx(ethTx)
	msg.From = address.Hex()

	if err := msg.Sign(ethSigner, krSigner); err != nil {
		return nil, err
	}

	m, err := msg.AsMessage(msgSigner)
	if err != nil {
		return nil, err
	}

	return m, nil
}

func TestMsgSendCrossMint(t *testing.T) {
	suite := KeeperTestSuite{}
	suite.DoSetupTest(t)

	//params := suite.app.EvmKeeper.GetParams(suite.ctx)
	//ethCfg := params.ChainConfig.EthereumConfig(suite.app.EvmKeeper.ChainID())
	signer := ethtypes.LatestSignerForChainID(suite.app.EvmKeeper.ChainID())

	m, err := newNativeMessage(
		suite.app.EvmKeeper.GetNonce(suite.address),
		suite.ctx.BlockHeight(),
		suite.address,
		nil,
		suite.signer,
		signer,
		true,
	)
	require.NoError(t, err)

	require.Equal(t, m, evmtypes.MsgEthereumTx{
		Size_: 0,
		Hash:  "",
		From:  "",
	})
	println(m)
	resp, err := suite.app.EvmKeeper.ApplyNativeMessage(m) //.EvmKeeper.ApplyNativeMessage(m)

	require.NoError(t, err)
	require.False(t, resp.Failed())
}
