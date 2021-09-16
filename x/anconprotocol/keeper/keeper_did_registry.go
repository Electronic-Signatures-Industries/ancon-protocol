package keeper

import (
	"time"

	"github.com/Electronic-Signatures-Industries/ancon-protocol/x/anconprotocol/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/hyperledger/aries-framework-go/pkg/doc/did"
	"github.com/itchyny/base58-go"
	"github.com/multiformats/go-multibase"
	"github.com/multiformats/go-multicodec"
)

type Delegate struct {
	identity sdk.AccAddress
}

// BuildDidWeb ....
func BuildDidWeb(ctx sdk.Context, creator string) (*did.Doc, error) {

	// impl read checks
	//
	//		sdkCtx := sdk.UnwrapSDKContext(ctx)
	//	sdkCtx.ChainID()
	// 1. Get SDK context
	// 2. Get ChainID and http host
	// 3. Send to read/validation query for  DID
	// 4. any use case, replace chainid with http host
	encoding := base58.BitcoinEncoding

	//sdkCtx := sdk.UnwrapSDKContext(ctx)

	acc, _ := sdk.AccAddressFromBech32(creator)
	encoded, err := encoding.Encode(acc.Bytes())

	if err != nil {
		return nil, err
	}

	// public
	pub := encoded // for did:key base58
	ti := time.Now()
	//Dev: chain id is replaced on the query by http host
	// did web
	base := append([]byte("did:web:"), []byte(ctx.ChainID())...)
	// did web # id
	id := append(base, []byte("#12345")...)

	//Authentication method 2018
	didWebVer := did.NewVerificationMethodFromBytes(
		string(id),
		"Secp256k1VerificationKey2018",
		string(base),
		[]byte(pub),
	)

	ver := []did.VerificationMethod{
		{},
	}
	ver = append(ver, *didWebVer)
	serv := []did.Service{{}, {}}

	// Secp256k1SignatureAuthentication2018
	auth := []did.Verification{{}}

	doc := did.BuildDoc(
		did.WithVerificationMethod(ver),
		did.WithService(serv),
		did.WithAuthentication(auth),
		did.WithCreatedTime(ti),
		did.WithUpdatedTime(ti),
	)

	return doc, nil
}

// BuildDidKey ....
func BuildDidKey(ctx sdk.Context, creator string) (*did.Doc, error) {

	encoding := base58.BitcoinEncoding

	// sdkCtx := sdk.UnwrapSDKContext(ctx)

	acc, _ := sdk.AccAddressFromBech32(creator)
	encoded, err := encoding.Encode(acc.Bytes())

	if err != nil {
		return nil, err
	}

	// public
	pub := encoded
	ti := time.Now()
	multi := append([]byte(multicodec.Secp256k1Pub.String()), acc.Bytes()...)
	code, _ := multibase.Encode(multibase.Base58BTC, multi)
	// did key
	base := append([]byte("did:key:z"), code...)
	// did key # id
	id := append(base, []byte("#12345")...)

	didWebVer := did.NewVerificationMethodFromBytes(
		string(id),
		"Secp256k1VerificationKey2018",
		string(base),
		[]byte(pub),
	)

	ver := []did.VerificationMethod{
		{},
	}
	ver = append(ver, *didWebVer)
	serv := []did.Service{{}, {}}

	// Secp256k1SignatureAuthentication2018
	auth := []did.Verification{{}}

	didWebAuthVerification := did.NewEmbeddedVerification(didWebVer, did.Authentication)

	auth = append(auth, *didWebAuthVerification)

	doc := did.BuildDoc(
		did.WithVerificationMethod(ver),
		did.WithService(serv),
		did.WithAuthentication(auth),
		did.WithCreatedTime(ti),
		did.WithUpdatedTime(ti),
	)
	//marshal & unmarshal for unit tests
	return doc, nil
}

// BuildDidAncon ....
func BuildDidAncon(ctx sdk.Context, creator string) ([]byte, error) {
	prefix := sdk.GetConfig().GetBech32AccountAddrPrefix()
	//multicodec.
	addr, err := sdk.GetFromBech32(creator, prefix)

	if err != nil {
		return nil, err
	}

	return append([]byte(types.DidAnconKey), addr...), nil
}
