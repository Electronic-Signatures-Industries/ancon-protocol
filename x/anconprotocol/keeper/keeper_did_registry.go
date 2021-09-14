package keeper

import (
	"time"

	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/anconprotocol/types"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/hyperledger/aries-framework-go/pkg/doc/did"
	"github.com/itchyny/base58-go"
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
	chainDID, err := BuildDidAncon(ctx, msg.Creator)

	if err != nil {
		return nil, err
	}

	didOwner := types.DIDOwner{
		Identity: msg.Creator,
		Owner:    msg.Creator,
		DidAncon: string(chainDID),
	}

	if msg.DidType == "web" {
		didWeb := BuildDidWeb(ctx, msg)
		didOwner.DidWeb = didWeb.ID
		didOwner.DidWebDeactivated = false
		k.SetDid(didWeb)
	} else if msg.DidType == "key" {
		didKey := BuildDidKey(ctx, msg)
		didOwner.DidKey = didKey.ID
		k.SetDid(didKey)
	}

	return &didOwner, nil
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
	encoding := base58.FlickrEncoding

	sdkCtx := sdk.UnwrapSDKContext(ctx)

	acc, _ := sdk.AccAddressFromBech32(creator)
	encoded, err := encoding.Encode([]byte(acc.String()))

	if err != nil {
		return nil, err
	}

	// public
	pub := encoded // for did:key base58
	ti := time.Now()
	// did web
	base := append([]byte("did:web:"), []byte(ctx.ChainID())...)
	// did web # id
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

	doc := did.BuildDoc(
		did.WithVerificationMethod(ver),
		did.WithService(serv),
		did.WithAuthentication(auth),
		did.WithCreatedTime(ti),
		did.WithUpdatedTime(ti),
	)

	return doc
}

// BuildDidKey ....
func BuildDidKey(ctx sdk.Context, creator string) ([]byte, error) {
	prefix := sdk.GetConfig().GetBech32AccountAddrPrefix()

	addr, err := sdk.GetFromBech32(creator, prefix)

	if err != nil {
		return nil, err
	}

	return append([]byte(types.DidAnconKey), addr...), nil
}

// BuildDidAncon ....
func BuildDidAncon(ctx sdk.Context, creator string) ([]byte, error) {
	prefix := sdk.GetConfig().GetBech32AccountAddrPrefix()

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
