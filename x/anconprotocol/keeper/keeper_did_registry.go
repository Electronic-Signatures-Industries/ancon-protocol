package keeper

import (
	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/anconprotocol/types"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

type Owner struct {
	identity     sdk.AccAddress
	did_identity string
	owner        sdk.AccAddress
}

type Delegate struct {
	identity sdk.AccAddress
}

// func (k Keeper) ChangeOwner(ctx sdk.Context, msg *types.MsgChangeOwner) (string, error) {
// 	// id := append([]byte(lnk.String()), path...)
// 	//store := prefix.NewStore(
// 		//ctx.KVStore(k.storeKey),
// 		//types.KeyPrefix(types.OwnerKey))
// 	// b := k.cdc.MustMarshalBinaryBare(&documents)
// 	// store.Set(GetDocumentsIDBytes(documents.Id), b)
// 	//return nil
// }

//GetOwner returns a documents from its id
func (k Keeper) GetOwner(ctx sdk.Context, o string) string {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.Owners))
	return string(store.Get([]byte(o)))
}

// HasOwner checks if the documents exists in the store
// func (k Keeper) HasOwner(ctx sdk.Context, id uint64) (string, error) {
// 	return "", nil
// }

func (k Keeper) SetAttribute(ctx sdk.Context, msg *types.MsgSetAttribute) (string, error) {
	return "", nil
}

func (k Keeper) RevokeDelegate(ctx sdk.Context, msg *types.MsgRevokeDelegate) (string, error) {
	return "", nil
}

func (k Keeper) AddDelegate(ctx sdk.Context, msg *types.MsgAddDelegate) (string, error) {
	return "", nil
}

func (k Keeper) ChangeDelegates(ctx sdk.Context) (string, error) {
	// id := append([]byte(lnk.String()), path...)
	return "", nil
}

//GetDelegates returns a documents from its id
func (k Keeper) GetDelegates(ctx sdk.Context, id uint64) (string, error) {
	return "", nil
}

// HasDelegates checks if the documents exists in the store
func (k Keeper) HasDelegates(ctx sdk.Context, delegate string, tag string, o string) bool {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.MultiKeyPrefix([]byte(delegate), []byte(tag)))
	return store.Has([]byte(o))
}

func (k Keeper) HasChangeOwner(ctx sdk.Context, identity string) bool {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ChangeOwner))
	return store.Has([]byte(identity))
}

func (k Keeper) HasOwner(ctx sdk.Context, o string) bool {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.Owners))
	return store.Has([]byte(o))
}

// func (k Keeper) HasNonce(ctx sdk.Context, identity string) bool {
// 	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ChangeOwner))
// 	return store.Has([]byte(identity))
// }
