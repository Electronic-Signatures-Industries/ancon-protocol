package keeper

import (
	"bytes"
	"context"
	"net/http"

	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/anconprotocol/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/golang/protobuf/proto"
	"github.com/grpc-ecosystem/grpc-gateway/runtime"
	"github.com/hyperledger/aries-framework-go/pkg/doc/did"
	"github.com/ipld/go-ipld-prime/codec/dagjson"
	"github.com/tendermint/tendermint/rpc/client"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

var (
	ReadDidKeyQuery = runtime.MustPattern(runtime.NewPattern(1, []int{2, 0, 1, 0, 4, 1, 5, 1}, []string{"didregistry", "hashcid"}, "", runtime.AssumeColonVerbOpt(true)))

	ReadResolveDidWebQuery = runtime.MustPattern(runtime.NewPattern(1, []int{2, 0, 1, 0, 4, 1, 5, 1, 2, 2}, []string{"user", "name", "did.json"}, "", runtime.AssumeColonVerbOpt(true)))

	ReadIdentifyOwnerQuery = runtime.MustPattern(runtime.NewPattern(1, []int{2, 0, 2, 1, 1, 0, 4, 1, 5, 2}, []string{"ancon", "didregistry", "address"}, "", runtime.AssumeColonVerbOpt(true)))

	ReadGetAttributesQuery = runtime.MustPattern(runtime.NewPattern(1, []int{2, 0, 2, 1, 1, 0, 4, 1, 5, 2, 2, 3}, []string{"ancon", "didregistry", "address", "attributes"}, "", runtime.AssumeColonVerbOpt(true)))

	ReadDelegateQuery = runtime.MustPattern(runtime.NewPattern(1, []int{2, 0, 2, 1, 2, 2, 1, 0, 4, 1, 5, 3}, []string{"ancon", "didregistry", "delegates", "id"}, "", runtime.AssumeColonVerbOpt(true)))
)

func RegisterQueryDidRegistryHandler(ctx context.Context, mux *runtime.ServeMux, client types.QueryClient, abci client.ABCIClient) error {

	mux.Handle("GET", ReadIdentifyOwnerQuery, wrapJsonResult(ctx, mux, client, readIdentifyOwner))
	mux.Handle("GET", ReadGetAttributesQuery, wrapJsonResult(ctx, mux, client, readGetAttributes))
	mux.Handle("GET", ReadDelegateQuery, wrapJsonResult(ctx, mux, client, readDelegate))

	mux.Handle("GET", ReadDidKeyQuery, wrapRawJsonResult(ctx, mux, client, readDidKey))
	mux.Handle("GET", ReadResolveDidWebQuery, wrapRawJsonResult(ctx, mux, client, readResolveWeb))
	return nil
}

func readIdentifyOwner(ctx context.Context, marshaler runtime.Marshaler, client types.QueryClient, req *http.Request, pathParams map[string]string) (proto.Message, runtime.ServerMetadata, error) {
	var protoReq types.QueryIdentifyOwnerRequest
	var metadata runtime.ServerMetadata

	var (
		val string
		ok  bool
		err error
		_   = err
	)

	val, ok = pathParams["address"]
	if !ok {
		return nil, metadata, status.Errorf(codes.InvalidArgument, "missing parameter %s", "address")
	}

	protoReq.Address, err = runtime.String(val)

	if err != nil {
		return nil, metadata, status.Errorf(codes.InvalidArgument, "type mismatch, parameter: %s, error: %v", "address", err)
	}
	msg, err := client.IdentifyOwner(ctx, &protoReq, grpc.Header(&metadata.HeaderMD), grpc.Trailer(&metadata.TrailerMD))
	return msg, metadata, err

}

func readResolveWeb(ctx context.Context, marshaler runtime.Marshaler, client types.QueryClient, req *http.Request, pathParams map[string]string) (proto.Message, runtime.ServerMetadata, error) {
	var protoReq types.QueryDidWebRequest
	var metadata runtime.ServerMetadata

	var (
		val string
		ok  bool
		err error
		_   = err
	)

	val, ok = pathParams["name"]
	if !ok {
		return nil, metadata, status.Errorf(codes.InvalidArgument, "missing parameter %s", "name")
	}

	protoReq.Name, err = runtime.String(val)

	if err != nil {
		return nil, metadata, status.Errorf(codes.InvalidArgument, "type mismatch, parameter: %s, error: %v", "id", err)
	}

	msg, err := client.ResolveDidWeb(ctx, &protoReq, grpc.Header(&metadata.HeaderMD), grpc.Trailer(&metadata.TrailerMD))
	return msg, metadata, err

}
func readDelegate(ctx context.Context, marshaler runtime.Marshaler, client types.QueryClient, req *http.Request, pathParams map[string]string) (proto.Message, runtime.ServerMetadata, error) {
	var protoReq types.QueryGetDelegateRequest
	var metadata runtime.ServerMetadata

	var (
		val string
		ok  bool
		err error
		_   = err
	)

	val, ok = pathParams["id"]
	if !ok {
		return nil, metadata, status.Errorf(codes.InvalidArgument, "missing parameter %s", "id")
	}

	protoReq.Id, err = runtime.String(val)

	if err != nil {
		return nil, metadata, status.Errorf(codes.InvalidArgument, "type mismatch, parameter: %s, error: %v", "id", err)
	}

	msg, err := client.ReadDelegate(ctx, &protoReq, grpc.Header(&metadata.HeaderMD), grpc.Trailer(&metadata.TrailerMD))
	return msg, metadata, err

}
func readGetAttributes(ctx context.Context, marshaler runtime.Marshaler, client types.QueryClient, req *http.Request, pathParams map[string]string) (proto.Message, runtime.ServerMetadata, error) {
	var protoReq types.QueryGetAttributesRequest
	var metadata runtime.ServerMetadata

	var (
		val string
		ok  bool
		err error
		_   = err
	)

	val, ok = pathParams["address"]
	if !ok {
		return nil, metadata, status.Errorf(codes.InvalidArgument, "missing parameter %s", "address")
	}

	protoReq.Address, err = runtime.String(val)

	if err != nil {
		return nil, metadata, status.Errorf(codes.InvalidArgument, "type mismatch, parameter: %s, error: %v", "address", err)
	}

	msg, err := client.GetAttributes(ctx, &protoReq, grpc.Header(&metadata.HeaderMD), grpc.Trailer(&metadata.TrailerMD))
	return msg, metadata, err

}
func readDidKey(ctx context.Context, marshaler runtime.Marshaler, client types.QueryClient, req *http.Request, pathParams map[string]string) (proto.Message, runtime.ServerMetadata, error) {
	var protoReq types.QueryGetDidRequest
	var metadata runtime.ServerMetadata

	var (
		val string
		ok  bool
		err error
		_   = err
	)

	val, ok = pathParams["hashcid"]
	if !ok {
		return nil, metadata, status.Errorf(codes.InvalidArgument, "missing parameter %s", "hashcid")
	}

	protoReq.Hashcid, err = runtime.String(val)

	if err != nil {
		return nil, metadata, status.Errorf(codes.InvalidArgument, "type mismatch, parameter: %s, error: %v", "hashcid", err)
	}
	msg, err := client.GetDidKey(ctx, &protoReq, grpc.Header(&metadata.HeaderMD), grpc.Trailer(&metadata.TrailerMD))
	return msg, metadata, err

}

func (k Keeper) GetAttributes(goCtx context.Context, req *types.QueryGetAttributesRequest) (*types.QueryGetAttributesResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	attr := k.GetAttribute(ctx, req.Address)
	return &types.QueryGetAttributesResponse{
		Name:  attr.Name,
		Value: attr.Value,
	}, nil
}

func (k Keeper) IdentifyOwner(goCtx context.Context, req *types.QueryIdentifyOwnerRequest) (*types.QueryIdentifyOwnerResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Process the query
	_ = ctx

	return &types.QueryIdentifyOwnerResponse{}, nil
}

func (k Keeper) ReadDelegate(goCtx context.Context, req *types.QueryGetDelegateRequest) (*types.QueryGetDelegateResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	de := k.GetDelegate(ctx, req.Id)

	return &types.QueryGetDelegateResponse{
		Delegate:     de.Delegate,
		DelegateType: de.DelegateType,
		Validity:     de.Validity,
		Creator:      de.Creator,
	}, nil
}

// GetDidKey
func (k Keeper) GetDidKey(goCtx context.Context, req *types.QueryGetDidRequest) (*types.QueryDidResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	node, err := k.ReadAnyDid(ctx, req.Hashcid)
	if err != nil {
		return nil, status.Error(codes.NotFound, "Missing did key hash")
	}
	var bufdata bytes.Buffer
	_ = dagjson.Encode(node, &bufdata)

	d, err := did.ParseDocument(bufdata.Bytes())

	if err != nil {
		return nil, err
	}
	jsonbytes, err := d.JSONBytes()
	return &types.QueryDidResponse{Data: jsonbytes}, nil
}

// ResolveDidWeb
func (k Keeper) ResolveDidWeb(goCtx context.Context, req *types.QueryDidWebRequest) (*types.QueryDidResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	node, err := k.GetDidWebRoute(ctx, req.Name)
	if err != nil {
		return nil, status.Error(codes.NotFound, "Missing did route")
	}

	var bufdata bytes.Buffer
	_ = dagjson.Encode(node, &bufdata)

	d, err := did.ParseDocument(bufdata.Bytes())

	if err != nil {
		return nil, err
	}
	jsonbytes, err := d.JSONBytes()
	return &types.QueryDidResponse{Data: jsonbytes}, nil
}
