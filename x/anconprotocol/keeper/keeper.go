package keeper

import (
	"fmt"

	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"

	"github.com/tendermint/tendermint/libs/log"

	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/anconprotocol/types"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	paramstypes "github.com/cosmos/cosmos-sdk/x/params/types"
	// this line is used by starport scaffolding # ibc/keeper/import
)

type (
	Keeper struct {
		cdc           codec.Marshaler
		storeKey      sdk.StoreKey
		memKey        sdk.StoreKey
		paramSpace    paramstypes.Subspace
		accountKeeper types.AccountKeeper
		bankKeeper    types.BankKeeper
		blockedAddrs  map[string]bool
		// this line is used by starport scaffolding # ibc/keeper/attribute
	}
)

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
