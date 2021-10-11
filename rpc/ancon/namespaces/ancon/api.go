package ancon

import (
	"context"
	"encoding/json"
	"math/big"

	"github.com/pkg/errors"
	"github.com/spf13/viper"
	"github.com/tendermint/tendermint/libs/log"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/crypto/keyring"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/tharsis/ethermint/crypto/hd"
	"github.com/tharsis/ethermint/rpc/ethereum/backend"
	rpctypes "github.com/tharsis/ethermint/rpc/ethereum/types"
	ethermint "github.com/tharsis/ethermint/types"

	txtypes "github.com/cosmos/cosmos-sdk/types/tx"
)

// PublicAPI is the ancon_ prefixed set of APIs
type PublicAPI struct {
	ctx          context.Context
	clientCtx    client.Context
	queryClient  *rpctypes.QueryClient
	chainIDEpoch *big.Int
	logger       log.Logger
	backend      backend.Backend
}

// NewPublicAPI creates an instance of the public ETH Web3 API.
func NewPublicAPI(
	logger log.Logger,
	clientCtx client.Context,
	backend backend.Backend,

) *PublicAPI {
	epoch, err := ethermint.ParseChainID(clientCtx.ChainID)
	if err != nil {
		panic(err)
	}

	algos, _ := clientCtx.Keyring.SupportedAlgorithms()

	if !algos.Contains(hd.EthSecp256k1) {
		kr, err := keyring.New(
			sdk.KeyringServiceName(),
			viper.GetString(flags.FlagKeyringBackend),
			clientCtx.KeyringDir,
			clientCtx.Input,
			hd.EthSecp256k1Option(),
		)
		if err != nil {
			panic(err)
		}

		clientCtx = clientCtx.WithKeyring(kr)
	}

	api := &PublicAPI{
		ctx:          context.Background(),
		clientCtx:    clientCtx,
		queryClient:  rpctypes.NewQueryClient(clientCtx),
		chainIDEpoch: epoch,
		logger:       logger.With("client", "json-rpc"),
		backend:      backend,
	}

	return api
}

// ClientCtx returns client context
func (e *PublicAPI) ClientCtx() client.Context {
	return e.clientCtx
}

func (e *PublicAPI) QueryClient() *rpctypes.QueryClient {
	return e.queryClient
}

func (e *PublicAPI) Ctx() context.Context {
	return e.ctx
}

// SendSignTx
func (e *PublicAPI) SendSignTx(args rpctypes.SendTxArgs) (string, error) {
	e.logger.Debug("ancon_sendsigntx")

	var buff []byte

	dataString := string(*args.Data)

	var raw map[string]interface{}

	if err := json.Unmarshal([]byte(dataString), &raw); err != nil {
		e.logger.Error("failed to query evm params", "error", err.Error())
	}

	signdoc := txtypes.SignDoc{
		BodyBytes:     raw["bodyBytes"].([]byte),
		AuthInfoBytes: raw["authInfoBytes"].([]byte),
		ChainId:       args.ChainID.ToInt().String(),
		AccountNumber: raw["accountNumber"].(uint64),
	}

	signdoc.Unmarshal(buff)

	signdocmar, err := signdoc.Marshal()
	syncCtx := e.clientCtx.WithBroadcastMode(flags.BroadcastSync)
	rsp, err := syncCtx.BroadcastTx(signdocmar)

	if err != nil || rsp.Code != 0 {
		if err == nil {
			err = errors.New(rsp.RawLog)
		}
		e.logger.Error("failed to broadcast tx", "error", err.Error())
		return rsp.TxHash, err
	}
	return rsp.TxHash, nil
}
