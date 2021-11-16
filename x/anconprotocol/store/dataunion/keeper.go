package dataunion

import (
	"github.com/cosmos/cosmos-sdk/store"
	_ "github.com/ipld/go-ipld-prime/codec/dagcbor"
	"github.com/ipld/go-ipld-prime/linking"
	cidlink "github.com/ipld/go-ipld-prime/linking/cid"
)

type Keeper struct {
	Store      *DataUnionStore
	Adapter    DataUnionAdapter
	LinkSystem linking.LinkSystem
}

func NewKeeper(
	kvstore store.CommitKVStore,
) Keeper {

	store := NewDataUnionStore(kvstore)
	lsys := cidlink.DefaultLinkSystem()
	lsys.SetWriteStorage(store)
	lsys.SetReadStorage(store)

	adapter := DataUnionAdapter{Wrapped: store}
	return Keeper{
		Store:      store,
		Adapter:    adapter,
		LinkSystem: lsys,
	}
}
