package rest

import (
	"context"
	"net/http"

	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/anconprotocol/types"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/gorilla/mux"
)

// REST Variable names
// nolint
const (
	RestCIDKey  = "cid"
	RestPathKey = "path"
)

// AnconRestHandler defines a REST handler implemented in another module. The
// sub-route is mounted on the governance REST handler.
type AnconRestHandler struct {
	SubRoute string
	Handler  func(http.ResponseWriter, *http.Request)
}

func RegisterHandlers(clientCtx client.Context, ctx context.Context, r *mux.Router, client types.QueryClient) {
	registerQueryRoutes(clientCtx, ctx, r, client)
	// registerTxHandlers(clientCtx, r, phs)
}
