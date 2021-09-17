package keeper

import (
	"bytes"
	"crypto/sha256"
	"encoding/json"
	"fmt"
	"io"
	"time"

	// This package is needed so that all the preloaded plugins are loaded automatically

	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/anconprotocol/types"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ipld/go-ipld-prime"
	_ "github.com/ipld/go-ipld-prime/codec/dagcbor"
	"github.com/ipld/go-ipld-prime/fluent"
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

// RequestLazyMint -- actor is NFT Creator, can be assigned to marketplace -- onchain origin
func (k Keeper) RequestLazyMint(ctx sdk.Context, msg *types.MsgMintTrustedContent) (string, error) {

	// Add Metadata Cid to NFT
	denom, found := k.GetDenom(ctx, msg.DenomId)
	if !found {
		return "", sdkerrors.Wrapf(types.ErrInvalidDenom, "denom ID %s not exists", msg.DenomId)
	}

	if denom.MintRestricted && denom.Creator != msg.Creator {
		return "", sdkerrors.Wrapf(sdkerrors.ErrUnauthorized, "%s is not allowed to mint NFT of denom %s", denom.Creator, msg.DenomId)
	}

	// get
	id, err := k.setMintVoucher(
		ctx,
		msg.DidOwner, // whitelist recipient
		types.Voucher{
			Name:         msg.Name,
			URI:          msg.MetadataRef,
			Owner:        msg.Creator,
			DidRecipient: msg.DidOwner,
			Price:        msg.Price,
			R:            msg.R,
			S:            msg.S,
			V:            msg.V,
		},
	)

	return id, err
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

// setMintVoucher
func (k Keeper) setMintVoucher(ctx sdk.Context, recipient string, voucher types.Voucher) (string, error) {
	index := sha256.Sum256(append([]byte(time.Now().String()), byte(ctx.BlockHeight())))
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.VoucherStoreKey))
	res := k.cdc.MustMarshalBinaryBare(&voucher)

	i := append([]byte{0, 0, 0, 0, 0, 0, 0}, []byte(fmt.Sprint("%s", index))...)
	store.Set(i, res)

	store = prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.VoucherRecipientStoreKey))
	store.Set(i, []byte(recipient))

	return fmt.Sprint(i), nil
}

func (k Keeper) verifyProof(ctx sdk.Context, creator string, proof string) bool {
	// TODO:
	// Validates register public key from gateway (trusted)
	// Validates durin signature
	return true
}

func (k Keeper) parseVoucherProof(proof string) (types.BaseNFT, error) {
	// TODO:
	// Validates register public key from gateway (trusted)
	// Validates creator signature
	return types.BaseNFT{}, nil
}

// InitiateSwap -- actor is NFT Minter -- onchain recipient
func (k Keeper) HasClaimedSwap(ctx sdk.Context, voucher string) bool {
	return false
}

// InitiateSwap -- actor is NFT Minter -- onchain recipient
func (k Keeper) InitiateSwap(ctx sdk.Context, voucher string) (*types.OffchainLookup, error) {
	if k.HasClaimedSwap(ctx, voucher) {
		return &types.OffchainLookup{}, nil
	}

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

	return &types.OffchainLookup{
		Uri:    "http://localhost:3000/",
		Prefix: methodSig.Sig, // sha256(creator, sig)
	}, nil
}

// InitiateSwap -- actor is NFT Minter -- onchain recipient
func (k Keeper) HasVoucherPermit(ctx sdk.Context, voucher string, prefix string) bool {
	// get db - ancon-protocol

	// eip712
	v := k.GetVoucher(voucher)
	// voucher
	// verify prefix == InitiateSwap

	return true
}

// InitiateSwap -- actor is NFT Minter -- gateway
func (k Keeper) InitiateSwap_offchain(ctx sdk.Context, voucher string, prefix string) (*types.InitiateSwapPermit, error) {
	if k.HasVoucherPermit(ctx, voucher, prefix) {
		// verify signed by user
		// ecrecover(sig, addr)

		// voucher = sig(priv, voucher)
		// eip712 durinSig
		return &types.InitiateSwapPermit{}, nil
	} else {
		return nil, fmt.Errorf("unauthorized")
	}
}

