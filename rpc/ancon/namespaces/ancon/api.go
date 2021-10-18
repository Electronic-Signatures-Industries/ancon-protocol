package ancon

import (
	"context"
	"encoding/hex"
	"math/big"

	"fmt"
	"strings"

	ics23 "github.com/confio/ics23/go"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/crypto/keyring"
	"github.com/cosmos/cosmos-sdk/server"
	sdk "github.com/cosmos/cosmos-sdk/types"
	txtypes "github.com/cosmos/cosmos-sdk/types/tx"
	ibc "github.com/cosmos/ibc-go/modules/core/23-commitment/types"
	"github.com/ethereum/go-ethereum/common/hexutil"
	"github.com/ipfs/go-cid"
	"github.com/ipld/go-ipld-prime"
	cidlink "github.com/ipld/go-ipld-prime/linking/cid"
	"github.com/multiformats/go-multihash"
	"github.com/pkg/errors"
	"github.com/spf13/viper"
	abci "github.com/tendermint/tendermint/abci/types"
	"github.com/tendermint/tendermint/libs/log"
	tmtypes "github.com/tendermint/tendermint/rpc/client"
	"github.com/tharsis/ethermint/crypto/hd"
	"github.com/tharsis/ethermint/rpc/ethereum/backend"
	rpctypes "github.com/tharsis/ethermint/rpc/ethereum/types"
	evmtypes "github.com/tharsis/ethermint/x/evm/types"
)

// AnconAPIHandler is the ancon_ prefixed set of APIs
type AnconAPIHandler struct {
	ctx         *server.Context
	clientCtx   client.Context
	queryClient *rpctypes.QueryClient
	logger      log.Logger
	backend     backend.Backend
}

//Must migrate all the new bussines logic to
//GetTxByHash rpc that will return the complete merkle proof

// var Handler = new(HandlerT)

// type HandlerT struct {
// }

// NewAPI creates an instance of the public ETH Web3 AnconAPIHandler.
func NewAPIHandler(
	ctx *server.Context,
	logger log.Logger,
	clientCtx client.Context,
	backend backend.Backend,

) *AnconAPIHandler {
	algos, _ := clientCtx.Keyring.SupportedAlgorithms()

	if !algos.Contains(hd.EthSecp256k1) {
		kr, err := keyring.New(
			sdk.KeyringServiceName(),
			viper.GetString(flags.FlagKeyringBackend),
			clientCtx.KeyringDir,
			clientCtx.Input,
			hd.EthSecp256k1Option(),
		)
		if err != nil {
			panic(err)
		}

		clientCtx = clientCtx.WithKeyring(kr)
	}

	return &AnconAPIHandler{
		ctx:         ctx,
		clientCtx:   clientCtx,
		queryClient: rpctypes.NewQueryClient(clientCtx),
		logger:      logger.With("module", "ancon"),
		backend:     backend,
	}
}

// ClientCtx returns client context
func (e *AnconAPIHandler) ClientCtx() client.Context {
	return e.clientCtx
}

func (e *AnconAPIHandler) QueryClient() *rpctypes.QueryClient {
	return e.queryClient
}

// MOVE to utils
// CreateHashCidLink takes a hash eg ethereum hash and converts it to cid multihash
func CreateHashCidLink(hash []byte) cidlink.Link {
	lchMh, err := multihash.Encode(hash, GetLinkPrototype().(cidlink.LinkPrototype).MhType)
	if err != nil {
		return cidlink.Link{}
	}
	// TODO: switch to use CommitTree codec type
	lcCID := cid.NewCidV1(GetLinkPrototype().(cidlink.LinkPrototype).Codec, lchMh)
	lcLinkCID := cidlink.Link{Cid: lcCID}
	return lcLinkCID
}

func GetLinkPrototype() ipld.LinkPrototype {
	// tip: 0x0129 dag-json
	return cidlink.LinkPrototype{cid.Prefix{
		Version:  1,
		Codec:    0x71, // dag-cbor
		MhType:   0x12, // sha2-256
		MhLength: 32,   // sha2-256 hash has a 32-byte sum.
	}}
}

// GetProofs
func (e *AnconAPIHandler) GetProofs(height *int64, key string) (*sdk.ABCIMessageLogs, error) {
	e.logger.Debug("ancon_getProofs")

	block, err := e.clientCtx.Client.Block(context.Background(), height)

	if err != nil {
		e.logger.Error("failed to get block", "error", err.Error())
		return nil, err

	}

	query := abci.RequestQuery{
		Data:   []byte(key),
		Path:   ("/store/anconprotocol/key"),
		Height: block.Block.Height,
		Prove:  true,
	}
	res, err := e.clientCtx.Client.ABCIQueryWithOptions(context.Background(),
		query.Path, query.Data, tmtypes.ABCIQueryOptions{
			Height: query.Height,
			Prove:  true,
		})

	mproofs, err := ibc.ConvertProofs(res.Response.ProofOps)

	root := ibc.MerkleRoot{
		Hash: block.Block.AppHash,
	}
	err = mproofs.VerifyMembership(ibc.GetSDKSpecs(), root, ibc.NewMerklePath(string(mproofs.Proofs[0].GetExist().Key)), []byte(key))
	if err != nil {
		return nil, err
	}

	r := ics23.CommitmentRoot(block.Block.Header.AppHash)
	rspEventAppend := sdk.EmptyEvents()
	i := 0

	for _, exproof := range mproofs.Proofs {

		// exproof.Verify(ics23.TendermintSpec, (r), exproof.Key, key)
		exproofjson, err := e.clientCtx.Codec.MarshalJSON(exproof)
		if err != nil {
			return nil, err
		}
		comm, err := e.clientCtx.Codec.MarshalJSON(exproof.GetExist())
		if err != nil {
			return nil, err
		}

		rspEventAppend = rspEventAppend.AppendEvent(sdk.NewEvent(
			fmt.Sprintf("proof_path_%s", exproof.GetExist().Key),
			sdk.NewAttribute("key", hexutil.Encode(exproof.GetExist().Key)),
			sdk.NewAttribute("value", hexutil.Encode([]byte(exproof.GetExist().Value))),
			sdk.NewAttribute("leaf", hexutil.Encode([]byte{0x0})),
			sdk.NewAttribute("ex", hexutil.Encode(exproofjson)),
			sdk.NewAttribute("root", hexutil.Encode(r)),
			sdk.NewAttribute("commitment", hexutil.Encode(comm)),
		))
		i++
	}

	l := sdk.NewABCIMessageLog(uint32(0), "proofs", rspEventAppend)

	logs := sdk.ABCIMessageLogs{{
		MsgIndex: l.MsgIndex,
		Log:      l.Log,
		Events:   l.Events,
	}}

	return &logs, nil
}

