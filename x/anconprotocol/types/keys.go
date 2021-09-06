package types

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

	OwnerKey = "ancon_did_owners"

	Delegates = "did_ancon_delegates"

	Nonce = "did_ancon_nonce"

	Owners = "did_ancon_owners"

	// this line is used by starport scaffolding # ibc/keys/name
)

// this line is used by starport scaffolding # ibc/keys/port

func KeyPrefix(p string) []byte {
	return []byte(p)
}
