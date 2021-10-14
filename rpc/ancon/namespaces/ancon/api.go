package ancon

import (
	"fmt"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/crypto/keyring"
	"github.com/cosmos/cosmos-sdk/server"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/ethereum/go-ethereum/common/hexutil"
	"github.com/pkg/errors"
	"github.com/spf13/viper"
	"github.com/tendermint/tendermint/libs/log"
	"github.com/tharsis/ethermint/crypto/hd"
	"github.com/tharsis/ethermint/rpc/ethereum/backend"
	rpctypes "github.com/tharsis/ethermint/rpc/ethereum/types"
	evmtypes "github.com/tharsis/ethermint/x/evm/types"

	txtypes "github.com/cosmos/cosmos-sdk/types/tx"
)

// AnconAPIHandler is the ancon_ prefixed set of APIs
type AnconAPIHandler struct {
	ctx         *server.Context
	clientCtx   client.Context
	queryClient *rpctypes.QueryClient
	logger      log.Logger
	backend     backend.Backend
}

// var Handler = new(HandlerT)

// type HandlerT struct {
// }

// NewAPI creates an instance of the public ETH Web3 AnconAPIHandler.
func NewAPIHandler(
	ctx *server.Context,
	logger log.Logger,
	clientCtx client.Context,
	backend backend.Backend,

) *AnconAPIHandler {
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

	return &AnconAPIHandler{
		ctx:         ctx,
		clientCtx:   clientCtx,
		queryClient: rpctypes.NewQueryClient(clientCtx),
		logger:      logger.With("module", "ancon"),
		backend:     backend,
	}
}

// ClientCtx returns client context
func (e *AnconAPIHandler) ClientCtx() client.Context {
	return e.clientCtx
}

func (e *AnconAPIHandler) QueryClient() *rpctypes.QueryClient {
	return e.queryClient
}

// SendSignTx
func (e *AnconAPIHandler) SendRawTransaction(data hexutil.Bytes) (*sdk.TxResponse, error) {
	e.logger.Debug("ancon_sendSignTx")

	// RLP decode raw transaction bytes
	tx, err := e.clientCtx.TxConfig.TxDecoder()(data)
	if err != nil {
		e.logger.Error("transaction decoding failed", "error", err.Error())

		return nil, err
	}

	ethereumTx, isEthTx := tx.(*evmtypes.MsgEthereumTx)
	if !isEthTx {
		e.logger.Debug("invalid transaction type", "type", fmt.Sprintf("%T", tx))
		return nil, fmt.Errorf("invalid transaction type %T", tx)
	}

	if err := ethereumTx.ValidateBasic(); err != nil {
		e.logger.Debug("tx failed basic validation", "error", err.Error())
		return nil, err
	}

	txData, err := evmtypes.UnpackTxData(ethereumTx.Data)
	if err != nil {
		e.logger.Error("failed to unpack tx data", "error", err.Error())
		return nil, err
	}

	encb := txData.GetData()
	if err != nil {
		return nil, fmt.Errorf("invalid hex %s: %v", encb, err)
	}
	e.logger.Error("%s", encb)

	txr := txtypes.TxRaw{}
	err = e.clientCtx.Codec.Unmarshal(encb, &txr)
	if err != nil {
		return nil, fmt.Errorf("invalid TxRaw %s: %v", encb, err)
	}

	out, err := txr.Marshal()
	if err != nil {
		return nil, fmt.Errorf("invalid TxRawBytes %s: %v", encb, err)
	}

	syncCtx := e.clientCtx.WithBroadcastMode(flags.BroadcastSync)
	rsp, err := syncCtx.BroadcastTx(out)

	if err != nil || rsp.Code != 0 {
		if err == nil {
			err = errors.New(rsp.RawLog)
		}
		e.logger.Error("failed to broadcast tx", "error", err.Error())
		return rsp, err
	}
	return rsp, nil
}
