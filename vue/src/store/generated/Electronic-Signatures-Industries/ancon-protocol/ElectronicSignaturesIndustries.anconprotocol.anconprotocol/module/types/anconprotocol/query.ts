/* eslint-disable */
import { Reader, util, configure, Writer } from 'protobufjs/minimal'
import * as Long from 'long'
import { PageRequest, PageResponse } from '../cosmos/base/query/v1beta1/pagination'
import { Owner, Collection, Denom, BaseNFT } from '../anconprotocol/nft'

export const protobufPackage = 'ElectronicSignaturesIndustries.anconprotocol.anconprotocol'

export interface QueryDidWebRequest {
  name: string
}

export interface QuerySchemaStoreRequest {
  cid: string
  path: string
}

export interface QuerySchemaStoreResponse {
  data: Uint8Array
}

export interface QueryProofMetadataRequest {
  cid: string
  path: string
}

export interface QueryProofResponse {
  root: string
  proof: string
}

export interface QueryGetDidRequest {
  hashcid: string
}

export interface QueryReadRoyaltyInfo {
  cid: string
  /** fee % * sales amount */
  price: string
}

export interface QueryReadRoyaltyInfoResponse {
  receiver: string
  /** fee % * sales amount */
  royaltyAmount: number
}

/** QueryOwnerRequest is the request type for the Query/Owner RPC method */
export interface QueryOwnerRequest {
  denomId: string
  owner: string
  /** pagination defines an optional pagination for the request. */
  pagination: PageRequest | undefined
}

/** QueryOwnerResponse is the response type for the Query/Owner RPC method */
export interface QueryOwnerResponse {
  owner: Owner | undefined
  pagination: PageResponse | undefined
}

/** QueryCollectionRequest is the request type for the Query/Collection RPC method */
export interface QueryCollectionRequest {
  denomId: string
  /** pagination defines an optional pagination for the request. */
  pagination: PageRequest | undefined
}

/** QueryCollectionResponse is the response type for the Query/Collection RPC method */
export interface QueryCollectionResponse {
  collection: Collection | undefined
  pagination: PageResponse | undefined
}

/** QueryDenomRequest is the request type for the Query/Denom RPC method */
export interface QueryDenomRequest {
  denomId: string
}

/** QueryDenomResponse is the response type for the Query/Denom RPC method */
export interface QueryDenomResponse {
  denom: Denom | undefined
}

/** QueryDenomsRequest is the request type for the Query/Denoms RPC method */
export interface QueryDenomsRequest {
  /** pagination defines an optional pagination for the request. */
  pagination: PageRequest | undefined
}

/** QueryDenomsResponse is the response type for the Query/Denoms RPC method */
export interface QueryDenomsResponse {
  denoms: Denom[]
  pagination: PageResponse | undefined
}

/** QueryNFTRequest is the request type for the Query/NFT RPC method */
export interface QueryNFTRequest {
  denomId: string
  tokenId: string
}

/** QueryNFTResponse is the response type for the Query/NFT RPC method */
export interface QueryNFTResponse {
  nft: BaseNFT | undefined
}

export interface QueryGetDelegateRequest {
  id: string
}

export interface QueryGetDelegateResponse {
  delegate: string
  delegateType: string
  validity: number
  creator: string
}

export interface QueryNonceRequest {
  id: string
}

export interface QueryNonceResponse {}

export interface QueryGetAttributesResponse {
  name: string[]
  value: string[]
}

export interface QueryIdentifyOwnerResponse {}

export interface QueryGetAttributesRequest {
  address: string
}

export interface QueryIdentifyOwnerRequest {
  address: string
}

export interface QueryOwnersResponse {}

export interface QueryResourceRequest {
  cid: string
  path: string
}

export interface QueryResourceResponse {
  data: string
}

export interface PostSchemaRequest {
  did: string
  path: string
  data: Uint8Array
  codec: string
  isJsonSchema: boolean
}

export interface PostSchemaResponse {
  cid: string
}

const baseQueryDidWebRequest: object = { name: '' }

export const QueryDidWebRequest = {
  encode(message: QueryDidWebRequest, writer: Writer = Writer.create()): Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryDidWebRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryDidWebRequest } as QueryDidWebRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryDidWebRequest {
    const message = { ...baseQueryDidWebRequest } as QueryDidWebRequest
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name)
    } else {
      message.name = ''
    }
    return message
  },

  toJSON(message: QueryDidWebRequest): unknown {
    const obj: any = {}
    message.name !== undefined && (obj.name = message.name)
    return obj
  },

  fromPartial(object: DeepPartial<QueryDidWebRequest>): QueryDidWebRequest {
    const message = { ...baseQueryDidWebRequest } as QueryDidWebRequest
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name
    } else {
      message.name = ''
    }
    return message
  }
}

const baseQuerySchemaStoreRequest: object = { cid: '', path: '' }

export const QuerySchemaStoreRequest = {
  encode(message: QuerySchemaStoreRequest, writer: Writer = Writer.create()): Writer {
    if (message.cid !== '') {
      writer.uint32(10).string(message.cid)
    }
    if (message.path !== '') {
      writer.uint32(18).string(message.path)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QuerySchemaStoreRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQuerySchemaStoreRequest } as QuerySchemaStoreRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.cid = reader.string()
          break
        case 2:
          message.path = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QuerySchemaStoreRequest {
    const message = { ...baseQuerySchemaStoreRequest } as QuerySchemaStoreRequest
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = String(object.cid)
    } else {
      message.cid = ''
    }
    if (object.path !== undefined && object.path !== null) {
      message.path = String(object.path)
    } else {
      message.path = ''
    }
    return message
  },

  toJSON(message: QuerySchemaStoreRequest): unknown {
    const obj: any = {}
    message.cid !== undefined && (obj.cid = message.cid)
    message.path !== undefined && (obj.path = message.path)
    return obj
  },

  fromPartial(object: DeepPartial<QuerySchemaStoreRequest>): QuerySchemaStoreRequest {
    const message = { ...baseQuerySchemaStoreRequest } as QuerySchemaStoreRequest
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = object.cid
    } else {
      message.cid = ''
    }
    if (object.path !== undefined && object.path !== null) {
      message.path = object.path
    } else {
      message.path = ''
    }
    return message
  }
}

const baseQuerySchemaStoreResponse: object = {}

