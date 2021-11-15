package keeper

import (
	"bytes"
	"fmt"
	"io"
	"time"

	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/anconprotocol/types"
	"github.com/btcsuite/btcutil/base58"
	cosmosed25519 "github.com/cosmos/cosmos-sdk/crypto/keys/ed25519"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/hyperledger/aries-framework-go/pkg/doc/did"
	cid "github.com/ipfs/go-cid"
	"github.com/ipld/go-ipld-prime"
	"github.com/ipld/go-ipld-prime/datamodel"
	"github.com/ipld/go-ipld-prime/fluent"
	"github.com/ipld/go-ipld-prime/linking"
	cidlink "github.com/ipld/go-ipld-prime/linking/cid"
	basicnode "github.com/ipld/go-ipld-prime/node/basic"

	"github.com/multiformats/go-multibase"
	"github.com/multiformats/go-multicodec"
	"github.com/spf13/cast"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type Delegate struct {
	identity sdk.AccAddress
}

// BuildDidWeb ....
func (k Keeper) BuildDidWeb(ctx sdk.Context, creator, vanityName string, pubkey []byte) (*did.Doc, error) {
	// public
	encoded := base58.Encode(pubkey)
	ti := time.Now()
	//Dev: chain id is replaced on the query by http host
	// did web
	base := append([]byte("did:web:"), []byte(vanityName)...)
	// did web # id
	id := append(base, []byte("#")...)
	id = append(id, encoded...)

	//Authentication method 2018
	didWebVer := did.NewVerificationMethodFromBytes(
		string(id),
		"Secp256k1VerificationKey2018",
		string(base),
		[]byte(encoded),
	)

	ver := []did.VerificationMethod{
		{},
	}
	ver = append(ver, *didWebVer)

	serv := []did.Service{{}, {}}

	// Secp256k1SignatureAuthentication2018
	auth := []did.Verification{{}}

	didWebAuthVerification := did.NewEmbeddedVerification(didWebVer, did.Authentication)

	auth = append(auth, *didWebAuthVerification)

	doc := did.BuildDoc(
		did.WithVerificationMethod(ver),
		did.WithService(serv),
		did.WithAuthentication(auth),
		did.WithCreatedTime(ti),
		did.WithUpdatedTime(ti),
	)
	doc.ID = string(id)
	return doc, nil
}

// BuildDidKey ....
func (k Keeper) BuildDidKey(ctx sdk.Context, creator string) (*did.Doc, error) {

	acc := cosmosed25519.GenPrivKey()
	encoded := base58.Encode(acc.PubKey().Bytes())
	// public
	pub := encoded
	ti := time.Now()
	multi := append([]byte(multicodec.Secp256k1Pub.String()), acc.Bytes()...)
	code, _ := multibase.Encode(multibase.Base58BTC, multi)
	// did key
	base := append([]byte("did:key:"), code...)
	// did key # id
	id := append(base, []byte("#")...)

	didWebVer := did.NewVerificationMethodFromBytes(
		string(id),
		"Secp256k1VerificationKey2018",
		string(base),
		[]byte(pub),
	)

	ver := []did.VerificationMethod{
		{},
	}
	ver = append(ver, *didWebVer)
	serv := []did.Service{{}, {}}

	// Secp256k1SignatureAuthentication2018
	auth := []did.Verification{{}}

	didWebAuthVerification := did.NewEmbeddedVerification(didWebVer, did.Authentication)

	auth = append(auth, *didWebAuthVerification)

	doc := did.BuildDoc(
		did.WithVerificationMethod(ver),
		did.WithService(serv),
		did.WithAuthentication(auth),
		did.WithCreatedTime(ti),
		did.WithUpdatedTime(ti),
	)
	doc.ID = string(base)
	return doc, nil
}

func (k *Keeper) AddDid(ctx sdk.Context, msg *types.MsgCreateDid) (*types.DIDOwner, error) {

	var didDoc *did.Doc
	var err error
	didOwner := types.DIDOwner{
		Owner: msg.Creator,
	}

	if msg.DidType == "web" {
		// TODO:move to ValidateBasic
		if k.HasDidWebRoute(ctx, msg.VanityName) {
			return nil, fmt.Errorf("vanity name exists: %v", msg.VanityName)
		}
		key := msg.PublicKeyBytes
		if err != nil {
			return nil, err
		}

		didDoc, err = k.BuildDidWeb(ctx, msg.Creator, msg.VanityName, key)
		if err != nil {
			return nil, err
		}

	} else if msg.DidType == "key" {
		didDoc, err = k.BuildDidKey(ctx, msg.Creator)
		if err != nil {
			return nil, err
		}

	} else {
		return nil, fmt.Errorf("Must create a did")
	}
	cid, err := k.SetDid(ctx, didDoc)
	if err != nil {
		return nil, err
	}
	if msg.DidType == "web" {
		didWebRoute := &types.DIDWebRoute{
			Name:  msg.VanityName,
			Route: "optional",
			Cid:   cid,
		}
		k.SetDidWebRoute(ctx, didWebRoute)
	} else {

		didWebRoute := &types.DIDWebRoute{
			Name:  didDoc.ID,
			Route: "optional",
			Cid:   cid,
		}
		k.SetDidWebRoute(ctx, didWebRoute)
	}
	didOwner.Cid = cid
	didOwner.DidIdentity = didDoc.ID
	k.SetDIDOwner(ctx, &didOwner)
	return &didOwner, nil
}

//IPLD Store DID Type is Web
func (k *Keeper) SetDid(ctx sdk.Context, msg *did.Doc) (string, error) {
	lsys := cidlink.DefaultLinkSystem()

	//   you just need a function that conforms to the ipld.BlockWriteOpener interface.
	lsys.StorageWriteOpener = func(lnkCtx ipld.LinkContext) (io.Writer, ipld.BlockWriteCommitter, error) {
		// change prefix
		buf := bytes.Buffer{}
		//path := msg.Path
		return &buf, func(lnk ipld.Link) error {
			//Sample: bafyreie5m2h2ewlqllhps5mg6ekb62eft67gvyieqon6643obz5m7zdhcy/index.html
			//Sample: bafyreie5m2h2ewlqllhps5mg6ekb62eft67gvyieqon6643obz5m7zdhcy/json/index.html
			//Sample: bafyreie5m2h2ewlqllhps5mg6ekb62eft67gvyieqon6643obz5m7zdhcy/json/xml/index.html
			//Sample: bafyreie5m2h2ewlqllhps5mg6ekb62eft67gvyieqon6643obz5m7zdhcy
			//id := append([]byte(lnk.String()), path...)
			store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte(types.DidIPLDStoreKey))
			store.Set([]byte(msg.ID), buf.Bytes())
			return nil
		}, nil
	}
	// type Doc struct {
	// 	Context              []string
	// 	ID                   string
	// 	VerificationMethod   []VerificationMethod
	// 	Service              []Service
	// 	Authentication       []Verification
	// 	AssertionMethod      []Verification
	// 	CapabilityDelegation []Verification
	// 	CapabilityInvocation []Verification
	// 	KeyAgreement         []Verification
	// 	Created              *time.Time
	// 	Updated              *time.Time
	// 	Proof                []Proof
	// 	processingMeta       processingMeta
	// }

	// Add Document
	// Basic Node
	n := fluent.MustBuildMap(basicnode.Prototype.Map, 12, func(na fluent.MapAssembler) {
		na.AssembleEntry("context").CreateList(cast.ToInt64(len(msg.Context)), k.toIpldStringList(msg.Context))
		na.AssembleEntry("id").AssignString(msg.ID)
		na.AssembleEntry("verificationMethod").CreateList(cast.ToInt64(len(msg.VerificationMethod)), k.toIpldVerMethodList(msg.VerificationMethod))
		na.AssembleEntry("service").CreateList(cast.ToInt64(len(msg.Service)), k.toIpldServiceList(msg.Service))
		na.AssembleEntry("authentication").CreateList(cast.ToInt64(len(msg.Authentication)), k.toIpldVerificationList(msg.Authentication))
		na.AssembleEntry("assertionMethod").CreateList(cast.ToInt64(len(msg.AssertionMethod)), k.toIpldVerificationList(msg.AssertionMethod))
		na.AssembleEntry("capabilityDelegation").CreateList(cast.ToInt64(len(msg.CapabilityDelegation)), k.toIpldVerificationList(msg.CapabilityDelegation))
		na.AssembleEntry("capabilityInvocation").CreateList(cast.ToInt64(len(msg.CapabilityInvocation)), k.toIpldVerificationList(msg.CapabilityInvocation))
		na.AssembleEntry("keyAgreement").CreateList(cast.ToInt64(len(msg.KeyAgreement)), k.toIpldVerificationList(msg.KeyAgreement))
		na.AssembleEntry("created").AssignString(msg.Created.String())
		na.AssembleEntry("updated").AssignString(msg.Updated.String())
		na.AssembleEntry("proof").CreateList(cast.ToInt64(len(msg.Proof)), k.toIpldProofList(msg.Proof))

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

func (k Keeper) GetDidRoute(ctx sdk.Context, name string) (datamodel.Node, error) {
	storeRoute := prefix.NewStore(ctx.KVStore(k.storeKey), []byte(types.DidWebStoreKey))
	has := storeRoute.Has([]byte(name))

	if !has {
		return nil, status.Error(codes.NotFound, "not found")
	}
	var didRoute types.DIDWebRoute
	bz := storeRoute.Get([]byte(name))
	k.cdc.MustUnmarshal(bz, &didRoute)

	return k.GetDid(ctx, didRoute.Cid)

}
func (k Keeper) GetDid(ctx sdk.Context, hash string) (datamodel.Node, error) {

	lsys := k.GetLinkSystem()
	lnk, err := cid.Parse(hash)
	if err != nil {
		return nil, status.Error(
			codes.InvalidArgument,
			types.ErrIntOverflowQuery.Error(),
		)
	}
	id := []byte(lnk.String())
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte(types.DidIPLDStoreKey))
	has := store.Has(id)

	if !has {
		return nil, status.Error(codes.NotFound, "not found")
	}

	lsys.StorageReadOpener = func(lnkCtx ipld.LinkContext, link ipld.Link) (io.Reader, error) {
		store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte(types.DidIPLDStoreKey))
		buf := store.Get(id)
		return bytes.NewReader(buf), nil
	}

	np := basicnode.Prototype.Any

	n, err := lsys.Load(
		linking.LinkContext{},
		cidlink.Link{Cid: lnk},
		np,
	)

	return n, err
}
