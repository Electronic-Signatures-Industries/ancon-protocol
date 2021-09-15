package keeper

import (
	"bytes"
	"fmt"
	"io"
	"time"

	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/anconprotocol/types"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/hyperledger/aries-framework-go/pkg/doc/did"
	cid "github.com/ipfs/go-cid"
	"github.com/ipld/go-ipld-prime"
	"github.com/ipld/go-ipld-prime/fluent"
	cidlink "github.com/ipld/go-ipld-prime/linking/cid"
	basicnode "github.com/ipld/go-ipld-prime/node/basic"
	"github.com/itchyny/base58-go"
	"github.com/multiformats/go-multibase"
	"github.com/multiformats/go-multicodec"
	"github.com/spf13/cast"
)

type Delegate struct {
	identity sdk.AccAddress
}

// ApplyChangeOwner = AppendOwner
func (k Keeper) ApplyChangeOwner(ctx sdk.Context, msg *types.MsgChangeOwner) (*types.Change, error) {
	//verify that the creator is owner of that account
	owner := types.DIDOwner{
		Identity: msg.Identity,
		Owner:    msg.NewOwner,
	}

	k.SetOwner(ctx, owner)

	change := types.Change{
		Identity:       msg.Identity,
		Owner:          msg.NewOwner,
		PreviousChange: uint64(ctx.BlockHeight()),
	}

	k.SetChange(ctx, change)
	return &change, nil
}

//Get functions returns a documents from its id
func (k Keeper) GetDIDOwner(ctx sdk.Context, owner string) types.DIDOwner {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.OwnerKey))
	var found types.DIDOwner
	id := []byte(owner)
	k.cdc.UnmarshalBinaryBare(store.Get(id), &found)
	return found
}

func (k Keeper) GetChangeOwner(ctx sdk.Context, identity string) types.Change {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ChangeOwnerKey))
	var found types.Change
	id := []byte(identity)
	k.cdc.UnmarshalBinaryBare(store.Get(id), &found)
	return found
}

func (k Keeper) GetDelegates(ctx sdk.Context, delegate string, delegateType string, o string) types.Delegate {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.MultiKeyPrefix(types.DelegateKey, []byte(delegate), []byte(delegateType)))
	var found types.Delegate
	id := []byte(o)
	k.cdc.UnmarshalBinaryBare(store.Get(id), &found)
	return found
}

func (k Keeper) SetOwner(ctx sdk.Context, o types.DIDOwner) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.OwnerKey))
	res := k.cdc.MustMarshalBinaryBare(&o)
	store.Set([]byte(o.Identity), res)
}

func (k Keeper) SetChange(ctx sdk.Context, c types.Change) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ChangeOwnerKey))
	res := k.cdc.MustMarshalBinaryBare(&c)
	store.Set([]byte(c.Identity), res)
}

func (k Keeper) SetDelegate(ctx sdk.Context, msg *types.Delegate) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.MultiKeyPrefix(types.DelegateKey, []byte(msg.Delegate), []byte(msg.DelegateType)))
	res := k.cdc.MustMarshalBinaryBare(msg)
	store.Set([]byte(msg.Identity), res)
}

func (k Keeper) RemoveAttribute(ctx sdk.Context, msg *types.MsgRevokeDelegate) {
	change := types.Change{
		Identity:       msg.Identity,
		Owner:          msg.Creator,
		PreviousChange: uint64(ctx.BlockHeight()),
	}

	k.SetChange(ctx, change)
}

func (k Keeper) RemoveDelegate(ctx sdk.Context, msg *types.MsgRevokeDelegate) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.MultiKeyPrefix(types.DelegateKey, []byte(msg.Delegate), []byte(msg.DelegateType)))
	//res := k.cdc.MustMarshalBinaryBare(msg)
	store.Delete([]byte(msg.Identity))

	change := types.Change{
		Identity:       msg.Identity,
		Owner:          msg.Creator,
		PreviousChange: uint64(ctx.BlockHeight()),
	}

	k.SetChange(ctx, change)
}

