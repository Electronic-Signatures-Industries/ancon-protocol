package network

import (
	"context"

	gsync "github.com/ipfs/go-graphsync"

	sync "github.com/Electronic-Signatures-Industries/ancon-ipld-router-sync/cmd"
	"github.com/Electronic-Signatures-Industries/ancon-ipld-router-sync/net"
)

type AnconIPLDSync struct {
	Client gsync.GraphExchange
}

func NewAnconIPLDSync(ctx context.Context, addr string, routerAddr string) *AnconIPLDSync {
	h2 := net.NewPeer(ctx, "/ip4/0.0.0.0/tcp/7777")

	router := "/ip4/192.168.50.138/tcp/7779/p2p/12D3KooWLNeo1sqTtMsrReTurqLTQ7fdjGwPaXsEBMbgnTgBJEbt"
	a := sync.NewAgent(ctx, h2, router)

	return &AnconIPLDSync{Client: a}

}
