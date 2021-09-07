package keeper

import (
	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/anconprotocol/exported"
	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/anconprotocol/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/cosmos/cosmos-sdk/types/query"
)

// IssueDenom issues a denom according to the given params
func (k Keeper) IssueDenom(ctx sdk.Context,
	id, name, schema, symbol string,
	creator sdk.AccAddress,
	mintRestricted, updateRestricted bool,
) error {
	return k.SetDenom(ctx, types.NewDenom(id, name, schema, symbol, creator, mintRestricted, updateRestricted))
}

// MintNFT mints an NFT and manages the NFT's existence within Collections and Owners
func (k Keeper) MintNFT(
	ctx sdk.Context, denomID, tokenID, tokenNm,
	tokenURI, tokenData string, owner sdk.AccAddress,
) error {
	denom, found := k.GetDenom(ctx, denomID)
	if !found {
		return sdkerrors.Wrapf(types.ErrInvalidDenom, "denom ID %s not exists", denomID)
	}

	if denom.MintRestricted && denom.Creator != owner.String() {
		return sdkerrors.Wrapf(sdkerrors.ErrUnauthorized, "%s is not allowed to mint NFT of denom %s", denom.Creator, denomID)
	}

	if k.HasNFT(ctx, denomID, tokenID) {
		return sdkerrors.Wrapf(types.ErrNFTAlreadyExists, "NFT %s already exists in collection %s", tokenID, denomID)
	}

	k.setNFT(
		ctx, denomID,
		types.NewBaseNFT(
			tokenID,
			tokenNm,
			owner,
			tokenURI,
			tokenData,
		),
	)
	k.setOwner(ctx, denomID, tokenID, owner)
	k.increaseSupply(ctx, denomID)

	return nil
}

// EditNFT updates an already existing NFT
func (k Keeper) EditNFT(
	ctx sdk.Context, denomID, tokenID, tokenNm,
	tokenURI, tokenData string, owner sdk.AccAddress,
) error {
	denom, found := k.GetDenom(ctx, denomID)
	if !found {
		return sdkerrors.Wrapf(types.ErrInvalidDenom, "denom ID %s not exists", denomID)
	}

	if denom.UpdateRestricted {
		// if true , nobody can update the NFT under this denom
		return sdkerrors.Wrapf(sdkerrors.ErrUnauthorized, "nobody can update the NFT under this denom %s", denom.Id)
	}

	// just the owner of NFT can edit
	nft, err := k.Authorize(ctx, denomID, tokenID, owner)
	if err != nil {
		return err
	}

	if types.Modified(tokenNm) {
		nft.Name = tokenNm
	}

	if types.Modified(tokenURI) {
		nft.URI = tokenURI
	}

	if types.Modified(tokenData) {
		nft.Data = tokenData
	}

	k.setNFT(ctx, denomID, nft)

	return nil
}

// TransferOwner transfers the ownership of the given NFT to the new owner
func (k Keeper) TransferOwner(
	ctx sdk.Context, denomID, tokenID, tokenNm, tokenURI,
	tokenData string, srcOwner, dstOwner sdk.AccAddress,
) error {
	denom, found := k.GetDenom(ctx, denomID)
	if !found {
		return sdkerrors.Wrapf(types.ErrInvalidDenom, "denom ID %s not exists", denomID)
	}

	nft, err := k.Authorize(ctx, denomID, tokenID, srcOwner)
	if err != nil {
		return err
	}

	nft.Owner = dstOwner.String()

	if denom.UpdateRestricted && (types.Modified(tokenNm) || types.Modified(tokenURI) || types.Modified(tokenData)) {
		return sdkerrors.Wrapf(sdkerrors.ErrUnauthorized, "It is restricted to update NFT under this denom %s", denom.Id)
	}

	if types.Modified(tokenNm) {
		nft.Name = tokenNm
	}
	if types.Modified(tokenURI) {
		nft.URI = tokenURI
	}
	if types.Modified(tokenData) {
		nft.Data = tokenData
	}

	k.setNFT(ctx, denomID, nft)
	k.swapOwner(ctx, denomID, tokenID, srcOwner, dstOwner)
	return nil
}

