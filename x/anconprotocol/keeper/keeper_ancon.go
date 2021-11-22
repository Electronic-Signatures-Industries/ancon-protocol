package keeper

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"os"

	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/anconprotocol/types"
	ibc "github.com/cosmos/ibc-go/v2/modules/core/23-commitment/types"
	"github.com/ethereum/go-ethereum/common/hexutil"
	"github.com/golang/protobuf/proto"
	"github.com/google/cel-go/cel"
	"github.com/google/cel-go/checker/decls"
	"github.com/multiformats/go-multihash"
	"github.com/qri-io/jsonschema"
	expr "google.golang.org/genproto/googleapis/api/expr/v1alpha1"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	ics23 "github.com/confio/ics23/go"
	"github.com/cosmos/cosmos-sdk/store"
	"github.com/cosmos/cosmos-sdk/store/cache"
	"github.com/cosmos/cosmos-sdk/store/iavl"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	cid "github.com/ipfs/go-cid"
	"github.com/ipfs/go-graphsync/ipldutil"
	"github.com/ipld/go-ipld-prime"
	_ "github.com/ipld/go-ipld-prime/codec/dagcbor"
	"github.com/ipld/go-ipld-prime/datamodel"
	"github.com/ipld/go-ipld-prime/fluent"
	"github.com/ipld/go-ipld-prime/linking"
	cidlink "github.com/ipld/go-ipld-prime/linking/cid"
	"github.com/ipld/go-ipld-prime/must"
	basicnode "github.com/ipld/go-ipld-prime/node/basic"
	"github.com/ipld/go-ipld-prime/traversal"
	"github.com/spf13/cast"
	abci "github.com/tendermint/tendermint/abci/types"
)

func (k Keeper) AddTrustedResource(ctx sdk.Context, msg *types.MsgMintTrustedResource) (string, error) {

	// Add Metadata Cid to NFT
	tokenID := fmt.Sprint(k.GetTotalSupply(ctx, msg.DenomId))
	denom, found := k.GetDenom(ctx, msg.DenomId)
	if !found {
		return "", sdkerrors.Wrapf(types.ErrInvalidDenom, "denom ID %s not exists", msg.DenomId)
	}

	if denom.MintRestricted && denom.Creator != msg.Creator {
		return "", sdkerrors.Wrapf(sdkerrors.ErrUnauthorized, "%s is not allowed to mint NFT of denom %s", denom.Creator, msg.DenomId)
	}

	if k.HasNFT(ctx, msg.DenomId, tokenID) {
		return "", sdkerrors.Wrapf(types.ErrNFTAlreadyExists, "NFT %s already exists in collection %s", tokenID, msg.DenomId)
	}

	k.setNFT(
		ctx, msg.DenomId,
		types.NewAnconNFT(
			tokenID,
			msg.Name,
			sdk.AccAddress(msg.Creator),
			msg.MetadataRef,
			msg.DidOwner,
			msg.Price,
		),
	)
	k.setOwner(ctx, msg.DenomId, tokenID, sdk.AccAddress(msg.Creator))
	k.increaseSupply(ctx, msg.DenomId)

	return tokenID, nil
}

func (k Keeper) AddTrustedContent(ctx sdk.Context, msg *types.MsgMintTrustedContent) (string, error) {

	// Add Metadata Cid to NFT
	tokenID := fmt.Sprint(k.GetTotalSupply(ctx, msg.DenomId))
	denom, found := k.GetDenom(ctx, msg.DenomId)
	if !found {
		return "", sdkerrors.Wrapf(types.ErrInvalidDenom, "denom ID %s not exists", msg.DenomId)
	}

	if denom.MintRestricted && denom.Creator != msg.Creator {
		return "", sdkerrors.Wrapf(sdkerrors.ErrUnauthorized, "%s is not allowed to mint NFT of denom %s", denom.Creator, msg.DenomId)
	}

	if k.HasNFT(ctx, msg.DenomId, tokenID) {
		return "", sdkerrors.Wrapf(types.ErrNFTAlreadyExists, "NFT %s already exists in collection %s", tokenID, msg.DenomId)
	}

	k.setNFT(
		ctx, msg.DenomId,
		types.NewAnconNFT(
			tokenID,
			msg.Name,
			sdk.AccAddress(msg.Creator),
			msg.MetadataRef,
			msg.DidOwner,
			msg.Price,
		),
	)
	k.setOwner(ctx, msg.DenomId, tokenID, sdk.AccAddress(msg.Creator))
	k.increaseSupply(ctx, msg.DenomId)
	return tokenID, nil

}

