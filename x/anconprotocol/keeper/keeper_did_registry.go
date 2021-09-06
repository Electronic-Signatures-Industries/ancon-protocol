package keeper

import (
	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/anconprotocol/types"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k Keeper) ChangeOwner(ctx sdk.Context, msg *types.MsgChangeOwner) (string, error) {
	// id := append([]byte(lnk.String()), path...)
	store := prefix.NewStore(
		ctx.KVStore(k.storeKey),
		types.KeyPrefix(types.OwnerKey))
	b := k.cdc.MustMarshalBinaryBare(&documents)
	store.Set(GetDocumentsIDBytes(documents.Id), b)
}

// GetOwner returns a documents from its id
func (k Keeper) GetOwner(ctx sdk.Context, id uint64) types.Documents {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.DocumentsKey))
	var documents types.Documents
	k.cdc.MustUnmarshalBinaryBare(store.Get(GetDocumentsIDBytes(id)), &documents)
	return documents
}

// HasOwner checks if the documents exists in the store
func (k Keeper) HasOwner(ctx sdk.Context, id uint64) bool {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.DocumentsKey))
	return store.Has(GetDocumentsIDBytes(id))
}
func (k Keeper) SetAttribute(ctx sdk.Context, msg *types.MsgSetAttribute) (string, error) {
	return "", nil
}

func (k Keeper) RevokeDelegate(ctx sdk.Context, msg *types.MsgRevokeDelegate) (string, error) {
	return "", nil
}

func (k Keeper) AddDelegate(ctx sdk.Context, msg *types.MsgAddDelegate) (string, error) {
	return "", nil
}

func (k Keeper) ChangeDelegates(ctx sdk.Context, msg *types.MsgChangeDelegates) (string, error) {
	// id := append([]byte(lnk.String()), path...)
	store := prefix.NewStore(
		ctx.KVStore(k.storeKey),
		types.KeyPrefix(types.Delegates))
	b := k.cdc.MustMarshalBinaryBare(&documents)
	store.Set(GetDocumentsIDBytes(documents.Id), b)
}

// GetDelegates returns a documents from its id
func (k Keeper) GetDelegates(ctx sdk.Context, id uint64) types.Documents {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.DocumentsKey))
	var documents types.Documents
	k.cdc.MustUnmarshalBinaryBare(store.Get(GetDocumentsIDBytes(id)), &documents)
	return documents
}

// HasOwner checks if the documents exists in the store
func (k Keeper) HasDelegates(ctx sdk.Context, delegate string, tag string, o string) bool {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.de))
	return store.Has(GetDocumentsIDBytes(id))
}