// BurnNFT deletes a specified NFT
func (k Keeper) BurnNFT(ctx sdk.Context, denomID, tokenID string, owner sdk.AccAddress) error {
	if !k.HasDenomID(ctx, denomID) {
		return sdkerrors.Wrapf(types.ErrInvalidDenom, "denom ID %s not exists", denomID)
	}

	nft, err := k.Authorize(ctx, denomID, tokenID, owner)
	if err != nil {
		return err
	}

	k.deleteNFT(ctx, denomID, nft)
	k.deleteOwner(ctx, denomID, tokenID, owner)
	k.decreaseSupply(ctx, denomID)

	return nil
}

// TransferDenomOwner transfers the ownership of the given denom to the new owner
func (k Keeper) TransferDenomOwner(
	ctx sdk.Context, denomID string, srcOwner, dstOwner sdk.AccAddress,
) error {
	denom, found := k.GetDenom(ctx, denomID)
	if !found {
		return sdkerrors.Wrapf(types.ErrInvalidDenom, "denom ID %s not exists", denomID)
	}

	// authorize
	if srcOwner.String() != denom.Creator {
		return sdkerrors.Wrapf(sdkerrors.ErrUnauthorized, "%s is not allowed to transfer denom %s", srcOwner.String(), denomID)
	}

	denom.Creator = dstOwner.String()

	err := k.UpdateDenom(ctx, denom)
	if err != nil {
		return err
	}

	return nil
}

// GetNFT gets the the specified NFT
func (k Keeper) Get_NFT(ctx sdk.Context, denomID, tokenID string) (nft exported.NFT, err error) {
	store := ctx.KVStore(k.storeKey)

	bz := store.Get(types.KeyNFT(denomID, tokenID))
	if bz == nil {
		return nil, sdkerrors.Wrapf(types.ErrUnknownCollection, "not found NFT: %s", denomID)
	}

	var baseNFT types.BaseNFT
	k.cdc.MustUnmarshalBinaryBare(bz, &baseNFT)

	return baseNFT, nil
}

// GetNFTs returns all NFTs by the specified denom ID
func (k Keeper) GetNFTs(ctx sdk.Context, denom string) (nfts []exported.NFT) {
	store := ctx.KVStore(k.storeKey)

	iterator := sdk.KVStorePrefixIterator(store, types.KeyNFT(denom, ""))
	defer iterator.Close()
	for ; iterator.Valid(); iterator.Next() {
		var baseNFT types.BaseNFT
		k.cdc.MustUnmarshalBinaryBare(iterator.Value(), &baseNFT)
		nfts = append(nfts, baseNFT)
	}

	return nfts
}

// Authorize checks if the sender is the owner of the given NFT
// Return the NFT if true, an error otherwise
func (k Keeper) Authorize(ctx sdk.Context, denomID, tokenID string, owner sdk.AccAddress) (types.BaseNFT, error) {
	nft, err := k.Get_NFT(ctx, denomID, tokenID)
	if err != nil {
		return types.BaseNFT{}, err
	}

	if !owner.Equals(nft.GetOwner()) {
		return types.BaseNFT{}, sdkerrors.Wrap(types.ErrUnauthorized, owner.String())
	}

	return nft.(types.BaseNFT), nil
}

// HasNFT checks if the specified NFT exists
func (k Keeper) HasNFT(ctx sdk.Context, denomID, tokenID string) bool {
	store := ctx.KVStore(k.storeKey)
	return store.Has(types.KeyNFT(denomID, tokenID))
}

func (k Keeper) setNFT(ctx sdk.Context, denomID string, nft types.BaseNFT) {
	store := ctx.KVStore(k.storeKey)

	bz := k.cdc.MustMarshalBinaryBare(&nft)
	store.Set(types.KeyNFT(denomID, nft.GetID()), bz)
}

// deleteNFT deletes an existing NFT from store
func (k Keeper) deleteNFT(ctx sdk.Context, denomID string, nft exported.NFT) {
	store := ctx.KVStore(k.storeKey)
	store.Delete(types.KeyNFT(denomID, nft.GetID()))
}

// SetCollection saves all NFTs and returns an error if there already exists
func (k Keeper) SetCollection(ctx sdk.Context, collection types.Collection) error {
	for _, nft := range collection.NFTs {
		if err := k.MintNFT(
			ctx,
			collection.Denom.Id,
			nft.GetID(),
			nft.GetName(),
			nft.GetURI(),
			nft.GetData(),
			nft.GetOwner(),
		); err != nil {
			return err
		}
	}
	return nil
}

