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

# validate dependencies are installed
command -v jq > /dev/null 2>&1 || { echo >&2 "jq not installed. More info: https://stedolan.github.io/jq/download/"; exit 1; }

# remove existing daemon and client
rm -rf ~/.ancon-protocold*

~/go/bin/ancon-protocold config keyring-backend $KEYRING
~/go/bin/ancon-protocold config chain-id $CHAINID

# if $KEY exists it should be deleted
~/go/bin/ancon-protocold keys unsafe-import-eth-key test 0xd1d1ef2656ea6926e28aa46da7fc98ace42810d7314f5b8

# Set moniker and chain-id for Ethermint (Moniker can be anything, chain-id must be an integer)
~/go/bin/ancon-protocold init $MONIKER --chain-id $CHAINID 

# Change parameter token denominations to aphoton
cat $HOME/.ancon-protocold/config/genesis.json | jq '.app_state["staking"]["params"]["bond_denom"]="aphoton"' > $HOME/.ancon-protocold/config/tmp_genesis.json && mv $HOME/.ancon-protocold/config/tmp_genesis.json $HOME/.ancon-protocold/config/genesis.json
cat $HOME/.ancon-protocold/config/genesis.json | jq '.app_state["crisis"]["constant_fee"]["denom"]="aphoton"' > $HOME/.ancon-protocold/config/tmp_genesis.json && mv $HOME/.ancon-protocold/config/tmp_genesis.json $HOME/.ancon-protocold/config/genesis.json
cat $HOME/.ancon-protocold/config/genesis.json | jq '.app_state["gov"]["deposit_params"]["min_deposit"][0]["denom"]="aphoton"' > $HOME/.ancon-protocold/config/tmp_genesis.json && mv $HOME/.ancon-protocold/config/tmp_genesis.json $HOME/.ancon-protocold/config/genesis.json
cat $HOME/.ancon-protocold/config/genesis.json | jq '.app_state["mint"]["params"]["mint_denom"]="aphoton"' > $HOME/.ancon-protocold/config/tmp_genesis.json && mv $HOME/.ancon-protocold/config/tmp_genesis.json $HOME/.ancon-protocold/config/genesis.json

# increase block time (?)
cat $HOME/.ancon-protocold/config/genesis.json | jq '.consensus_params["block"]["time_iota_ms"]="1000"' > $HOME/.ancon-protocold/config/tmp_genesis.json && mv $HOME/.ancon-protocold/config/tmp_genesis.json $HOME/.ancon-protocold/config/genesis.json

# Set gas limit in genesis
cat $HOME/.ancon-protocold/config/genesis.json | jq '.consensus_params["block"]["max_gas"]="10000000"' > $HOME/.ancon-protocold/config/tmp_genesis.json && mv $HOME/.ancon-protocold/config/tmp_genesis.json $HOME/.ancon-protocold/config/genesis.json

# disable produce empty block
if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' 's/create_empty_blocks = true/create_empty_blocks = false/g' $HOME/.ancon-protocold/config/config.toml
  else
    sed -i 's/create_empty_blocks = true/create_empty_blocks = false/g' $HOME/.ancon-protocold/config/config.toml
fi

if [[ $1 == "pending" ]]; then
  if [[ "$OSTYPE" == "darwin"* ]]; then
      sed -i '' 's/create_empty_blocks_interval = "0s"/create_empty_blocks_interval = "30s"/g' $HOME/.ancon-protocold/config/config.toml
      sed -i '' 's/timeout_propose = "3s"/timeout_propose = "30s"/g' $HOME/.ancon-protocold/config/config.toml
      sed -i '' 's/timeout_propose_delta = "500ms"/timeout_propose_delta = "5s"/g' $HOME/.ancon-protocold/config/config.toml
      sed -i '' 's/timeout_prevote = "1s"/timeout_prevote = "10s"/g' $HOME/.ancon-protocold/config/config.toml
      sed -i '' 's/timeout_prevote_delta = "500ms"/timeout_prevote_delta = "5s"/g' $HOME/.ancon-protocold/config/config.toml
      sed -i '' 's/timeout_precommit = "1s"/timeout_precommit = "10s"/g' $HOME/.ancon-protocold/config/config.toml
      sed -i '' 's/timeout_precommit_delta = "500ms"/timeout_precommit_delta = "5s"/g' $HOME/.ancon-protocold/config/config.toml
      sed -i '' 's/timeout_commit = "5s"/timeout_commit = "150s"/g' $HOME/.ancon-protocold/config/config.toml
      sed -i '' 's/timeout_broadcast_tx_commit = "10s"/timeout_broadcast_tx_commit = "150s"/g' $HOME/.ancon-protocold/config/config.toml
  else
      sed -i 's/create_empty_blocks_interval = "0s"/create_empty_blocks_interval = "30s"/g' $HOME/.ancon-protocold/config/config.toml
      sed -i 's/timeout_propose = "3s"/timeout_propose = "30s"/g' $HOME/.ancon-protocold/config/config.toml
      sed -i 's/timeout_propose_delta = "500ms"/timeout_propose_delta = "5s"/g' $HOME/.ancon-protocold/config/config.toml
      sed -i 's/timeout_prevote = "1s"/timeout_prevote = "10s"/g' $HOME/.ancon-protocold/config/config.toml
      sed -i 's/timeout_prevote_delta = "500ms"/timeout_prevote_delta = "5s"/g' $HOME/.ancon-protocold/config/config.toml
      sed -i 's/timeout_precommit = "1s"/timeout_precommit = "10s"/g' $HOME/.ancon-protocold/config/config.toml
      sed -i 's/timeout_precommit_delta = "500ms"/timeout_precommit_delta = "5s"/g' $HOME/.ancon-protocold/config/config.toml
      sed -i 's/timeout_commit = "5s"/timeout_commit = "150s"/g' $HOME/.ancon-protocold/config/config.toml
      sed -i 's/timeout_broadcast_tx_commit = "10s"/timeout_broadcast_tx_commit = "150s"/g' $HOME/.ancon-protocold/config/config.toml
  fi
fi

# Allocate genesis accounts (cosmos formatted addresses)
~/go/bin/ancon-protocold add-genesis-account $KEY 100000000000000000000000000aphoton --keyring-backend $KEYRING

# Sign genesis transaction
~/go/bin/ancon-protocold gentx $KEY 1000000000000000000000aphoton --keyring-backend $KEYRING --chain-id $CHAINID

# Collect genesis tx
~/go/bin/ancon-protocold collect-gentxs

# Run this to ensure everything worked and that the genesis file is setup correctly
~/go/bin/ancon-protocold validate-genesis

if [[ $1 == "pending" ]]; then
  echo "pending mode is on, please wait for the first block committed."
fi

# Start the node (remove the --pruning=nothing flag if historical queries are not needed)
~/go/bin/ancon-protocold start --pruning=nothing $TRACE --log_level $LOGLEVEL --minimum-gas-prices=0.0001aphoton --json-rpc.api eth,txpool,personal,net,debug,web3,miner --grpc-web.enable true --grpc.enable true