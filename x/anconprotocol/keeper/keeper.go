package keeper

import (
	"bytes"
	"encoding/json"
	"fmt"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	"github.com/hyperledger/aries-framework-go/pkg/doc/did"
	"github.com/ipfs/go-cid"
	"github.com/ipld/go-ipld-prime"
	"github.com/ipld/go-ipld-prime/fluent"
	cidlink "github.com/ipld/go-ipld-prime/linking/cid"
	"github.com/ipld/go-ipld-prime/node/basicnode"
	"github.com/spf13/cast"
	"io"

	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"

	"github.com/tendermint/tendermint/libs/log"

	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/anconprotocol/types"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	paramstypes "github.com/cosmos/cosmos-sdk/x/params/types"
	// this line is used by starport scaffolding # ibc/keeper/import
)

type Keeper struct {
	cdc           codec.Marshaler
	storeKey      sdk.StoreKey
	memKey        sdk.StoreKey
	paramSpace    paramstypes.Subspace
	accountKeeper types.AccountKeeper
	bankKeeper    types.BankKeeper
	blockedAddrs  map[string]bool
	// this line is used by starport scaffolding # ibc/keeper/attribute
}

func NewTestKeeper(
	cdc codec.Marshaler,
	key sdk.StoreKey,
	memKey sdk.StoreKey,
	paramSpace paramstypes.Subspace,
	accountKeeper types.AccountKeeper,
	bankKeeper types.BankKeeper,
	blockedAddrs map[string]bool,
) Keeper {

	return Keeper{
		storeKey:      key,
		cdc:           cdc,
		memKey:        memKey,
		paramSpace:    paramSpace,
		accountKeeper: accountKeeper,
		bankKeeper:    bankKeeper,
		blockedAddrs:  blockedAddrs,
	}
}
func NewKeeper(
	cdc codec.Marshaler,
	key sdk.StoreKey,
	memKey sdk.StoreKey,
	paramSpace paramstypes.Subspace,
	accountKeeper types.AccountKeeper,
	bankKeeper types.BankKeeper,
	blockedAddrs map[string]bool,
) Keeper {

	return Keeper{
		storeKey:      key,
		cdc:           cdc,
		memKey:        memKey,
		paramSpace:    paramSpace,
		accountKeeper: accountKeeper,
		bankKeeper:    bankKeeper,
		blockedAddrs:  blockedAddrs,
	}
}

// Logger returns a module-specific logger
func (k Keeper) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With("module", fmt.Sprintf("x/%s", types.ModuleName))
}

// GetHTLCAccount returns the HTLC module account
func (k Keeper) GetHTLCAccount(ctx sdk.Context) authtypes.ModuleAccountI {
	return k.accountKeeper.GetModuleAccount(ctx, types.ModuleName)
}

// EnsureModuleAccountPermissions syncs the bep3 module account's permissions with those in the supply keeper.
func (k Keeper) EnsureModuleAccountPermissions(ctx sdk.Context) error {
	maccI := k.accountKeeper.GetModuleAccount(ctx, types.ModuleName)
	macc, ok := maccI.(*authtypes.ModuleAccount)
	if !ok {
		return fmt.Errorf("expected %s account to be a module account type", types.ModuleName)
	}
	_, perms := k.accountKeeper.GetModuleAddressAndPermissions(types.ModuleName)
	macc.Permissions = perms
	k.accountKeeper.SetModuleAccount(ctx, macc)
	return nil
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

func (k Keeper) toIpldVerMethodList(methods []did.VerificationMethod) func(fluent.ListAssembler) {
	return func(assembler fluent.ListAssembler) {
		for _, method := range methods {
			jsonByte, err := json.Marshal(method)
			if err != nil {
				continue
			}
			assembler.AssembleValue().AssignString(string(jsonByte))
		}
	}
}

func (k Keeper) toIpldServiceList(services []did.Service) func(fluent.ListAssembler) {
	return func(assembler fluent.ListAssembler) {
		for _, service := range services {
			jsonByte, err := json.Marshal(service)
			if err != nil {
				continue
			}
			assembler.AssembleValue().AssignString(string(jsonByte))
		}
	}
}

func (k Keeper) toIpldVerificationList(authentications []did.Verification) func(fluent.ListAssembler) {
	return func(assembler fluent.ListAssembler) {
		for _, auth := range authentications {
			jsonByte, err := json.Marshal(auth)
			if err != nil {
				continue
			}
			assembler.AssembleValue().AssignString(string(jsonByte))
		}
	}
}

func (k Keeper) toIpldProofList(proofs []did.Proof) func(fluent.ListAssembler) {
	return func(assembler fluent.ListAssembler) {
		for _, proof := range proofs {
			jsonByte, err := json.Marshal(proof)
			if err != nil {
				continue
			}
			assembler.AssembleValue().AssignString(string(jsonByte))
		}
	}
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
