package server

import (
	"context"
	"errors"
	"fmt"
	"mime"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"github.com/rs/cors"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/server"
	"github.com/cosmos/cosmos-sdk/server/types"
	ethrpc "github.com/ethereum/go-ethereum/rpc"

	"github.com/Electronic-Signatures-Industries/ancon-protocol/rpc/ancon"
	"github.com/tharsis/ethermint/rpc"

	"github.com/tharsis/ethermint/server/config"
)

const (
	maxRequestContentLength = 1024 * 1024 * 5
	contentType             = "application/json"
)

// https://www.jsonrpc.org/historical/json-rpc-over-http.html#id13
var acceptedContentTypes = []string{contentType, "application/json-rpc", "application/jsonrequest"}

// ServeHTTP serves JSON-RPC requests over HTTP.
func ServeHTTP2(s *ethrpc.Server) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		// Permit dumb empty requests for remote health-checks (AWS)
		if r.Method == http.MethodGet && r.ContentLength == 0 && r.URL.RawQuery == "" {
			w.WriteHeader(http.StatusOK)
			return
		}
		if code, err := validateRequest(r); err != nil {
			http.Error(w, err.Error(), code)
			return
		}
		// All checks passed, create a codec that reads directly from the request body
		// until EOF, writes the response to w, and orders the server to process a
		// single request.
		ctx := r.Context()
		ctx = context.WithValue(ctx, "remote", r.RemoteAddr)
		ctx = context.WithValue(ctx, "scheme", r.Proto)
		ctx = context.WithValue(ctx, "local", r.Host)
		if ua := r.Header.Get("User-Agent"); ua != "" {
			ctx = context.WithValue(ctx, "User-Agent", ua)
		}
		if origin := r.Header.Get("Origin"); origin != "" {
			ctx = context.WithValue(ctx, "Origin", origin)
		}

		// w.Header().Set("content-type", contentType)
		// codec := newHTTPServerConn(r, w)
		// defer codec.close()
		// s.serveSingleRequest(ctx, codec)
	}
}

// validateRequest returns a non-zero response code and error message if the
// request is invalid.
func validateRequest(r *http.Request) (int, error) {
	if r.Method == http.MethodPut || r.Method == http.MethodDelete {
		return http.StatusMethodNotAllowed, errors.New("method not allowed")
	}
	if r.ContentLength > maxRequestContentLength {
		err := fmt.Errorf("content length too large (%d>%d)", r.ContentLength, maxRequestContentLength)
		return http.StatusRequestEntityTooLarge, err
	}
	// Allow OPTIONS (regardless of content-type)
	if r.Method == http.MethodOptions {
		return 0, nil
	}
	// Check content-type
	if mt, _, err := mime.ParseMediaType(r.Header.Get("content-type")); err == nil {
		for _, accepted := range acceptedContentTypes {
			if accepted == mt {
				return 0, nil
			}
		}
	}
	// Invalid content-type
	err := fmt.Errorf("invalid content type, only %s is supported", contentType)
	return http.StatusUnsupportedMediaType, err
}

// StartJSONRPC starts the JSON-RPC server
func StartJSONRPC(ctx *server.Context, clientCtx client.Context, tmRPCAddr, tmEndpoint string, config config.Config) (*http.Server, chan struct{}, error) {
	tmWsClient := ConnectTmWS(tmRPCAddr, tmEndpoint, ctx.Logger)

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

	// allocate separate WS connection to Tendermint
	tmWsClient = ConnectTmWS(tmRPCAddr, tmEndpoint, ctx.Logger)
	wsSrv := rpc.NewWebsocketsServer(ctx.Logger, tmWsClient, config)
	wsSrv.Start()
	return httpSrv, httpSrvDone, nil
}
