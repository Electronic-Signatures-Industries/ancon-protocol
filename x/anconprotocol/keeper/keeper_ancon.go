package keeper

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"

	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/anconprotocol/types"
	ibc "github.com/cosmos/ibc-go/modules/core/23-commitment/types"
	"github.com/multiformats/go-multihash"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	ics23 "github.com/confio/ics23/go"
	"github.com/cosmos/cosmos-sdk/crypto/keys/secp256k1"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ipld/go-ipld-prime"
	_ "github.com/ipld/go-ipld-prime/codec/dagcbor"
	"github.com/ipld/go-ipld-prime/datamodel"
	"github.com/ipld/go-ipld-prime/fluent"
	"github.com/ipld/go-ipld-prime/linking"
	"github.com/ipld/go-ipld-prime/must"
	"github.com/ipld/go-ipld-prime/traversal"
	"github.com/spf13/cast"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	cid "github.com/ipfs/go-cid"
	cidlink "github.com/ipld/go-ipld-prime/linking/cid"
	basicnode "github.com/ipld/go-ipld-prime/node/basic"
)

func (k Keeper) AddClaimSwap(ctx sdk.Context, msg *types.MsgClaimSwap) (string, error) {
	return "", nil
}
func (k Keeper) AddInitiateSwap(ctx sdk.Context, msg *types.MsgInitiateSwap) (string, error) {
	return "", nil
}
func (k Keeper) AddRoyaltyInfo(ctx sdk.Context, msg *types.MsgRoyaltyInfo) (string, error) {
	return "", nil
}
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

func (k Keeper) verifySenderIAVLProof(ctx sdk.Context, key string, value string, proof ics23.ExistenceProof) bool {
	// TODO: Previously stored root
	root := []byte{0, 0, 0, 0}
	proofCommitment := ics23.CommitmentProof_Exist{
		Exist: &proof,
	}
	voucherProof := ics23.CommitmentProof{
		Proof: &proofCommitment,
	}
	// Cosmos IAVL
	spec := ics23.IavlSpec
	res := ics23.VerifyMembership(spec, root, &voucherProof, []byte(key), []byte(value))
	return res
}

func (k Keeper) hasRelayPermit(ctx sdk.Context, creator string, prefix string) bool {
	// prefix with abi
	methodSig := abi.NewMethod(
		"InitiateSwap",
		"InitiateSwap",
		abi.Function,
		"nonpayable",
		false,
		false,
		abi.Arguments{
			{
				Name:    "voucherId",
				Type:    abi.Type{},
				Indexed: false,
			},
		},
		abi.Arguments{},
	)
	hash := append([]byte(methodSig.Sig), []byte(creator)...)
	return fmt.Sprint(hash) == prefix
}

// InitiateSwap starts swap to Chain B, sends a voucher, prefix and proof
func (k Keeper) InitiateSwap(ctx sdk.Context, voucherId string, creator string) (*types.RelayMessageNFTMintSwap, error) {
	// prefix with abi
	methodSig := abi.NewMethod(
		"InitiateSwap",
		"InitiateSwap",
		abi.Function,
		"nonpayable",
		false,
		false,
		abi.Arguments{
			{
				Name:    "voucherId",
				Type:    abi.Type{},
				Indexed: false,
			},
		},
		abi.Arguments{},
	)

	voucher, err := k.GetVoucher(ctx, voucherId)
	if err != nil {
		return nil, err
	}
	value := k.cdc.MustMarshalJSON(voucher)
	hash := append([]byte(methodSig.Sig), []byte(creator)...)
	return &types.RelayMessageNFTMintSwap{
		Value:  string(value),
		Key:    voucherId,
		Prefix: fmt.Sprint(hash),
	}, nil

}

func (k Keeper) getRelayer(ctx sdk.Context, prefix string) (uint64, error) {
	return 1, nil
}

func (k Keeper) InitiateSwap_offchain(ctx sdk.Context, creator string, value string, key string, prefix string) (*types.MsgInitiateSwapResponse, error) {
	if k.hasRelayPermit(ctx, creator, prefix) {
		relayTo, err := k.getRelayer(ctx, prefix)
		if err != nil {
			return nil, err
		}
		return &types.MsgInitiateSwapResponse{
			RelayTo: relayTo,
			Voucher: value,
			Key:     key,
		}, nil
	} else {
		return nil, fmt.Errorf("unauthorized")
	}
}

