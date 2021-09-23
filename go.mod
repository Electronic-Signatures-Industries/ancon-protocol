module github.com/Electronic-Signatures-Industries/ancon-protocol

go 1.16

require (
	github.com/Electronic-Signatures-Industries/ancon-evm v0.5.4
	github.com/confio/ics23/go v0.6.6
	github.com/cosmos/cosmos-sdk v0.44.0
	github.com/cosmos/go-bip39 v1.0.0
	github.com/cosmos/iavl v0.17.1
	github.com/cosmos/ibc-go v1.2.0
	github.com/ethereum/go-ethereum v1.10.3
	github.com/fxamacker/cbor/v2 v2.3.0
	github.com/gogo/protobuf v1.3.3
	github.com/golang/protobuf v1.5.2
	github.com/gopherjs/gopherjs v0.0.0-20200217142428-fce0ec30dd00 // indirect
	github.com/gorilla/mux v1.8.0
	github.com/grpc-ecosystem/grpc-gateway v1.16.0
	github.com/hyperledger/aries-framework-go v0.1.7
	github.com/ipfs/go-cid v0.1.0
	github.com/ipld/go-ipld-prime v0.12.0
	github.com/itchyny/base58-go v0.2.0
	github.com/klauspost/cpuid/v2 v2.0.8 // indirect
	github.com/multiformats/go-multibase v0.0.3
	github.com/multiformats/go-multicodec v0.3.0
	github.com/prometheus/procfs v0.7.0 // indirect
	github.com/regen-network/cosmos-proto v0.3.1
	github.com/smartystreets/assertions v1.1.1 // indirect
	github.com/spf13/cast v1.4.1
	github.com/spf13/cobra v1.2.1
	github.com/spf13/pflag v1.0.5
	github.com/spf13/viper v1.9.0
	github.com/stretchr/testify v1.7.0
	github.com/tendermint/spm v0.0.0-20210524110815-6d7452d2dc4a
	github.com/tendermint/tendermint v0.34.13
	github.com/tendermint/tm-db v0.6.4
	golang.org/x/term v0.0.0-20201210144234-2321bbc49cbf // indirect
	google.golang.org/genproto v0.0.0-20210909211513-a8c4777a87af
	google.golang.org/grpc v1.40.0
	google.golang.org/protobuf v1.27.1
	gopkg.in/yaml.v2 v2.4.0
)

replace google.golang.org/grpc => google.golang.org/grpc v1.33.2

replace github.com/gogo/protobuf => github.com/regen-network/protobuf v1.3.3-alpha.regen.1
