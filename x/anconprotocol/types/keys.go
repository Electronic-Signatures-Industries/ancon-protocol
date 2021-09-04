package types

import sdk "github.com/cosmos/cosmos-sdk/types"

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

	// this line is used by starport scaffolding # ibc/keys/name
)

// this line is used by starport scaffolding # ibc/keys/port
var (
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
