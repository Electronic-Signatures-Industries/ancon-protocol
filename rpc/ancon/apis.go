package ancon

import (
	ancon "github.com/Electronic-Signatures-Industries/ancon-protocol/rpc/ancon/namespaces/ancon"
	gsync "github.com/Electronic-Signatures-Industries/ancon-protocol/rpc/ancon/namespaces/graphsync"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/server"
	"github.com/ethereum/go-ethereum/rpc"
	"github.com/tharsis/ethermint/rpc/ethereum/backend"

	rpcclient "github.com/tendermint/tendermint/rpc/jsonrpc/client"
)

// RPC namespaces and API version
const (
	AnconNamespace     = "ancon"
	GraphsyncNamespace = "graphsync"

	apiVersion = "1.0"
)

// GetRPCAPIs returns the list of all APIs
func GetRPCAPIs(ctx *server.Context,
	clientCtx client.Context,
	tmWSClient *rpcclient.WSClient,

	selectedAPIs []string) []rpc.API {
	// nonceLock := new(types.AddrLocker)
	evmBackend := backend.NewEVMBackend(ctx, ctx.Logger, clientCtx)

	var apis []rpc.API
	apis = append(apis,
		rpc.API{
			Namespace: AnconNamespace,
			Version:   apiVersion,
			Service:   ancon.NewAPIHandler(ctx, ctx.Logger, clientCtx, evmBackend),
			Public:    true,
		},
		rpc.API{
			Namespace: GraphsyncNamespace,
			Version:   apiVersion,
			Service:   gsync.NewAPIHandler(ctx, ctx.Logger, clientCtx, evmBackend),
			Public:    true,
		},
	)

	return apis
}