// InitiateSwapWithProof - onchain
func (k Keeper) InitiateSwapWithProof(ctx sdk.Context, creator string, voucher string, proof string) (string, error) {

	// gateway previously registered
	if k.verifyProof(ctx, creator, proof) {
		// Parse nft voucher
		nftVoucher, _ := k.parseVoucherProof(proof)
		// get next token id
		tokenID := fmt.Sprint(k.GetTotalSupply(ctx, nftVoucher.DenomId))
		k.setNFT(
			ctx,
			nftVoucher.DenomId,
			types.NewBaseNFT(
				tokenID,
				nftVoucher.Name,
				sdk.AccAddress(nftVoucher.Creator),
				nftVoucher.MetadataRef,
				nftVoucher.DidOwner,
			),
		)
		k.setOwner(ctx, nftVoucher.DenomId, tokenID, sdk.AccAddress(nftVoucher.Creator))
		k.increaseSupply(ctx, nftVoucher.DenomId)
		k.nftClaimed() // o ClaimSwap
		return tokenID, nil
	}
	return "", nil
}

func (k Keeper) ClaimSwap(ctx sdk.Context, msg *types.MsgMintTrustedResource) (string, error) {
	return "", nil
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

func (k Keeper) AddMetadata(ctx sdk.Context, msg *types.MsgMetadata) (string, error) {
	lsys := cidlink.DefaultLinkSystem()

	//   you just need a function that conforms to the ipld.BlockWriteOpener interface.
	lsys.StorageWriteOpener = func(lnkCtx ipld.LinkContext) (io.Writer, ipld.BlockWriteCommitter, error) {
		// change prefix
		buf := bytes.Buffer{}
		return &buf, func(lnk ipld.Link) error {
			store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte("ancon"))
			store.Set([]byte(lnk.String()), buf.Bytes())
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
	n := fluent.MustBuildMap(basicnode.Prototype.Map, 7, func(na fluent.MapAssembler) {
		// TODO:
		na.AssembleEntry("name").AssignString(msg.Name)
		na.AssembleEntry("description").AssignString(msg.Description)
		na.AssembleEntry("image").AssignString(msg.Image)
		na.AssembleEntry("did").AssignString(msg.Did)
		if msg.VerifiedCredentialRef != "" {
			l, _ := cid.Parse(msg.VerifiedCredentialRef)
			na.AssembleEntry("verifiedCredentialRef").AssignLink(cidlink.Link{Cid: l})
		}
		na.AssembleEntry("owner").AssignString(msg.Owner)
		if msg.Parent != "" {
			p, _ := cid.Parse(msg.Parent)
			na.AssembleEntry("parent").AssignLink(cidlink.Link{Cid: p})
		}

		na.AssembleEntry("kind").AssignString("metadata")
		// Sources
		if len(sources) > 0 {

			na.AssembleEntry("sources").CreateList(cast.ToInt64(len(sources)), func(la fluent.ListAssembler) {
				for i := 0; i < len(sources); i++ {
					//c, _ := cid.Parse(sources[i])
					// todo: implement error handling
					//la.AssembleValue().AssignLink(cidlink.Link{Cid: c})
					la.AssembleValue().AssignString(sources[i])
				}
			})
		}
		// Link
		if len(links) > 0 {

			na.AssembleEntry("links").CreateList(cast.ToInt64(len(links)), func(la fluent.ListAssembler) {
				for i := 0; i < len(links); i++ {
					//c, _ := cid.Parse(links[i])
					// todo: implement error handling
					// la.AssembleValue().AssignLink(cidlink.Link{Cid: c})
					la.AssembleValue().AssignString(links[i])
				}
			})
		}
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

	//	id, _ := cid.Decode(link.String())
	return link.String(), nil
}
