package json

import (
	"context"
	"crypto/rand"
	"encoding/base32"
	"fmt"
	"io"
	"math/big"
	"os"
	"path/filepath"

	"github.com/cosmos/cosmos-sdk/codec"
	"github.com/cosmos/cosmos-sdk/store"
	"github.com/ipld/go-ipld-prime/storage/fsstore"
)

type JSONStore struct {
	fss   fsstore.Store
	store store.CommitKVStore
	cdc   codec.Marshaler
}

func NewJSONStore(store store.CommitKVStore) *JSONStore {

	userHomeDir, err := os.UserHomeDir()
	if err != nil {
		panic(err)
	}

	DefaultNodeHome := filepath.Join(userHomeDir, ".ancon")
	fss := fsstore.Store{}
	fss.InitDefaults(DefaultNodeHome)
	return &JSONStore{store: store, fss: fss}
}

// Has implements go-ipld-prime/storage.Storage.Has.
func (du *JSONStore) Has(ctx context.Context, key string) (bool, error) {
	return du.store.Has([]byte(key)), nil
}

// Get implements go-ipld-prime/storage.ReadableStorage.Get.
//
// Note that this internally performs a defensive copy;
// use Peek for higher performance if you are certain you won't mutate the returned slice.
func (du *JSONStore) Get(ctx context.Context, key string) ([]byte, error) {
	k := du.store.Get([]byte(key))
	return du.fss.Get(ctx, string(k))
}

// Put implements go-ipld-prime/storage.WritableStorage.Put.
func (du *JSONStore) Put(ctx context.Context, key string, content []byte) error {
	hashid, _ := rand.Int(rand.Reader, big.NewInt(10000000000))
	filename := base32.HexEncoding.EncodeToString(hashid.Bytes())
	du.fss.Put(ctx, filename, content)
	// we anchor filename path, cid => filename
	du.store.Set([]byte(key), []byte(filename))
	return nil
}

// GetStream implements go-ipld-prime/storage.StreamingReadableStorage.GetStream.
//
// It's useful for this storage implementation to explicitly support this,
// because returning a reader gives us room to avoid needing a defensive copy.
func (du *JSONStore) GetStream(ctx context.Context, key string) (io.ReadCloser, error) {
	k := du.store.Get([]byte(key))

	content, err := du.fss.GetStream(ctx, string(k))
	if err != nil {
		return nil, fmt.Errorf("404") // FIXME this needs a standard error type
	}
	return content, nil
}

// Peek implements go-ipld-prime/storage.PeekableStorage.Peek.
func (du *JSONStore) Peek(ctx context.Context, key string) ([]byte, io.Closer, error) {
	k := du.store.Get([]byte(key))

	content, err := du.fss.Get(ctx, string(k))
	if err != nil {
		return nil, nil, fmt.Errorf("404") // FIXME this needs a standard error type
	}
	return content, noopCloser{nil}, nil
}

type noopCloser struct {
	io.Reader
}

func (noopCloser) Close() error { return nil }