export const QuerySchemaStoreResponse = {
  encode(message: QuerySchemaStoreResponse, writer: Writer = Writer.create()): Writer {
    if (message.data.length !== 0) {
      writer.uint32(10).bytes(message.data)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QuerySchemaStoreResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQuerySchemaStoreResponse } as QuerySchemaStoreResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.data = reader.bytes()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QuerySchemaStoreResponse {
    const message = { ...baseQuerySchemaStoreResponse } as QuerySchemaStoreResponse
    if (object.data !== undefined && object.data !== null) {
      message.data = bytesFromBase64(object.data)
    }
    return message
  },

  toJSON(message: QuerySchemaStoreResponse): unknown {
    const obj: any = {}
    message.data !== undefined && (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()))
    return obj
  },

  fromPartial(object: DeepPartial<QuerySchemaStoreResponse>): QuerySchemaStoreResponse {
    const message = { ...baseQuerySchemaStoreResponse } as QuerySchemaStoreResponse
    if (object.data !== undefined && object.data !== null) {
      message.data = object.data
    } else {
      message.data = new Uint8Array()
    }
    return message
  }
}

const baseQueryProofMetadataRequest: object = { cid: '', path: '' }

export const QueryProofMetadataRequest = {
  encode(message: QueryProofMetadataRequest, writer: Writer = Writer.create()): Writer {
    if (message.cid !== '') {
      writer.uint32(10).string(message.cid)
    }
    if (message.path !== '') {
      writer.uint32(18).string(message.path)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryProofMetadataRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryProofMetadataRequest } as QueryProofMetadataRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.cid = reader.string()
          break
        case 2:
          message.path = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryProofMetadataRequest {
    const message = { ...baseQueryProofMetadataRequest } as QueryProofMetadataRequest
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = String(object.cid)
    } else {
      message.cid = ''
    }
    if (object.path !== undefined && object.path !== null) {
      message.path = String(object.path)
    } else {
      message.path = ''
    }
    return message
  },

  toJSON(message: QueryProofMetadataRequest): unknown {
    const obj: any = {}
    message.cid !== undefined && (obj.cid = message.cid)
    message.path !== undefined && (obj.path = message.path)
    return obj
  },

  fromPartial(object: DeepPartial<QueryProofMetadataRequest>): QueryProofMetadataRequest {
    const message = { ...baseQueryProofMetadataRequest } as QueryProofMetadataRequest
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = object.cid
    } else {
      message.cid = ''
    }
    if (object.path !== undefined && object.path !== null) {
      message.path = object.path
    } else {
      message.path = ''
    }
    return message
  }
}

const baseQueryProofResponse: object = { root: '', proof: '' }

