#!/bin/bash

KEY="testnet"
CHAINID="evmos_9000-1"
MONIKER="tensta"
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

if [[ $1 == "pending" ]]; then
  echo "pending mode is on, please wait for the first block committed."
fi

cp app.toml $HOME/.ancon-protocold/config/app.toml

cp config.toml $HOME/.ancon-protocold/config/config.toml
cp genesis.json $HOME/.ancon-protocold/config/genesis.json


#~/go/bin/ancon-protocold keys show alice | echo
#~/go/bin/ancon-protocold keys show bob | echo
ancon-protocold tx staking create-validator   --amount=1000000000000aphoton   --pubkey=$(ancon-protocold tendermint show-validator)   --moniker="tensta"   --chain-id=evmos_9000-1   --commission-rate="0.10"   --commission-max-rate="0.20"   --commission-max-change-rate="0.01"   --min-self-delegation="1000000"   --gas="auto"   --gas-prices="0.025aphoton"   --from  $KEY       --home ~/.ancon-protocold/ --keyring-backend $KEYRING


# Start the node (remove the --pruning=nothing flag if historical queries are not needed)
~/go/bin/ancon-protocold start --node tcp://0.0.0.0:26657 --pruning=nothing $TRACE --log_level $LOGLEVEL --rpc.unsafe=true  --json-rpc.api  eth,txpool,personal,net,debug,web3,miner --home ~/.ancon-protocold --keyring-backend $KEYRING --chain-id evmos_9000-1

#~/go/bin/ancon-protocold tx bank send ethm1jrclh4kgf3467e9aueudn9fflaz04mftahgun3 ancon1x23pcxakulpq74r7jv948kk90apv6f0kpzgp83 10000aphoton
#~/go/bin/ancon-protocold tx bank send ethm1jrclh4kgf3467e9aueudn9fflaz04mftahgun3 ethm1yf7eqee4l9hen2g3q799j92k638e98lfq84635 10000aphoton