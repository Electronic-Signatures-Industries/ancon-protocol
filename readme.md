# Ancon Protocol

> Protocol for proof and verfied decentralized content using IPLD multihash

#### Wave 8 Filecoin Foundation grant recipient

## Documentation (WIP)

- https://ancon.dao.pa
- https://docs.xdv.digital

## Getting Started
- [Getting Started](https://github.com/Electronic-Signatures-Industries/ancon-protocol/blob/main/specs/Getting%20Started.md)

## Endpoints

- **RPC**: ws://rpcancon.dao.pa:26657
- **API**: https://apiancon.dao.pa

## Installing a Node

- Download repo 
- Compile `go build cmd/ancon-protocold/main.go
- Join our Discord to get genesis and node id to connect to our internal testnet

## Testnet and Mainnet

Once M1 is QA enough we'll compile with Gaia and start prepping for Cosmos hub.

## Staking ATOM

TODO

### Features and Roadmap

- Cosmos based chain for data economy use cases like NFT, Verified credentials and Offchain data sources
- Verified credentials ready (store VCs and DIDs)
- File microstorage and Metadata APIs using IPLD multihashes or CIDs
- Cross Minting metadata from any blockchain
- IPLD data sources for offchain trusted use cases
- Blockchain agnostic, use Ancon hashes like IPFS hashes
- Supports IPFS and Swarm features (proxy, coming Q4)
- Agnostic NFT Royalty mechanism (Q4)
- Swap decentralized content ETL jobs (Q1 2022)
- Filecoin, Chia features (Q2 2022)

## Get started

```
starport serve
```

`serve` command installs dependencies, builds, initializes, and starts your blockchain in development.

## Configure

Your blockchain in development can be configured with `config.yml`. To learn more, see the [Starport docs](https://docs.starport.network).

## Launch

To launch your blockchain live on multiple nodes, use `starport network` commands. Learn more about [Starport Network](https://github.com/tendermint/spn).

## Web Frontend

Starport has scaffolded a Vue.js-based web app in the `vue` directory. Run the following commands to install dependencies and start the app:

```
cd vue
npm install
npm run serve
```

The frontend app is built using the `@starport/vue` and `@starport/vuex` packages. For details, see the [monorepo for Starport front-end development](https://github.com/tendermint/vue).

## Learn more

- [Starport](https://github.com/tendermint/starport)
- [Starport Docs](https://docs.starport.network)
- [Cosmos SDK documentation](https://docs.cosmos.network)
- [Cosmos SDK Tutorials](https://tutorials.cosmos.network)
- [Discord](https://discord.gg/W8trcGV)

## DevOps Setup

## Contribute

### Copyright Industrias de Firmas Electronicas SA, Industrias DAO 2021