export const QueryProofResponse = {
  encode(message: QueryProofResponse, writer: Writer = Writer.create()): Writer {
    if (message.root !== '') {
      writer.uint32(10).string(message.root)
    }
    if (message.proof !== '') {
      writer.uint32(18).string(message.proof)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryProofResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryProofResponse } as QueryProofResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.root = reader.string()
          break
        case 2:
          message.proof = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryProofResponse {
    const message = { ...baseQueryProofResponse } as QueryProofResponse
    if (object.root !== undefined && object.root !== null) {
      message.root = String(object.root)
    } else {
      message.root = ''
    }
    if (object.proof !== undefined && object.proof !== null) {
      message.proof = String(object.proof)
    } else {
      message.proof = ''
    }
    return message
  },

  toJSON(message: QueryProofResponse): unknown {
    const obj: any = {}
    message.root !== undefined && (obj.root = message.root)
    message.proof !== undefined && (obj.proof = message.proof)
    return obj
  },

  fromPartial(object: DeepPartial<QueryProofResponse>): QueryProofResponse {
    const message = { ...baseQueryProofResponse } as QueryProofResponse
    if (object.root !== undefined && object.root !== null) {
      message.root = object.root
    } else {
      message.root = ''
    }
    if (object.proof !== undefined && object.proof !== null) {
      message.proof = object.proof
    } else {
      message.proof = ''
    }
    return message
  }
}

const baseQueryGetDidRequest: object = { hashcid: '' }

export const QueryGetDidRequest = {
  encode(message: QueryGetDidRequest, writer: Writer = Writer.create()): Writer {
    if (message.hashcid !== '') {
      writer.uint32(10).string(message.hashcid)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetDidRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryGetDidRequest } as QueryGetDidRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.hashcid = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryGetDidRequest {
    const message = { ...baseQueryGetDidRequest } as QueryGetDidRequest
    if (object.hashcid !== undefined && object.hashcid !== null) {
      message.hashcid = String(object.hashcid)
    } else {
      message.hashcid = ''
    }
    return message
  },

  toJSON(message: QueryGetDidRequest): unknown {
    const obj: any = {}
    message.hashcid !== undefined && (obj.hashcid = message.hashcid)
    return obj
  },

  fromPartial(object: DeepPartial<QueryGetDidRequest>): QueryGetDidRequest {
    const message = { ...baseQueryGetDidRequest } as QueryGetDidRequest
    if (object.hashcid !== undefined && object.hashcid !== null) {
      message.hashcid = object.hashcid
    } else {
      message.hashcid = ''
    }
    return message
  }
}

const baseQueryReadRoyaltyInfo: object = { cid: '', price: '' }

export const QueryReadRoyaltyInfo = {
  encode(message: QueryReadRoyaltyInfo, writer: Writer = Writer.create()): Writer {
    if (message.cid !== '') {
      writer.uint32(10).string(message.cid)
    }
    if (message.price !== '') {
      writer.uint32(18).string(message.price)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryReadRoyaltyInfo {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryReadRoyaltyInfo } as QueryReadRoyaltyInfo
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.cid = reader.string()
          break
        case 2:
          message.price = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryReadRoyaltyInfo {
    const message = { ...baseQueryReadRoyaltyInfo } as QueryReadRoyaltyInfo
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = String(object.cid)
    } else {
      message.cid = ''
    }
    if (object.price !== undefined && object.price !== null) {
      message.price = String(object.price)
    } else {
      message.price = ''
    }
    return message
  },

  toJSON(message: QueryReadRoyaltyInfo): unknown {
    const obj: any = {}
    message.cid !== undefined && (obj.cid = message.cid)
    message.price !== undefined && (obj.price = message.price)
    return obj
  },

  fromPartial(object: DeepPartial<QueryReadRoyaltyInfo>): QueryReadRoyaltyInfo {
    const message = { ...baseQueryReadRoyaltyInfo } as QueryReadRoyaltyInfo
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = object.cid
    } else {
      message.cid = ''
    }
    if (object.price !== undefined && object.price !== null) {
      message.price = object.price
    } else {
      message.price = ''
    }
    return message
  }
}

const baseQueryReadRoyaltyInfoResponse: object = { receiver: '', royaltyAmount: 0 }

export const QueryReadRoyaltyInfoResponse = {
  encode(message: QueryReadRoyaltyInfoResponse, writer: Writer = Writer.create()): Writer {
    if (message.receiver !== '') {
      writer.uint32(10).string(message.receiver)
    }
    if (message.royaltyAmount !== 0) {
      writer.uint32(16).uint64(message.royaltyAmount)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryReadRoyaltyInfoResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryReadRoyaltyInfoResponse } as QueryReadRoyaltyInfoResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.receiver = reader.string()
          break
        case 2:
          message.royaltyAmount = longToNumber(reader.uint64() as Long)
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryReadRoyaltyInfoResponse {
    const message = { ...baseQueryReadRoyaltyInfoResponse } as QueryReadRoyaltyInfoResponse
    if (object.receiver !== undefined && object.receiver !== null) {
      message.receiver = String(object.receiver)
    } else {
      message.receiver = ''
    }
    if (object.royaltyAmount !== undefined && object.royaltyAmount !== null) {
      message.royaltyAmount = Number(object.royaltyAmount)
    } else {
      message.royaltyAmount = 0
    }
    return message
  },

  toJSON(message: QueryReadRoyaltyInfoResponse): unknown {
    const obj: any = {}
    message.receiver !== undefined && (obj.receiver = message.receiver)
    message.royaltyAmount !== undefined && (obj.royaltyAmount = message.royaltyAmount)
    return obj
  },

  fromPartial(object: DeepPartial<QueryReadRoyaltyInfoResponse>): QueryReadRoyaltyInfoResponse {
    const message = { ...baseQueryReadRoyaltyInfoResponse } as QueryReadRoyaltyInfoResponse
    if (object.receiver !== undefined && object.receiver !== null) {
      message.receiver = object.receiver
    } else {
      message.receiver = ''
    }
    if (object.royaltyAmount !== undefined && object.royaltyAmount !== null) {
      message.royaltyAmount = object.royaltyAmount
    } else {
      message.royaltyAmount = 0
    }
    return message
  }
}

const baseQueryOwnerRequest: object = { denomId: '', owner: '' }

export const QueryOwnerRequest = {
  encode(message: QueryOwnerRequest, writer: Writer = Writer.create()): Writer {
    if (message.denomId !== '') {
      writer.uint32(10).string(message.denomId)
    }
    if (message.owner !== '') {
      writer.uint32(18).string(message.owner)
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryOwnerRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryOwnerRequest } as QueryOwnerRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.denomId = reader.string()
          break
        case 2:
          message.owner = reader.string()
          break
        case 3:
          message.pagination = PageRequest.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryOwnerRequest {
    const message = { ...baseQueryOwnerRequest } as QueryOwnerRequest
    if (object.denomId !== undefined && object.denomId !== null) {
      message.denomId = String(object.denomId)
    } else {
      message.denomId = ''
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = String(object.owner)
    } else {
      message.owner = ''
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: QueryOwnerRequest): unknown {
    const obj: any = {}
    message.denomId !== undefined && (obj.denomId = message.denomId)
    message.owner !== undefined && (obj.owner = message.owner)
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<QueryOwnerRequest>): QueryOwnerRequest {
    const message = { ...baseQueryOwnerRequest } as QueryOwnerRequest
    if (object.denomId !== undefined && object.denomId !== null) {
      message.denomId = object.denomId
    } else {
      message.denomId = ''
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner
    } else {
      message.owner = ''
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  }
}

const baseQueryOwnerResponse: object = {}

export const QueryOwnerResponse = {
  encode(message: QueryOwnerResponse, writer: Writer = Writer.create()): Writer {
    if (message.owner !== undefined) {
      Owner.encode(message.owner, writer.uint32(10).fork()).ldelim()
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryOwnerResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryOwnerResponse } as QueryOwnerResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.owner = Owner.decode(reader, reader.uint32())
          break
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryOwnerResponse {
    const message = { ...baseQueryOwnerResponse } as QueryOwnerResponse
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = Owner.fromJSON(object.owner)
    } else {
      message.owner = undefined
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: QueryOwnerResponse): unknown {
    const obj: any = {}
    message.owner !== undefined && (obj.owner = message.owner ? Owner.toJSON(message.owner) : undefined)
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<QueryOwnerResponse>): QueryOwnerResponse {
    const message = { ...baseQueryOwnerResponse } as QueryOwnerResponse
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = Owner.fromPartial(object.owner)
    } else {
      message.owner = undefined
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  }
}

const baseQueryCollectionRequest: object = { denomId: '' }

export const QueryCollectionRequest = {
  encode(message: QueryCollectionRequest, writer: Writer = Writer.create()): Writer {
    if (message.denomId !== '') {
      writer.uint32(10).string(message.denomId)
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryCollectionRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryCollectionRequest } as QueryCollectionRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.denomId = reader.string()
          break
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryCollectionRequest {
    const message = { ...baseQueryCollectionRequest } as QueryCollectionRequest
    if (object.denomId !== undefined && object.denomId !== null) {
      message.denomId = String(object.denomId)
    } else {
      message.denomId = ''
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: QueryCollectionRequest): unknown {
    const obj: any = {}
    message.denomId !== undefined && (obj.denomId = message.denomId)
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<QueryCollectionRequest>): QueryCollectionRequest {
    const message = { ...baseQueryCollectionRequest } as QueryCollectionRequest
    if (object.denomId !== undefined && object.denomId !== null) {
      message.denomId = object.denomId
    } else {
      message.denomId = ''
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  }
}

const baseQueryCollectionResponse: object = {}

export const QueryCollectionResponse = {
  encode(message: QueryCollectionResponse, writer: Writer = Writer.create()): Writer {
    if (message.collection !== undefined) {
      Collection.encode(message.collection, writer.uint32(10).fork()).ldelim()
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryCollectionResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryCollectionResponse } as QueryCollectionResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.collection = Collection.decode(reader, reader.uint32())
          break
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryCollectionResponse {
    const message = { ...baseQueryCollectionResponse } as QueryCollectionResponse
    if (object.collection !== undefined && object.collection !== null) {
      message.collection = Collection.fromJSON(object.collection)
    } else {
      message.collection = undefined
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: QueryCollectionResponse): unknown {
    const obj: any = {}
    message.collection !== undefined && (obj.collection = message.collection ? Collection.toJSON(message.collection) : undefined)
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<QueryCollectionResponse>): QueryCollectionResponse {
    const message = { ...baseQueryCollectionResponse } as QueryCollectionResponse
    if (object.collection !== undefined && object.collection !== null) {
      message.collection = Collection.fromPartial(object.collection)
    } else {
      message.collection = undefined
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  }
}

const baseQueryDenomRequest: object = { denomId: '' }

export const QueryDenomRequest = {
  encode(message: QueryDenomRequest, writer: Writer = Writer.create()): Writer {
    if (message.denomId !== '') {
      writer.uint32(10).string(message.denomId)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryDenomRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryDenomRequest } as QueryDenomRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.denomId = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryDenomRequest {
    const message = { ...baseQueryDenomRequest } as QueryDenomRequest
    if (object.denomId !== undefined && object.denomId !== null) {
      message.denomId = String(object.denomId)
    } else {
      message.denomId = ''
    }
    return message
  },

  toJSON(message: QueryDenomRequest): unknown {
    const obj: any = {}
    message.denomId !== undefined && (obj.denomId = message.denomId)
    return obj
  },

  fromPartial(object: DeepPartial<QueryDenomRequest>): QueryDenomRequest {
    const message = { ...baseQueryDenomRequest } as QueryDenomRequest
    if (object.denomId !== undefined && object.denomId !== null) {
      message.denomId = object.denomId
    } else {
      message.denomId = ''
    }
    return message
  }
}

const baseQueryDenomResponse: object = {}

export const QueryDenomResponse = {
  encode(message: QueryDenomResponse, writer: Writer = Writer.create()): Writer {
    if (message.denom !== undefined) {
      Denom.encode(message.denom, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryDenomResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryDenomResponse } as QueryDenomResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.denom = Denom.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryDenomResponse {
    const message = { ...baseQueryDenomResponse } as QueryDenomResponse
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = Denom.fromJSON(object.denom)
    } else {
      message.denom = undefined
    }
    return message
  },

  toJSON(message: QueryDenomResponse): unknown {
    const obj: any = {}
    message.denom !== undefined && (obj.denom = message.denom ? Denom.toJSON(message.denom) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<QueryDenomResponse>): QueryDenomResponse {
    const message = { ...baseQueryDenomResponse } as QueryDenomResponse
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = Denom.fromPartial(object.denom)
    } else {
      message.denom = undefined
    }
    return message
  }
}

const baseQueryDenomsRequest: object = {}

export const QueryDenomsRequest = {
  encode(message: QueryDenomsRequest, writer: Writer = Writer.create()): Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryDenomsRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryDenomsRequest } as QueryDenomsRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryDenomsRequest {
    const message = { ...baseQueryDenomsRequest } as QueryDenomsRequest
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: QueryDenomsRequest): unknown {
    const obj: any = {}
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<QueryDenomsRequest>): QueryDenomsRequest {
    const message = { ...baseQueryDenomsRequest } as QueryDenomsRequest
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  }
}

const baseQueryDenomsResponse: object = {}

export const QueryDenomsResponse = {
  encode(message: QueryDenomsResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.denoms) {
      Denom.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryDenomsResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryDenomsResponse } as QueryDenomsResponse
    message.denoms = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.denoms.push(Denom.decode(reader, reader.uint32()))
          break
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryDenomsResponse {
    const message = { ...baseQueryDenomsResponse } as QueryDenomsResponse
    message.denoms = []
    if (object.denoms !== undefined && object.denoms !== null) {
      for (const e of object.denoms) {
        message.denoms.push(Denom.fromJSON(e))
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: QueryDenomsResponse): unknown {
    const obj: any = {}
    if (message.denoms) {
      obj.denoms = message.denoms.map((e) => (e ? Denom.toJSON(e) : undefined))
    } else {
      obj.denoms = []
    }
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<QueryDenomsResponse>): QueryDenomsResponse {
    const message = { ...baseQueryDenomsResponse } as QueryDenomsResponse
    message.denoms = []
    if (object.denoms !== undefined && object.denoms !== null) {
      for (const e of object.denoms) {
        message.denoms.push(Denom.fromPartial(e))
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  }
}

const baseQueryNFTRequest: object = { denomId: '', tokenId: '' }

export const QueryNFTRequest = {
  encode(message: QueryNFTRequest, writer: Writer = Writer.create()): Writer {
    if (message.denomId !== '') {
      writer.uint32(10).string(message.denomId)
    }
    if (message.tokenId !== '') {
      writer.uint32(18).string(message.tokenId)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryNFTRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryNFTRequest } as QueryNFTRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.denomId = reader.string()
          break
        case 2:
          message.tokenId = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryNFTRequest {
    const message = { ...baseQueryNFTRequest } as QueryNFTRequest
    if (object.denomId !== undefined && object.denomId !== null) {
      message.denomId = String(object.denomId)
    } else {
      message.denomId = ''
    }
    if (object.tokenId !== undefined && object.tokenId !== null) {
      message.tokenId = String(object.tokenId)
    } else {
      message.tokenId = ''
    }
    return message
  },

  toJSON(message: QueryNFTRequest): unknown {
    const obj: any = {}
    message.denomId !== undefined && (obj.denomId = message.denomId)
    message.tokenId !== undefined && (obj.tokenId = message.tokenId)
    return obj
  },

  fromPartial(object: DeepPartial<QueryNFTRequest>): QueryNFTRequest {
    const message = { ...baseQueryNFTRequest } as QueryNFTRequest
    if (object.denomId !== undefined && object.denomId !== null) {
      message.denomId = object.denomId
    } else {
      message.denomId = ''
    }
    if (object.tokenId !== undefined && object.tokenId !== null) {
      message.tokenId = object.tokenId
    } else {
      message.tokenId = ''
    }
    return message
  }
}

const baseQueryNFTResponse: object = {}

export const QueryNFTResponse = {
  encode(message: QueryNFTResponse, writer: Writer = Writer.create()): Writer {
    if (message.nft !== undefined) {
      BaseNFT.encode(message.nft, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryNFTResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryNFTResponse } as QueryNFTResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.nft = BaseNFT.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryNFTResponse {
    const message = { ...baseQueryNFTResponse } as QueryNFTResponse
    if (object.nft !== undefined && object.nft !== null) {
      message.nft = BaseNFT.fromJSON(object.nft)
    } else {
      message.nft = undefined
    }
    return message
  },

  toJSON(message: QueryNFTResponse): unknown {
    const obj: any = {}
    message.nft !== undefined && (obj.nft = message.nft ? BaseNFT.toJSON(message.nft) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<QueryNFTResponse>): QueryNFTResponse {
    const message = { ...baseQueryNFTResponse } as QueryNFTResponse
    if (object.nft !== undefined && object.nft !== null) {
      message.nft = BaseNFT.fromPartial(object.nft)
    } else {
      message.nft = undefined
    }
    return message
  }
}

const baseQueryGetDelegateRequest: object = { id: '' }

export const QueryGetDelegateRequest = {
  encode(message: QueryGetDelegateRequest, writer: Writer = Writer.create()): Writer {
    if (message.id !== '') {
      writer.uint32(10).string(message.id)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetDelegateRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryGetDelegateRequest } as QueryGetDelegateRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryGetDelegateRequest {
    const message = { ...baseQueryGetDelegateRequest } as QueryGetDelegateRequest
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id)
    } else {
      message.id = ''
    }
    return message
  },

  toJSON(message: QueryGetDelegateRequest): unknown {
    const obj: any = {}
    message.id !== undefined && (obj.id = message.id)
    return obj
  },

  fromPartial(object: DeepPartial<QueryGetDelegateRequest>): QueryGetDelegateRequest {
    const message = { ...baseQueryGetDelegateRequest } as QueryGetDelegateRequest
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id
    } else {
      message.id = ''
    }
    return message
  }
}

const baseQueryGetDelegateResponse: object = { delegate: '', delegateType: '', validity: 0, creator: '' }

export const QueryGetDelegateResponse = {
  encode(message: QueryGetDelegateResponse, writer: Writer = Writer.create()): Writer {
    if (message.delegate !== '') {
      writer.uint32(10).string(message.delegate)
    }
    if (message.delegateType !== '') {
      writer.uint32(18).string(message.delegateType)
    }
    if (message.validity !== 0) {
      writer.uint32(24).uint64(message.validity)
    }
    if (message.creator !== '') {
      writer.uint32(34).string(message.creator)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetDelegateResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryGetDelegateResponse } as QueryGetDelegateResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.delegate = reader.string()
          break
        case 2:
          message.delegateType = reader.string()
          break
        case 3:
          message.validity = longToNumber(reader.uint64() as Long)
          break
        case 4:
          message.creator = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryGetDelegateResponse {
    const message = { ...baseQueryGetDelegateResponse } as QueryGetDelegateResponse
    if (object.delegate !== undefined && object.delegate !== null) {
      message.delegate = String(object.delegate)
    } else {
      message.delegate = ''
    }
    if (object.delegateType !== undefined && object.delegateType !== null) {
      message.delegateType = String(object.delegateType)
    } else {
      message.delegateType = ''
    }
    if (object.validity !== undefined && object.validity !== null) {
      message.validity = Number(object.validity)
    } else {
      message.validity = 0
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator)
    } else {
      message.creator = ''
    }
    return message
  },

  toJSON(message: QueryGetDelegateResponse): unknown {
    const obj: any = {}
    message.delegate !== undefined && (obj.delegate = message.delegate)
    message.delegateType !== undefined && (obj.delegateType = message.delegateType)
    message.validity !== undefined && (obj.validity = message.validity)
    message.creator !== undefined && (obj.creator = message.creator)
    return obj
  },

  fromPartial(object: DeepPartial<QueryGetDelegateResponse>): QueryGetDelegateResponse {
    const message = { ...baseQueryGetDelegateResponse } as QueryGetDelegateResponse
    if (object.delegate !== undefined && object.delegate !== null) {
      message.delegate = object.delegate
    } else {
      message.delegate = ''
    }
    if (object.delegateType !== undefined && object.delegateType !== null) {
      message.delegateType = object.delegateType
    } else {
      message.delegateType = ''
    }
    if (object.validity !== undefined && object.validity !== null) {
      message.validity = object.validity
    } else {
      message.validity = 0
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator
    } else {
      message.creator = ''
    }
    return message
  }
}

const baseQueryNonceRequest: object = { id: '' }

export const QueryNonceRequest = {
  encode(message: QueryNonceRequest, writer: Writer = Writer.create()): Writer {
    if (message.id !== '') {
      writer.uint32(10).string(message.id)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryNonceRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryNonceRequest } as QueryNonceRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryNonceRequest {
    const message = { ...baseQueryNonceRequest } as QueryNonceRequest
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id)
    } else {
      message.id = ''
    }
    return message
  },

  toJSON(message: QueryNonceRequest): unknown {
    const obj: any = {}
    message.id !== undefined && (obj.id = message.id)
    return obj
  },

  fromPartial(object: DeepPartial<QueryNonceRequest>): QueryNonceRequest {
    const message = { ...baseQueryNonceRequest } as QueryNonceRequest
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id
    } else {
      message.id = ''
    }
    return message
  }
}

const baseQueryNonceResponse: object = {}

export const QueryNonceResponse = {
  encode(_: QueryNonceResponse, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryNonceResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryNonceResponse } as QueryNonceResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(_: any): QueryNonceResponse {
    const message = { ...baseQueryNonceResponse } as QueryNonceResponse
    return message
  },

  toJSON(_: QueryNonceResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<QueryNonceResponse>): QueryNonceResponse {
    const message = { ...baseQueryNonceResponse } as QueryNonceResponse
    return message
  }
}

const baseQueryGetAttributesResponse: object = { name: '', value: '' }

export const QueryGetAttributesResponse = {
  encode(message: QueryGetAttributesResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.name) {
      writer.uint32(10).string(v!)
    }
    for (const v of message.value) {
      writer.uint32(18).string(v!)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetAttributesResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryGetAttributesResponse } as QueryGetAttributesResponse
    message.name = []
    message.value = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.name.push(reader.string())
          break
        case 2:
          message.value.push(reader.string())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryGetAttributesResponse {
    const message = { ...baseQueryGetAttributesResponse } as QueryGetAttributesResponse
    message.name = []
    message.value = []
    if (object.name !== undefined && object.name !== null) {
      for (const e of object.name) {
        message.name.push(String(e))
      }
    }
    if (object.value !== undefined && object.value !== null) {
      for (const e of object.value) {
        message.value.push(String(e))
      }
    }
    return message
  },

  toJSON(message: QueryGetAttributesResponse): unknown {
    const obj: any = {}
    if (message.name) {
      obj.name = message.name.map((e) => e)
    } else {
      obj.name = []
    }
    if (message.value) {
      obj.value = message.value.map((e) => e)
    } else {
      obj.value = []
    }
    return obj
  },

  fromPartial(object: DeepPartial<QueryGetAttributesResponse>): QueryGetAttributesResponse {
    const message = { ...baseQueryGetAttributesResponse } as QueryGetAttributesResponse
    message.name = []
    message.value = []
    if (object.name !== undefined && object.name !== null) {
      for (const e of object.name) {
        message.name.push(e)
      }
    }
    if (object.value !== undefined && object.value !== null) {
      for (const e of object.value) {
        message.value.push(e)
      }
    }
    return message
  }
}

const baseQueryIdentifyOwnerResponse: object = {}

export const QueryIdentifyOwnerResponse = {
  encode(_: QueryIdentifyOwnerResponse, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryIdentifyOwnerResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryIdentifyOwnerResponse } as QueryIdentifyOwnerResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(_: any): QueryIdentifyOwnerResponse {
    const message = { ...baseQueryIdentifyOwnerResponse } as QueryIdentifyOwnerResponse
    return message
  },

  toJSON(_: QueryIdentifyOwnerResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<QueryIdentifyOwnerResponse>): QueryIdentifyOwnerResponse {
    const message = { ...baseQueryIdentifyOwnerResponse } as QueryIdentifyOwnerResponse
    return message
  }
}

const baseQueryGetAttributesRequest: object = { address: '' }

export const QueryGetAttributesRequest = {
  encode(message: QueryGetAttributesRequest, writer: Writer = Writer.create()): Writer {
    if (message.address !== '') {
      writer.uint32(10).string(message.address)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetAttributesRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryGetAttributesRequest } as QueryGetAttributesRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryGetAttributesRequest {
    const message = { ...baseQueryGetAttributesRequest } as QueryGetAttributesRequest
    if (object.address !== undefined && object.address !== null) {
      message.address = String(object.address)
    } else {
      message.address = ''
    }
    return message
  },

  toJSON(message: QueryGetAttributesRequest): unknown {
    const obj: any = {}
    message.address !== undefined && (obj.address = message.address)
    return obj
  },

  fromPartial(object: DeepPartial<QueryGetAttributesRequest>): QueryGetAttributesRequest {
    const message = { ...baseQueryGetAttributesRequest } as QueryGetAttributesRequest
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address
    } else {
      message.address = ''
    }
    return message
  }
}

const baseQueryIdentifyOwnerRequest: object = { address: '' }

export const QueryIdentifyOwnerRequest = {
  encode(message: QueryIdentifyOwnerRequest, writer: Writer = Writer.create()): Writer {
    if (message.address !== '') {
      writer.uint32(10).string(message.address)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryIdentifyOwnerRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryIdentifyOwnerRequest } as QueryIdentifyOwnerRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryIdentifyOwnerRequest {
    const message = { ...baseQueryIdentifyOwnerRequest } as QueryIdentifyOwnerRequest
    if (object.address !== undefined && object.address !== null) {
      message.address = String(object.address)
    } else {
      message.address = ''
    }
    return message
  },

  toJSON(message: QueryIdentifyOwnerRequest): unknown {
    const obj: any = {}
    message.address !== undefined && (obj.address = message.address)
    return obj
  },

  fromPartial(object: DeepPartial<QueryIdentifyOwnerRequest>): QueryIdentifyOwnerRequest {
    const message = { ...baseQueryIdentifyOwnerRequest } as QueryIdentifyOwnerRequest
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address
    } else {
      message.address = ''
    }
    return message
  }
}

const baseQueryOwnersResponse: object = {}

export const QueryOwnersResponse = {
  encode(_: QueryOwnersResponse, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryOwnersResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryOwnersResponse } as QueryOwnersResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(_: any): QueryOwnersResponse {
    const message = { ...baseQueryOwnersResponse } as QueryOwnersResponse
    return message
  },

  toJSON(_: QueryOwnersResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<QueryOwnersResponse>): QueryOwnersResponse {
    const message = { ...baseQueryOwnersResponse } as QueryOwnersResponse
    return message
  }
}

const baseQueryResourceRequest: object = { cid: '', path: '' }

export const QueryResourceRequest = {
  encode(message: QueryResourceRequest, writer: Writer = Writer.create()): Writer {
    if (message.cid !== '') {
      writer.uint32(10).string(message.cid)
    }
    if (message.path !== '') {
      writer.uint32(18).string(message.path)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryResourceRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryResourceRequest } as QueryResourceRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.cid = reader.string()
          break
        case 2:
          message.path = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryResourceRequest {
    const message = { ...baseQueryResourceRequest } as QueryResourceRequest
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = String(object.cid)
    } else {
      message.cid = ''
    }
    if (object.path !== undefined && object.path !== null) {
      message.path = String(object.path)
    } else {
      message.path = ''
    }
    return message
  },

  toJSON(message: QueryResourceRequest): unknown {
    const obj: any = {}
    message.cid !== undefined && (obj.cid = message.cid)
    message.path !== undefined && (obj.path = message.path)
    return obj
  },

  fromPartial(object: DeepPartial<QueryResourceRequest>): QueryResourceRequest {
    const message = { ...baseQueryResourceRequest } as QueryResourceRequest
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = object.cid
    } else {
      message.cid = ''
    }
    if (object.path !== undefined && object.path !== null) {
      message.path = object.path
    } else {
      message.path = ''
    }
    return message
  }
}

const baseQueryResourceResponse: object = { data: '' }

export const QueryResourceResponse = {
  encode(message: QueryResourceResponse, writer: Writer = Writer.create()): Writer {
    if (message.data !== '') {
      writer.uint32(10).string(message.data)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryResourceResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryResourceResponse } as QueryResourceResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.data = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryResourceResponse {
    const message = { ...baseQueryResourceResponse } as QueryResourceResponse
    if (object.data !== undefined && object.data !== null) {
      message.data = String(object.data)
    } else {
      message.data = ''
    }
    return message
  },

  toJSON(message: QueryResourceResponse): unknown {
    const obj: any = {}
    message.data !== undefined && (obj.data = message.data)
    return obj
  },

  fromPartial(object: DeepPartial<QueryResourceResponse>): QueryResourceResponse {
    const message = { ...baseQueryResourceResponse } as QueryResourceResponse
    if (object.data !== undefined && object.data !== null) {
      message.data = object.data
    } else {
      message.data = ''
    }
    return message
  }
}

const basePostSchemaRequest: object = { did: '', path: '', codec: '', isJsonSchema: false }

export const PostSchemaRequest = {
  encode(message: PostSchemaRequest, writer: Writer = Writer.create()): Writer {
    if (message.did !== '') {
      writer.uint32(10).string(message.did)
    }
    if (message.path !== '') {
      writer.uint32(18).string(message.path)
    }
    if (message.data.length !== 0) {
      writer.uint32(26).bytes(message.data)
    }
    if (message.codec !== '') {
      writer.uint32(34).string(message.codec)
    }
    if (message.isJsonSchema === true) {
      writer.uint32(40).bool(message.isJsonSchema)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): PostSchemaRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...basePostSchemaRequest } as PostSchemaRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.did = reader.string()
          break
        case 2:
          message.path = reader.string()
          break
        case 3:
          message.data = reader.bytes()
          break
        case 4:
          message.codec = reader.string()
          break
        case 5:
          message.isJsonSchema = reader.bool()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): PostSchemaRequest {
    const message = { ...basePostSchemaRequest } as PostSchemaRequest
    if (object.did !== undefined && object.did !== null) {
      message.did = String(object.did)
    } else {
      message.did = ''
    }
    if (object.path !== undefined && object.path !== null) {
      message.path = String(object.path)
    } else {
      message.path = ''
    }
    if (object.data !== undefined && object.data !== null) {
      message.data = bytesFromBase64(object.data)
    }
    if (object.codec !== undefined && object.codec !== null) {
      message.codec = String(object.codec)
    } else {
      message.codec = ''
    }
    if (object.isJsonSchema !== undefined && object.isJsonSchema !== null) {
      message.isJsonSchema = Boolean(object.isJsonSchema)
    } else {
      message.isJsonSchema = false
    }
    return message
  },

  toJSON(message: PostSchemaRequest): unknown {
    const obj: any = {}
    message.did !== undefined && (obj.did = message.did)
    message.path !== undefined && (obj.path = message.path)
    message.data !== undefined && (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()))
    message.codec !== undefined && (obj.codec = message.codec)
    message.isJsonSchema !== undefined && (obj.isJsonSchema = message.isJsonSchema)
    return obj
  },

  fromPartial(object: DeepPartial<PostSchemaRequest>): PostSchemaRequest {
    const message = { ...basePostSchemaRequest } as PostSchemaRequest
    if (object.did !== undefined && object.did !== null) {
      message.did = object.did
    } else {
      message.did = ''
    }
    if (object.path !== undefined && object.path !== null) {
      message.path = object.path
    } else {
      message.path = ''
    }
    if (object.data !== undefined && object.data !== null) {
      message.data = object.data
    } else {
      message.data = new Uint8Array()
    }
    if (object.codec !== undefined && object.codec !== null) {
      message.codec = object.codec
    } else {
      message.codec = ''
    }
    if (object.isJsonSchema !== undefined && object.isJsonSchema !== null) {
      message.isJsonSchema = object.isJsonSchema
    } else {
      message.isJsonSchema = false
    }
    return message
  }
}

const basePostSchemaResponse: object = { cid: '' }

export const PostSchemaResponse = {
  encode(message: PostSchemaResponse, writer: Writer = Writer.create()): Writer {
    if (message.cid !== '') {
      writer.uint32(10).string(message.cid)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): PostSchemaResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...basePostSchemaResponse } as PostSchemaResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.cid = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): PostSchemaResponse {
    const message = { ...basePostSchemaResponse } as PostSchemaResponse
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = String(object.cid)
    } else {
      message.cid = ''
    }
    return message
  },

  toJSON(message: PostSchemaResponse): unknown {
    const obj: any = {}
    message.cid !== undefined && (obj.cid = message.cid)
    return obj
  },

  fromPartial(object: DeepPartial<PostSchemaResponse>): PostSchemaResponse {
    const message = { ...basePostSchemaResponse } as PostSchemaResponse
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = object.cid
    } else {
      message.cid = ''
    }
    return message
  }
}

/** Query defines the gRPC querier service. */
export interface Query {
  /** ReadRoyaltyInfo */
  ReadRoyaltyInfo(request: QueryReadRoyaltyInfo): Promise<QueryReadRoyaltyInfoResponse>
  /** Queries a list of resource items. */
  ReadWithPath(request: QueryResourceRequest): Promise<QueryResourceResponse>
  /** Reads metadata proofs */
  ReadMetadataProof(request: QueryProofMetadataRequest): Promise<QueryProofResponse>
  /** Queries a list of owners items. */
  IdentifyOwner(request: QueryIdentifyOwnerRequest): Promise<QueryIdentifyOwnerResponse>
  /** Queries a list of Attributes items. */
  GetAttributes(request: QueryGetAttributesRequest): Promise<QueryGetAttributesResponse>
  /** Queries a list of resource items. */
  Resource(request: QueryResourceRequest): Promise<QueryResourceResponse>
  /** Queries a list of delegates items. */
  ReadDelegate(request: QueryGetDelegateRequest): Promise<QueryGetDelegateResponse>
  /** Owner queries the NFTs of the specified owner */
  Owner(request: QueryOwnerRequest): Promise<QueryOwnerResponse>
  /** Collection queries the NFTs of the specified denom */
  Collection(request: QueryCollectionRequest): Promise<QueryCollectionResponse>
  /** Denom queries the definition of a given denom */
  Denom(request: QueryDenomRequest): Promise<QueryDenomResponse>
  /** Denoms queries all the denoms */
  Denoms(request: QueryDenomsRequest): Promise<QueryDenomsResponse>
  /** NFT queries the NFT for the given denom and token ID */
  GetNft(request: QueryNFTRequest): Promise<QueryNFTResponse>
  ResolveDidWeb(request: QueryDidWebRequest): Promise<QueryResourceResponse>
  GetDidKey(request: QueryGetDidRequest): Promise<QueryResourceResponse>
  WriteSchemaStoreResource(request: PostSchemaRequest): Promise<PostSchemaResponse>
  ReadSchemaStoreResource(request: QuerySchemaStoreRequest): Promise<QuerySchemaStoreResponse>
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc
  constructor(rpc: Rpc) {
    this.rpc = rpc
  }
  ReadRoyaltyInfo(request: QueryReadRoyaltyInfo): Promise<QueryReadRoyaltyInfoResponse> {
    const data = QueryReadRoyaltyInfo.encode(request).finish()
    const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Query', 'ReadRoyaltyInfo', data)
    return promise.then((data) => QueryReadRoyaltyInfoResponse.decode(new Reader(data)))
  }

  ReadWithPath(request: QueryResourceRequest): Promise<QueryResourceResponse> {
    const data = QueryResourceRequest.encode(request).finish()
    const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Query', 'ReadWithPath', data)
    return promise.then((data) => QueryResourceResponse.decode(new Reader(data)))
  }

  ReadMetadataProof(request: QueryProofMetadataRequest): Promise<QueryProofResponse> {
    const data = QueryProofMetadataRequest.encode(request).finish()
    const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Query', 'ReadMetadataProof', data)
    return promise.then((data) => QueryProofResponse.decode(new Reader(data)))
  }

  IdentifyOwner(request: QueryIdentifyOwnerRequest): Promise<QueryIdentifyOwnerResponse> {
    const data = QueryIdentifyOwnerRequest.encode(request).finish()
    const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Query', 'IdentifyOwner', data)
    return promise.then((data) => QueryIdentifyOwnerResponse.decode(new Reader(data)))
  }

  GetAttributes(request: QueryGetAttributesRequest): Promise<QueryGetAttributesResponse> {
    const data = QueryGetAttributesRequest.encode(request).finish()
    const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Query', 'GetAttributes', data)
    return promise.then((data) => QueryGetAttributesResponse.decode(new Reader(data)))
  }

  Resource(request: QueryResourceRequest): Promise<QueryResourceResponse> {
    const data = QueryResourceRequest.encode(request).finish()
    const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Query', 'Resource', data)
    return promise.then((data) => QueryResourceResponse.decode(new Reader(data)))
  }

  ReadDelegate(request: QueryGetDelegateRequest): Promise<QueryGetDelegateResponse> {
    const data = QueryGetDelegateRequest.encode(request).finish()
    const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Query', 'ReadDelegate', data)
    return promise.then((data) => QueryGetDelegateResponse.decode(new Reader(data)))
  }

  Owner(request: QueryOwnerRequest): Promise<QueryOwnerResponse> {
    const data = QueryOwnerRequest.encode(request).finish()
    const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Query', 'Owner', data)
    return promise.then((data) => QueryOwnerResponse.decode(new Reader(data)))
  }

  Collection(request: QueryCollectionRequest): Promise<QueryCollectionResponse> {
    const data = QueryCollectionRequest.encode(request).finish()
    const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Query', 'Collection', data)
    return promise.then((data) => QueryCollectionResponse.decode(new Reader(data)))
  }

  Denom(request: QueryDenomRequest): Promise<QueryDenomResponse> {
    const data = QueryDenomRequest.encode(request).finish()
    const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Query', 'Denom', data)
    return promise.then((data) => QueryDenomResponse.decode(new Reader(data)))
  }

  Denoms(request: QueryDenomsRequest): Promise<QueryDenomsResponse> {
    const data = QueryDenomsRequest.encode(request).finish()
    const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Query', 'Denoms', data)
    return promise.then((data) => QueryDenomsResponse.decode(new Reader(data)))
  }

  GetNft(request: QueryNFTRequest): Promise<QueryNFTResponse> {
    const data = QueryNFTRequest.encode(request).finish()
    const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Query', 'GetNft', data)
    return promise.then((data) => QueryNFTResponse.decode(new Reader(data)))
  }

  ResolveDidWeb(request: QueryDidWebRequest): Promise<QueryResourceResponse> {
    const data = QueryDidWebRequest.encode(request).finish()
    const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Query', 'ResolveDidWeb', data)
    return promise.then((data) => QueryResourceResponse.decode(new Reader(data)))
  }

  GetDidKey(request: QueryGetDidRequest): Promise<QueryResourceResponse> {
    const data = QueryGetDidRequest.encode(request).finish()
    const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Query', 'GetDidKey', data)
    return promise.then((data) => QueryResourceResponse.decode(new Reader(data)))
  }

  WriteSchemaStoreResource(request: PostSchemaRequest): Promise<PostSchemaResponse> {
    const data = PostSchemaRequest.encode(request).finish()
    const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Query', 'WriteSchemaStoreResource', data)
    return promise.then((data) => PostSchemaResponse.decode(new Reader(data)))
  }

  ReadSchemaStoreResource(request: QuerySchemaStoreRequest): Promise<QuerySchemaStoreResponse> {
    const data = QuerySchemaStoreRequest.encode(request).finish()
    const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Query', 'ReadSchemaStoreResource', data)
    return promise.then((data) => QuerySchemaStoreResponse.decode(new Reader(data)))
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>
}

declare var self: any | undefined
declare var window: any | undefined
var globalThis: any = (() => {
  if (typeof globalThis !== 'undefined') return globalThis
  if (typeof self !== 'undefined') return self
  if (typeof window !== 'undefined') return window
  if (typeof global !== 'undefined') return global
  throw 'Unable to locate global object'
})()

const atob: (b64: string) => string = globalThis.atob || ((b64) => globalThis.Buffer.from(b64, 'base64').toString('binary'))
function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64)
  const arr = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i)
  }
  return arr
}

const btoa: (bin: string) => string = globalThis.btoa || ((bin) => globalThis.Buffer.from(bin, 'binary').toString('base64'))
function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = []
  for (let i = 0; i < arr.byteLength; ++i) {
    bin.push(String.fromCharCode(arr[i]))
  }
  return btoa(bin.join(''))
}

type Builtin = Date | Function | Uint8Array | string | number | undefined
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error('Value is larger than Number.MAX_SAFE_INTEGER')
  }
  return long.toNumber()
}

if (util.Long !== Long) {
  util.Long = Long as any
  configure()
}
