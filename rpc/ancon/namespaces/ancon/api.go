package ancon

import (
	"encoding/json"

	"github.com/ethereum/go-ethereum/common/hexutil"
	"github.com/pkg/errors"
	"github.com/tendermint/tendermint/libs/log"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/server"

	"github.com/tharsis/ethermint/rpc/ethereum/backend"
	rpctypes "github.com/tharsis/ethermint/rpc/ethereum/types"

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

func (e *AnconAPIHandler) GetBlockTransactionCountByHash(hash string) error {
	return nil
}

// SendSignTx
func (e *AnconAPIHandler) SendSignTx(data string) error {
	e.logger.Debug("ancon_sendSignTx")

	msgEthTx, err := rpctypes.RawTxToEthTx(e.clientCtx, []byte(data))
	if err != nil {
		return err
	}
	dataToString := hexutil.MustDecode(string(msgEthTx.AsTransaction().Data()))
	var raw map[string]interface{}

	if err := json.Unmarshal([]byte(dataToString), &raw); err != nil {
		e.logger.Error("failed to query evm params", "error", err.Error())
	}

	signdoc := txtypes.SignDoc{
		BodyBytes:     raw["bodyBytes"].([]byte),
		AuthInfoBytes: raw["authInfoBytes"].([]byte),
		ChainId:       msgEthTx.AsTransaction().ChainId().String(),
		AccountNumber: raw["accountNumber"].(uint64),
	}

	var buff []byte
	signdoc.Unmarshal(buff)

	signdocmar, err := signdoc.Marshal()

	if err != nil {
		return err
	}
	syncCtx := e.clientCtx.WithBroadcastMode(flags.BroadcastSync)
	rsp, err := syncCtx.BroadcastTx(signdocmar)

	if err != nil || rsp.Code != 0 {
		if err == nil {
			err = errors.New(rsp.RawLog)
		}
		e.logger.Error("failed to broadcast tx", "error", err.Error())
		return err
	}
	return nil
}
