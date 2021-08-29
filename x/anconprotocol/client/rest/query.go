package rest

import (
	"fmt"

	"github.com/cosmos/cosmos-sdk/client"

	"net/http"

	types "github.com/Electronic-Signatures-Industries/ancon-protocol/x/anconprotocol/types"

	"context"

	"github.com/gorilla/mux"
	"github.com/grpc-ecosystem/grpc-gateway/runtime"
)

func registerQueryRoutes(clientCtx client.Context, context context.Context, r *mux.Router, queryClient types.QueryClient) {

	//	r.HandleFunc(fmt.Sprintf("/ancon/{%s}/{%s}", RestCIDKey, RestPathKey), queryResourceFn(clientCtx, context, queryClient)).Methods("GET")
	r.HandleFunc(fmt.Sprintf("/ancon/{%s}", RestCIDKey), queryResourceFn(clientCtx, context, queryClient)).Methods("GET")
}

func queryResourceFn(cli client.Context, c context.Context, queryClient types.QueryClient) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		vars := mux.Vars(r)

		var protoReq types.QueryResourceRequest
		var (
			val string
			ok  bool
			err error
			_   = err
		)

		val, ok = vars[RestCIDKey]
		if !ok {
		}

		protoReq.Cid, err = runtime.String(val)

		if err != nil {
		}

		msg, err := queryClient.Read(
			c,
			&protoReq)

		w.Header().Set("Content-Type", "application/json")
		_, _ = w.Write([]byte(msg.Data))
	}
}
