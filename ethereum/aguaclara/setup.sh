#!/bin/bash

rm -rf config/ && rm -rf keys/
uly config init --home .
uly chains add-dir chains --home .
uly ethermint keys restore anconprotocol_9000-1 mykey "$KEY" --home .
uly ethermint light init anconprotocol_9000-1 -f --home .
uly paths add anconprotocol_9000-1 aguaclara-evm-1 aguaclara-relayer -f path.json  --home .
uly service start aguaclara-relayer -d --home .