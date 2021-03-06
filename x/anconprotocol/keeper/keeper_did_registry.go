package keeper

import (
	"bytes"
	"crypto/ed25519"
	"crypto/rand"
	"crypto/sha256"
	"fmt"
	"io"
	"net/url"
	"strings"
	"time"

	jsonstore "github.com/Electronic-Signatures-Industries/ancon-protocol/x/anconprotocol/store/json"
	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/anconprotocol/types"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/hyperledger/aries-framework-go/pkg/doc/did"
	cid "github.com/ipfs/go-cid"
	"github.com/ipld/go-ipld-prime"
	"github.com/ipld/go-ipld-prime/codec/dagjson"
	"github.com/ipld/go-ipld-prime/datamodel"
	"github.com/ipld/go-ipld-prime/linking"
	cidlink "github.com/ipld/go-ipld-prime/linking/cid"
	basicnode "github.com/ipld/go-ipld-prime/node/basic"
	"github.com/spf13/cast"

	"github.com/multiformats/go-multibase"
	"github.com/multiformats/go-multicodec"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type Delegate struct {
	identity sdk.AccAddress
}

// BuildDidWeb ....
func (k Keeper) BuildDidWeb(ctx sdk.Context, vanityName string, pubkey []byte) (*did.Doc, error) {
	ti := time.Now()
	//Dev: chain id is replaced on the query by http host
	// did web
	base := append([]byte("did:web:ancon.did.pa:user:"), []byte(vanityName)...)
	// did web # id
	//	id := append(base, []byte("#")...)
	// id = append(id, encoded...)

	//Authentication method 2018
	didWebVer := did.NewVerificationMethodFromBytes(
		string(base),
		"Secp256k1VerificationKey2018",
		string(base),
		pubkey,
	)

	ver := []did.VerificationMethod{}
	ver = append(ver, *didWebVer)

	//	serv := []did.Service{{}, {}}

	// Secp256k1SignatureAuthentication2018
	auth := []did.Verification{{}}

	didWebAuthVerification := did.NewEmbeddedVerification(didWebVer, did.Authentication)

	auth = append(auth, *didWebAuthVerification)

	doc := did.BuildDoc(
		did.WithVerificationMethod(ver),
		///		did.WithService(serv),
		did.WithAuthentication(auth),
		did.WithCreatedTime(ti),
		did.WithUpdatedTime(ti),
	)
	doc.ID = string(base)
	return doc, nil
}

// BuildDidKey ....
func (k Keeper) BuildDidKey(ctx sdk.Context) (*did.Doc, error) {

	pubKey, _, err := ed25519.GenerateKey(rand.Reader)
	if err != nil {
		panic(err)
	}

	ti := time.Now()
	multi := append([]byte(multicodec.Secp256k1Pub.String()), pubKey...)
	code, _ := multibase.Encode(multibase.Base58BTC, multi)
	// did key
	base := append([]byte("did:key:"), code...)
	// did key # id
	id := append(base, []byte("#")...)

	didWebVer := did.NewVerificationMethodFromBytes(
		string(id),
		"Ed25519VerificationKey2018",
		string(base),
		[]byte(pubKey),
	)

	ver := []did.VerificationMethod{}
	ver = append(ver, *didWebVer)
	//	serv := []did.Service{{}, {}}

	// Secp256k1SignatureAuthentication2018
	auth := []did.Verification{{}}

	didWebAuthVerification := did.NewEmbeddedVerification(didWebVer, did.Authentication)

	auth = append(auth, *didWebAuthVerification)

	doc := did.BuildDoc(
		did.WithVerificationMethod(ver),
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

		didDoc, err = k.BuildDidWeb(ctx, msg.VanityName, key)
		if err != nil {
			return nil, err
		}

	} else if msg.DidType == "key" {
		didDoc, err = k.BuildDidKey(ctx)
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
	didOwner.Cid = cid
	didOwner.Did = didDoc.ID
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
			store.Set([]byte(lnk.String()), buf.Bytes())
			store2 := prefix.NewStore(ctx.KVStore(k.storeKey), []byte(types.DidWebStoreKey))
			store2.Set([]byte(msg.ID), []byte(
				lnk.String(),
			))
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
	bz, err := msg.JSONBytes()
	// bz, err := cbor.Marshal(msg)
	np := basicnode.Prototype.Any
	n, err := jsonstore.Decode(np, string(bz))

	if err != nil {
		return "", err
	}

	// tip: 0x0129 dag-json
	lp := cidlink.LinkPrototype{cid.Prefix{
		Version:  1,
		Codec:    0x0129, // dag-cbor
		MhType:   0x12,   // sha2-256
		MhLength: 32,     // sha2-256 hash has a 32-byte sum.
	}}

	link := lsys.MustStore(
		ipld.LinkContext{}, // The zero value is fine.  Configure it it you want cancellability or other features.
		lp,                 // The LinkPrototype says what codec and hashing to use.
		n,                  // And here's our data.
	)

	// id, _ := cid.Decode(link.String())
	return link.String(), nil
}

func (k Keeper) GetDid(ctx sdk.Context, hash string) (datamodel.Node, error) {

	lsys := cidlink.DefaultLinkSystem()

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

const (
	defaultPath  = "/.well-known/did.json"
	documentPath = "/did.json"
)

func (k Keeper) ParseDIDWeb(id string, useHTTP bool) (string, string, error) {
	var address, host string

	parsedDID, err := did.Parse(id)
	if err != nil {
		return address, host, fmt.Errorf("invalid did, does not conform to generic did standard --> %w", err)
	}

	pathComponents := strings.Split(parsedDID.MethodSpecificID, ":")

	pathComponents[0], err = url.QueryUnescape(pathComponents[0])
	if err != nil {
		return address, host, fmt.Errorf("error parsing did:web did")
	}

	host = strings.Split(pathComponents[0], ":")[0]

	protocol := "https://"
	if useHTTP {
		protocol = "http://"
	}

	switch len(pathComponents) {
	case 1:
		address = protocol + pathComponents[0] + defaultPath
	default:
		address = protocol + strings.Join(pathComponents, "/") + documentPath
	}

	return address, host, nil
}

func (k Keeper) CalculateAnchorChallenge(ctx sdk.Context, sender, cid, key string) []byte {
	s := append([]byte(sender), cid...)
	s = append([]byte(s), key...)
	s = append([]byte(s), ctx.ChainID()...)

	challenge := sha256.Sum256(s)

	return []byte(cast.ToString(challenge))
}
func (k Keeper) ApplyAnchorCidWithProof(ctx sdk.Context, msg *types.MsgAnchorCidWithProof) error {

	node, err := k.ReadAnyDid(ctx, msg.Did)

	if err != nil {
		return err
	}

	var bufdata bytes.Buffer
	_ = dagjson.Encode(node, &bufdata)

	diddoc, err := did.ParseDocument(bufdata.Bytes())

	if err != nil {
		return fmt.Errorf("invalid DID document")
	}

	pk := (diddoc.VerificationMethod[0].Value)
	challenge := k.CalculateAnchorChallenge(ctx, msg.Creator, msg.Cid, msg.Key)
	ok := ed25519.Verify(pk, challenge, msg.Proof)
	// err = diddoc.VerifyProof()
	if !ok {
		return fmt.Errorf("invalid proof signature")
	}
	k.SetAnchor(ctx, diddoc.ID, msg.Cid, msg.Key)

	return nil
}
