package keeper

import (
	"bytes"
	"context"
	"encoding/json"
	"io"

	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/anconprotocol/types"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/fxamacker/cbor/v2"
	cid "github.com/ipfs/go-cid"
	"github.com/ipld/go-ipld-prime"
	"github.com/ipld/go-ipld-prime/codec/dagcbor"
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

	// We'll need to decide what in-memory implementation of ipld.Node we want to use.
	//  Here, we'll use the "basicnode" implementation.  This is a good getting-started choice.
	//   But you could also use other implementations, or even a code-generated type with special features!
	np := basicnode.Prototype.Any

	// Before we use the LinkService, NOTE:
	//  There's a side-effecting import at the top of the file.  It's for the dag-cbor codec.
	//  See the comments in ExampleStoringLink for more discussion of this and why it's important.

	lsys.TrustedStorage = true

	// Choose all the parts.
	decoder, err := lsys.DecoderChooser(cidlink.Link{Cid: lnk})
	if err != nil {
		ctx.Logger().Error("could not choose a decoder", err)
	}
	if lsys.StorageReadOpener == nil {
		ctx.Logger().Error("no storage configured for reading", io.ErrClosedPipe)
	}
	// Open storage, read it, verify it, and feed the codec to assemble the nodes.
	// TrustaedStorage indicates the data coming out of this reader has already been hashed and verified earlier.
	// As a result, we can skip rehashing it
	//	var n ipld.Node
	nb := np.NewBuilder()
	if lsys.TrustedStorage {
		store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte("ancon"))
		buf := store.Get([]byte(lnk.String()))
		decoder(nb, bytes.NewReader(buf))
	}
	n := nb.Build()

	var bufdata bytes.Buffer
	_ = dagcbor.Encode(n, &bufdata)

	//em, err := opts.EncMode()
	var temp map[string]string
	cbor.Unmarshal(bufdata.Bytes(), &temp)
	r, _ := json.Marshal(temp)

	return &types.QueryResourceResponse{
		Data: string(r),
	}, nil
}
