#!/bin/bash

uly config init --home .
uly chains add-dir chains --home .
uly paths add aguaclara-cosmos-0 aguaclara-evm-1 aguaclara-relayer -f path.json  --home .
uly tendermint keys restore aguaclara-cosmos-0 mykey "$KEY" --home .
uly service start aguaclara-relayer --home .