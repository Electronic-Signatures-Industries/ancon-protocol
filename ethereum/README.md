## Aguaclara - Ancon Protocol
### Cosmos - Near NFT Bridge


### Steps 

## Registry chain - Ancon Protocol

1. Once ChangeOwnership is commited, query for tx proof
2. VC issuing (bytes data) tx proof + base props. Once is commited, query for tx proof

## VC Model

bytes data {
    // Onchain metadata
    string memory metadata,
    
    // From NFT contract address    
    address sourceNft,
    uint sourceChainId,
    address fromOwner,

    // To NFT contract address    
    address destinationNft,
    uint destinationChainId,
    address toOwner,

    // Source TokenID
    uint256 sourceTokenid,

    // ???
    bool isNew
}

## Chain request

- NFT Token must exist in both chains
- Verifier contracts with root hash installed
- AnconMetadataOwnable
- onReceiver in NFT token

## Source EVM Chain - Verifier

1. Root Hash (Deployment)
2. VerifyMembershipProof (changeOwnerWithProof, part 1)

## Source EVM Chain - DID VC Verifier

1. changeOwnerWithProof, part 2.  

## Source Execution onReceiver example

Chain id Rinkeby, XDVNFT, 0x1

setOwner to lock address (aka did ethr delegate)

## Destination EVM Chain - Verifier

1. Root Hash (Deployment)
2. VerifyMembershipProof (changeOwnerWithProof, part 1)

## Destination EVM Chain - DID VC Verifier

1. changeOwnerWithProof, part 2.  TODO

## Source Execution onReceiver example

Chain id BSC Test, XDVNFT, 0x2

if same token id && same owner setOwner else
mint()


## Optional duplicate ownership 

XDVNFT BSC & Rinkeby ---> same onchain metadata (must have current owners)