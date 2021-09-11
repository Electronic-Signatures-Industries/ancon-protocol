package keeper

import (
	"context"
	"net/http"

	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/anconprotocol/types"
	"github.com/golang/protobuf/proto"
	"github.com/grpc-ecosystem/grpc-gateway/runtime"
)

var _ types.QueryServer = Keeper{}

// AnconQueryRequestFunc
type AnconQueryRequestFunc func(ctx context.Context, marshaler runtime.Marshaler, client types.QueryClient, req *http.Request, pathParams map[string]string) (proto.Message, runtime.ServerMetadata, error)

func wrapJsonResult(ctx context.Context, mux *runtime.ServeMux, client types.QueryClient, requestQuery AnconQueryRequestFunc) (h runtime.HandlerFunc) {
	return func(w http.ResponseWriter, req *http.Request, pathParams map[string]string) {

		ctx, cancel := context.WithCancel(req.Context())
		defer cancel()
		inboundMarshaler, outboundMarshaler := runtime.MarshalerForRequest(mux, req)
		rctx, err := runtime.AnnotateContext(ctx, mux, req)
		if err != nil {
			runtime.HTTPError(ctx, mux, outboundMarshaler, w, req, err)
			return
		}
		resp, md, err := requestQuery(rctx, inboundMarshaler, client, req, pathParams)
		ctx = runtime.NewServerMetadataContext(ctx, md)
		if err != nil {
			runtime.HTTPError(ctx, mux, outboundMarshaler, w, req, err)
			return
		}
		jsonbytes, err := outboundMarshaler.Marshal(resp)
		if err != nil {
			runtime.HTTPError(ctx, mux, outboundMarshaler, w, req, err)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		w.Write(jsonbytes)
	}
}
