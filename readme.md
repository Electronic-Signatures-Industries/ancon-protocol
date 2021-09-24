<table align="center"><tr><td colspan="4" align="center" width="9999">

<br/>
<img src="/specs/AnconProtocoLogo.jpg" align="center" width="300" alt="Ancon Protocol Logo" />

# Ancon Protocol
Authenticity and provenance data economy decentralized chain<br/>
</td></tr></table>






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
- Compile `go build cmd/ancon-protocold/main.go`
- Join our Discord to get genesis and node id to connect to our internal testnet


## Roadmap to Ancon 1.0.0

### October 2021

- EVM module
- Celo Optics for cross chain messaging
- Grant M2 - NFT bridges ETH-Cosmos-Flow
- NFT Marketplaces - Use Case
- Cleaning, fixes, tech debt
- V0.2.0

### November - December 2021 

- Grant M3 - Ancon Data Pipes: Cosmos-Ethereum IPLD DAGs ETL
- V0.3.0

## Features

- EVM Cross chain messaging using Celo Optics, use Ancon to distribute NFTs into other chains!
- Built in onchain metadata
- Metadata security and permissions using Decentralized Identities (DID)
- EVM Smart Contracts Module
- Native DID, NFT, Metadata modules
- Supports Coinbase Rosetta
- Supports Graphql
- Supports Graphsync

## Use Cases / Things we would like the community to build

- A decentralized notary service where you "stake" your hardware smart card
- A decentralized lottery service where the NFT is the lotto ticket
- A decentralized wallet service using smard cards issued by governtment for zero KYC
- A decentrlaized cross chain NFT marketplace
- A decentralized invoice factoring NFT using IBC, Ancon and Terra




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