// GetCollection returns the collection by the specified denom ID
func (k Keeper) GetCollection(ctx sdk.Context, denomID string) (types.Collection, error) {
	denom, found := k.GetDenom(ctx, denomID)
	if !found {
		return types.Collection{}, sdkerrors.Wrapf(types.ErrInvalidDenom, "denomID %s not existed ", denomID)
	}

	nfts := k.GetNFTs(ctx, denomID)
	return types.NewCollection(denom, nfts), nil
}

// GetPaginateCollection returns the collection by the specified denom ID
func (k Keeper) GetPaginateCollection(ctx sdk.Context, request *types.QueryCollectionRequest, denomID string) (types.Collection, *query.PageResponse, error) {
	denom, found := k.GetDenom(ctx, denomID)
	if !found {
		return types.Collection{}, nil, sdkerrors.Wrapf(types.ErrInvalidDenom, "denomID %s not existed ", denomID)
	}
	var nfts []exported.NFT
	store := ctx.KVStore(k.storeKey)
	nftStore := prefix.NewStore(store, types.KeyNFT(denomID, ""))
	pageRes, err := query.Paginate(nftStore, request.Pagination, func(key []byte, value []byte) error {
		var baseNFT types.BaseNFT
		k.cdc.MustUnmarshalBinaryBare(value, &baseNFT)
		nfts = append(nfts, baseNFT)
		return nil
	})
	if err != nil {
		return types.Collection{}, nil, status.Errorf(codes.InvalidArgument, "paginate: %v", err)
	}
	return types.NewCollection(denom, nfts), pageRes, nil
}

// GetCollections returns all the collections
func (k Keeper) GetCollections(ctx sdk.Context) (cs []types.Collection) {
	for _, denom := range k.GetDenoms(ctx) {
		nfts := k.GetNFTs(ctx, denom.Id)
		cs = append(cs, types.NewCollection(denom, nfts))
	}
	return cs
}

// GetTotalSupply returns the number of NFTs by the specified denom ID
func (k Keeper) GetTotalSupply(ctx sdk.Context, denomID string) uint64 {
	store := ctx.KVStore(k.storeKey)
	bz := store.Get(types.KeyCollection(denomID))
	if len(bz) == 0 {
		return 0
	}
	return types.MustUnMarshalSupply(k.cdc, bz)
}

// GetTotalSupplyOfOwner returns the amount of NFTs by the specified conditions
func (k Keeper) GetTotalSupplyOfOwner(ctx sdk.Context, id string, owner sdk.AccAddress) (supply uint64) {
	store := ctx.KVStore(k.storeKey)
	iterator := sdk.KVStorePrefixIterator(store, types.KeyOwner(owner, id, ""))
	defer iterator.Close()
	for ; iterator.Valid(); iterator.Next() {
		supply++
	}
	return supply
}

func (k Keeper) increaseSupply(ctx sdk.Context, denomID string) {
	supply := k.GetTotalSupply(ctx, denomID)
	supply++

	store := ctx.KVStore(k.storeKey)
	bz := types.MustMarshalSupply(k.cdc, supply)
	store.Set(types.KeyCollection(denomID), bz)
}

func (k Keeper) decreaseSupply(ctx sdk.Context, denomID string) {
	supply := k.GetTotalSupply(ctx, denomID)
	supply--

	store := ctx.KVStore(k.storeKey)
	if supply == 0 {
		store.Delete(types.KeyCollection(denomID))
		return
	}

	bz := types.MustMarshalSupply(k.cdc, supply)
	store.Set(types.KeyCollection(denomID), bz)
}

// HasDenomID returns whether the specified denom ID exists
func (k Keeper) HasDenomID(ctx sdk.Context, id string) bool {
	store := ctx.KVStore(k.storeKey)
	return store.Has(types.KeyDenomID(id))
}

// SetDenom is responsible for saving the definition of denom
func (k Keeper) SetDenom(ctx sdk.Context, denom types.Denom) error {
	if k.HasDenomID(ctx, denom.Id) {
		return sdkerrors.Wrapf(types.ErrInvalidDenom, "denomID %s has already exists", denom.Id)
	}

	store := ctx.KVStore(k.storeKey)
	bz := k.cdc.MustMarshalBinaryBare(&denom)
	store.Set(types.KeyDenomID(denom.Id), bz)
	store.Set(types.KeyDenomName(denom.Name), []byte(denom.Id))
	return nil
}

