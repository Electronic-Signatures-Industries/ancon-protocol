
# 
# Ancon Protocol - Cross Minting Metadata - WIP


<table>
  <tr>
   <td><strong>Author</strong>
   </td>
   <td>Rogelio Morrell Caballero
   </td>
  </tr>
  <tr>
   <td><strong>Category</strong>
   </td>
   <td>VC, DID, PKI, Cryptography, NFT
   </td>
  </tr>
  <tr>
   <td><strong>Created</strong>
   </td>
   <td>2021-08-30
   </td>
  </tr>
</table>



##   Simple Summary

Allos for cross minting tokens with an universal metadata uri being shared.

##  Abstract

Most of the metadata uri for NFT are either stored in decentralized or centralized storage. Ancon makes this 
IPLD multihash focused, where every CID content is kept in a metadata stored in a blockchain. 

This verifiable and consensus based metadata approach is another layer of privacy and security, and gives other features as cross minting in any blockchain NFTs while keeping metadata shared across tokens.


## Specification

**Blockchain Layer 1** in Cosmos stores IPLD datasets in Cosmos IAVL Storage as a Merkle Tree.

**Cosmos Starport technology** has REST API interface, which allows Ancon protocol to implement an IPFS like gateway.

**CosmJS and XDV Wallet SDK Clients** in JavaScript have also a complete set of tooling which includes document signing, verfied credentials, NFT creation and offchain data sources queries. 

**AnconJS** in Javascript will contains the primary implementation for Ancon Protocol.

**Blockchain NFT Orchestration** contains Flow and Ethereum SDK Go Clients to do atomic swap between networks from a Cosmos devops or keeper job.

**Ethereum and Flow smart contracts** implementing Atomic Swap implementing Hashed Timelock Contract (HTLC) in both chain Ethereum and Flow, and Cosmos SDK as the bridge chain.


### API

**NFT with Immutable Metadata Resources**
![NFTs](https://user-images.githubusercontent.com/1248071/132988470-c610b4c0-c9f9-47a3-bb30-2ec4c6b7b6d5.png)

#### Messages

- **MsgMintTrustedContent**: Mints NFT with Ancon CID as MetadataURI
- **MsgMintTrustedResource**: Mints NFT with Ancon CID as MetadataURI and access control list ACL defined by DID ownership

#### Query

TODO

**Universal Royalty Info**

![Royalty](https://user-images.githubusercontent.com/1248071/132988471-f7b4f68f-7b7c-4901-adf3-4fdc599119a1.png)


#### Messages

- **MsgRoyaltyInfo**: Sets or updates royalty

#### Query

- **QueryReadRoyaltyInfo**

**Cross swap metadata**

![Swap](https://user-images.githubusercontent.com/1248071/132988472-803fe8c0-14ed-4696-85cb-014ab8dbc4b2.png)

#### Messages

- **MsgInitiateSwap**
- **MsgClaimSwap**

#### Query

TODO