// InitiateSwapWithProof - onchain
func (k Keeper) InitiateSwapWithProof(ctx sdk.Context, alg string, ownerPub []byte, key string, value string, proof ics23.ExistenceProof) (*types.InitiateSwapWithProofResponse, error) {

	var voucher types.Voucher
	k.cdc.MustUnmarshalJSON([]byte(value), &voucher)
	if k.verifySenderIAVLProof(ctx, key, value, proof) {
		// get next token id
		tokenID := fmt.Sprint(k.GetTotalSupply(ctx, voucher.TokenSymbol))
		// verify signature, should send did-web pub key
		if alg == "secp256k1" {
			pub := secp256k1.PubKey{
				Key: ownerPub,
			}
			list := make([][]byte, 6)
			list[0] = []byte(voucher.TokenName)
			list[1] = []byte(voucher.TokenSymbol)
			list[2] = []byte(voucher.URI)
			list[3] = []byte(voucher.Owner)
			list[4] = []byte(voucher.DidRecipient)
			list[5] = []byte(cast.ToString(voucher.Price))
			var digest []byte
			for i := range list {
				digest = append(digest, list[i]...)
			}
			res := pub.VerifySignature(
				digest,
				append([]byte(voucher.R), []byte(voucher.S)...),
			)
			if !res {
				return nil, fmt.Errorf("invalid owner signature")
			}
		}

		k.setNFT(
			ctx,
			voucher.TokenSymbol,
			types.NewBaseNFT(
				tokenID,
				voucher.TokenName,
				sdk.AccAddress(voucher.DidRecipient),
				voucher.URI,
				voucher.DidRecipient,
			),
		)
		k.setOwner(ctx, voucher.TokenSymbol, tokenID, sdk.AccAddress(voucher.DidRecipient))
		// TODO: transfer
		k.increaseSupply(ctx, voucher.TokenSymbol)
		return &types.InitiateSwapWithProofResponse{
			TokenID: tokenID,
		}, nil
	}
	return &types.InitiateSwapWithProofResponse{}, nil
}

func (k Keeper) ClaimSwap(ctx sdk.Context, msg *types.MsgMintTrustedResource) (string, error) {
	return "", nil
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

// CreateHashCidLink takes a hash eg ethereum hash and converts it to cid multihash
func CreateHashCidLink(hash []byte) cidlink.Link {
	lchMh, err := multihash.Encode(hash, GetLinkPrototype().(cidlink.LinkPrototype).MhType)
	if err != nil {
		return cidlink.Link{}
	}
	// TODO: switch to use CommitTree codec type
	lcCID := cid.NewCidV1(GetLinkPrototype().(cidlink.LinkPrototype).Codec, lchMh)
	lcLinkCID := cidlink.Link{Cid: lcCID}
	return lcLinkCID
}

// ParseHashCidLink parses a string cid multihash into a cidLink
func ParseHashCidLink(hash string) (cidlink.Link, error) {
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
	v := []string{}
	json.Unmarshal([]byte(msg.Sources), &v)
	sources := v

	u := []string{}
	json.Unmarshal([]byte(msg.Links), &u)
	links := u
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
		if len(sources) > 0 {

			na.AssembleEntry("sources").CreateList(cast.ToInt64(len(sources)), func(la fluent.ListAssembler) {
				for i := 0; i < len(sources); i++ {
					lnk, err := ParseHashCidLink((sources[i]))
					if err != nil {
						continue
					}
					la.AssembleValue().AssignLink(lnk)
				}
			})
		}
		// Link
		if len(links) > 0 {

			na.AssembleEntry("links").CreateList(cast.ToInt64(len(links)), func(la fluent.ListAssembler) {
				for i := 0; i < len(links); i++ {

					lnk, err := ParseHashCidLink((links[i]))
					if err != nil {
						continue
					}
					la.AssembleValue().AssignLink(lnk)
				}
			})
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

func (k Keeper) GetMetadataProof(ctx sdk.Context, hash, path string) (*ibc.MerkleRoot, *ibc.MerkleProof, error) {
	var id []byte
	if path != "" {
		id = append([]byte(hash), path...)
	} else {
		id = []byte(hash)
	}

	proofstore := prefix.NewStore(ctx.KVStore(k.storeKey), []byte("anconproof"))

	if proofstore.Has(id) {
		proof := &ics23.CommitmentProof{}
		err := proof.Unmarshal(proofstore.Get(id))

		r, err := proof.Calculate()
		if err != nil {
			return nil, nil, err
		}
		return &ibc.MerkleRoot{Hash: r}, &ibc.MerkleProof{
			Proofs: []*ics23.CommitmentProof{proof},
		}, nil
	}

	return nil, nil, nil
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
			l, _ := ParseHashCidLink(hash)
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

			proofstore := prefix.NewStore(ctx.KVStore(k.storeKey), []byte("anconproof"))
			ce1 := &ics23.CommitmentProof_Exist{
				Exist: &ics23.ExistenceProof{
					Key:   key,
					Value: v,
					Leaf:  ics23.IavlSpec.LeafSpec,
				},
			}

			c := &ics23.CommitmentProof{ce1}
			r, _ := c.Calculate()

			err = c.GetExist().Verify(ics23.IavlSpec, r, key, v)
			if err != nil {
				return err
			}

			proof, err := c.Marshal()
			proofstore.Set(key, proof)
			if err != nil {
				return err
			}

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