// GetDenom returns the denom by id
func (k Keeper) GetDenom(ctx sdk.Context, id string) (denom types.Denom, found bool) {
	store := ctx.KVStore(k.storeKey)

	bz := store.Get(types.KeyDenomID(id))
	if len(bz) == 0 {
		return denom, false
	}

	k.cdc.MustUnmarshalBinaryBare(bz, &denom)
	return denom, true
}

// GetDenoms returns all the denoms
func (k Keeper) GetDenoms(ctx sdk.Context) (denoms []types.Denom) {
	store := ctx.KVStore(k.storeKey)
	iterator := sdk.KVStorePrefixIterator(store, types.KeyDenomID(""))
	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var denom types.Denom
		k.cdc.MustUnmarshalBinaryBare(iterator.Value(), &denom)
		denoms = append(denoms, denom)
	}
	return denoms
}

// UpdateDenom is responsible for updating the definition of denom
func (k Keeper) UpdateDenom(ctx sdk.Context, denom types.Denom) error {
	if !k.HasDenomID(ctx, denom.Id) {
		return sdkerrors.Wrapf(types.ErrInvalidDenom, "denomID %s not exists", denom.Id)
	}

	store := ctx.KVStore(k.storeKey)
	bz := k.cdc.MustMarshalBinaryBare(&denom)
	store.Set(types.KeyDenomID(denom.Id), bz)
	return nil
}

// GetOwner gets all the ID collections owned by an address and denom ID
func (k Keeper) GetOwner(ctx sdk.Context, address sdk.AccAddress, denom string) types.Owner {
	store := ctx.KVStore(k.storeKey)
	iterator := sdk.KVStorePrefixIterator(store, types.KeyOwner(address, denom, ""))
	defer iterator.Close()

	owner := types.Owner{
		Address:       address.String(),
		IDCollections: types.IDCollections{},
	}
	idsMap := make(map[string][]string)

	for ; iterator.Valid(); iterator.Next() {
		_, denomID, tokenID, _ := types.SplitKeyOwner(iterator.Key())
		if ids, ok := idsMap[denomID]; ok {
			idsMap[denomID] = append(ids, tokenID)
		} else {
			idsMap[denomID] = []string{tokenID}
			owner.IDCollections = append(
				owner.IDCollections,
				types.IDCollection{DenomId: denomID},
			)
		}
	}

	for i := 0; i < len(owner.IDCollections); i++ {
		owner.IDCollections[i].TokenIds = idsMap[owner.IDCollections[i].DenomId]
	}

	return owner
}

// GetOwners gets all the ID collections
func (k Keeper) GetOwners(ctx sdk.Context) (owners types.Owners) {
	store := ctx.KVStore(k.storeKey)
	iterator := sdk.KVStoreReversePrefixIterator(store, types.KeyOwner(nil, "", ""))
	defer iterator.Close()

	idcsMap := make(map[string]types.IDCollections)
	for ; iterator.Valid(); iterator.Next() {
		key := iterator.Key()
		address, denom, id, _ := types.SplitKeyOwner(key)
		if _, ok := idcsMap[address.String()]; !ok {
			idcsMap[address.String()] = types.IDCollections{}
			owners = append(
				owners,
				types.Owner{Address: address.String()},
			)
		}
		idcs := idcsMap[address.String()]
		idcs = idcs.Add(denom, id)
		idcsMap[address.String()] = idcs
	}
	for i, owner := range owners {
		owners[i].IDCollections = idcsMap[owner.Address]
	}

	return owners
}

func (k Keeper) deleteOwner(ctx sdk.Context, denomID, tokenID string, owner sdk.AccAddress) {
	store := ctx.KVStore(k.storeKey)
	store.Delete(types.KeyOwner(owner, denomID, tokenID))
}

func (k Keeper) setOwner(ctx sdk.Context,
	denomID, tokenID string,
	owner sdk.AccAddress) {
	store := ctx.KVStore(k.storeKey)

	bz := types.MustMarshalTokenID(k.cdc, tokenID)
	store.Set(types.KeyOwner(owner, denomID, tokenID), bz)
}

func (k Keeper) swapOwner(ctx sdk.Context, denomID, tokenID string, srcOwner, dstOwner sdk.AccAddress) {

	// delete old owner key
	k.deleteOwner(ctx, denomID, tokenID, srcOwner)

	// set new owner key
	k.setOwner(ctx, denomID, tokenID, dstOwner)
}
