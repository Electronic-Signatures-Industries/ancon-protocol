package keeper

import (
	"bytes"
	"context"
	"encoding/base64"
	"encoding/json"
	"net/http"

	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/anconprotocol/exported"
	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/anconprotocol/types"
	ics23 "github.com/confio/ics23/go"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/fxamacker/cbor/v2"
	"github.com/golang/protobuf/proto"
	"github.com/grpc-ecosystem/grpc-gateway/runtime"
	"github.com/ipld/go-ipld-prime/codec/dagcbor"
	rpcclient "github.com/tendermint/tendermint/rpc/client"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

var (
	// TODO: add queries for cross minting
	ReadRoyaltyInfoQuery = runtime.MustPattern(runtime.NewPattern(1, []int{2, 0, 2, 1, 1, 0, 4, 1, 5, 2, 1, 0, 4, 1, 5, 3}, []string{"ancon", "royalty", "cid", "price"}, "", runtime.AssumeColonVerbOpt(true)))
	ReadWithPathQuery    = runtime.MustPattern(runtime.NewPattern(1, []int{2, 0, 1, 0, 4, 1, 5, 1, 1, 0, 4, 1, 5, 2}, []string{"ancon", "cid", "path"}, "", runtime.AssumeColonVerbOpt(true)))
	ReadQuery            = runtime.MustPattern(runtime.NewPattern(1, []int{2, 0, 1, 0, 4, 1, 5, 1}, []string{"ancon", "cid"}, "", runtime.AssumeColonVerbOpt(true)))
)

// func (k Keeper) ReadRoyaltyInfo(goCtx context.Context, req *types.QueryReadRoyaltyInfo) (*types.QueryReadRoyaltyInfoResponse, error) {
// 	return &types.QueryReadRoyaltyInfoResponse{}, nil
// }

// func (k Keeper) ReadRoyaltyInfo(goCtx context.Context, req *types.QueryReadRoyaltyInfo) (*types.QueryReadRoyaltyInfoResponse, error) {
// 	return &types.QueryReadRoyaltyInfoResponse{}, nil
// }

func (k Keeper) ReadRoyaltyInfo(goCtx context.Context, req *types.QueryReadRoyaltyInfo) (*types.QueryReadRoyaltyInfoResponse, error) {
	return &types.QueryReadRoyaltyInfoResponse{}, nil
}

func (k Keeper) Read(goCtx context.Context, req *types.QueryResourceRequest) (*types.QueryResourceResponse, error) {
	return k.Resource(goCtx, req)
}
func (k Keeper) ReadWithPath(goCtx context.Context, req *types.QueryResourceRequest) (*types.QueryResourceResponse, error) {
	return k.Resource(goCtx, req)
}
func (k Keeper) ReadFile(goCtx context.Context, req *types.QueryResourceRequest) (*types.QueryResourceResponse, error) {
	return k.Resource(goCtx, req)
}

func (k Keeper) Resource(goCtx context.Context, req *types.QueryResourceRequest) (*types.QueryResourceResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: validate cid
	// if !k.HasMultihash(ctx, req.Cid) {
	// 	return nil, sdkerrors.ErrKeyNotFound
	// }

	// TODO: get ipld object (path traversal later)
	return k.GetObject(ctx, req)
}

// GetVoucher returns stored voucher
func (k Keeper) GetVoucher(ctx sdk.Context, voucherID string) (*types.Voucher, error) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.VoucherStoreKey))

	buf := store.Get([]byte(voucherID))
	var voucher types.Voucher
	k.cdc.MustUnmarshalJSON(buf, &voucher)

	return &voucher, nil
}

// GetVoucherProof returns stored voucher proof
func (k Keeper) GetVoucherProof(ctx sdk.Context, path string, abci rpcclient.ABCIClient, voucherID string) (*ics23.ExistenceProof, error) {
	opts := rpcclient.ABCIQueryOptions{
		Height: ctx.BlockHeight(),
		Prove:  true,
	}

	_, proofA, _, err := exported.GetProofsByKey(abci, path, []byte(voucherID), opts, true)
	if err != nil {
		return nil, err
	}
	return proofA, nil
}

func requestReadWithPath(ctx context.Context, marshaler runtime.Marshaler, client types.QueryClient, req *http.Request, pathParams map[string]string) (proto.Message, runtime.ServerMetadata, error) {
	var protoReq types.QueryResourceRequest
	var metadata runtime.ServerMetadata

	var (
		val string
		ok  bool
		err error
		_   = err
	)

	val, ok = pathParams["cid"]
	if !ok {
		return nil, metadata, status.Errorf(codes.InvalidArgument, "missing parameter %s", "cid")
	}

	protoReq.Cid, err = runtime.String(val)

	if err != nil {
		return nil, metadata, status.Errorf(codes.InvalidArgument, "type mismatch, parameter: %s, error: %v", "cid", err)
	}

	val, ok = pathParams["path"]
	if !ok {
		return nil, metadata, status.Errorf(codes.InvalidArgument, "missing parameter %s", "path")
	}

	protoReq.Path, err = runtime.String(val)

	if err != nil {
		return nil, metadata, status.Errorf(codes.InvalidArgument, "type mismatch, parameter: %s, error: %v", "path", err)
	}

	msg, err := client.ReadWithPath(ctx, &protoReq, grpc.Header(&metadata.HeaderMD), grpc.Trailer(&metadata.TrailerMD))
	return msg, metadata, err

}

// RegisterQueryHandlerClient registers the http handlers for service Query
// to "mux". The handlers forward requests to the grpc endpoint over the given implementation of "QueryClient".
// Note: the gRPC framework executes interceptors within the gRPC handler. If the passed in "QueryClient"
// doesn't go through the normal gRPC flow (creating a gRPC client etc.) then it will be up to the passed in
// "QueryClient" to call the correct interceptors.
func RegisterQueryAnconHandler(ctx context.Context, mux *runtime.ServeMux, client types.QueryClient, abci rpcclient.ABCIClient) error {

	mux.Handle("GET", ReadWithPathQuery, func(w http.ResponseWriter, req *http.Request, pathParams map[string]string) {

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

		if instance.Kind == "file" {
			var instance types.IPLDFileStore
			_ = cbor.Unmarshal(cborPayload, &instance)
			jsonbytes, err := json.Marshal(instance)
			if err != nil {
				runtime.HTTPError(ctx, mux, outboundMarshaler, w, req, err)
				return
			}
			w.Header().Set("Content-Type", "application/json")
			w.Write(jsonbytes)
		} else {
			jsonbytes, err := json.Marshal(instance)
			if err != nil {
				runtime.HTTPError(ctx, mux, outboundMarshaler, w, req, err)
				return
			}
			w.Header().Set("Content-Type", "application/json")
			w.Write(jsonbytes)
		}
	})

	return nil
}

func (k *Keeper) GetObject(ctx sdk.Context, req *types.QueryResourceRequest) (*types.QueryResourceResponse, error) {

	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "empty request")
	}

	n, err := k.GetMetadata(ctx, req.Cid, req.Path)
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, "failed to get metadata")
	}
	var bufdata bytes.Buffer
	_ = dagcbor.Encode(n, &bufdata)

	return &types.QueryResourceResponse{
		Data: base64.RawStdEncoding.EncodeToString(bufdata.Bytes()),
	}, nil
}