func (k Keeper) AddFile(ctx sdk.Context, msg *types.MsgFile) (string, error) {
	lsys := cidlink.DefaultLinkSystem()

	//   you just need a function that conforms to the ipld.BlockWriteOpener interface.
	lsys.StorageWriteOpener = func(lnkCtx ipld.LinkContext) (io.Writer, ipld.BlockWriteCommitter, error) {
		// change prefix
		buf := bytes.Buffer{}
		path := msg.Path
		return &buf, func(lnk ipld.Link) error {
			//Sample: bafyreie5m2h2ewlqllhps5mg6ekb62eft67gvyieqon6643obz5m7zdhcy/index.html
			//Sample: bafyreie5m2h2ewlqllhps5mg6ekb62eft67gvyieqon6643obz5m7zdhcy/json/index.html
			//Sample: bafyreie5m2h2ewlqllhps5mg6ekb62eft67gvyieqon6643obz5m7zdhcy/json/xml/index.html
			//Sample: bafyreie5m2h2ewlqllhps5mg6ekb62eft67gvyieqon6643obz5m7zdhcy
			id := append([]byte(lnk.String()), path...)
			store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte("ancon"))
			store.Set(id, buf.Bytes())
			return nil
		}, nil
	}

	// Add Document
	// Basic Node
	n := fluent.MustBuildMap(basicnode.Prototype.Map, 7, func(na fluent.MapAssembler) {
		na.AssembleEntry("path").AssignString(msg.Path)
		na.AssembleEntry("content").AssignString(msg.Content)
		na.AssembleEntry("mode").AssignString(msg.Mode)
		na.AssembleEntry("did").AssignString(msg.Did)

		na.AssembleEntry("time").AssignInt(cast.ToInt64(msg.Time))
		na.AssembleEntry("contentType").AssignString(msg.ContentType)
		na.AssembleEntry("kind").AssignString("file")
	})

	// tip: 0x0129 dag-json
	lp := cidlink.LinkPrototype{cid.Prefix{
		Version:  1,
		Codec:    0x71, // dag-cbor
		MhType:   0x12, // sha2-256
		MhLength: 32,   // sha2-256 hash has a 32-byte sum.
	}}

	link, err := lsys.Store(
		ipld.LinkContext{}, // The zero value is fine.  Configure it it you want cancellability or other features.
		lp,                 // The LinkPrototype says what codec and hashing to use.
		n,                  // And here's our data.
	)
	if err != nil {
		return "", err
	}

	// id, _ := cid.Decode(link.String())
	return link.String(), nil
}

// CreateCidLink takes a hash eg ethereum hash and converts it to cid multihash
func CreateCidLink(hash []byte) cidlink.Link {
	lchMh, err := multihash.Encode(hash, GetLinkPrototype().(cidlink.LinkPrototype).MhType)
	if err != nil {
		return cidlink.Link{}
	}
	lcCID := cid.NewCidV1(GetLinkPrototype().(cidlink.LinkPrototype).Codec, lchMh)
	lcLinkCID := cidlink.Link{Cid: lcCID}
	return lcLinkCID
}

// ParseCidLink parses a string cid multihash into a cidLink
func ParseCidLink(hash string) (cidlink.Link, error) {
	lnk, err := cid.Parse(hash)
	if err != nil {
		return cidlink.Link{}, status.Error(
			codes.InvalidArgument,
			types.ErrIntOverflowQuery.Error(),
		)
	}

	return cidlink.Link{Cid: lnk}, nil
}

