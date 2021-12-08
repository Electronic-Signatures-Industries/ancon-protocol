# Moved to https://github.com/anconprotocol/chain













<table align="center"><tr><td colspan="4" align="center" width="9999">

<br/>
<img src="/specs/AnconProtocoLogo.jpg" align="center" width="300" alt="Ancon Protocol Logo" />

# Ancon Protocol
Authenticity and provenance data economy decentralized chain<br/>
</td></tr></table>






#### Wave 8 Filecoin Foundation grant recipient

## Documentation (WIP)

- https://docs.xdv.digital

## DApps

- https://ancon.did.pa/

## Getting Started
- [Getting Started](https://github.com/Electronic-Signatures-Industries/ancon-protocol/blob/main/specs/Getting%20Started.md)

## Endpoints

- **RPC**: wss://ancon.did.pa:26657
- **API**: https://ancon.did.pa:1318


## Running an Ancon Protocol v0.2.4 module with Gaia, Vega testnet

### Compile

> Note: Requires Go 1.17+

1. Clone `https://github.com/Electronic-Signatures-Industries/ancon-protocol-cosmos-hub`
2. Download Starport
3. Run `starport chain build`
4. Copy `go/bin/anconprotocold` to `/usr/local/bin`

### Running Your Own Full-Node

> Note: Requires Vega Upgrade to be live on testnet

1. Clean any existing files `rm -rf .anconprotocold/`
2. Create keys or  use existing
   `anconprotocold keys add mykey -i --keyring-backend file`
3. Initialize
   `anconprotocold init mynode --chain-id vega-testnet`
4. Copy `app.toml` and `config.toml` to `.anconprotocold/config`
5. Extract `gen.zip` to `.anconprotocold/config/genesis.json`
6. Run `anconprotocold start --x-crisis-skip-assert-invariants`

### Staking information

Soon

## Roadmap to Ancon 1.0.0

### October 2021

- EVM module
- Grant M2 - NFT bridges ETH-Cosmos-Flow
- NFT Marketplaces - Use Case
- Cleaning, fixes, tech debt
- V0.2.0

### November - December 2021 

- Grant M3 - Ancon Data Pipes: Cosmos-Ethereum IPLD DAGs ETL
- V0.3.0

## Features

- EVM Cross chain bridges, use Ancon to distribute NFTs into other chains!
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


## Milestone 2 - Developer Notes
## Cross Chain NFT Ownership (DID or Ethereum account)

### ICS23/IBC Verification Cosmos
 
1. Use KVStore to query for proofs for 0.2.0 demo
2. Complete `ancon_getProofs` to use `ABCIQueryWithOptions`
3. Store proofs in IPLD and IPFS
4. Complete `ancon_verifyMembership`

### ICS23/IBC Verification EVM
 
1. Use ics23.sol to verifiy signatures
2. Add additional user and verifier whitelisting
3. Add `updateHeader` and add a recurring cronjob
4. For EVM to Cosmos consider using `HashFromByteSlices`

### ICS23/IBC Verification Flow
 
1. Migrate ICS23 Rust to Flow Cadence
2. Add additional user and verifier whitelisting
3. Add `updateHeader` and add a recurring cronjob
4. For Flow to Cosmos consider using `HashFromByteSlices`

### Verification Summary

Long term, IBC is the way to go but still early in EVM integration. Consider using IBC WASM Client or IBC Middleware. The latter is useful
to implement Milestone 3 Graphsync and Data Pipes.

### Custom EVM JSON RPC Summary

Think we got a pretty good understanding on how to use it and it will be expanded, it gives us basically a way to send EVM and Cosmos transactions to the Evmos module and let it handle it. AnconJS repo has the implementation for frontend, backend is using Custom JSON RPC.

###  Frontend tasks for 0.2.0

- Alice must send Cosmos Transaction MsgChangeMetadataOwnership through EVM
- Alice requests tx proofs either with JSON RPC or REST, if REST must return a hash cid to fetch from IPFS or Ancon IPLD.
- Alice tx proofs can further be used to request other proofs or credentials with proofs or claims (EIP1812).
- Alice sends proofs/claims to EVM A and EVM B
- EVM A verifies merkle proof and/or verifies Alice (EIP1812), if OK, proceeds to change owner or delegate to a DID ether address.
- EVM B verifies merkle proof and/or verifies Alice (EIP1812), if OK, proceeds to (change owner by default) mint or transfer from escrow DID ether address.
- Alice needs to manually complete/claim cross ownership.
- Ancon replicates/publish to IPFS change metadata ownership from `unconfirmed` to `verified` , adding two transaction hashes in multiformat (as cid).

### Summary for frontend tasks

Once again, because of timelines, this can be improved using IBC protocol.

### Flow tasks for 0.2.0

Practically need to migrate from ics23 Rust to Cadence, estimates are around 2 weeks and should be easy to integrate with the existing frontend implementation. We'll have to do a lot of upfront code due to Flow missing some pieces, eg available DIDs.

### Summary for Flow integration

We should not stay long in Flow, if code migration works, then we can document a plan for doing similar for other chains.





## Get started

### Bootstrap origin and configs

`./init.sh`

>Note: Configure your local testnet mnemonic

### After initializing

`ancon-protocold start --rpc.unsafe=true  --json-rpc.api eth,txpool,personal,net,debug,web3,miner --home ~/.ancon-protocold --keyring-backend test
`


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

### Copyright Industrias de Firmas Electronicas SA,  2021
