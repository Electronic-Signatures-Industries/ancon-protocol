module github.com/Electronic-Signatures-Industries/ancon-protocol

go 1.16

require (
	github.com/confio/ics23/go v0.6.6
	github.com/cosmos/cosmos-sdk v0.44.3
	github.com/cosmos/go-bip39 v1.0.0
	github.com/cosmos/iavl v0.17.1
	github.com/ethereum/go-ethereum v1.10.11
	github.com/fxamacker/cbor/v2 v2.3.0
	github.com/gogo/protobuf v1.3.3
	github.com/golang/protobuf v1.5.2
	github.com/gopherjs/gopherjs v0.0.0-20200217142428-fce0ec30dd00 // indirect
	github.com/gorilla/mux v1.8.0
	github.com/grpc-ecosystem/grpc-gateway v1.16.0
	github.com/hyperledger/aries-framework-go v0.1.7
	github.com/improbable-eng/grpc-web v0.14.1
	github.com/ipfs/go-cid v0.1.0
	github.com/ipld/go-ipld-prime v0.14.0
	github.com/multiformats/go-multibase v0.0.3
	github.com/multiformats/go-multicodec v0.3.0
	github.com/prometheus/procfs v0.7.0 // indirect
	github.com/rakyll/statik v0.1.7
	github.com/regen-network/cosmos-proto v0.3.1
	github.com/rs/cors v1.8.0
	github.com/smartystreets/assertions v1.1.1 // indirect
	github.com/spf13/cast v1.4.1
	github.com/spf13/cobra v1.2.1
	github.com/spf13/viper v1.9.0
	github.com/stretchr/testify v1.7.0
	github.com/tendermint/tendermint v0.34.14
	github.com/tendermint/tm-db v0.6.4
	golang.org/x/term v0.0.0-20201210144234-2321bbc49cbf // indirect
	google.golang.org/genproto v0.0.0-20211118181313-81c1377c94b1
	google.golang.org/grpc v1.42.0
	google.golang.org/protobuf v1.27.1
	gopkg.in/yaml.v2 v2.4.0
)

require (
	github.com/Electronic-Signatures-Industries/ancon-ipld-router-sync v0.0.0-20211005122235-25fc5ac8f59f
	github.com/cosmos/gaia/v6 v6.0.0-rc3
	github.com/cosmos/ibc-go/v2 v2.0.0
	github.com/gballet/go-libpcsclite v0.0.0-20191108122812-4678299bea08 // indirect
	github.com/golang/glog v1.0.0
	github.com/google/cel-go v0.9.0
	github.com/gravity-devs/liquidity v1.4.2
	github.com/grpc-ecosystem/grpc-gateway/v2 v2.7.0 // indirect
	github.com/ipfs/go-block-format v0.0.3
	github.com/ipfs/go-graphsync v0.9.3
	github.com/ipld/go-car/v2 v2.0.2
	github.com/libp2p/go-libp2p v0.14.4
	github.com/libp2p/go-libp2p-connmgr v0.2.4
	github.com/libp2p/go-libp2p-core v0.8.6
	github.com/libp2p/go-libp2p-host v0.1.0
	github.com/libp2p/go-libp2p-kad-dht v0.13.1
	github.com/libp2p/go-libp2p-noise v0.2.0
	github.com/libp2p/go-libp2p-routing v0.1.0
	github.com/multiformats/go-multihash v0.1.0
	github.com/pkg/errors v0.9.1
	github.com/qri-io/jsonschema v0.2.1
	github.com/spf13/pflag v1.0.5
	github.com/strangelove-ventures/packet-forward-middleware v1.0.1
	github.com/tharsis/ethermint v0.7.2
)

replace (
	github.com/cosmos/cosmos-sdk => github.com/cosmos/cosmos-sdk v0.44.2
	github.com/gogo/protobuf => github.com/regen-network/protobuf v1.3.3-alpha.regen.1
	github.com/tharsis/ethermint => github.com/tharsis/ethermint v0.6.1-0.20211025150104-23a33624750c
	google.golang.org/grpc => google.golang.org/grpc v1.33.2
)
