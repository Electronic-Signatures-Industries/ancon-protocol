package client

import (
	rest "github.com/Electronic-Signatures-Industries/ancon-protocol/x/anconprotocol/client/rest"
	"github.com/cosmos/cosmos-sdk/client"
)

// function to create the rest handler
type RESTHandlerFn func(client.Context) rest.AnconRestHandler

// The combined type for a proposal handler for both cli and rest
type AnconRestHandler struct {
	RESTHandler RESTHandlerFn
}

// NewAnconRestHandler creates a new ProposalHandler object
func NewAnconRestHandler(restHandler RESTHandlerFn) AnconRestHandler {
	return AnconRestHandler{
		RESTHandler: restHandler,
	}
}
