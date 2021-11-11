package server

import (
	"context"
	"fmt"
	"time"

	"github.com/Electronic-Signatures-Industries/ancon-ipld-router-sync/net"
	"github.com/ipfs/go-cid"
	graphsync "github.com/ipfs/go-graphsync/impl"
	"github.com/ipld/go-car/v2/blockstore"
	"github.com/ipld/go-ipld-prime/datamodel"
	"github.com/ipld/go-ipld-prime/fluent"
	cidlink "github.com/ipld/go-ipld-prime/linking/cid"
	"github.com/ipld/go-ipld-prime/node/basicnode"
	"github.com/ipld/go-ipld-prime/traversal/selector/builder"
	"github.com/libp2p/go-libp2p"
	connmgr "github.com/libp2p/go-libp2p-connmgr"
	peer "github.com/libp2p/go-libp2p-core/peer"
	host "github.com/libp2p/go-libp2p-host"
	dht "github.com/libp2p/go-libp2p-kad-dht"
	kaddht "github.com/libp2p/go-libp2p-kad-dht"

	noise "github.com/libp2p/go-libp2p-noise"
	routing "github.com/libp2p/go-libp2p-routing"
	linkstore "github.com/proofzero/go-ipld-linkstore"
	evmtypes "github.com/tharsis/ethermint/x/evm/types"

	blocks "github.com/ipfs/go-block-format"
	gsync "github.com/ipfs/go-graphsync"
	gsmsg "github.com/ipfs/go-graphsync/message"
	gsnet "github.com/ipfs/go-graphsync/network"
	jsonrpc "github.com/tendermint/tendermint/rpc/jsonrpc/types"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/server"
)

func BuildTx(tx evmtypes.MsgEthereumTx) datamodel.Node {
	data := tx.AsTransaction()
	if data != nil {
		node := fluent.MustBuildMap(basicnode.Prototype.Map, 12, func(na fluent.MapAssembler) {
			na.AssembleEntry("size").AssignFloat(tx.Size_)
			na.AssembleEntry("hash").AssignString(tx.Hash)
			na.AssembleEntry("from").AssignString(tx.From)
			na.AssembleEntry("chain_id").AssignString(data.ChainId().String())
			na.AssembleEntry("cost").AssignString(data.Cost().String())
			na.AssembleEntry("gas_price").AssignString(data.GasPrice().String())
			na.AssembleEntry("gas").AssignString(string(data.Gas()))
			na.AssembleEntry("nonce").AssignString(string(data.Nonce()))
			na.AssembleEntry("value").AssignString(data.Value().String())
			na.AssembleEntry("tx_type").AssignInt(int64(data.Type()))
			na.AssembleEntry("data").AssignBytes((data.Data()))
			na.AssembleEntry("to").AssignString(data.To().Hex())
		})
		return node
	} else {
		return nil
	}
}

func ReceivedTxMessage(ctx *server.Context, evt *jsonrpc.RPCResponse, router gsync.GraphExchange) ([]byte, error) {

	return nil, nil
}

type GraphsyncServer struct {
	ctx     *server.Context
	address string
	host    host.Host
	client  client.Context

	exchange gsync.GraphExchange
}

func NewGraphsyncHost(ctx *server.Context, clientCtx client.Context, address string) *GraphsyncServer {
	c := context.Background()
	gs := GraphsyncServer{
		ctx:     ctx,
		address: address,
		client:  clientCtx,
	}

	var r *kaddht.IpfsDHT
	newDHT := func(h host.Host) (routing.PeerRouting, error) {
		var err error
		r, err = kaddht.New(c, h)
		return r, err
	}

	gsynchost, err := libp2p.New(
		c,
		// Use the keypair we generated
		// libp2p.RandomIdentity(),
		libp2p.Security(noise.ID, noise.New),
		// Multiple listen addresses
		libp2p.ListenAddrStrings(gs.address),
		// support TLS connections
		// Let's prevent our peer from having too many
		// connections by attaching a connection manager.
		libp2p.ConnectionManager(connmgr.NewConnManager(
			100,         // Lowwater
			400,         // HighWater,
			time.Minute, // GracePeriod
		)),
		// Attempt to open ports using uPNP for NATed hosts.
		libp2p.NATPortMap(),
		// Let this host use the DHT to find other hosts
		libp2p.Routing(newDHT),
		// Let this host use relays and advertise itself on relays if
		// it finds it is behind NAT. Use libp2p.Relay(options...) to
		// enable active relays and more.
		libp2p.EnableAutoRelay(),
		// If you want to help other peers to figure out if they are behind
		// NATs, you can launch the server-side of AutoNAT too (AutoRelay
		// already runs the client)
		//
		// This service is highly rate-limited and should not cause any
		// performance issues.
		libp2p.EnableNATService(),
	)
	if err != nil {
		panic(err)
	}

	gs.host = gsynchost
	return &gs

}

