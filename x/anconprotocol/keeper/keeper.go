package keeper

import (
	"strings"

	"encoding/json"
	"fmt"

	"github.com/cosmos/cosmos-sdk/store"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	"github.com/cosmos/iavl"
	"github.com/hyperledger/aries-framework-go/pkg/doc/did"
	"github.com/ipld/go-ipld-prime"
	"github.com/ipld/go-ipld-prime/datamodel"
	"github.com/ipld/go-ipld-prime/fluent"
	basicnode "github.com/ipld/go-ipld-prime/node/basic"
	"github.com/ipld/go-ipld-prime/node/bindnode"

	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"

	"github.com/tendermint/tendermint/libs/log"

	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/anconprotocol/store/dataunion"
	jsonstore "github.com/Electronic-Signatures-Industries/ancon-protocol/x/anconprotocol/store/json"
	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/anconprotocol/types"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	paramstypes "github.com/cosmos/cosmos-sdk/x/params/types"
	// this line is used by starport scaffolding # ibc/keeper/import
)

type Keeper struct {
	cdc           codec.Codec
	storeKey      sdk.StoreKey
	memKey        sdk.StoreKey
	paramSpace    paramstypes.Subspace
	accountKeeper types.AccountKeeper
	iavltree      *iavl.ImmutableTree
	bankKeeper    types.BankKeeper
	blockedAddrs  map[string]bool
	cms           store.CommitMultiStore
	// this line is used by starport scaffolding # ibc/keeper/attribute
}

func NewTestKeeper(
	cdc codec.Codec,
	key sdk.StoreKey,
	memKey sdk.StoreKey,
	paramSpace paramstypes.Subspace,
	accountKeeper types.AccountKeeper,
	bankKeeper types.BankKeeper,
	// aguaclaraKeeper aguaclaramodulekeeper.Keeper,
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
	cdc codec.Codec,
	key sdk.StoreKey,
	memKey sdk.StoreKey,
	paramSpace paramstypes.Subspace,
	accountKeeper types.AccountKeeper,
	bankKeeper types.BankKeeper,
	// aguaclaraKeeper aguaclaramodulekeeper.Keeper,
	blockedAddrs map[string]bool,
	cms store.CommitMultiStore,
) Keeper {
	return Keeper{
		storeKey:      key,
		cdc:           cdc,
		memKey:        memKey,
		paramSpace:    paramSpace,
		accountKeeper: accountKeeper,
		bankKeeper:    bankKeeper,
		// aguaclaraKeeper: aguaclaraKeeper,
		blockedAddrs: blockedAddrs,
		cms:          cms,
	}
}

// Logger returns a module-specific logger
func (k *Keeper) DataUnionStore(ctx sdk.Context) dataunion.Keeper {
	kvs := ctx.KVStore(k.storeKey)
	return dataunion.NewKeeper(kvs)
}
func (k *Keeper) SchemaStore(ctx sdk.Context) jsonstore.Keeper {
	return jsonstore.NewKeeper()
}

// Logger returns a module-specific logger
func (k *Keeper) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With("module", fmt.Sprintf("x/%s", types.ModuleName))
}

