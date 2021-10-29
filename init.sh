#!/bin/bash

KEY="mykey"
CHAINID="anconprotocol_9000-1"
MONIKER="localtestnet"
KEYRING="test"
KEYALGO="eth_secp256k1"
LOGLEVEL="info"
# to trace evm
TRACE="--trace"
# TRACE=""
MNEMONIC="soda comic bachelor scheme absent embrace case toddler medal scrub obtain glad"
MNEMONICA="lend lock kit kiss walnut flower expect text upset nut arrive hub waste stairs climb neither must crowd harvest network wife lizard shiver obtain"
MNEMONICB="concert negative cry purse shed chest daughter knock success august axis capable tomato apple seven define gain allow carbon science confirm portion mountain combine"
# validate dependencies are installed
command -v jq > /dev/null 2>&1 || { echo >&2 "jq not installed. More info: https://stedolan.github.io/jq/download/"; exit 1; }

# remove existing daemon and client
rm -rf ~/.ancon-protocold*

~/go/bin/ancon-protocold config keyring-backend $KEYRING  --home ~/.ancon-protocold
~/go/bin/ancon-protocold config chain-id $CHAINID  --home ~/.ancon-protocold

# if $KEY exists it should be deleted
(echo $MNEMONICA) | ~/go/bin/ancon-protocold keys add $KEY --keyring-backend $KEYRING --algo $KEYALGO --recover  --home ~/.ancon-protocold

#(echo $MNEMONICA)| ~/go/bin/ancon-protocold keys add alice --keyring-backend $KEYRING --algo $KEYALGO --recover
#(echo $MNEMONICB)| ~/go/bin/ancon-protocold keys add bob --keyring-backend $KEYRING --algo $KEYALGO --recover

# Set moniker and chain-id for Ethermint (Moniker can be anything, chain-id must be an integer)
~/go/bin/ancon-protocold init $MONIKER --chain-id $CHAINID  --home ~/.ancon-protocold

# Change parameter token denominations to aancon
cat $HOME/.ancon-protocold/config/genesis.json | jq '.app_state["staking"]["params"]["bond_denom"]="aancon"' > $HOME/.ancon-protocold/config/tmp_genesis.json && mv $HOME/.ancon-protocold/config/tmp_genesis.json $HOME/.ancon-protocold/config/genesis.json
cat $HOME/.ancon-protocold/config/genesis.json | jq '.app_state["crisis"]["constant_fee"]["denom"]="aancon"' > $HOME/.ancon-protocold/config/tmp_genesis.json && mv $HOME/.ancon-protocold/config/tmp_genesis.json $HOME/.ancon-protocold/config/genesis.json
cat $HOME/.ancon-protocold/config/genesis.json | jq '.app_state["gov"]["deposit_params"]["min_deposit"][0]["denom"]="aancon"' > $HOME/.ancon-protocold/config/tmp_genesis.json && mv $HOME/.ancon-protocold/config/tmp_genesis.json $HOME/.ancon-protocold/config/genesis.json
cat $HOME/.ancon-protocold/config/genesis.json | jq '.app_state["mint"]["params"]["mint_denom"]="aancon"' > $HOME/.ancon-protocold/config/tmp_genesis.json && mv $HOME/.ancon-protocold/config/tmp_genesis.json $HOME/.ancon-protocold/config/genesis.json

# increase block time (?)
cat $HOME/.ancon-protocold/config/genesis.json | jq '.consensus_params["block"]["time_iota_ms"]="1000"' > $HOME/.ancon-protocold/config/tmp_genesis.json && mv $HOME/.ancon-protocold/config/tmp_genesis.json $HOME/.ancon-protocold/config/genesis.json

# Set gas limit in genesis
cat $HOME/.ancon-protocold/config/genesis.json | jq '.consensus_params["block"]["max_gas"]="10000000"' > $HOME/.ancon-protocold/config/tmp_genesis.json && mv $HOME/.ancon-protocold/config/tmp_genesis.json $HOME/.ancon-protocold/config/genesis.json


# Allocate genesis accounts (cosmos formatted addresses)
~/go/bin/ancon-protocold add-genesis-account ethm1x23pcxakulpq74r7jv948kk90apv6f0k7s943z 100000000000000000000000000aancon --keyring-backend $KEYRING  --home ~/.ancon-protocold
~/go/bin/ancon-protocold add-genesis-account ethm1x73r96c85nage2y05cpqlzth8ak2qg9p0vqc4d 100000000000000000000000000aancon --keyring-backend $KEYRING  --home ~/.ancon-protocold

# Sign genesis transaction
~/go/bin/ancon-protocold gentx $KEY 1000000000000000000000aancon  --keyring-backend $KEYRING --chain-id $CHAINID  --home ~/.ancon-protocold

# Collect genesis tx
~/go/bin/ancon-protocold collect-gentxs  --home ~/.ancon-protocold

# Run this to ensure everything worked and that the genesis file is setup correctly
~/go/bin/ancon-protocold validate-genesis  --home ~/.ancon-protocold

if [[ $1 == "pending" ]]; then
  echo "pending mode is on, please wait for the first block committed."
fi

cp app.toml $HOME/.ancon-protocold/config/app.toml

cp config.toml $HOME/.ancon-protocold/config/config.toml


#~/go/bin/ancon-protocold keys show alice | echo
#~/go/bin/ancon-protocold keys show bob | echo


# Start the node (remove the --pruning=nothing flag if historical queries are not needed)
~/go/bin/ancon-protocold start --node tcp://0.0.0.0:26657 --pruning=nothing $TRACE --log_level $LOGLEVEL --rpc.unsafe=true  --json-rpc.api  eth,txpool,personal,net,debug,web3,miner --home ~/.ancon-protocold --keyring-backend $KEYRING

#~/go/bin/ancon-protocold tx bank send ethm1jrclh4kgf3467e9aueudn9fflaz04mftahgun3 ethm1x23pcxakulpq74r7jv948kk90apv6f0k7s943z 10000aancon
#~/go/bin/ancon-protocold tx bank send ethm1jrclh4kgf3467e9aueudn9fflaz04mftahgun3 ethm1yf7eqee4l9hen2g3q799j92k638e98lfq84635 10000aancon