func (k Keeper) AddMetadata(ctx sdk.Context, msg *types.MsgMetadata) (string, error) {
	lsys := cidlink.DefaultLinkSystem()

	//   you just need a function that conforms to the ipld.BlockWriteOpener interface.
	lsys.StorageWriteOpener = func(lnkCtx ipld.LinkContext) (io.Writer, ipld.BlockWriteCommitter, error) {
		// change prefix
		buf := bytes.Buffer{}
		return &buf, func(lnk ipld.Link) error {
			store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte("ancon"))
			k := []byte(lnk.String())
			v := buf.Bytes()
			store.Set(k, v)
			return nil
		}, nil
	}

	// Add Document
	n := fluent.MustBuildMap(basicnode.Prototype.Map, 10, func(na fluent.MapAssembler) {
		// TODO:
		na.AssembleEntry("name").AssignString(msg.Name)
		na.AssembleEntry("description").AssignString(msg.Description)
		na.AssembleEntry("image").AssignString(msg.Image)
		na.AssembleEntry("did").AssignString(msg.Did)
		if msg.VerifiedCredentialRef != "" {
			l, _ := cid.Parse(msg.VerifiedCredentialRef)
			na.AssembleEntry("verifiedCredentialRef").AssignLink(cidlink.Link{Cid: l})
		} else {
			na.AssembleEntry("verifiedCredentialRef").AssignString("")
		}
		na.AssembleEntry("owner").AssignString(msg.Owner)
		if msg.Parent != "" {
			p, _ := cid.Parse(msg.Parent)
			na.AssembleEntry("parent").AssignLink(cidlink.Link{Cid: p})
		} else {
			na.AssembleEntry("parent").AssignString("")
		}

		na.AssembleEntry("kind").AssignString("metadata")
		// Sources
		if len(msg.AdditionalSources) > 0 {

			na.AssembleEntry("sources").CreateList(cast.ToInt64(len(msg.AdditionalSources)), func(la fluent.ListAssembler) {
				for i := 0; i < len(msg.AdditionalSources); i++ {
					lnk, err := ParseCidLink((msg.AdditionalSources[i]))
					if err != nil {
						continue
					}
					la.AssembleValue().AssignString(lnk.Hash().B58String())
				}
			})
		} else {
			na.AssembleEntry("sources").AssignNull()
		}
		// Link
		if len(msg.Links) > 0 {

			na.AssembleEntry("links").CreateList(cast.ToInt64(len(msg.Links)), func(la fluent.ListAssembler) {
				for i := 0; i < len(msg.Links); i++ {

					lnk, err := ParseCidLink((msg.Links[i]))
					if err != nil {
						continue
					}
					la.AssembleValue().AssignLink(lnk)
				}
			})
		} else {
			na.AssembleEntry("links").AssignNull()
		}
	})

	// tip: 0x0129 dag-json
	lp := cidlink.LinkPrototype{cid.Prefix{
		Version:  1,
		Codec:    cid.DagCBOR, // dag-cbor
		MhType:   0x12,        // sha2-256
		MhLength: 32,          // sha2-256 hash has a 32-byte sum.
	}}

	link := lsys.MustStore(
		ipld.LinkContext{}, // The zero value is fine.  Configure it it you want cancellability or other features.
		lp,                 // The LinkPrototype says what codec and hashing to use.
		n)
	return link.String(), nil
}

func (k Keeper) GetMetadata(ctx sdk.Context, hash string, path string) (datamodel.Node, error) {
	lsys := cidlink.DefaultLinkSystem()

	lnk, err := cid.Parse(hash)
	if err != nil {
		return nil, status.Error(
			codes.InvalidArgument,
			types.ErrIntOverflowQuery.Error(),
		)
	}
	//  TODO: Do a separate function

	var id []byte
	if path != "" {
		id = append([]byte(lnk.String()), path...)
	} else {
		id = []byte(lnk.String())
	}
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte("ancon"))
	has := store.Has(id)

	if !has {
		return nil, status.Error(codes.NotFound, "not found")
	}

	lsys.StorageReadOpener = func(lnkCtx ipld.LinkContext, link ipld.Link) (io.Reader, error) {
		store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte("ancon"))
		buf := store.Get(id)
		return bytes.NewReader(buf), nil
	}

	// TODO: add a typesystem to read
	np := basicnode.Prototype.Any

	n, err := lsys.Load(
		linking.LinkContext{},
		cidlink.Link{Cid: lnk}, // The Link we want to load!
		np,                     // The NodePrototype says what kind of Node we want as a result.
	)

	return n, err
}