func (gs *GraphsyncServer) ListenAndServe() error {
	c := context.Background()
	// This connects to public bootstrappers
	var pi *peer.AddrInfo
	for _, addr := range dht.DefaultBootstrapPeers {
		pi, _ = peer.AddrInfoFromP2pAddr(addr)
		// We ignore errors as some bootstrap peers may be down
		// and that is fine.
		gs.host.Connect(c, *pi)
	}

	sls := linkstore.NewStorageLinkSystemWithNewStorage(cidlink.DefaultLinkSystem())
	network := gsnet.NewFromLibp2pHost(gs.host)

	//add carv1
	gs.exchange = graphsync.New(c, network, sls.LinkSystem)

	finalResponseStatusChan := make(chan gsync.ResponseStatusCode, 1)
	gs.exchange.RegisterCompletedResponseListener(func(p peer.ID, request gsync.RequestData, status gsync.ResponseStatusCode) {
		select {
		case finalResponseStatusChan <- status:
			fmt.Sprintf("%s", status)
		default:
		}
	})

	defer gs.host.Close()

	gs.ctx.Logger.Info("%s/p2p/%s", gs.host.Addrs()[0].String(), gs.host.ID().Pretty())

	var received gsmsg.GraphSyncMessage
	var receivedBlocks []blocks.Block
	go func() {
		for {
			var message net.ReceivedMessage

			sender := message.Sender
			received = message.Message

			receivedBlocks = append(receivedBlocks, received.Blocks()...)
			receivedResponses := received.Responses()
			if len(receivedResponses) == 0 {
				continue
			}
			gs.ctx.Logger.Info("Received from sender: %s %s", sender.String(), received)
			gs.ctx.Logger.Info("Status: %s", receivedResponses[0].Status())
			if receivedResponses[0].Status() != gsync.PartialResponse {
				break
			}

			buidl := gsmsg.NewBuilder(gsmsg.Topic(0x9))
			buidl.AddBlock(blocks.NewBlock([]byte{}))
			mm, _ := buidl.Build()
			s, _ := network.NewMessageSender(c, message.Sender)
			s.SendMsg(c, mm)
		}
	}()

	return nil
}

//WriteCAR
func ReadCAR() ([]cid.Cid, blocks.Block, datamodel.Node, error) {
	//lsys := linkstore.NewStorageLinkSystemWithNewStorage(cidlink.DefaultLinkSystem())
	ssb := builder.NewSelectorSpecBuilder(basicnode.Prototype.Any)
	selector := ssb.ExploreAll(ssb.Matcher()).Node()

	// car := carv1.NewSelectiveCar(context.Background(),
	// 	lsys.ReadStore,
	// 	[]carv1.Dag{{
	// 		Root:     root,
	// 		Selector: selector,
	// 	}})
	// file, err := os.ReadFile(filename)
	// if err != nil {
	// 	return err
	// }

	robs, _ := blockstore.OpenReadOnly("/home/dallant/Code/ancon-node/dagbridge-block-239-begin.car",
		blockstore.UseWholeCIDs(true),
	)

	roots, err := robs.Roots()

	res, _ := robs.Get(roots[0])

	return roots, res, selector, err
}

type ReceivedMessage struct {
	Message gsmsg.GraphSyncMessage
	Sender  peer.ID
}

// Receiver is an interface for receiving messages from the GraphSyncNetwork.
type Receiver struct {
	MessageReceived chan ReceivedMessage
}

func (r *Receiver) ReceiveMessage(
	ctx context.Context,
	sender peer.ID,
	incoming gsmsg.GraphSyncMessage) {

	select {
	case <-ctx.Done():
	case r.MessageReceived <- ReceivedMessage{incoming, sender}:
	}
}

func (r *Receiver) ReceiveError(_ peer.ID, err error) {
	fmt.Println("got receive err")
}

func (r *Receiver) Connected(p peer.ID) {
}

func (r *Receiver) Disconnected(p peer.ID) {
}

// VerifyHasErrors verifies that at least one error was sent over a channel
func VerifyHasErrors(ctx context.Context, errChan <-chan error) error {
	errCount := 0
	for {
		select {
		case e, ok := <-errChan:
			if ok {
				return nil
			} else {
				return e
			}
			errCount++
		case <-ctx.Done():
		}
	}
}

// VerifyHasErrors verifies that at least one error was sent over a channel
func PrintProgress(ctx context.Context, pgChan <-chan gsync.ResponseProgress) {
	errCount := 0
	for {
		select {
		case data, ok := <-pgChan:
			if ok {
				fmt.Sprintf("path: %s, last path: %s", data.Path.String(), data.LastBlock.Path.String())
			}
			errCount++
		case <-ctx.Done():
		}
	}
}
