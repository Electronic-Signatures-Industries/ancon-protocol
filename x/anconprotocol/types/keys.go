package types

import (
	"bytes"
	"errors"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

const (
	// ModuleName defines the module name
	ModuleName = "anconprotocol"

	// StoreKey defines the primary module store key
	StoreKey = ModuleName

	// RouterKey is the message route for slashing
	RouterKey = ModuleName

	// QuerierRoute defines the module's query routing key
	QuerierRoute = ModuleName

	// MemStoreKey defines the in-memory store key
	MemStoreKey = "mem_anconprotocol"

	IPLDKey = "ancon_ipld"

	DelegateKey = "did_ancon_delegates"

	OwnerKey = "did_ancon_owners"

	ChangeOwnerKey = "did_change_owner_key"

	ChangeOwnerEvent = "change_owner"

	SetAttributeEvent = "set_attribute"

	RevokeAttributeEvent = "revoke_attribute"

	GrantDelegateEvent = "grant_delegate"

	RevokeDelegateEvent = "revoke_delegate"

	AttributeKey = "did_attribute"

	DidAnconKey = "did:ancon:"

	DidIPLDStoreKey = "did_ipld_store_key"

	DidWebStoreKey = "did_web_store_key"

	// this line is used by starport scaffolding # ibc/keys/name
)

var (
	PrefixNFT        = []byte{0x01}
	PrefixOwners     = []byte{0x02} // key for a owner
	PrefixCollection = []byte{0x03} // key for balance of NFTs held by the denom
	PrefixDenom      = []byte{0x04} // key for denom of the nft
	PrefixDenomName  = []byte{0x05} // key for denom name of the nft

	delimiter = []byte("/")
	// Keys for store prefixes
	HTLCKey              = []byte{0x01} // prefix for HTLC
	HTLCExpiredQueueKey  = []byte{0x02} // prefix for the HTLC expiration queue
	AssetSupplyPrefix    = []byte{0x03} // prefix for the HTLT supply
	PreviousBlockTimeKey = []byte{0x04} // prefix for the HTLT supply previous block time
)

// GetHTLCKey returns the key for the HTLC with the specified hash lock
// VALUE: htlc/HTLC
func GetHTLCKey(id []byte) []byte {
	return append(HTLCKey, id...)
}

// GetHTLCExpiredQueueKey returns the key for the HTLC expiration queue by the specified height and hash lock
// VALUE: []byte{}
func GetHTLCExpiredQueueKey(expirationHeight uint64, id []byte) []byte {
	return append(append(HTLCExpiredQueueKey, sdk.Uint64ToBigEndian(expirationHeight)...), id...)
}

// GetHTLCExpiredQueueSubspace returns the key prefix for the HTLC expiration queue by the given height
func GetHTLCExpiredQueueSubspace(expirationHeight uint64) []byte {
	return append(HTLCExpiredQueueKey, sdk.Uint64ToBigEndian(expirationHeight)...)
}

// GetAssetSupplyKey returns the key prefix for the asset supply by the given denom
func GetAssetSupplyKey(denom string) []byte {
	return append(AssetSupplyPrefix, []byte(denom)...)
}
func KeyPrefix(p string) []byte {
	return []byte(p)
}

func MultiKeyPrefix(prefix string, a []byte, b []byte) []byte {
	keys := append(a, b...)
	return append([]byte(prefix), keys...)
}

// SplitKeyOwner return the address,denom,id from the key of stored owner
func SplitKeyOwner(key []byte) (address sdk.AccAddress, denomID, tokenID string, err error) {
	key = key[len(PrefixOwners)+len(delimiter):]
	keys := bytes.Split(key, delimiter)
	if len(keys) != 3 {
		return address, denomID, tokenID, errors.New("wrong KeyOwner")
	}

	address, _ = sdk.AccAddressFromBech32(string(keys[0]))
	denomID = string(keys[1])
	tokenID = string(keys[2])
	return
}

func SplitKeyDenom(key []byte) (denomID, tokenID string, err error) {
	keys := bytes.Split(key, delimiter)
	if len(keys) != 2 {
		return denomID, tokenID, errors.New("wrong KeyOwner")
	}

	denomID = string(keys[0])
	tokenID = string(keys[1])
	return
}

// KeyOwner gets the key of a collection owned by an account address
func KeyOwner(address sdk.AccAddress, denomID, tokenID string) []byte {
	key := append(PrefixOwners, delimiter...)
	if address != nil {
		key = append(key, []byte(address.String())...)
		key = append(key, delimiter...)
	}

	if address != nil && len(denomID) > 0 {
		key = append(key, []byte(denomID)...)
		key = append(key, delimiter...)
	}

	if address != nil && len(denomID) > 0 && len(tokenID) > 0 {
		key = append(key, []byte(tokenID)...)
	}
	return key
}

// KeyNFT gets the key of nft stored by an denom and id
func KeyNFT(denomID, tokenID string) []byte {
	key := append(PrefixNFT, delimiter...)
	if len(denomID) > 0 {
		key = append(key, []byte(denomID)...)
		key = append(key, delimiter...)
	}

	if len(denomID) > 0 && len(tokenID) > 0 {
		key = append(key, []byte(tokenID)...)
	}
	return key
}

// KeyCollection gets the storeKey by the collection
func KeyCollection(denomID string) []byte {
	key := append(PrefixCollection, delimiter...)
	return append(key, []byte(denomID)...)
}

// KeyDenomID gets the storeKey by the denom id
func KeyDenomID(id string) []byte {
	key := append(PrefixDenom, delimiter...)
	return append(key, []byte(id)...)
}

// KeyDenomName gets the storeKey by the denom name
func KeyDenomName(name string) []byte {
	key := append(PrefixDenomName, delimiter...)
	return append(key, []byte(name)...)
}
