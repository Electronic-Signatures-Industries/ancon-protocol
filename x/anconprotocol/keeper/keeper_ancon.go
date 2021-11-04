package keeper

import (
	"bytes"
	"fmt"
	"io"
	"os"

	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/anconprotocol/types"
	ibc "github.com/cosmos/ibc-go/modules/core/23-commitment/types"
	"github.com/multiformats/go-multihash"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	ics23 "github.com/confio/ics23/go"
	"github.com/cosmos/cosmos-sdk/store"
	"github.com/cosmos/cosmos-sdk/store/cache"
	"github.com/cosmos/cosmos-sdk/store/iavl"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/ethereum/go-ethereum/crypto"
	cid "github.com/ipfs/go-cid"
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
	lsys := k.GetLinkSystem()
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
	lsys := k.GetLinkSystem()
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

func (k Keeper) GetMetadata(ctx sdk.Context, hash string, path string) (datamodel.Node, error) {
	lsys := k.GetLinkSystem()
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
func (k Keeper) GetLinkSystem() linking.LinkSystem {
	return cidlink.DefaultLinkSystem()
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
	// Store message to cross chain metadata
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte("packet"))
	hash := crypto.Keccak256([]byte(packet.Creator), []byte(packet.DidRecipient), []byte(packet.ToMetadata), []byte(packet.TokenAddress), []byte(packet.TokenId))
	lnk := CreateCidLink(hash)
	v := k.cdc.MustMarshal(packet)
	store.Set(lnk.Bytes(), v)

	return lnk.String(), nil
}
func (k Keeper) ChangeOwnerMetadata(ctx sdk.Context, hash string, previousOwner, newOwner, chainId, recipientChainId string) (string, error) {

	lsys := k.GetLinkSystem()
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
	lsys := k.GetLinkSystem()

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
