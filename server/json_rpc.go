package server

import (
	"errors"
	"fmt"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"github.com/rs/cors"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/server"
	"github.com/cosmos/cosmos-sdk/server/types"
	"github.com/cosmos/cosmos-sdk/types/tx/signing"
	ethrpc "github.com/ethereum/go-ethereum/rpc"

	"github.com/Electronic-Signatures-Industries/ancon-protocol/rpc/ancon"
	authsign "github.com/cosmos/cosmos-sdk/x/auth/signing"
	"github.com/tharsis/ethermint/rpc"
	evmconfig "github.com/tharsis/ethermint/server/config"

	aguaclaratypes "github.com/Electronic-Signatures-Industries/ancon-protocol/x/aguaclara/types"

	"github.com/Electronic-Signatures-Industries/ancon-protocol/server/config"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

const (
	maxRequestContentLength = 1024 * 1024 * 5
	contentType             = "application/json"
)

// https://www.jsonrpc.org/historical/json-rpc-over-http.html#id13
var acceptedContentTypes = []string{contentType, "application/json-rpc", "application/jsonrequest"}

// StartJSONRPC starts the JSON-RPC server
func StartJSONRPC(ctx *server.Context, clientCtx client.Context, tmRPCAddr, tmEndpoint string, config config.Config) (*http.Server, chan struct{}, error) {
	tmWsClient := ConnectTmWS(tmRPCAddr, tmEndpoint, ctx.Logger)
	ethconfig := &evmconfig.Config{
		JSONRPC: evmconfig.JSONRPCConfig{
			Address:   config.JSONRPC.Address,
			WsAddress: config.JSONRPC.WsAddress,
			API:       config.JSONRPC.API,
			Enable:    config.JSONRPC.Enable,
			GasCap:    config.JSONRPC.GasCap,
		},
		TLS: evmconfig.TLSConfig{
			CertificatePath: config.TLS.CertificatePath,
			KeyPath:         config.TLS.KeyPath,
		},
	}
	rpcServer := ethrpc.NewServer()
	rpcAPIArr := config.JSONRPC.API
	apis := rpc.GetRPCAPIs(ctx, clientCtx, tmWsClient, rpcAPIArr)
	rpcapis := ancon.GetRPCAPIs(ctx, clientCtx, tmWsClient, rpcAPIArr)
	apis = append(apis, rpcapis...)

	for _, api := range apis {
		if err := rpcServer.RegisterName(api.Namespace, api.Service); err == nil {
			ctx.Logger.Info(
				"Registered service in JSON RPC namespace",
				"namespace", api.Namespace,
				"service", api.Service,
			)

		} else {
			return nil, nil, err
		}
	}

	r := mux.NewRouter()

	r.HandleFunc("/", rpcServer.ServeHTTP).Methods("POST")

	handlerWithCors := cors.Default()
	if config.API.EnableUnsafeCORS {
		handlerWithCors = cors.AllowAll()
	}

	httpSrv := &http.Server{
		Addr:    config.JSONRPC.Address,
		Handler: handlerWithCors.Handler(r),
	}
	httpSrvDone := make(chan struct{}, 1)

	errCh := make(chan error)
	go func() {
		ctx.Logger.Info("Starting JSON-RPC server", "address", config.JSONRPC.Address)
		if err := httpSrv.ListenAndServe(); err != nil {
			if err == http.ErrServerClosed {
				close(httpSrvDone)
				return
			}

			ctx.Logger.Error("failed to start JSON-RPC server", "error", err.Error())
			errCh <- err
		}
	}()

	select {
	case err := <-errCh:
		ctx.Logger.Error("failed to boot JSON-RPC server", "error", err.Error())
		return nil, nil, err
	case <-time.After(types.ServerStartTime): // assume JSON RPC server started successfully
	}

	ctx.Logger.Info("Starting JSON WebSocket server", "address", config.JSONRPC.WsAddress)

	// Graphsync

	gshost := NewGraphsyncHost(ctx, clientCtx, config.Graphsync.Address)
	srvDone := make(chan struct{}, 1)

	errServCh := make(chan error)
	go func() {
		ctx.Logger.Info("Starting Graphsync", "address", config.Graphsync.Address)
		if err := gshost.ListenAndServe(); err != nil {
			if err != nil {
				close(srvDone)
				return
			}

			ctx.Logger.Error("failed to start Graphsync", "error", err.Error())
			errServCh <- err
		}
	}()

	select {
	case err := <-errServCh:
		ctx.Logger.Error("failed to boot Graphsync", "error", err.Error())
		return nil, nil, err
	case <-time.After(types.ServerStartTime): // assume JSON RPC server started successfully
	}

	ctx.Logger.Info("Starting JSON WebSocket server", "address", config.JSONRPC.WsAddress)

	// allocate separate WS connection to Tendermint
	tmWsClient = ConnectTmWS(tmRPCAddr, tmEndpoint, ctx.Logger)
	wsSrv := rpc.NewWebsocketsServer(ctx.Logger, tmWsClient, *ethconfig)
	wsSrv.Start()

	return httpSrv, httpSrvDone, nil
}

func setPacketInterval(clientCtx client.Context, ctx *server.Context) {

	//clientCtx.BroadcastTx()
	// hex := common.BytesToAddress(clientCtx.FromAddress.Bytes())

	msgSendMeta := aguaclaratypes.MsgSendMetadataOwnership{
		Creator:   "ethm1x23pcxakulpq74r7jv948kk90apv6f0k7s943z",
		PortId:    "cross-metadata-ownership",
		ChannelId: "channel-0",
		Data: &aguaclaratypes.AguaclaraPacketData{
			Creator:      "ethm1x23pcxakulpq74r7jv948kk90apv6f0k7s943z",
			TokenAddress: "0xFA24605D4023b0bf847034Da72D25e1b8daC0E34",
			TokenId:      "3",
			DidRecipient: "ethm1x23pcxakulpq74r7jv948kk90apv6f0k7s943z",
			ToMetadata:   "ethm1x23pcxakulpq74r7jv948kk90apv6f0k7s943z",
		},
	}

	txbuilder := clientCtx.TxConfig.NewTxBuilder()

	txbuilder.SetMsgs(&msgSendMeta)
	txbuilder.SetMemo("")
	txbuilder.SetFeeAmount(sdk.Coins{{
		Denom:  "aancon",
		Amount: sdk.NewInt(200000),
	}})

	acc, _ := sdk.AccAddressFromBech32(
		msgSendMeta.Creator,
	)
	accNum, accSeq, _ := clientCtx.AccountRetriever.GetAccountNumberSequence(clientCtx, acc)
	// sig, pub, _ := clientCtx.Keyring.SignByAddress(acc, msgSendMeta.GetSignBytes())
	kr, _ := clientCtx.Keyring.KeyByAddress(acc)
	pub := kr.GetPubKey()
	sigs := []signing.SignatureV2{signing.SignatureV2{
		PubKey: pub,
		Data: &signing.SingleSignatureData{
			SignMode: clientCtx.TxConfig.SignModeHandler().DefaultMode(),
		},
		Sequence: accSeq,
	}}

	signerData := authsign.SignerData{
		ChainID:       clientCtx.ChainID,
		AccountNumber: accNum,
		Sequence:      accSeq,
	}

	signBytes, err := clientCtx.TxConfig.SignModeHandler().GetSignBytes(
		clientCtx.TxConfig.SignModeHandler().DefaultMode(),
		signerData,
		txbuilder.GetTx(),
	)

	sig, _, _ := clientCtx.Keyring.SignByAddress(acc, signBytes)
	sigs[0].Data.(*signing.SingleSignatureData).Signature = sig
	txbuilder.SetSignatures(sigs...)
	txbuilder.SetGasLimit(2000000)
	bs, err := clientCtx.TxConfig.TxEncoder()(txbuilder.GetTx())

	if err != nil {
		fmt.Errorf("invalid TxRawBytes %s: %v", &msgSendMeta, err)
	}

	syncCtx := clientCtx.WithBroadcastMode(flags.BroadcastSync)
	rsp, err := syncCtx.BroadcastTx(bs)

	if err != nil || rsp.Code != 0 {
		if err == nil {
			err = errors.New(rsp.RawLog)
		}
		ctx.Logger.Error("failed to broadcast tx", "error", err.Error())
	}

}
