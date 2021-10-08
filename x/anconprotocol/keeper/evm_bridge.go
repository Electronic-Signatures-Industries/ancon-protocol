package keeper

import (
	"bytes"
	"crypto/ecdsa"
	"encoding/hex"
	"fmt"
	"log"
	"math/big"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/hyperledger/aries-framework-go/pkg/doc/verifiable"
)

var (

	// event _anconSendCrossmintRequest(
	//     uint256 recipientChainId,
	//     string fromTokenNft,
	//     string toTokenNft,
	//     string metadataHash,
	//     string fromOwner,
	//     string toOwner,
	//     string permitHash,
	//     string permitSignature
	// );
	RecieveCrossmintCallback abi.Method
)

type RecieveCrossmintRequest struct {
	vc           verifiable.Credential
	v            int
	r            []byte
	s            []byte
	metadataHash string
	to           string
	newOwner     string
}

func init() {
	RecieveCrossmintCallback = RecieveCrossmintCallbackMethod()
}

func RecieveCrossmintCallbackMethod() abi.Method {
	//addressType, _ := abi.NewType("address", "", nil)
	uint8Type, _ := abi.NewType("uint8", "", nil)
	uintType, _ := abi.NewType("uint", "", nil)
	bytes32Type, _ := abi.NewType("bytes32", "", nil)
	stringType, _ := abi.NewType("string", "", nil)
	verifiableCredential, _ := abi.NewType("VerifiableCredential", "", []abi.ArgumentMarshaling{
		abi.ArgumentMarshaling{
			Name:         "issuer",
			Type:         "address",
			InternalType: "",
			Components:   []abi.ArgumentMarshaling{},
			Indexed:      false,
		},
		abi.ArgumentMarshaling{
			Name:         "subject",
			Type:         "address",
			InternalType: "",
			Components:   []abi.ArgumentMarshaling{},
			Indexed:      false,
		},
		abi.ArgumentMarshaling{
			Name:         "data",
			Type:         "bytes32",
			InternalType: "",
			Components:   []abi.ArgumentMarshaling{},
			Indexed:      false,
		},
		abi.ArgumentMarshaling{
			Name:         "validFrom",
			Type:         "uint256",
			InternalType: "",
			Components:   []abi.ArgumentMarshaling{},
			Indexed:      false,
		},
		abi.ArgumentMarshaling{
			Name:         "validTo",
			Type:         "uint256",
			InternalType: "",
			Components:   []abi.ArgumentMarshaling{},
			Indexed:      false,
		},
	})
	metadata := abi.NewMethod(
		"recieveCrossmintCallback",
		"recieveCrossmintCallback",
		abi.Function,
		"nonpayable",
		false,
		false,
		abi.Arguments{abi.Argument{
			Name:    "vc",
			Type:    verifiableCredential,
			Indexed: false,
		}, abi.Argument{
			Name:    "v",
			Type:    uint8Type,
			Indexed: false,
		}, abi.Argument{
			Name:    "r",
			Type:    bytes32Type,
			Indexed: false,
		}, abi.Argument{
			Name:    "s",
			Type:    bytes32Type,
			Indexed: false,
		}, abi.Argument{
			Name:    "metadataHash",
			Type:    stringType,
			Indexed: false,
		}, abi.Argument{
			Name:    "to",
			Type:    stringType,
			Indexed: false,
		},
			abi.Argument{
				Name:    "newOwner",
				Type:    uintType,
				Indexed: false,
			}},
		abi.Arguments{abi.Argument{
			Type: uintType,
		}},
	)

	return metadata
}

func ExecuteTransaction(
	ctx sdk.Context,
	ethClient ethclient.Client,
	rq RecieveCrossmintRequest,
	walletAddress common.Address,
	client *ethclient.Client,
	chainID *big.Int,
	privateKey *ecdsa.PrivateKey,
	crossMintAddress common.Address,
	value int64,
) {

	data, err := SendCrossmintRequestAbi().Pack(
		"recieveCrossmintCallback",
		rq.vc,
		rq.v,
		rq.r,
		rq.s,
		rq.metadataHash,
		rq.to,
		rq.newOwner,
	)

	gasPrice, err := client.SuggestGasPrice(ctx.Context())
	gasLimit := uint64(300000)
	nonce, err := client.PendingNonceAt(ctx.Context(), walletAddress)

	tx := types.NewTransaction(nonce, crossMintAddress, big.NewInt(value), gasLimit, gasPrice, data)

	signedTx, err := types.SignTx(tx, types.NewEIP155Signer(chainID), privateKey)

	if err != nil {
		log.Fatal(err)
	}
	var buff bytes.Buffer

	_ = signedTx.EncodeRLP(&buff)

	rawTxHex := hex.EncodeToString(buff.Bytes())

	fmt.Printf(rawTxHex)

	err = client.SendTransaction(ctx.Context(), signedTx)

	if err != nil {
		log.Fatal(err)
	}
}
