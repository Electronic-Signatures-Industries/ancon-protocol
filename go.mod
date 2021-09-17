module github.com/Electronic-Signatures-Industries/ancon-protocol

go 1.16

require (
	github.com/cosmos/cosmos-sdk v0.42.9
	github.com/ethereum/go-ethereum v1.10.7
	github.com/ethersphere/bee v1.1.0
	github.com/fxamacker/cbor/v2 v2.3.0
	github.com/gogo/protobuf v1.3.3
	github.com/golang/protobuf v1.5.2
	github.com/google/go-cmp v0.5.6 // indirect
	github.com/gorilla/mux v1.8.0
	github.com/grpc-ecosystem/grpc-gateway v1.16.0
	github.com/grpc-ecosystem/grpc-gateway/v2 v2.6.0 // indirect
	github.com/hyperledger/aries-framework-go v0.1.7
	github.com/ipfs/go-cid v0.1.0
	github.com/ipld/go-ipld-prime v0.12.0
	github.com/irisnet/irismod v1.4.0
	github.com/itchyny/base58-go v0.2.0
	github.com/multiformats/go-multibase v0.0.3
	github.com/multiformats/go-multicodec v0.3.0
	github.com/regen-network/cosmos-proto v0.3.1
	github.com/spf13/cast v1.3.1
	github.com/spf13/cobra v1.1.3
	github.com/spf13/pflag v1.0.5
	github.com/stretchr/testify v1.7.0
	github.com/tendermint/spm v0.0.0-20210524110815-6d7452d2dc4a
	github.com/tendermint/tendermint v0.34.11
	github.com/tendermint/tm-db v0.6.4
	golang.org/x/net v0.0.0-20210805182204-aaa1db679c0d // indirect
	google.golang.org/genproto v0.0.0-20210903162649-d08c68adba83
	google.golang.org/grpc v1.40.0
	google.golang.org/grpc/cmd/protoc-gen-go-grpc v1.0.0 // indirect
	google.golang.org/protobuf v1.27.1
)

replace google.golang.org/grpc => google.golang.org/grpc v1.33.2

replace github.com/gogo/protobuf => github.com/regen-network/protobuf v1.3.3-alpha.regen.1
