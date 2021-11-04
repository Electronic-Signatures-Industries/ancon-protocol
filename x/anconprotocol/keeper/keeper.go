package keeper

import (
	"encoding/json"
	"fmt"

	aguaclaramodulekeeper "github.com/Electronic-Signatures-Industries/ancon-protocol/x/aguaclara/keeper"

	"github.com/cosmos/cosmos-sdk/store"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	"github.com/cosmos/iavl"
	"github.com/hyperledger/aries-framework-go/pkg/doc/did"
	"github.com/ipld/go-ipld-prime/fluent"

	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"

	"github.com/tendermint/tendermint/libs/log"

	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/anconprotocol/types"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	paramstypes "github.com/cosmos/cosmos-sdk/x/params/types"
	evmkeeper "github.com/tharsis/ethermint/x/evm/keeper"
	// this line is used by starport scaffolding # ibc/keeper/import
)

type Keeper struct {
	cdc             codec.Codec
	storeKey        sdk.StoreKey
	memKey          sdk.StoreKey
	paramSpace      paramstypes.Subspace
	accountKeeper   types.AccountKeeper
	iavltree        *iavl.ImmutableTree
	bankKeeper      types.BankKeeper
	evmKeeper       *evmkeeper.Keeper
	aguaclaraKeeper aguaclaramodulekeeper.Keeper
	blockedAddrs    map[string]bool
	cms             store.CommitMultiStore
	// this line is used by starport scaffolding # ibc/keeper/attribute
}

func NewTestKeeper(
	cdc codec.Codec,
	key sdk.StoreKey,
	memKey sdk.StoreKey,
	paramSpace paramstypes.Subspace,
	accountKeeper types.AccountKeeper,
	bankKeeper types.BankKeeper,
	evmKeeper *evmkeeper.Keeper,
	aguaclaraKeeper aguaclaramodulekeeper.Keeper,
	blockedAddrs map[string]bool,
) Keeper {

	return Keeper{
		storeKey:      key,
		cdc:           cdc,
		memKey:        memKey,
		paramSpace:    paramSpace,
		accountKeeper: accountKeeper,
		bankKeeper:    bankKeeper,
		evmKeeper:     evmKeeper,
		blockedAddrs:  blockedAddrs,
	}
}

func NewKeeper(
	cdc codec.Codec,
	key sdk.StoreKey,
	memKey sdk.StoreKey,
	paramSpace paramstypes.Subspace,
	accountKeeper types.AccountKeeper,
	bankKeeper types.BankKeeper,
	evmKeeper *evmkeeper.Keeper,
	aguaclaraKeeper aguaclaramodulekeeper.Keeper,
	blockedAddrs map[string]bool,
	cms store.CommitMultiStore,
) Keeper {

	return Keeper{
		storeKey:        key,
		cdc:             cdc,
		memKey:          memKey,
		paramSpace:      paramSpace,
		accountKeeper:   accountKeeper,
		bankKeeper:      bankKeeper,
		evmKeeper:       evmKeeper,
		aguaclaraKeeper: aguaclaraKeeper,
		blockedAddrs:    blockedAddrs,
		cms:             cms,
	}
}

// Logger returns a module-specific logger
func (k *Keeper) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With("module", fmt.Sprintf("x/%s", types.ModuleName))
}

// GetHTLCAccount returns the HTLC module account
func (k *Keeper) GetHTLCAccount(ctx sdk.Context) authtypes.ModuleAccountI {
	return k.accountKeeper.GetModuleAccount(ctx, types.ModuleName)
}

// EnsureModuleAccountPermissions syncs the bep3 module account's permissions with those in the supply keeper.
func (k *Keeper) EnsureModuleAccountPermissions(ctx sdk.Context) error {
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
func (k *Keeper) ApplyChangeOwner(ctx sdk.Context, msg *types.MsgChangeOwner) (*types.Change, error) {
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
func (k *Keeper) GetDIDOwner(ctx sdk.Context, owner string) types.DIDOwner {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.OwnerKey))
	var found types.DIDOwner
	id := []byte(owner)
	k.cdc.Unmarshal(store.Get(id), &found)
	return found
}

func (k *Keeper) GetChangeOwner(ctx sdk.Context, identity string) types.Change {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ChangeOwnerKey))
	var found types.Change
	id := []byte(identity)
	k.cdc.Unmarshal(store.Get(id), &found)
	return found
}

func (k *Keeper) GetDelegates(ctx sdk.Context, delegate string, delegateType string, o string) types.Delegate {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.MultiKeyPrefix(types.DelegateKey, []byte(delegate), []byte(delegateType)))
	var found types.Delegate
	id := []byte(o)
	k.cdc.Unmarshal(store.Get(id), &found)
	return found
}

func (k *Keeper) SetOwner(ctx sdk.Context, o types.DIDOwner) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.OwnerKey))
	res := k.cdc.MustMarshal(&o)
	store.Set([]byte(o.Identity), res)
}

func (k *Keeper) SetChange(ctx sdk.Context, c types.Change) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ChangeOwnerKey))
	res := k.cdc.MustMarshal(&c)
	store.Set([]byte(c.Identity), res)
}

func (k *Keeper) SetDelegate(ctx sdk.Context, msg *types.Delegate) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.MultiKeyPrefix(types.DelegateKey, []byte(msg.Delegate), []byte(msg.DelegateType)))
	res := k.cdc.MustMarshal(msg)
	store.Set([]byte(msg.Identity), res)
}