// EnsureModuleAccountPermissions syncs the bep3 module account's permissions with those in the supply keeper.
func (k *Keeper) EnsureModuleAccountPermissions(ctx sdk.Context) error {
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

func (k *Keeper) ApplyDataUnion(ctx sdk.Context, msg *types.MsgAddDataUnion) (string, error) {

	du := &types.DataUnion{
		Name:    msg.DataUnion.Name,
		Did:     msg.DataUnion.Did,
		Active:  msg.DataUnion.Active,
		Creator: msg.DataUnion.Creator,
	}
	n := bindnode.Wrap(du, nil)

	dus := k.DataUnionStore(ctx)

	link := dus.LinkSystem.MustStore(
		ipld.LinkContext{
			LinkPath: datamodel.ParsePath("dataunion/"),
		},
		GetLinkPrototype(),
		n,
	)
	return link.String(), nil
}

func (k *Keeper) ReadAnyFromDataUnionStore(ctx sdk.Context, path string, link datamodel.Link) (datamodel.Node, error) {
	np := basicnode.Prototype.Any

	dus := k.DataUnionStore(ctx)

	node, err := dus.LinkSystem.Load(
		ipld.LinkContext{
			LinkPath: datamodel.ParsePath(path),
		},
		link,
		np,
	)
	if err != nil {
		return nil, err
	}

	return node, nil
}

func (k *Keeper) ReadAnyFromJSONStore(ctx sdk.Context, path string, link datamodel.Link) (datamodel.Node, error) {
	np := basicnode.Prototype.Any

	ss := k.SchemaStore(ctx)

	node, err := ss.LinkSystem.Load(
		ipld.LinkContext{
			LinkPath: datamodel.ParsePath(path),
		},
		link,
		np,
	)
	if err != nil {
		return nil, err
	}

	return node, nil
}

func (k *Keeper) AddCBOR(ctx sdk.Context, path string, content []byte) (datamodel.Link, error) {
	np := basicnode.Prototype.Any
	node, err := jsonstore.DecodeCBOR(np, content)

	if err != nil {
		return nil, err
	}

	ss := k.SchemaStore(ctx)

	link := ss.Store(
		ipld.LinkContext{
			LinkPath: datamodel.ParsePath(path),
		},
		node,
	)

	return link, nil
}

func (k *Keeper) ReadCBOR(ctx sdk.Context, path string, link datamodel.Link) ([]byte, error) {

	ss := k.SchemaStore(ctx)
	node, err := ss.Load(
		ipld.LinkContext{
			LinkPath: datamodel.ParsePath(path),
		},
		link,
	)
	if err != nil {
		return nil, err
	}

	output, err := jsonstore.EncodeCBOR(node)

	if err != nil {
		return nil, err
	}

	return output, nil
}
func (k *Keeper) AddJSON(ctx sdk.Context, path string, content string) (datamodel.Link, error) {
	np := basicnode.Prototype.Any
	node, err := jsonstore.Decode(np, content)

	if err != nil {
		return nil, err
	}

	ss := k.SchemaStore(ctx)
	link := ss.Store(
		ipld.LinkContext{
			LinkPath: datamodel.ParsePath(path),
		},
		node,
	)

	return link, nil
}

func (k *Keeper) ReadJSON(ctx sdk.Context, path string, link datamodel.Link) (string, error) {

	ss := k.SchemaStore(ctx)
	node, err := ss.Load(
		ipld.LinkContext{
			LinkPath: datamodel.ParsePath(path),
		},
		link,
	)
	if err != nil {
		return "", err
	}

	output, err := jsonstore.Encode(node)

	if err != nil {
		return "", err
	}

	return output, nil
}

func (k *Keeper) ApplyDataSource(ctx sdk.Context, msg *types.MsgAddDataSource) (string, error) {

	du := &types.DataSource{
		ParentCid:   msg.DataSource.ParentCid,
		DidOwner:    msg.DataSource.DidOwner,
		Anchors:     msg.DataSource.Anchors,
		Name:        msg.DataSource.Name,
		Description: msg.DataSource.Description,
		Creator:     msg.Creator,
	}
	n := bindnode.Wrap(du, nil)
	dus := k.DataUnionStore(ctx)

	// parent, _ := ParseCidLink(msg.DataSource.ParentCid)
	link := dus.LinkSystem.MustStore(
		ipld.LinkContext{
			LinkPath: datamodel.ParsePath(
				strings.Join([]string{"dataunion", msg.DataSource.ParentCid, "datasource"}, "/"),
			),
		},
		GetLinkPrototype(),
		n,
	)
	// id, _ := cid.Decode(link.String())
	return link.String(), nil
}

// ApplyChangeOwner = AppendOwner
func (k *Keeper) ApplyOwner(ctx sdk.Context, creator, newOwner string) (*types.DIDOwner, error) {

	has := k.HasDIDOwner(ctx, creator)
	if has {
		did := k.GetDIDOwner(ctx, creator)
		//verify that the creator is owner of that account
		owner := types.DIDOwner{
			Did:   did.Did,
			Owner: newOwner,
		}

		k.SetDIDOwner(ctx, &owner)

		return &did, nil
	}

	return nil, fmt.Errorf("must be an existing owner")
}

//Get functions returns a documents from its id
func (k *Keeper) GetDIDOwner(ctx sdk.Context, owner string) types.DIDOwner {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.OwnerKey))
	var found types.DIDOwner
	id := []byte(owner)
	k.cdc.Unmarshal(store.Get(id), &found)
	return found
}

func (k *Keeper) GetDelegate(ctx sdk.Context, delegate string) *types.DIDDelegate {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.DelegateKey))
	var found types.DIDDelegate
	id := []byte(delegate)
	k.cdc.Unmarshal(store.Get(id), &found)
	return &found
}
func (k *Keeper) ApplyDelegate(ctx sdk.Context, msg *types.MsgGrantDelegate) error {
	blockTime := ctx.BlockTime()
	grantDelegate := &types.DIDDelegate{
		Delegate:     msg.Delegate,
		DelegateType: msg.DelegateType,
		Validity:     msg.Validity + uint64(blockTime.Unix()),
		Creator:      msg.Creator,
		Did:          msg.Did,
	}
	k.SetDelegate(ctx, grantDelegate)

	return nil
}
func (k *Keeper) SetDIDOwner(ctx sdk.Context, o *types.DIDOwner) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.OwnerKey))
	res := k.cdc.MustMarshal(o)
	store.Set([]byte(o.Owner), res)
}

func (k *Keeper) SetAttribute(ctx sdk.Context, msg *types.DIDAttribute) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.AttributeKey))
	res := k.cdc.MustMarshal(msg)
	store.Set([]byte(msg.Did), res)
}