func (k Keeper) ApplyDelegate(ctx sdk.Context, msg *types.MsgGrantDelegate) (types.Change, error) {
	blockTime := ctx.BlockTime()
	grantDelegate := &types.Delegate{
		Delegate:     msg.Delegate,
		DelegateType: msg.DelegateType,
		Validity:     msg.Validity + uint64(blockTime.Unix()),
		Creator:      msg.Creator,
		Identity:     msg.Identity,
	}
	k.SetDelegate(ctx, grantDelegate)

	change := types.Change{
		Identity:       msg.Identity,
		Owner:          msg.Delegate,
		PreviousChange: uint64(ctx.BlockHeight()),
	}

	k.SetChange(ctx, change)
	return change, nil
}

func (k Keeper) AddDid(ctx sdk.Context, msg *types.MsgCreateDid) (*types.DIDOwner, error) {
	didAncon, err := BuildDidAncon(ctx, msg.Creator)

	if err != nil {
		return nil, err
	}

	didOwner := types.DIDOwner{
		Identity: msg.Creator,
		Owner:    msg.Creator,
		DidAncon: string(didAncon),
	}

	if msg.DidType == "web" {
		didDoc, err := BuildDidWeb(ctx, msg.Creator)
		if err != nil {
			return nil, err
		}
		// TODO:move to ValidateBasic
		if k.HasDidWebName(ctx, msg.VanityName) {
			return nil, fmt.Errorf("vanity name exists: %v", msg.VanityName)
		}
		didOwner.DidWeb = didDoc.ID
		didOwner.DidWebDeactivated = false
		k.SetOwner(ctx, didOwner)
		cid, err := k.SetDid(ctx, didDoc)
		k.SetDidWebRoute(ctx, &didOwner, cid)

	} else if msg.DidType == "key" {
		didDoc, err := BuildDidKey(ctx, msg.Creator)
		if err != nil {
			return nil, err
		}
		didOwner.DidKey = didDoc.ID
		k.SetOwner(ctx, didOwner)
		k.SetDid(ctx, didDoc)
	} else {
		return nil, fmt.Errorf("Must create a did")
	}

	return &didOwner, nil
}

func (k Keeper) SetDidWebRoute(ctx sdk.Context, didOwner *types.DIDOwner, cid string) {

}

func (k Keeper) toIpldStringList(items []string) func(fluent.ListAssembler) {
	return func(la fluent.ListAssembler) {
		for i := 0; i < len(items); i++ {
			//c, _ := cid.Parse(sources[i])
			// todo: implement error handling
			//la.AssembleValue().AssignLink(cidlink.Link{Cid: c})
			la.AssembleValue().AssignString(items[i])
		}
	}
}

func (k Keeper) toIpldVerMethodList(items []interface{}) {

}

func (k Keeper) toIpldServiceList(items []interface{}) {

}

func (k Keeper) toIpldVerificationList(items []interface{}) {

}

func (k Keeper) toIpldProofList(items []interface{}) {

}

//IPLD Store DID Type is Web
func (k Keeper) SetDid(ctx sdk.Context, msg *did.Doc) (string, error) {
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
			store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte(types.DidAnconKey))
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
		// TODO:
		na.AssembleEntry("context").CreateList(cast.ToInt64(len(msg.Context)), k.toIpldStringList(msg.Context))
		na.AssembleEntry("id").AssignString(msg.ID)
		na.AssembleEntry("verificationMethod").CreateList(cast.ToInt64(len(msg.VerificationMethod)), k.toIpldVerMethodList(msg.VerificationMethod))
		na.AssembleEntry("service").CreateList(cast.ToInt64(len(msg.Service)), k.toIpldServiceList(msg.Service))
		na.AssembleEntry("authentication").CreateList(cast.ToInt64(len(msg.Authentication)), k.toIpldVerificationList(msg.Authentication))
		na.AssembleEntry("assertionMethod").CreateList(cast.ToInt64(len(msg.AssertionMethod)), k.toIpldVerificationList(msg.AssertionMethod))
		na.AssembleEntry("capabilityDelegation").CreateList(cast.ToInt64(len(msg.CapabilityDelegation)), k.toIpldVerificationList(msg.CapabilityDelegation))
		na.AssembleEntry("capabilityInvocation").CreateList(cast.ToInt64(len(msg.CapabilityInvocation)), k.toIpldVerificationList(msg.CapabilityInvocation))
		na.AssembleEntry("keyAgreement").CreateList(cast.ToInt64(len(msg.KeyAgreement)), k.toIpldVerificationList(msg.KeyAgreement))
		na.AssembleEntry("created").AssignString((msg.Created.String()))
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

