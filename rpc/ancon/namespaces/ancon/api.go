package ancon

import (
	"fmt"
	"strings"

	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/common/hexutil"
	"github.com/pkg/errors"
	"github.com/tendermint/tendermint/libs/log"
	evmtypes "github.com/tharsis/ethermint/x/evm/types"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/server"
	txtypes "github.com/cosmos/cosmos-sdk/types/tx"
	"github.com/tharsis/ethermint/rpc/ethereum/backend"
	rpctypes "github.com/tharsis/ethermint/rpc/ethereum/types"
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
func (e *AnconAPIHandler) SendRawTransaction(data hexutil.Bytes) (string, error) {
	e.logger.Debug("ancon_sendSignTx")

	// RLP decode raw transaction bytes
	tx, err := e.clientCtx.TxConfig.TxDecoder()(data)
	if err != nil {
		e.logger.Error("transaction decoding failed", "error", err.Error())

		return "", err
	}

	ethereumTx, isEthTx := tx.(*evmtypes.MsgEthereumTx)
	if !isEthTx {
		e.logger.Debug("invalid transaction type", "type", fmt.Sprintf("%T", tx))
		return "", fmt.Errorf("invalid transaction type %T", tx)
	}

	if err := ethereumTx.ValidateBasic(); err != nil {
		e.logger.Debug("tx failed basic validation", "error", err.Error())
		return "", err
	}

	// builder, ok := e.clientCtx.TxConfig.NewTxBuilder().(authtx.ExtensionOptionsTxBuilder)
	// if !ok {
	// 	e.logger.Error("clientCtx.TxConfig.NewTxBuilder returns unsupported builder")
	// }

	// option, err := codectypes.NewAnyWithValue(&evmtypes.ExtensionOptionsEthereumTx{})
	// if err != nil {
	// 	e.logger.Error("codectypes.NewAnyWithValue failed to pack an obvious value", "error", err.Error())
	// }

	// builder.SetExtensionOptions(option)
	// err = builder.SetMsgs(tx.GetMsgs()...)
	// if err != nil {
	// 	e.logger.Error("builder.SetMsgs failed", "error", err.Error())
	// }
	// // https://github.com/ethereum/go-ethereum/blob/master/accounts/abi/unpack_test.go
	def := fmt.Sprintf(`[{ "name" : "method", "type": "function", "outputs": %s}]`,
		`[{"name": "raw", "type": "bytes"}]`)
	abi, err := abi.JSON(strings.NewReader(def))
	if err != nil {
		return "", fmt.Errorf("invalid ABI definition %s: %v", def, err)
	}
	encb := ethereumTx.Data.Value
	if err != nil {
		return "", fmt.Errorf("invalid hex %s: %v", encb, err)
	}
	var txr txtypes.TxRaw
	err = abi.UnpackIntoInterface(&txr, "method", encb)
	e.logger.Error("%v", txr)
	if err != nil {
		return "", err
	}

	// var signedDoc txtypes.SignDoc
	// err = json.Unmarshal((packed["signed"]), &signedDoc)
	// if err != nil {
	// 	return "", err
	// }
	// var signatures [][]byte
	// err = json.Unmarshal((packed["signatures"]), &signatures)
	// if err != nil {
	// 	return "", err
	// }

	// txr := txtypes.TxRaw{
	// 	BodyBytes:     signedDoc.BodyBytes,
	// 	AuthInfoBytes: signedDoc.AuthInfoBytes,
	// 	Signatures:    signatures,
	// }

	rawbt, err := txr.Marshal()
	if err != nil {
		return "", err
	}
	e.logger.Error("%v", rawbt)
	syncCtx := e.clientCtx.WithBroadcastMode(flags.BroadcastSync)
	rsp, err := syncCtx.BroadcastTx(rawbt)

	if err != nil || rsp.Code != 0 {
		if err == nil {
			err = errors.New(rsp.RawLog)
		}
		e.logger.Error("failed to broadcast tx", "error", err.Error())
		return rsp.TxHash, err
	}
	return rsp.TxHash, nil
}
