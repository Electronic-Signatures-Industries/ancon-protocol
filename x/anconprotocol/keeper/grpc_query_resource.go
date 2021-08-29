package keeper

import (
	"bytes"
	"context"
	"io"

	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/anconprotocol/types"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	cid "github.com/ipfs/go-cid"
	"github.com/ipld/go-ipld-prime"
	"github.com/ipld/go-ipld-prime/codec/dagcbor"
	"github.com/ipld/go-ipld-prime/linking"
	cidlink "github.com/ipld/go-ipld-prime/linking/cid"
	basicnode "github.com/ipld/go-ipld-prime/node/basic"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) Read(goCtx context.Context, req *types.QueryResourceRequest) (*types.QueryResourceResponse, error) {
	return k.Resource(goCtx, req)
}
func (k Keeper) ReadWithPath(goCtx context.Context, req *types.QueryResourceRequest) (*types.QueryResourceResponse, error) {
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

func (k *Keeper) GetObject(ctx sdk.Context, req *types.QueryResourceRequest) (*types.QueryResourceResponse, error) {

	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "empty request")
	}

	lnk, err := cid.Parse(req.Cid)
	if err != nil {
		return nil, status.Error(
			codes.InvalidArgument,
			types.ErrIntOverflowQuery.Error(),
		)
	} //Do a separate function

	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte("ancon"))
	has := store.Has([]byte(lnk.String()))

	if !has {
		return nil, status.Error(codes.NotFound, "not found")
	}
	lsys := cidlink.DefaultLinkSystem()

	lsys.StorageReadOpener = func(lnkCtx ipld.LinkContext, link ipld.Link) (io.Reader, error) {
		store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte("ancon"))
		buf := store.Get([]byte(link.String()))
		return bytes.NewReader(buf), nil
	}

	np := basicnode.Prototype.Any

	n, err := lsys.Load(
		linking.LinkContext{},
		cidlink.Link{Cid: lnk}, // The Link we want to load!
		np,                     // The NodePrototype says what kind of Node we want as a result.
	)
	var bufdata bytes.Buffer
	_ = dagcbor.Encode(n, &bufdata)

	return &types.QueryResourceResponse{
		Data: bufdata.String(),
	}, nil
}

func (k Keeper) ReadCBOR(ctx sdk.Context, req *types.QueryResourceRequest) ([]byte, error) {

	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "empty request")
	}

	lnk, err := cid.Parse(req.Cid)
	if err != nil {
		return nil, status.Error(
			codes.InvalidArgument,
			types.ErrIntOverflowQuery.Error(),
		)
	} //Do a separate function

	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte("ancon"))
	has := store.Has([]byte(lnk.String()))

	if !has {
		return nil, status.Error(codes.NotFound, "not found")
	}
	lsys := cidlink.DefaultLinkSystem()

	lsys.StorageReadOpener = func(lnkCtx ipld.LinkContext, link ipld.Link) (io.Reader, error) {
		store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte("ancon"))
		buf := store.Get([]byte(link.String()))
		return bytes.NewReader(buf), nil
	}

	np := basicnode.Prototype.Any

	n, err := lsys.Load(
		linking.LinkContext{},
		cidlink.Link{Cid: lnk},
		np,
	)
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, "failed parsing data")
	}
	var bufdata bytes.Buffer
	err = dagcbor.Encode(n, &bufdata)

	if err != nil {
		return nil, status.Error(codes.InvalidArgument, "failed decoding cbor")
	}

	return bufdata.Bytes(), nil
}
