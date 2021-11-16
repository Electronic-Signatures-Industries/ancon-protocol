package dataunion

import (
	"context"
)

// Adapter implements go-ipld-prime/storage.ReadableStorage
// and go-ipld-prime/storage.WritableStorage
// backed by a go-ipfs-blockstore.Blockstore.
//
// The go-ipfs-blockstore.Blockstore may internally have other configuration.
// We don't interfere with that here;
// such configuration should be handled when creating the go-ipfs-blockstore value.
//
// Note that this system will only work for certain structures of keys --
// this is because the blockstore API works on the level of CIDs.
// As long as your key string is the binary form of a CID, it will work correctly.
// Other keys are not possible to support with this adapter.
//
// Contexts given to this system are checked for errors at the beginning of an operation,
// but otherwise have no effect, because the Blockstore API doesn't accept context parameters.
type DataUnionAdapter struct {
	Wrapped *DataUnionStore
}

// Has implements go-ipld-prime/storage.Storage.Has.
// Has key from KVStore
func (a *DataUnionAdapter) Has(ctx context.Context, key string) (bool, error) {
	if ctx.Err() != nil {
		return false, ctx.Err()
	}

	// Delegate the Has call.
	return a.Wrapped.Has(ctx, key)
}

// Get implements go-ipld-prime/storage.ReadableStorage.Get.
// Get raw from KVStore
func (a *DataUnionAdapter) Get(ctx context.Context, key string) ([]byte, error) {
	if ctx.Err() != nil {
		return nil, ctx.Err()
	}

	// Delegate the Get call.
	block, err := a.Wrapped.Get(ctx, key)
	if err != nil {
		return nil, err
	}

	// Unwrap the actual raw data for return.
	// Discard the rest.  (It's a shame there was an alloc for that structure.)
	return block, nil
}

// Put implements go-ipld-prime/storage.WritableStorage.Put.
// Put into KVStore
func (a *DataUnionAdapter) Put(ctx context.Context, key string, content []byte) error {
	// Return early if the context is already closed.
	// This is also the last time we'll check the context,
	// since the Put method on Blockstore doesn't take them.
	if ctx.Err() != nil {
		return ctx.Err()
	}

	// Delegate the Put call.
	return a.Wrapped.Put(ctx, key, content)
}