func (k Keeper) GetMetadataProof(ctx sdk.Context, hash, path string) ([]byte, *ibc.MerkleProof, error) {
	var id []byte
	if path != "" {
		id = append([]byte(hash), path...)
	} else {
		id = []byte(hash)
	}

	// used to catch panics
	defer func() { //catch or finally
		if err := recover(); err != nil { //catch
			fmt.Fprintf(os.Stderr, "Exception: %v\n", err)
			os.Exit(1)
		}
	}()

	// create cache manager to unwrap
	mngr := cache.NewCommitKVStoreCacheManager(cache.DefaultCommitKVStoreCacheSize)
	mngr.GetStoreCache(k.storeKey, k.cms.GetCommitKVStore(k.storeKey))
	iavlstore := mngr.Unwrap(k.storeKey).(*iavl.Store)

	queryableStore := store.Queryable(iavlstore)

	key := fmt.Sprintf("ancon%s", id)
	keyz := []byte(key)
	res := queryableStore.Query(abci.RequestQuery{
		Data:   []byte(keyz),
		Path:   ("/key"),
		Height: ctx.BlockHeader().Height,
		Prove:  true,
	})
	mp, err := ibc.ConvertProofs(res.ProofOps)
	if err != nil {
		return nil, nil, err
	}
	combined, err := ics23.CombineProofs(mp.Proofs)
	if err != nil {
		return nil, nil, err
	}

	r, err := combined.Calculate()
	root := ibc.MerkleRoot{
		Hash: r,
	}
	if err != nil {
		return nil, nil, err
	}
	// e := fmt.Sprintf("root hash created %s %s ", res.Info, res.GetValue())
	// ctx.Logger().Info(e)

	// ps := []*ics23.ProofSpec{
	// 	ics23.IavlSpec,
	// }

	// err = mp.VerifyMembership(ps, root, ibc.NewMerklePath(key), res.Value)
	// ok := ics23.VerifyMembership(ps[0], r, mp.GetProofs()[0], []byte(key), mp.GetProofs()[0].GetExist().Value)
	// if err != nil {
	// 	return "", nil, err
	// }
	ctx.Logger().Info("verified membership created")
	return (root.Hash), &mp, nil
}

func (k Keeper) GetProof(ctx sdk.Context, hash, path string) ([]byte, *ibc.MerkleProof, error) {
	var id []byte
	if path != "" {
		id = append([]byte(hash), path...)
	} else {
		id = []byte(hash)
	}

	// used to catch panics
	defer func() { //catch or finally
		if err := recover(); err != nil { //catch
			fmt.Fprintf(os.Stderr, "Exception: %v\n", err)
			os.Exit(1)
		}
	}()

	// create cache manager to unwrap
	mngr := cache.NewCommitKVStoreCacheManager(cache.DefaultCommitKVStoreCacheSize)
	mngr.GetStoreCache(k.storeKey, k.cms.GetCommitKVStore(k.storeKey))
	iavlstore := mngr.Unwrap(k.storeKey).(*iavl.Store)

	queryableStore := store.Queryable(iavlstore)

	keyz := []byte(id)
	res := queryableStore.Query(abci.RequestQuery{
		Data:   []byte(keyz),
		Path:   ("/key"),
		Height: ctx.BlockHeader().Height,
		Prove:  true,
	})
	mp, err := ibc.ConvertProofs(res.ProofOps)
	if err != nil {
		return nil, nil, err
	}
	combined, err := ics23.CombineProofs(mp.Proofs)
	if err != nil {
		return nil, nil, err
	}

	r, err := combined.Calculate()
	root := ibc.MerkleRoot{
		Hash: r,
	}
	if err != nil {
		return nil, nil, err
	}
	// e := fmt.Sprintf("root hash created %s %s ", res.Info, res.GetValue())
	// ctx.Logger().Info(e)

	// ps := []*ics23.ProofSpec{
	// 	ics23.IavlSpec,
	// }

	// err = mp.VerifyMembership(ps, root, ibc.NewMerklePath(key), res.Value)
	// ok := ics23.VerifyMembership(ps[0], r, mp.GetProofs()[0], []byte(key), mp.GetProofs()[0].GetExist().Value)
	// if err != nil {
	// 	return "", nil, err
	// }
	ctx.Logger().Info("verified membership created")
	return (root.Hash), &mp, nil
}

