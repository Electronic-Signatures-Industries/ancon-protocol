package keeper

import (
	"context"
	"encoding/base64"
	"encoding/json"
	"net/http"

	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/anconprotocol/types"
	"github.com/fxamacker/cbor/v2"
	"github.com/golang/protobuf/proto"
	"github.com/grpc-ecosystem/grpc-gateway/runtime"
)

var _ types.QueryServer = Keeper{}

// AnconQueryRequestFunc
type AnconQueryRequestFunc func(ctx context.Context, marshaler runtime.Marshaler, client types.QueryClient, req *http.Request, pathParams map[string]string) (proto.Message, runtime.ServerMetadata, error)

func wrapDagCborResult(ctx context.Context, mux *runtime.ServeMux, client types.QueryClient, requestQuery AnconQueryRequestFunc) (h runtime.HandlerFunc) {
	return func(w http.ResponseWriter, req *http.Request, pathParams map[string]string) {
		ctx, cancel := context.WithCancel(req.Context())
		defer cancel()
		inboundMarshaler, outboundMarshaler := runtime.MarshalerForRequest(mux, req)
		rctx, err := runtime.AnnotateContext(ctx, mux, req)
		if err != nil {
			runtime.HTTPError(ctx, mux, outboundMarshaler, w, req, err)
			return
		}
		resp, md, err := requestReadWithPath(rctx, inboundMarshaler, client, req, pathParams)
		ctx = runtime.NewServerMetadataContext(ctx, md)
		if err != nil {
			runtime.HTTPError(ctx, mux, outboundMarshaler, w, req, err)
			return
		}

		// 1) From json.data base64 to CBOR
		cborPayload, errdecode := base64.RawStdEncoding.DecodeString(resp.(*types.QueryResourceResponse).Data)

		if errdecode != nil {
			runtime.HTTPError(ctx, mux, outboundMarshaler, w, req, errdecode)
			return
		}

		// 2) From CBOR to STRUCT with json mapping to json bytes
		var instance types.IPLDMetadataStore
		_ = cbor.Unmarshal(cborPayload, &instance)

		jsonbytes, err := json.Marshal(instance)
		if err != nil {
			runtime.HTTPError(ctx, mux, outboundMarshaler, w, req, err)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		w.Write(jsonbytes)
	}
}
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
