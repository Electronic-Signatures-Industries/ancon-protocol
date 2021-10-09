package server

import (
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/Electronic-Signatures-Industries/ancon-ipld-router-sync/net"
	"github.com/gorilla/mux"
	"github.com/ipfs/go-cid"
	graphsync "github.com/ipfs/go-graphsync/impl"
	cidlink "github.com/ipld/go-ipld-prime/linking/cid"
	"github.com/ipld/go-ipld-prime/node/basicnode"
	"github.com/ipld/go-ipld-prime/traversal/selector/builder"
	"github.com/libp2p/go-libp2p-core/peer"
	host "github.com/libp2p/go-libp2p-host"
	dht "github.com/libp2p/go-libp2p-kad-dht"
	"github.com/multiformats/go-multiaddr"
	linkstore "github.com/proofzero/go-ipld-linkstore"
	"github.com/rs/cors"

	blocks "github.com/ipfs/go-block-format"
	gsync "github.com/ipfs/go-graphsync"
	gsmsg "github.com/ipfs/go-graphsync/message"
	gsnet "github.com/ipfs/go-graphsync/network"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/server"
	"github.com/cosmos/cosmos-sdk/server/types"
	ethrpc "github.com/ethereum/go-ethereum/rpc"

	"github.com/tharsis/ethermint/rpc"

	"github.com/tharsis/ethermint/server/config"
)

// StartGraphsync starts the JSON-RPC server
func StartGraphsync(ctx *server.Context, clientCtx client.Context, tmRPCAddr, tmEndpoint string, config config.Config) (*http.Server, chan struct{}, error) {
	tmWsClient := ConnectTmWS(tmRPCAddr, tmEndpoint, ctx.Logger)

	rpcServer := ethrpc.NewServer()

	rpcAPIArr := config.JSONRPC.API
	apis := rpc.GetRPCAPIs(ctx, clientCtx, tmWsClient, rpcAPIArr)

	for _, api := range apis {
		if err := rpcServer.RegisterName(api.Namespace, api.Service); err != nil {
			ctx.Logger.Error(
				"failed to register service in JSON RPC namespace",
				"namespace", api.Namespace,
				"service", api.Service,
			)
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

	// allocate separate WS connection to Tendermint
	tmWsClient = ConnectTmWS(tmRPCAddr, tmEndpoint, ctx.Logger)
	wsSrv := rpc.NewWebsocketsServer(ctx.Logger, tmWsClient, config)
	wsSrv.Start()
	return httpSrv, httpSrvDone, nil
}

func NewEdge(ctx context.Context, gsynchost host.Host, router string) string {

	// The last step to get fully up and running would be to connect to
	// bootstrap peers (or any other peers). We leave this commented as
	// this is an example and the peer will die as soon as it finishes, so
	// it is unnecessary to put strain on the network.

	// This connects to public bootstrappers
	// for _, addr := range dht.DefaultBootstrapPeers {
	//	pi, _ := peer.AddrInfoFromP2pAddr(multiaddr.StringCast(bootstrap))
	// We ignore errors as some bootstrap peers may be down
	// and that is fine.
	// This connects to public bootstrappers
	var pi *peer.AddrInfo
	for _, addr := range dht.DefaultBootstrapPeers {
		pi, _ = peer.AddrInfoFromP2pAddr(addr)
		// We ignore errors as some bootstrap peers may be down
		// and that is fine.
		gsynchost.Connect(ctx, *pi)
	}

	sls := linkstore.NewStorageLinkSystemWithNewStorage(cidlink.DefaultLinkSystem())
	network := gsnet.NewFromLibp2pHost(gsynchost)

	//add carv1
	var exchange gsync.GraphExchange
	exchange = graphsync.New(ctx, network, sls.LinkSystem)

	finalResponseStatusChan := make(chan gsync.ResponseStatusCode, 1)
	exchange.RegisterCompletedResponseListener(func(p peer.ID, request gsync.RequestData, status gsync.ResponseStatusCode) {
		select {
		case finalResponseStatusChan <- status:
			fmt.Sprintf("%s", status)
		default:
		}
	})
	c, _ := cid.Parse("bafyreigiumx5ficjmdwdgpsxddfeyx2vh6cbod5s454pqeaosue33w2fpq")
	link := cidlink.Link{Cid: c}
	ssb := builder.NewSelectorSpecBuilder(basicnode.Prototype.Any)
	selector := ssb.ExploreAll(ssb.Matcher()).Node()

	r := &net.Receiver{
		MessageReceived: make(chan net.ReceivedMessage),
	}

	pi, _ = peer.AddrInfoFromP2pAddr(multiaddr.StringCast(router))
	network.SetDelegate(r)
	err := network.ConnectTo(ctx, pi.ID)
	if err != nil {
		panic(err)
	}
	pgChan, errChan := exchange.Request(ctx, pi.ID, link, selector)
	net.VerifyHasErrors(ctx, errChan)
	net.PrintProgress(ctx, pgChan)
	defer gsynchost.Close()

	a := fmt.Sprintf("%s/p2p/%s", gsynchost.Addrs()[0].String(), gsynchost.ID().Pretty())
	fmt.Printf("Hello World, my hosts ID is %s\n", a)

	var received gsmsg.GraphSyncMessage
	var receivedBlocks []blocks.Block
	for {
		var message net.ReceivedMessage

		sender := message.Sender
		received = message.Message
		fmt.Sprintf("%s %s", sender.String(), received)
		receivedBlocks = append(receivedBlocks, received.Blocks()...)
		receivedResponses := received.Responses()
		if len(receivedResponses) == 0 {
			continue
		}
		fmt.Sprintf("%s", receivedResponses[0].Status())
		break
		if receivedResponses[0].Status() != gsync.PartialResponse {
		}
	}

	return ""
}