func GetLinkPrototype() ipld.LinkPrototype {
	// tip: 0x0129 dag-json
	return cidlink.LinkPrototype{cid.Prefix{
		Version:  1,
		Codec:    0x71, // dag-cbor
		MhType:   0x12, // sha2-256
		MhLength: 32,   // sha2-256 hash has a 32-byte sum.
	}}
}

func (k Keeper) CreateSendMetadataPacket(ctx sdk.Context, sender sdk.AccAddress, packet *types.AguaclaraPacketData) (string, error) {
	lsys := cidlink.DefaultLinkSystem()

	prefixstore := "packet"
	//   you just need a function that conforms to the ipld.BlockWriteOpener interface.
	lsys.StorageWriteOpener = func(lnkCtx ipld.LinkContext) (io.Writer, ipld.BlockWriteCommitter, error) {
		// change prefix
		buf := bytes.Buffer{}
		return &buf, func(lnk ipld.Link) error {
			store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte(prefixstore))
			k := []byte(lnk.String())
			v := buf.Bytes()
			store.Set(k, v)
			return nil
		}, nil
	}

	// Add Document
	n := fluent.MustBuildMap(basicnode.Prototype.Map, 8, func(na fluent.MapAssembler) {
		lnk, _ := ParseCidLink(packet.ToMetadata)
		na.AssembleEntry("creator").AssignString(packet.Creator)
		na.AssembleEntry("tokenAddress").AssignString(packet.TokenAddress)
		na.AssembleEntry("tokenId").AssignString(packet.TokenId)
		na.AssembleEntry("didRecipient").AssignString(packet.DidRecipient)
		na.AssembleEntry("toMetadata").AssignLink(lnk)
		na.AssembleEntry("hash").AssignString(packet.Hash)
		na.AssembleEntry("currentChainId").AssignString(packet.CurrentChainId)
		na.AssembleEntry("recipientChainId").AssignString(packet.RecipientChainId)

	})

	link, err := lsys.Store(
		ipld.LinkContext{}, // The zero value is fine.  Configure it it you want cancellability or other features.
		GetLinkPrototype(),
		n, // And here's our data.
	)
	if err != nil {
		return "", err
	}

	//	id, _ := cid.Decode(link.String())
	return link.String(), nil
}
func (k Keeper) ChangeOwnerMetadata(ctx sdk.Context, hash string, previousOwner, newOwner, chainId, recipientChainId string) (string, error) {

	lsys := cidlink.DefaultLinkSystem()

	rootNode, err := k.GetMetadata(ctx, hash, "")

	if err != nil {
		return "", err
	}
	// owner update
	n, err := traversal.FocusedTransform(
		rootNode,
		datamodel.ParsePath("owner"),
		func(progress traversal.Progress, prev datamodel.Node) (datamodel.Node, error) {
			if progress.Path.String() == "owner" && must.String(prev) == previousOwner {
				nb := prev.Prototype().NewBuilder()
				nb.AssignString(newOwner)
				return nb.Build(), nil
			}
			return nil, fmt.Errorf("Owner not found")
		}, false)

	if err != nil {
		return "", err
	}

	// parent update
	n, _ = traversal.FocusedTransform(
		n,
		datamodel.ParsePath("parent"),
		func(progress traversal.Progress, prev datamodel.Node) (datamodel.Node, error) {
			nb := prev.Prototype().NewBuilder()
			// set previous hash, not current
			l, _ := ParseCidLink(hash)
			nb.AssignLink(l)
			return nb.Build(), nil
		}, false)
	//   you just need a function that conforms to the ipld.BlockWriteOpener interface.
	lsys.StorageWriteOpener = func(lnkCtx ipld.LinkContext) (io.Writer, ipld.BlockWriteCommitter, error) {
		// change prefix
		buf := bytes.Buffer{}
		return &buf, func(lnk ipld.Link) error {
			store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte("ancon"))
			key := []byte(lnk.String())
			v := buf.Bytes()
			store.Set(key, v)

			return nil
		}, nil
	}

	link, err := lsys.Store(
		ipld.LinkContext{}, // The zero value is fine.  Configure it it you want cancellability or other features.
		GetLinkPrototype(),
		n, // And here's our data.
	)
	if err != nil {
		return "", err
	}

	//	id, _ := cid.Decode(link.String())
	return link.String(), nil
}

