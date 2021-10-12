package ancon

import (
	"encoding/hex"
	"encoding/json"

	"github.com/ethereum/go-ethereum/common/hexutil"
	"github.com/ethereum/go-ethereum/rlp"
	"github.com/pkg/errors"
	"github.com/tendermint/tendermint/libs/log"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/server"

	txtypes "github.com/cosmos/cosmos-sdk/types/tx"
	ethtypes "github.com/ethereum/go-ethereum/core/types"
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
func (e *AnconAPIHandler) SendRawTransaction(data string) (string, error) {
	e.logger.Debug("ancon_sendSignTx")

	ethToHex := hexutil.MustDecode(data)
	tx := new(ethtypes.Transaction)
	rlp.DecodeBytes(ethToHex, &tx)
	sdkPayload := tx.Data()
	sdkToHex, err := hex.DecodeString(string(sdkPayload))

	if err != nil {
		return "", err
	}
	var payload txtypes.TxRaw

	if err := json.Unmarshal(sdkToHex, &payload); err != nil {
		e.logger.Error("failed to query evm params", "error", err.Error())
	}

	syncCtx := e.clientCtx.WithBroadcastMode(flags.BroadcastSync)
	rsp, err := syncCtx.BroadcastTx(sdkToHex)

	if err != nil || rsp.Code != 0 {
		if err == nil {
			err = errors.New(rsp.RawLog)
		}
		e.logger.Error("failed to broadcast tx", "error", err.Error())
		return rsp.TxHash, err
	}
	return rsp.TxHash, nil
}