// VerifyMembership
func (e *AnconAPIHandler) VerifyMembership(root, key, value, exproof hexutil.Bytes) (*sdk.ABCIMessageLogs, error) {
	var commitment ics23.CommitmentProof
	e.clientCtx.Codec.UnmarshalJSON((exproof), &commitment)

	ok := ics23.VerifyMembership(ics23.TendermintSpec, ics23.CommitmentRoot(root), &commitment, key, value)

	isok := big.NewInt(0)
	if ok {
		isok = big.NewInt(1)
	}
	rspEvent := sdk.NewEvent(
		"verify_membership",
		sdk.NewAttribute("valid", hexutil.EncodeBig(isok)),
	)

	rspEventAppend := sdk.EmptyEvents().AppendEvent(rspEvent)

	l := sdk.NewABCIMessageLog(uint32(0), "verify_membership", rspEventAppend)

	logs := sdk.ABCIMessageLogs{{
		MsgIndex: l.MsgIndex,
		Log:      l.Log,
		Events:   l.Events,
	}}

	return &logs, nil
}

// GetTransactionByHash
func (e *AnconAPIHandler) GetTransactionByHash(hash string) (*sdk.TxResponse, error) {
	e.logger.Debug("ancon_getTransactionByHash")

	search, err := e.clientCtx.Client.TxSearch(context.Background(), fmt.Sprintf("tx.hash='%v'", hash), true, nil, nil, "asc")

	if err != nil {
		e.logger.Error("failed to broadcast tx", "error", err.Error())
		return nil, err

	}
	if search.TotalCount == 0 {
		e.logger.Error("no hash found")
		return nil, err

	}

	txres := search.Txs[0]

	logs := sdk.ABCIMessageLogs{{
		MsgIndex: 0,
		Log:      "",
		Events:   sdk.StringifyEvents(txres.TxResult.GetEvents()),
	}}

	newRsp := &sdk.TxResponse{
		TxHash:    hexutil.Encode(txres.Hash),
		Height:    txres.Height,
		Codespace: txres.TxResult.Codespace,
		Code:      txres.TxResult.Code,
		Data:      strings.ToUpper(hex.EncodeToString([]byte(txres.TxResult.Data))),
		RawLog:    txres.TxResult.Log,
		Logs:      logs,
		Info:      txres.TxResult.Info,
		GasWanted: txres.TxResult.GasWanted,
		GasUsed:   txres.TxResult.GasUsed,
		//		Timestamp: txres.TxResult.Info.
	}

	return newRsp, nil
}

// SendSignTx
func (e *AnconAPIHandler) SendRawTransaction(data hexutil.Bytes) (*sdk.TxResponse, error) {
	e.logger.Debug("ancon_sendSignTx")

	// RLP decode raw transaction bytes
	tx, err := e.clientCtx.TxConfig.TxDecoder()(data)
	if err != nil {
		e.logger.Error("transaction decoding failed", "error", err.Error())

		return nil, err
	}

	ethereumTx, isEthTx := tx.(*evmtypes.MsgEthereumTx)
	if !isEthTx {
		e.logger.Debug("invalid transaction type", "type", fmt.Sprintf("%T", tx))
		return nil, fmt.Errorf("invalid transaction type %T", tx)
	}

	if err := ethereumTx.ValidateBasic(); err != nil {
		e.logger.Debug("tx failed basic validation", "error", err.Error())
		return nil, err
	}

	txData, err := evmtypes.UnpackTxData(ethereumTx.Data)
	if err != nil {
		e.logger.Error("failed to unpack tx data", "error", err.Error())
		return nil, err
	}

	encb := txData.GetData()
	if err != nil {
		return nil, fmt.Errorf("invalid hex %s: %v", encb, err)
	}

	txr := txtypes.TxRaw{}
	err = e.clientCtx.Codec.Unmarshal(encb, &txr)
	if err != nil {
		return nil, fmt.Errorf("invalid TxRaw %s: %v", encb, err)
	}

	out, err := txr.Marshal()
	if err != nil {
		return nil, fmt.Errorf("invalid TxRawBytes %s: %v", encb, err)
	}

	syncCtx := e.clientCtx.WithBroadcastMode(flags.BroadcastSync)
	rsp, err := syncCtx.BroadcastTx(out)

	if err != nil || rsp.Code != 0 {
		if err == nil {
			err = errors.New(rsp.RawLog)
		}
		e.logger.Error("failed to broadcast tx", "error", err.Error())
		return rsp, err
	}

	return rsp, nil

}