func (k Keeper) AddRoyaltyInfo(ctx sdk.Context, msg *types.MsgRoyaltyInfo) (string, error) {

	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte("royalty"))
	lsys := cidlink.DefaultLinkSystem()

	lsys.StorageWriteOpener = func(lnkCtx ipld.LinkContext) (io.Writer, ipld.BlockWriteCommitter, error) {
		// change prefix
		buf := bytes.Buffer{}
		return &buf, func(lnk ipld.Link) error {
			k := []byte(lnk.String())
			v := buf.Bytes()
			store.Set(k, v)
			return nil
		}, nil
	}

	// Add Document
	n := fluent.MustBuildMap(basicnode.Prototype.Map, 6, func(na fluent.MapAssembler) {
		l, _ := ParseCidLink(msg.MetadataRef)
		na.AssembleEntry("sender").AssignString(msg.Creator)
		na.AssembleEntry("tokenId").AssignString(msg.DenomId)
		na.AssembleEntry("metadataRef").AssignLink(l)
		na.AssembleEntry("didReceiver").AssignString(msg.Receiver)
		na.AssembleEntry("id").AssignString(msg.Id)
		na.AssembleEntry("royaltyFeePercentage").AssignInt(int64(msg.RoyaltyFeePercentage))
	})

	link, err := lsys.Store(
		ipld.LinkContext{}, // The zero value is fine.  Configure it it you want cancellability or other features.
		GetLinkPrototype(),
		n, // And here's our data.
	)
	if err != nil {
		return "", err
	}

	//	id, _ := cid.Decode(link.String())
	return link.String(), nil
}

func (k Keeper) ApplySchema(ctx sdk.Context, msg *types.MsgAddSchema) (string, error) {

	rs := &jsonschema.Schema{}
	if err := json.Unmarshal(msg.Schema, rs); err != nil {

		return "", fmt.Errorf("Invalid JSON Schema")
	}

	node, err := ipldutil.DecodeNode(msg.Schema)

	dus := k.DataUnionStore(ctx)

	link, err := dus.LinkSystem.Store(
		ipld.LinkContext{
			LinkPath: datamodel.ParsePath("schemas/"),
		},
		GetLinkPrototype(),
		node,
	)

	return link.String(), err
}


func (k Keeper) GetDataContractGlobals(ctx sdk.Context, jsonArgs hexutil.Bytes, sender, did string) map[string]interface{} {

	return map[string]interface{}{
		"sender": sender,
		"did": did,
		"gas_meter": ctx.BlockGasMeter(),
		"chain_id": ctx.ChainID(),
		"block_header": ctx.BlockHeader,
		"block_time": ctx.BlockTime,
		"block_height": ctx.BlockHeight(),
	}

}

func (k Keeper) GetDataContractEnvironment() *cel.Env {
	env, _ := cel.NewEnv(
		cel.Declarations(
			decls.NewVar("inputs", decls.NewListType(decls.Dyn)),
		),
		cel.Declarations(
			decls.NewVar("block_time", decls.Dyn),
		),
		cel.Declarations(
			decls.NewVar("block_height", decls.Dyn),
		),
		cel.Declarations(
			decls.NewVar("block_header", decls.Dyn),
		),
		cel.Declarations(
			decls.NewVar("chain_id", decls.Dyn),
		),
		cel.Declarations(
			decls.NewVar("gas_meter", decls.Dyn),
		),
		cel.Declarations(
			decls.NewVar("sender", decls.Dyn),
		),
		cel.Declarations(
			decls.NewVar("did", decls.Dyn),
		),
	)

	return env
}
func (k Keeper) ApplyDataContract(ctx sdk.Context, msg *types.MsgAddDataContract) (string, error) {


	ast, issues := k.GetDataContractEnvironment().Compile(string(msg.Data))
	if issues != nil && issues.Err() != nil {
		return "", fmt.Errorf("type-check error: %s", issues.Err())
	}
	temp, err := cel.AstToCheckedExpr(ast)

	bz, err := proto.Marshal(temp)
	if err != nil {
		return "", fmt.Errorf("Marshal error", err)
	}

	node, err := ipldutil.DecodeNode(bz)

	dus := k.DataUnionStore(ctx)

	link, err := dus.LinkSystem.Store(
		ipld.LinkContext{
			LinkPath: datamodel.ParsePath("contracts/"),
		},
		GetLinkPrototype(),
		node,
	)

	return link.String(), err
}