// BuildDidWeb ....
func BuildDidWeb(ctx sdk.Context, creator string) (*did.Doc, error) {

	// impl read checks
	//
	//		sdkCtx := sdk.UnwrapSDKContext(ctx)
	//	sdkCtx.ChainID()
	// 1. Get SDK context
	// 2. Get ChainID and http host
	// 3. Send to read/validation query for  DID
	// 4. any use case, replace chainid with http host
	encoding := base58.BitcoinEncoding

	//sdkCtx := sdk.UnwrapSDKContext(ctx)

	acc, _ := sdk.AccAddressFromBech32(creator)
	encoded, err := encoding.Encode(acc.Bytes())

	if err != nil {
		return nil, err
	}

	// public
	pub := encoded // for did:key base58
	ti := time.Now()
	//Dev: chain id is replaced on the query by http host
	// did web
	base := append([]byte("did:web:"), []byte(ctx.ChainID())...)
	// did web # id
	id := append(base, []byte("#12345")...)

	//Authentication method 2018
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

	doc := did.BuildDoc(
		did.WithVerificationMethod(ver),
		did.WithService(serv),
		did.WithAuthentication(auth),
		did.WithCreatedTime(ti),
		did.WithUpdatedTime(ti),
	)

	return doc, nil
}

// BuildDidKey ....
func BuildDidKey(ctx sdk.Context, creator string) (*did.Doc, error) {

	encoding := base58.BitcoinEncoding

	// sdkCtx := sdk.UnwrapSDKContext(ctx)

	acc, _ := sdk.AccAddressFromBech32(creator)
	encoded, err := encoding.Encode(acc.Bytes())

	if err != nil {
		return nil, err
	}

	// public
	pub := encoded
	ti := time.Now()
	multi := append([]byte(multicodec.Secp256k1Pub.String()), acc.Bytes()...)
	code, _ := multibase.Encode(multibase.Base58BTC, multi)
	// did key
	base := append([]byte("did:key:z"), code...)
	// did key # id
	id := append(base, []byte("#12345")...)

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
	//marshal & unmarshal for unit tests
	return doc, nil
}

// BuildDidAncon ....
func BuildDidAncon(ctx sdk.Context, creator string) ([]byte, error) {
	prefix := sdk.GetConfig().GetBech32AccountAddrPrefix()
	//multicodec.
	addr, err := sdk.GetFromBech32(creator, prefix)

	if err != nil {
		return nil, err
	}

	return append([]byte(types.DidAnconKey), addr...), nil
}

func (k Keeper) ApplyAttribute(ctx sdk.Context, msg *types.MsgGrantAttribute) (types.Change, error) {
	change := types.Change{
		Identity:       msg.Identity,
		Owner:          msg.Actor,
		PreviousChange: uint64(ctx.BlockHeight()),
	}

	k.SetChange(ctx, change)
	return change, nil
}

// Has functions checks if the documents exists in the store
func (k Keeper) HasDelegates(ctx sdk.Context, delegate string, delegateType string, o string) bool {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.MultiKeyPrefix(types.DelegateKey, []byte(delegate), []byte(delegateType)))
	return store.Has([]byte(o))
}

func (k Keeper) HasChangeOwner(ctx sdk.Context, identity string) bool {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ChangeOwnerKey))
	return store.Has([]byte(identity))
}

func (k Keeper) HasOwner(ctx sdk.Context, o string) bool {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.OwnerKey))
	return store.Has([]byte(o))
}

func (k Keeper) HasDidWebName(ctx sdk.Context, vn string) bool {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.DidWebStoreKey))
	return store.Has([]byte(vn))
}
