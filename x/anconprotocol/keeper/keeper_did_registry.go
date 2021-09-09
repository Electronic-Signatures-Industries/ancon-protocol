package keeper

import (
	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/anconprotocol/types"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

type Delegate struct {
	identity sdk.AccAddress
}

func (k Keeper) ApplyChangeOwner(ctx sdk.Context, msg *types.MsgChangeOwner) (*types.Change, error) {
	//verify that the creator is owner of that account
	owner := types.Owner{
		Identity: msg.Identity,
		Owner:    msg.NewOwner,
	}

	k.SetOwner(ctx, owner)
	//event

	change := types.Change{
		Identity:       msg.Identity,
		Owner:          msg.NewOwner,
		PreviousChange: uint64(ctx.BlockHeight()),
	}

	k.SetChange(ctx, change)
	return &change, nil
}

//Get functions returns a documents from its id
func (k Keeper) GetOwner(ctx sdk.Context, o string) string {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.Owners))
	return string(store.Get([]byte(o)))
}

func (k Keeper) GetChangeOwner(ctx sdk.Context, identity string) string {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ChangeOwner))
	return string(store.Get([]byte(identity)))
}

func (k Keeper) GetDelegates(ctx sdk.Context, delegate string, deleateType string, o string) string {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.MultiKeyPrefix([]byte(delegate), []byte(deleateType)))
	return string(store.Get([]byte(o)))
}

func (k Keeper) SetOwner(ctx sdk.Context, o types.Owner) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.Owners))
	res := k.cdc.MustMarshalBinaryBare(&o)
	store.Set([]byte(o.Identity), res)
}

func (k Keeper) SetChange(ctx sdk.Context, c types.Change) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ChangeOwner))
	res := k.cdc.MustMarshalBinaryBare(&c)
	store.Set([]byte(c.Identity), res)
}

func (k Keeper) SetDelegate(ctx sdk.Context, msg *types.Delegate) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.MultiKeyPrefix([]byte(msg.Delegate), []byte(msg.DelegateType)))
	res := k.cdc.MustMarshalBinaryBare(msg)
	store.Set([]byte(msg.Identity), res)
}

func (k Keeper) SetAttribute(ctx sdk.Context, msg *types.Attribute) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.Attributes))
	res := k.cdc.MustMarshalBinaryBare(msg)
	store.Set([]byte(msg.Identity), res)
}

func (k Keeper) RemoveAttribute(ctx sdk.Context, msg *types.MsgRevokeDelegate) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.MultiKeyPrefix([]byte(msg.Delegate), []byte(msg.DelegateType)))
	//res := k.cdc.MustMarshalBinaryBare(msg)
	store.Delete([]byte(msg.Identity))

	change := types.Change{
		Identity:       msg.Identity,
		Owner:          msg.Creator,
		PreviousChange: uint64(ctx.BlockHeight()),
	}

	k.SetChange(ctx, change)
}

func (k Keeper) RemoveDelegate(ctx sdk.Context, msg *types.MsgRevokeDelegate) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.MultiKeyPrefix([]byte(msg.Delegate), []byte(msg.DelegateType)))
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

func (k Keeper) ApplyAttribute(ctx sdk.Context, msg *types.MsgGrantAttribute) (types.Change, error) {
	grantAttribute := &types.Attribute{
		Identity: msg.Identity,
		Name:     msg.Name,
		Value:    msg.Value,
	}
	k.SetAttribute(ctx, grantAttribute)

	change := types.Change{
		Identity:       msg.Identity,
		Owner:          msg.Actor,
		PreviousChange: uint64(ctx.BlockHeight()),
	}

	k.SetChange(ctx, change)
	return change, nil
}

// Has functions checks if the documents exists in the store
func (k Keeper) HasDelegates(ctx sdk.Context, delegate string, deleateType string, o string) bool {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.MultiKeyPrefix([]byte(delegate), []byte(deleateType)))
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
