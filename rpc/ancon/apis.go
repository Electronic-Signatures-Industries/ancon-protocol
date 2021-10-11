package ancon

import (
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/server"
	"github.com/ethereum/go-ethereum/rpc"

	rpcclient "github.com/tendermint/tendermint/rpc/jsonrpc/client"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/server"

	"github.com/tharsis/ethermint/ethereum/rpc/backend"
	"github.com/tharsis/ethermint/ethereum/rpc/namespaces/eth"
	"github.com/tharsis/ethermint/ethereum/rpc/namespaces/eth/filters"
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
	// remove duplicates
	selectedAPIs = unique(selectedAPIs)

	for index := range selectedAPIs {
		switch selectedAPIs[index] {
		case AnconNamespace:
			apis = append(apis,
				rpc.API{
					Namespace: AnconNamespace,
					Version:   apiVersion,
					Service:   eth.NewPublicAPI(ctx.Logger, clientCtx, evmBackend, nonceLock),
					Public:    true,
				},
			)

		case GraphsyncNamespace:
			apis = append(apis,
				rpc.API{
					Namespace: GraphsyncNamespace,
					Version:   apiVersion,
					Service:   eth.NewPublicAPI(ctx.Logger, clientCtx, evmBackend, nonceLock),
					Public:    true,
				},
				rpc.API{
					Namespace: EthNamespace,
					Version:   apiVersion,
					Service:   filters.NewPublicAPI(ctx.Logger, tmWSClient, evmBackend),
					Public:    true,
				},
			)
		default:
			ctx.Logger.Error("invalid namespace value", "namespace", selectedAPIs[index])
		}
	}

	return apis
}

func unique(intSlice []string) []string {
	keys := make(map[string]bool)
	var list []string
	for _, entry := range intSlice {
		if _, value := keys[entry]; !value {
			keys[entry] = true
			list = append(list, entry)
		}
	}
	return list
}