func (k *Keeper) RemoveAttribute(ctx sdk.Context, msg *types.MsgRevokeDelegate) {
	change := types.Change{
		Identity:       msg.Identity,
		Owner:          msg.Creator,
		PreviousChange: uint64(ctx.BlockHeight()),
	}

	k.SetChange(ctx, change)
}

func (k *Keeper) RemoveDelegate(ctx sdk.Context, msg *types.MsgRevokeDelegate) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.MultiKeyPrefix(types.DelegateKey, []byte(msg.Delegate), []byte(msg.DelegateType)))
	//res := k.cdc.MustMarshal(msg)
	store.Delete([]byte(msg.Identity))

	change := types.Change{
		Identity:       msg.Identity,
		Owner:          msg.Creator,
		PreviousChange: uint64(ctx.BlockHeight()),
	}

	k.SetChange(ctx, change)
}

func (k *Keeper) ApplyDelegate(ctx sdk.Context, msg *types.MsgGrantDelegate) (types.Change, error) {
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

func (k *Keeper) AddDid(ctx sdk.Context, msg *types.MsgCreateDid) (*types.DIDOwner, error) {

	var didDoc *did.Doc
	var err error
	didOwner := types.DIDOwner{
		Identity: msg.Creator,
		Owner:    msg.Creator,
	}

	if msg.DidType == "web" {
		didDoc, err = k.BuildDidWeb(ctx, msg.Creator)
		if err != nil {
			return nil, err
		}
		// TODO:move to ValidateBasic
		if k.HasDidWebName(ctx, msg.VanityName) {
			return nil, fmt.Errorf("vanity name exists: %v", msg.VanityName)
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
			Name:  didOwner.VanityName,
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
	k.SetOwner(ctx, didOwner)
	return &didOwner, nil
}

func (k *Keeper) GetDidWebRoute(ctx sdk.Context, vanityName string) types.DIDWebRoute {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.DidWebStoreKey))
	var found types.DIDWebRoute
	id := []byte(vanityName)
	k.cdc.Unmarshal(store.Get(id), &found)

	return found
}

func (k *Keeper) SetDidWebRoute(ctx sdk.Context, didWebRoute *types.DIDWebRoute) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.DidWebStoreKey))
	res := k.cdc.MustMarshal(didWebRoute)
	store.Set([]byte(didWebRoute.Name), res)
}

func (k *Keeper) toIpldStringList(items []string) func(fluent.ListAssembler) {
	return func(la fluent.ListAssembler) {
		for i := 0; i < len(items); i++ {
			//c, _ := cid.Parse(sources[i])
			// todo: implement error handling
			//la.AssembleValue().AssignLink(cidlink.Link{Cid: c})
			la.AssembleValue().AssignString(items[i])
		}
	}
}

func (k *Keeper) toIpldVerMethodList(methods []did.VerificationMethod) func(fluent.ListAssembler) {
	return func(assembler fluent.ListAssembler) {
		for _, method := range methods {
			jsonByte, err := json.Marshal(method)
			if err != nil {
				continue
			}
			assembler.AssembleValue().AssignBytes(jsonByte)
		}
	}
}

func (k *Keeper) toIpldServiceList(services []did.Service) func(fluent.ListAssembler) {
	return func(assembler fluent.ListAssembler) {
		for _, service := range services {
			jsonByte, err := json.Marshal(service)
			if err != nil {
				continue
			}
			assembler.AssembleValue().AssignBytes(jsonByte)
		}
	}
}

func (k *Keeper) toIpldVerificationList(authentications []did.Verification) func(fluent.ListAssembler) {
	return func(assembler fluent.ListAssembler) {
		for _, auth := range authentications {
			jsonByte, err := json.Marshal(auth)
			if err != nil {
				continue
			}
			assembler.AssembleValue().AssignBytes(jsonByte)
		}
	}
}

func (k *Keeper) toIpldProofList(proofs []did.Proof) func(fluent.ListAssembler) {
	return func(assembler fluent.ListAssembler) {
		for _, proof := range proofs {
			jsonByte, err := json.Marshal(proof)
			if err != nil {
				continue
			}
			assembler.AssembleValue().AssignBytes(jsonByte)
		}
	}
}

func (k *Keeper) ApplyAttribute(ctx sdk.Context, msg *types.MsgGrantAttribute) (types.Change, error) {
	change := types.Change{
		Identity:       msg.Identity,
		Owner:          msg.Actor,
		PreviousChange: uint64(ctx.BlockHeight()),
	}

	k.SetChange(ctx, change)
	return change, nil
}

// Has functions checks if the documents exists in the store
func (k *Keeper) HasDelegates(ctx sdk.Context, delegate string, delegateType string, o string) bool {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.MultiKeyPrefix(types.DelegateKey, []byte(delegate), []byte(delegateType)))
	return store.Has([]byte(o))
}

func (k *Keeper) HasChangeOwner(ctx sdk.Context, identity string) bool {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ChangeOwnerKey))
	return store.Has([]byte(identity))
}

func (k *Keeper) HasOwner(ctx sdk.Context, o string) bool {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.OwnerKey))
	return store.Has([]byte(o))
}

func (k *Keeper) HasDidWebName(ctx sdk.Context, vn string) bool {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.DidWebStoreKey))
	return store.Has([]byte(vn))
}

func (k *Keeper) HasDidWebRoute(ctx sdk.Context, didWebRoute *types.DIDWebRoute) bool {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.DidWebStoreKey))
	return store.Has([]byte(didWebRoute.Route))
}