func (k *Keeper) SetDelegate(ctx sdk.Context, msg *types.DIDDelegate) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.DelegateKey))
	res := k.cdc.MustMarshal(msg)
	store.Set([]byte(msg.Did), res)
}

func (k *Keeper) RemoveAttribute(ctx sdk.Context, msg *types.MsgRevokeAttribute) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.AttributeKey))
	store.Delete([]byte(msg.Did))
}

func (k *Keeper) RemoveDelegate(ctx sdk.Context, msg *types.MsgRevokeDelegate) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.DelegateKey))
	store.Delete([]byte(msg.Did))
}
func (k *Keeper) GetAttribute(ctx sdk.Context, didIdentity string) *types.DIDAttribute {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.DelegateKey))
	var found types.DIDAttribute
	k.cdc.Unmarshal(store.Get([]byte(didIdentity)), &found)
	return &found
}
func (k *Keeper) RemoveDidWebRoute(ctx sdk.Context, didWebRoute *types.DIDWebRoute) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.DidWebStoreKey))
	store.Delete([]byte(didWebRoute.Name))
}
func (k *Keeper) RemoveDid(ctx sdk.Context, id string) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.OwnerKey))
	store.Delete([]byte(id))

	attrsstore := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.AttributeKey))
	attrsstore.Delete([]byte(id))
}

func (k *Keeper) SetAnchor(ctx sdk.Context, did, cid, key string) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.MultiKeyPrefix(types.AnchorKey, []byte(did), []byte{}))
	store.Set([]byte(key), []byte(cid))
}

func (k *Keeper) toIpldStringList(items []string) func(fluent.ListAssembler) {
	return func(la fluent.ListAssembler) {
		for i := 0; i < len(items); i++ {
			//c, _ := cid.Parse(sources[i])
			// todo: implement error handling
			//la.AssembleValue().AssignLink(cidlink.Link{Cid: c})
			la.AssembleValue().AssignString(items[i])
		}
	}
}

func (k *Keeper) toIpldVerMethodList(methods []did.VerificationMethod) func(fluent.ListAssembler) {
	return func(assembler fluent.ListAssembler) {
		for _, method := range methods {
			jsonByte, err := json.Marshal(method)
			if err != nil {
				continue
			}
			assembler.AssembleValue().AssignBytes(jsonByte)
		}
	}
}

func (k *Keeper) toIpldServiceList(services []did.Service) func(fluent.ListAssembler) {
	return func(assembler fluent.ListAssembler) {
		for _, service := range services {
			jsonByte, err := json.Marshal(service)
			if err != nil {
				continue
			}
			assembler.AssembleValue().AssignBytes(jsonByte)
		}
	}
}

func (k *Keeper) toIpldVerificationList(authentications []did.Verification) func(fluent.ListAssembler) {
	return func(assembler fluent.ListAssembler) {
		for _, auth := range authentications {
			jsonByte, err := json.Marshal(auth)
			if err != nil {
				continue
			}
			assembler.AssembleValue().AssignBytes(jsonByte)
		}
	}
}

func (k *Keeper) toIpldProofList(proofs []did.Proof) func(fluent.ListAssembler) {
	return func(assembler fluent.ListAssembler) {
		for _, proof := range proofs {
			jsonByte, err := json.Marshal(proof)
			if err != nil {
				continue
			}
			assembler.AssembleValue().AssignBytes(jsonByte)
		}
	}
}

func (k *Keeper) ApplyAttribute(ctx sdk.Context, msg *types.MsgSetAttribute) error {
	attr := types.DIDAttribute{
		Did:   msg.Did,
		Name:  msg.Name,
		Value: msg.Value,
	}

	k.SetAttribute(ctx, &attr)
	return nil
}

// Has functions checks if the documents exists in the store
func (k *Keeper) HasDelegates(ctx sdk.Context, delegate string, delegateType string, o string) bool {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.DelegateKey))
	return store.Has([]byte(o))
}

func (k *Keeper) HasDIDOwner(ctx sdk.Context, id string) bool {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.OwnerKey))
	return store.Has([]byte(id))
}

func (k *Keeper) HasDidWebRoute(ctx sdk.Context, vn string) bool {
	base := append([]byte("did:web:ancon.did.pa:user:"), []byte(vn)...)

	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.DidWebStoreKey))
	return store.Has([]byte(base))
}

func (k *Keeper) GetDidWebRoute(ctx sdk.Context, vn string) (datamodel.Node, error) {
	base := append([]byte("did:web:ancon.did.pa:user:"), []byte(vn)...)

	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.DidWebStoreKey))
	return k.GetDid(ctx, string(store.Get(base)))

}

func (k *Keeper) ReadAnyDid(ctx sdk.Context, did string) (datamodel.Node, error) {

	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.DidWebStoreKey))
	return k.GetDid(ctx, string(store.Get([]byte(did))))

}
