package json

import (
	"github.com/cosmos/cosmos-sdk/store"
	"github.com/ipfs/go-cid"
	"github.com/ipld/go-ipld-prime"
	_ "github.com/ipld/go-ipld-prime/codec/dagcbor"
	"github.com/ipld/go-ipld-prime/datamodel"
	"github.com/ipld/go-ipld-prime/linking"
	cidlink "github.com/ipld/go-ipld-prime/linking/cid"
	"github.com/ipld/go-ipld-prime/node/basicnode"
	"github.com/multiformats/go-multihash"
)

const (
	LINK_PROTO_VERSION = 1
)

type Keeper struct {
	DataStore  JSONStore
	LinkSystem linking.LinkSystem
}

func NewKeeper(
	kvstore store.KVStore,
) Keeper {

	store := NewJSONStore(kvstore)
	lsys := cidlink.DefaultLinkSystem()
	lsys.SetWriteStorage(&store)
	lsys.SetReadStorage(&store)

	return Keeper{
		DataStore:  store,
		LinkSystem: lsys,
	}
}

// eth-block	ipld	0x90	permanent	Ethereum Header (RLP)
// eth-block-list	ipld	0x91	permanent	Ethereum Header List (RLP)
// eth-tx-trie	ipld	0x92	permanent	Ethereum Transaction Trie (Eth-Trie)
// eth-tx	ipld	0x93	permanent	Ethereum Transaction (MarshalBinary)
// eth-tx-receipt-trie	ipld	0x94	permanent	Ethereum Transaction Receipt Trie (Eth-Trie)
// eth-tx-receipt	ipld	0x95	permanent	Ethereum Transaction Receipt (MarshalBinary)
// eth-state-trie	ipld	0x96	permanent	Ethereum State Trie (Eth-Secure-Trie)
// eth-account-snapshot	ipld	0x97	permanent	Ethereum Account Snapshot (RLP)
// eth-storage-trie	ipld	0x98	permanent	Ethereum Contract Storage Trie (Eth-Secure-Trie)
// eth-receipt-log-trie	ipld	0x99	draft	Ethereum Transaction Receipt Log Trie (Eth-Trie)
// eth-reciept-log	ipld	0x9a	draft	Ethereum Transaction Receipt Log (RLP)
var (
	DagEthCodecs map[string]uint64 = make(map[string]uint64)
)

func init() {
	DagEthCodecs["eth-block"] = 0x90
}

func GetDagEthereumLinkPrototype(codec string) ipld.LinkPrototype {
	return cidlink.LinkPrototype{cid.Prefix{
		Version:  LINK_PROTO_VERSION,
		Codec:    DagEthCodecs[codec],
		MhType:   multihash.SHA2_256, // sha2-256
		MhLength: 32,                 // sha2-256 hash has a 32-byte sum.
	}}
}

func GetDagCBORLinkPrototype() ipld.LinkPrototype {
	return cidlink.LinkPrototype{cid.Prefix{
		Version:  LINK_PROTO_VERSION,
		Codec:    cid.DagCBOR,        // dag-cbor
		MhType:   multihash.SHA2_256, // sha2-256
		MhLength: 32,                 // sha2-256 hash has a 32-byte sum.
	}}
}

func GetDagJSONLinkPrototype() ipld.LinkPrototype {
	return cidlink.LinkPrototype{cid.Prefix{
		Version:  LINK_PROTO_VERSION,
		Codec:    0x0129,             // dag-json
		MhType:   multihash.SHA2_256, // sha2-256
		MhLength: 32,                 // sha2-256 hash has a 32-byte sum.
	}}
}

func GetDagJOSELinkPrototype() ipld.LinkPrototype {
	return cidlink.LinkPrototype{cid.Prefix{
		Version:  LINK_PROTO_VERSION,
		Codec:    cid.DagJOSE,        // dag-json
		MhType:   multihash.SHA2_256, // sha2-256
		MhLength: 32,                 // sha2-256 hash has a 32-byte sum.
	}}
}

func GetRawLinkPrototype() ipld.LinkPrototype {
	return cidlink.LinkPrototype{cid.Prefix{
		Version:  LINK_PROTO_VERSION,
		Codec:    0x55,               // dag-json
		MhType:   multihash.SHA2_256, // sha2-256
		MhLength: 32,                 // sha2-256 hash has a 32-byte sum.
	}}
}

// Store node as  dag-json
func (k *Keeper) Store(linkCtx ipld.LinkContext, node datamodel.Node) (datamodel.Link, error) {
	link, err := k.LinkSystem.Store(linkCtx, GetDagJSONLinkPrototype(), node)
	if err != nil {
		return nil, err
	}

	return link, nil
}

// Load node from  dag-json
func (k *Keeper) Load(linkCtx ipld.LinkContext, link datamodel.Link) (datamodel.Node, error) {
	np := basicnode.Prototype.Any
	node, err := k.LinkSystem.Load(linkCtx, link, np)
	if err != nil {
		return nil, err
	}

	return node, nil
}

// Store node as  dag-cbor
func (k *Keeper) StoreDagCBOR(linkCtx ipld.LinkContext, node datamodel.Node) (datamodel.Link, error) {
	link, err := k.LinkSystem.Store(linkCtx, GetDagCBORLinkPrototype(), node)
	if err != nil {
		return nil, err
	}

	return link, nil
}

// Store node as  raw
func (k *Keeper) StoreRaw(linkCtx ipld.LinkContext, node datamodel.Node) (datamodel.Link, error) {
	link, err := k.LinkSystem.Store(linkCtx, GetRawLinkPrototype(), node)
	if err != nil {
		return nil, err
	}

	return link, nil
}

// Store node as  dag-eth
func (k *Keeper) StoreDagEth(linkCtx ipld.LinkContext, node datamodel.Node, codecFormat string) (datamodel.Link, error) {
	link, err := k.LinkSystem.Store(linkCtx, GetDagEthereumLinkPrototype(codecFormat), node)
	if err != nil {
		return nil, err
	}
	return link, nil
}
