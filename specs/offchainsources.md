
# 
# Ancon Protocol - Data Pipes


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
   <td>2021-08-11
   </td>
  </tr>
</table>



##   Simple Summary

Enables an IPLD protocol level Metadata and Files smart contract for use with data economy use cases.

##  Abstract

By having Metadata domain model be defined as a smart contract, we can accomplish more advanced scenarios when creating "data tokens", non fungible tokens NFT and securing offchain data computing.

IPLD schemas forms the base interface in XDV Protocol that makes in an agnostic way, worked with diverse linked data sets and at the same time, keep track or verified links.



## Specification

**Blockchain Layer 1** in Cosmos stores IPLD datasets in Cosmos IAVL Storage as a Merkle Tree.

**Cosmos Starport technology** has REST API interface, which allows Ancon protocol to implement an IPFS like gateway.

**CosmJS and XDV Wallet SDK Clients** in JavaScript have also a complete set of tooling which includes document signing, verfied credentials, NFT creation and offchain data sources queries. 

**AnconJS** in Javascript will contains the primary implementation for Ancon Protocol.




### API

## `POST /ancon.v1.metadata.add`
## `ancon.metadata.add(value, [options])`

> Adds an universal metadata.


### Parameters

> Metadata

| Name | Type | Description |
| ---- | ---- | ----------- |
| `name` | `string` | Identifies the asset to which this metadata represents |
| `description` | `string` | Describes the asset to which this token represents |
| `image` | `string` | A URI pointing to a resource with mime type image/* representing the asset to which this token represents |
| `sources` | `array of string` | Current intellectual property |
| `owner` | `string` | The owner is a DID identifier |
| `parent` | `string` | Transaction block |
| `verifiedCredentialRef` | `string` | Is the verified credential for the metadata |
| `links` | `array of string` | References |



### Returns

| Type | Description |
| -------- | -------- |
| `Promise<Response>` | An object that contains the CID |

example of the returned object:

```JavaScript
{
  hash: "QmHash.."
}
```


## Metadata JSON Schema

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://ancon.dao.pa/v1/protocol/metadata",
  "title": "metadata",
  "description": "Ancon Protocol metadata schema",
  "type": "object",
  "properties": {
      "name": {
          "type": "string",
          "description": "Identifies the asset to which this token represents",
      },
      "description": {
          "type": "string",
          "description": "Describes the asset to which this token represents",
      },
      "image": {
          "type": "string",
          "description": "A URI pointing to a resource with mime type image/* representing the asset to which this token represents.",
      },
      "sources": {
          "type": "array",
          "description": "Current intellectual property",
      },
      "owner": {
          "type": "string",
          "description": "The owner is a DID identifier",
      },
      "parent": {
          "type": "string",
          "description": "Direct ascendant of the current intellectual property",
      },
      "verifiedCredentialRef": {
          "type": "string",
          "description": "Is the verified credential for the metadata",
      },
      "links": {
          "type": "array",
          "description": "Sample of references included in the current intellectual property",
      }
  },
  "required": [ "name", "description", "image", "sources" ]
}
```

### Example

A new NFT token can use `Ancon Protocol` to store IPLD CID in Metadata to keep it verifiable.

**Upload content** and stores CID for each content, content needs to be CID or multihash to be verifiable.

**Link** your content to metadata accordingly and store it in `Ancon`  using **AnconJS**

```JavaScript

const payload = {
  "name": "XDV metadata sample",
  "description": "testing sample",
  "image": "https://explore.ipld.io/#/explore/QmSnuWmxptJZdLJpKRarxBMS2Ju2oANVrgbr2xWbie9b2D",
  "services": ["https://explore.ipld.io/#/explore/",
  "https://explore.ipld.io/#/explore/",
  "https://explore.ipld.io/#/explore/"],
  "links": [
    "QmSnuWmxptJZdLJpKRarxBMS2Ju2oANVrgbr2xWbie9b2D",
    "z8mWaJHXieAVxxLagBpdaNWFEBKVWmMiE",
    "QmdmQXB2mzChmMeKY47C43LxUdg1NDJ5MWcKMKxDu7RgQm",
  ],
};


const res = await ancon.metadata.add(payload)
console.log(`https://gateway.dao.pa/ancon/${res.cid}`)
```

**Mint or anchor** your Ancon metadata after its vetted by chain consensus protocol. The metadata is just a link to a gateway and always public.


## `POST /ancon.v1.file.add`
## `ancon.file.add(value, [options])`

> Adds a file.


### Parameters

> File

| Name | Type | Description |
| ---- | ---- | ----------- |
| `path` | `string` | Describes the path |
| `time` | `timestamp` | Unix timestamp |
| `mode` | `string` | reserved |
| `content` | `string` | Base64 content |
| `contentType` | `string` | MIME type |

### Returns

| Type | Description |
| -------- | -------- |
| `Promise<Response>` | An object that contains the CID |

example of the returned object:

```JavaScript
{
  hash: "QmHash.."
}
```


### Example

A new NFT token can use `Ancon Protocol` to store IPLD CID in Metadata to keep it verifiable.

**Upload content to File API** and stores CID for each content, content needs to be CID or multihash to be verifiable.

**Link** your content to metadata accordingly and store it in `Ancon`  using **AnconJS**

```JavaScript

const payload = {
  "name": "XDV metadata sample",
  "description": "testing sample",
  "image": "https://explore.ipld.io/#/explore/QmSnuWmxptJZdLJpKRarxBMS2Ju2oANVrgbr2xWbie9b2D",
  "services": ["https://explore.ipld.io/#/explore/",
  "https://explore.ipld.io/#/explore/",
  "https://explore.ipld.io/#/explore/"],
  "links": [
    "QmSnuWmxptJZdLJpKRarxBMS2Ju2oANVrgbr2xWbie9b2D",
    "z8mWaJHXieAVxxLagBpdaNWFEBKVWmMiE",
    "QmdmQXB2mzChmMeKY47C43LxUdg1NDJ5MWcKMKxDu7RgQm",
  ],
};


const res = await ancon.metadata.add(payload)
console.log(`https://gateway.dao.pa/ancon/${res.cid}`)
```

**Mint or anchor** your Ancon metadata after its vetted by chain consensus protocol. The metadata is just a link to a gateway and always public.

## `GET /ancon.v1.file.get`
## `ancon.file.get(hash, [options])`

> Gets a file.


### Parameters

> File

| Name | Type | Description |
| ---- | ---- | ----------- |
| `path` | `string` | Describes the path |
| `cid` | `multihash` | IPLD multihash |


### Returns

| Type | Description |
| -------- | -------- |
| `Promise<Response>` | An object that contains the data |

example of the returned object:

```JavaScript
{
  data: "Mksadsoks=="
}
```

## `GET /ancon.v1.metadata.get`
## `ancon.metadata.get(hash, [options])`

> Gets a metadata.


### Parameters

> File

| Name | Type | Description |
| ---- | ---- | ----------- |
| `path` | `string` | Describes the path |
| `cid` | `multihash` | IPLD multihash |


### Returns

| Type | Description |
| -------- | -------- |
| `Promise<Response>` | An object that contains the data |

example of the returned object:

```JavaScript
{
  data: "Mksadsoks=="
}
```