func (k Keeper) GetDataContract(ctx sdk.Context, hash string) (*expr.CheckedExpr, error) {

	clink, err := ParseCidLink(hash)
	dus := k.DataUnionStore(ctx)

	node, err := dus.LinkSystem.Load(
		ipld.LinkContext{
			LinkPath: datamodel.ParsePath("contracts/"),
		},
		clink,
		basicnode.Prototype.Any,
	)

	bz, err := ipldutil.EncodeNode(node)
	exp := expr.CheckedExpr{}

	err = proto.Unmarshal(bz, &exp)

	return &exp, err
}

func (k Keeper) GetDataSchema(ctx sdk.Context, hash string) (*jsonschema.Schema, error) {

	clink, err := ParseCidLink(hash)
	dus := k.DataUnionStore(ctx)

	node, err := dus.LinkSystem.Load(
		ipld.LinkContext{
			LinkPath: datamodel.ParsePath("schemas/"),
		},
		clink,
		basicnode.Prototype.Any,
	)

	bz, err := ipldutil.EncodeNode(node)

	jschem := jsonschema.Schema{}

	err = json.Unmarshal(bz, &jschem)

	return &jschem, err
}

func (k Keeper) ExecuteDataContractTransaction(ctx sdk.Context, msg *types.MsgComputeDataContract) (string, error) {
	//inputs: all cids available in the anchoring list
	var anch []byte

	if k.HasAnchor(ctx, msg.Did, msg.InputCid) {
		anch = k.GetAnchor(ctx, msg.Did, msg.InputCid)
	}

	lnk, err := ParseCidLink(string(anch))
	if err != nil {
		return "", fmt.Errorf("Parse link error", err)
	}

	node, err := k.ReadOffchainJSON(ctx, "", lnk)
	if err != nil {
		return "", fmt.Errorf("Read JSON  error", err)
	}

	schema, err := k.GetDataSchema(ctx, msg.SchemaCid)
	if err != nil {
		return "", fmt.Errorf("Get schema error", err)
	}

	_, err = schema.ValidateBytes(ctx.Context(), []byte(node))

	if err != nil {
		return "", fmt.Errorf("Validate bytes error", err)
	}

	dataContr, err := k.GetDataContract(ctx, msg.ToCid)
	if err != nil {
		return "", fmt.Errorf("Get contract error", err)
	}

	ast := cel.CheckedExprToAst(dataContr)

	prog, _ := k.GetDataContractEnvironment().Program(ast)

	out, _, err := prog.Eval(node, 
		k.GetDataContractGlobals(ctx, hexutil.Bytes(msg.JsonArguments), msg.Creator, msg.Did)
	)
	if err != nil {
		return "", fmt.Errorf("Eval node error", err)
	}

	clink, err := k.AddOffchainJSON(ctx, "", valueToJSON(out))
	if err != nil {
		return "", fmt.Errorf("Offchain JSON error", err)
	}

	return clink.String(), nil
}

// From: https://github.com/google/cel-go/blob/master/codelab/solution/codelab.go
// valueToJSON converts the CEL type to a protobuf JSON representation and
// marshals the result to a string.
func valueToJSON(val ref.Val) string {
	v, err := val.ConvertToNative(reflect.TypeOf(&structpb.Value{}))
	if err != nil {
		glog.Exit(err)
	}
	marshaller := protojson.MarshalOptions{Indent: "    "}
	bytes, err := marshaller.Marshal(v.(proto.Message))
	if err != nil {
		glog.Exit(err)
	}
	return string(bytes)
}
