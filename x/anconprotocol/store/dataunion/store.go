package dataunion

import (
	"bytes"
	"context"
	"fmt"
	"io"

	"github.com/cosmos/cosmos-sdk/codec"
	"github.com/cosmos/cosmos-sdk/store/prefix"
)

type DataUnionStore struct {
	store prefix.Store
	cdc   codec.Codec
}

func NewDataUnionStore(store prefix.Store) *DataUnionStore {
	return &DataUnionStore{store: store}
}

// Has implements go-ipld-prime/storage.Storage.Has.
func (du *DataUnionStore) Has(ctx context.Context, key string) (bool, error) {
	return du.store.Has([]byte(key)), nil
}

// Get implements go-ipld-prime/storage.ReadableStorage.Get.
//
// Note that this internally performs a defensive copy;
// use Peek for higher performance if you are certain you won't mutate the returned slice.
func (du *DataUnionStore) Get(ctx context.Context, key string) ([]byte, error) {
	return du.store.Get([]byte(key)), nil
}

// Put implements go-ipld-prime/storage.WritableStorage.Put.
func (du *DataUnionStore) Put(ctx context.Context, key string, content []byte) error {
	du.store.Set([]byte(key), content)
	return nil
}

// GetStream implements go-ipld-prime/storage.StreamingReadableStorage.GetStream.
//
// It's useful for this storage implementation to explicitly support this,
// because returning a reader gives us room to avoid needing a defensive copy.
func (du *DataUnionStore) GetStream(ctx context.Context, key string) (io.ReadCloser, error) {
	content, err := du.Get(ctx, key)
	if err != nil {
		return nil, fmt.Errorf("404") // FIXME this needs a standard error type
	}
	return noopCloser{bytes.NewReader(content)}, nil
}

// Peek implements go-ipld-prime/storage.PeekableStorage.Peek.
func (du *DataUnionStore) Peek(ctx context.Context, key string) ([]byte, io.Closer, error) {
	content, err := du.Get(ctx, key)
	if err != nil {
		return nil, nil, fmt.Errorf("404") // FIXME this needs a standard error type
	}
	return content, noopCloser{nil}, nil
}

type noopCloser struct {
	io.Reader
}

func (noopCloser) Close() error { return nil }
