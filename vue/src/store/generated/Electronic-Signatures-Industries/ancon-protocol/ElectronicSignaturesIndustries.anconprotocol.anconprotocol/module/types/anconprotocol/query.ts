/* eslint-disable */
import { Reader, util, configure, Writer } from 'protobufjs/minimal'
import * as Long from 'long'
import { PageRequest, PageResponse } from '../cosmos/base/query/v1beta1/pagination'
import { Owner, Collection, Denom, BaseNFT } from '../anconprotocol/nft'
import { HTLC, AssetSupply, Params } from '../anconprotocol/htlc'

export const protobufPackage = 'ElectronicSignaturesIndustries.anconprotocol.anconprotocol'

/** QuerySupplyRequest is the request type for the Query/HTLC RPC method */
export interface QuerySupplyRequest {
  denomId: string
  owner: string
}

/** QuerySupplyResponse is the response type for the Query/Supply RPC method */
export interface QuerySupplyResponse {
  amount: number
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

/** this line is used by starport scaffolding # 3 */
export interface QueryResourceRequest {
  cid: string
  path: string
}

export interface QueryResourceResponse {
  data: string
}

/** QueryHTLCRequest is the request type for the Query/HTLC RPC method */
export interface QueryHTLCRequest {
  id: string
}

/** QueryBalanceResponse is the response type for the Query/HTLC RPC method */
export interface QueryHTLCResponse {
  htlc: HTLC | undefined
}

/** QueryAssetSupplyRequest is request type for the Query/AssetSupply RPC method */
export interface QueryAssetSupplyRequest {
  denom: string
}

/** QueryAssetSupplyResponse is response type for the Query/AssetSupply RPC method */
export interface QueryAssetSupplyResponse {
  assetSupply: AssetSupply | undefined
}

/** QueryAssetSuppliesRequest is request type for the Query/AssetSupplies RPC method */
export interface QueryAssetSuppliesRequest {}

/** QueryAssetSuppliesResponse is response type for the Query/AssetSupplies RPC method */
export interface QueryAssetSuppliesResponse {
  assetSupplies: AssetSupply[]
}

/** QueryParamsRequest is request type for the Query/Parameters RPC method */
export interface QueryParamsRequest {}

/** QueryParamsResponse is response type for the Query/Parameters RPC method */
export interface QueryParamsResponse {
  params: Params | undefined
}

const baseQuerySupplyRequest: object = { denomId: '', owner: '' }

export const QuerySupplyRequest = {
  encode(message: QuerySupplyRequest, writer: Writer = Writer.create()): Writer {
    if (message.denomId !== '') {
      writer.uint32(10).string(message.denomId)
    }
    if (message.owner !== '') {
      writer.uint32(18).string(message.owner)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QuerySupplyRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQuerySupplyRequest } as QuerySupplyRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.denomId = reader.string()
          break
        case 2:
          message.owner = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QuerySupplyRequest {
    const message = { ...baseQuerySupplyRequest } as QuerySupplyRequest
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
    return message
  },

  toJSON(message: QuerySupplyRequest): unknown {
    const obj: any = {}
    message.denomId !== undefined && (obj.denomId = message.denomId)
    message.owner !== undefined && (obj.owner = message.owner)
    return obj
  },

  fromPartial(object: DeepPartial<QuerySupplyRequest>): QuerySupplyRequest {
    const message = { ...baseQuerySupplyRequest } as QuerySupplyRequest
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
    return message
  }
}

const baseQuerySupplyResponse: object = { amount: 0 }

export const QuerySupplyResponse = {
  encode(message: QuerySupplyResponse, writer: Writer = Writer.create()): Writer {
    if (message.amount !== 0) {
      writer.uint32(8).uint64(message.amount)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QuerySupplyResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQuerySupplyResponse } as QuerySupplyResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.amount = longToNumber(reader.uint64() as Long)
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QuerySupplyResponse {
    const message = { ...baseQuerySupplyResponse } as QuerySupplyResponse
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = Number(object.amount)
    } else {
      message.amount = 0
    }
    return message
  },

  toJSON(message: QuerySupplyResponse): unknown {
    const obj: any = {}
    message.amount !== undefined && (obj.amount = message.amount)
    return obj
  },

  fromPartial(object: DeepPartial<QuerySupplyResponse>): QuerySupplyResponse {
    const message = { ...baseQuerySupplyResponse } as QuerySupplyResponse
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount
    } else {
      message.amount = 0
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

const baseQueryHTLCRequest: object = { id: '' }

export const QueryHTLCRequest = {
  encode(message: QueryHTLCRequest, writer: Writer = Writer.create()): Writer {
    if (message.id !== '') {
      writer.uint32(10).string(message.id)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryHTLCRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryHTLCRequest } as QueryHTLCRequest
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

  fromJSON(object: any): QueryHTLCRequest {
    const message = { ...baseQueryHTLCRequest } as QueryHTLCRequest
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id)
    } else {
      message.id = ''
    }
    return message
  },

  toJSON(message: QueryHTLCRequest): unknown {
    const obj: any = {}
    message.id !== undefined && (obj.id = message.id)
    return obj
  },

  fromPartial(object: DeepPartial<QueryHTLCRequest>): QueryHTLCRequest {
    const message = { ...baseQueryHTLCRequest } as QueryHTLCRequest
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id
    } else {
      message.id = ''
    }
    return message
  }
}

const baseQueryHTLCResponse: object = {}

export const QueryHTLCResponse = {
  encode(message: QueryHTLCResponse, writer: Writer = Writer.create()): Writer {
    if (message.htlc !== undefined) {
      HTLC.encode(message.htlc, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryHTLCResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryHTLCResponse } as QueryHTLCResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.htlc = HTLC.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryHTLCResponse {
    const message = { ...baseQueryHTLCResponse } as QueryHTLCResponse
    if (object.htlc !== undefined && object.htlc !== null) {
      message.htlc = HTLC.fromJSON(object.htlc)
    } else {
      message.htlc = undefined
    }
    return message
  },

  toJSON(message: QueryHTLCResponse): unknown {
    const obj: any = {}
    message.htlc !== undefined && (obj.htlc = message.htlc ? HTLC.toJSON(message.htlc) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<QueryHTLCResponse>): QueryHTLCResponse {
    const message = { ...baseQueryHTLCResponse } as QueryHTLCResponse
    if (object.htlc !== undefined && object.htlc !== null) {
      message.htlc = HTLC.fromPartial(object.htlc)
    } else {
      message.htlc = undefined
    }
    return message
  }
}

const baseQueryAssetSupplyRequest: object = { denom: '' }

export const QueryAssetSupplyRequest = {
  encode(message: QueryAssetSupplyRequest, writer: Writer = Writer.create()): Writer {
    if (message.denom !== '') {
      writer.uint32(10).string(message.denom)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAssetSupplyRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryAssetSupplyRequest } as QueryAssetSupplyRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryAssetSupplyRequest {
    const message = { ...baseQueryAssetSupplyRequest } as QueryAssetSupplyRequest
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = String(object.denom)
    } else {
      message.denom = ''
    }
    return message
  },

  toJSON(message: QueryAssetSupplyRequest): unknown {
    const obj: any = {}
    message.denom !== undefined && (obj.denom = message.denom)
    return obj
  },

  fromPartial(object: DeepPartial<QueryAssetSupplyRequest>): QueryAssetSupplyRequest {
    const message = { ...baseQueryAssetSupplyRequest } as QueryAssetSupplyRequest
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom
    } else {
      message.denom = ''
    }
    return message
  }
}

const baseQueryAssetSupplyResponse: object = {}

export const QueryAssetSupplyResponse = {
  encode(message: QueryAssetSupplyResponse, writer: Writer = Writer.create()): Writer {
    if (message.assetSupply !== undefined) {
      AssetSupply.encode(message.assetSupply, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAssetSupplyResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryAssetSupplyResponse } as QueryAssetSupplyResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.assetSupply = AssetSupply.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryAssetSupplyResponse {
    const message = { ...baseQueryAssetSupplyResponse } as QueryAssetSupplyResponse
    if (object.assetSupply !== undefined && object.assetSupply !== null) {
      message.assetSupply = AssetSupply.fromJSON(object.assetSupply)
    } else {
      message.assetSupply = undefined
    }
    return message
  },

  toJSON(message: QueryAssetSupplyResponse): unknown {
    const obj: any = {}
    message.assetSupply !== undefined && (obj.assetSupply = message.assetSupply ? AssetSupply.toJSON(message.assetSupply) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<QueryAssetSupplyResponse>): QueryAssetSupplyResponse {
    const message = { ...baseQueryAssetSupplyResponse } as QueryAssetSupplyResponse
    if (object.assetSupply !== undefined && object.assetSupply !== null) {
      message.assetSupply = AssetSupply.fromPartial(object.assetSupply)
    } else {
      message.assetSupply = undefined
    }
    return message
  }
}

const baseQueryAssetSuppliesRequest: object = {}

export const QueryAssetSuppliesRequest = {
  encode(_: QueryAssetSuppliesRequest, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAssetSuppliesRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryAssetSuppliesRequest } as QueryAssetSuppliesRequest
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

  fromJSON(_: any): QueryAssetSuppliesRequest {
    const message = { ...baseQueryAssetSuppliesRequest } as QueryAssetSuppliesRequest
    return message
  },

  toJSON(_: QueryAssetSuppliesRequest): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<QueryAssetSuppliesRequest>): QueryAssetSuppliesRequest {
    const message = { ...baseQueryAssetSuppliesRequest } as QueryAssetSuppliesRequest
    return message
  }
}

const baseQueryAssetSuppliesResponse: object = {}

export const QueryAssetSuppliesResponse = {
  encode(message: QueryAssetSuppliesResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.assetSupplies) {
      AssetSupply.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAssetSuppliesResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryAssetSuppliesResponse } as QueryAssetSuppliesResponse
    message.assetSupplies = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.assetSupplies.push(AssetSupply.decode(reader, reader.uint32()))
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryAssetSuppliesResponse {
    const message = { ...baseQueryAssetSuppliesResponse } as QueryAssetSuppliesResponse
    message.assetSupplies = []
    if (object.assetSupplies !== undefined && object.assetSupplies !== null) {
      for (const e of object.assetSupplies) {
        message.assetSupplies.push(AssetSupply.fromJSON(e))
      }
    }
    return message
  },

  toJSON(message: QueryAssetSuppliesResponse): unknown {
    const obj: any = {}
    if (message.assetSupplies) {
      obj.assetSupplies = message.assetSupplies.map((e) => (e ? AssetSupply.toJSON(e) : undefined))
    } else {
      obj.assetSupplies = []
    }
    return obj
  },

  fromPartial(object: DeepPartial<QueryAssetSuppliesResponse>): QueryAssetSuppliesResponse {
    const message = { ...baseQueryAssetSuppliesResponse } as QueryAssetSuppliesResponse
    message.assetSupplies = []
    if (object.assetSupplies !== undefined && object.assetSupplies !== null) {
      for (const e of object.assetSupplies) {
        message.assetSupplies.push(AssetSupply.fromPartial(e))
      }
    }
    return message
  }
}

const baseQueryParamsRequest: object = {}

export const QueryParamsRequest = {
  encode(_: QueryParamsRequest, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest
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

  fromJSON(_: any): QueryParamsRequest {
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest
    return message
  },

  toJSON(_: QueryParamsRequest): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<QueryParamsRequest>): QueryParamsRequest {
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest
    return message
  }
}

const baseQueryParamsResponse: object = {}

export const QueryParamsResponse = {
  encode(message: QueryParamsResponse, writer: Writer = Writer.create()): Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryParamsResponse {
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromJSON(object.params)
    } else {
      message.params = undefined
    }
    return message
  },

  toJSON(message: QueryParamsResponse): unknown {
    const obj: any = {}
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<QueryParamsResponse>): QueryParamsResponse {
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromPartial(object.params)
    } else {
      message.params = undefined
    }
    return message
  }
}

/** Query defines the gRPC querier service. */
export interface Query {
  /** Queries a list of resource items. */
  ReadWithPath(request: QueryResourceRequest): Promise<QueryResourceResponse>
  /**
   * additional handler that uses ReadFile
   * Queries a list of resource items.
   */
  ReadFile(request: QueryResourceRequest): Promise<QueryResourceResponse>
  /** Queries a list of resource items. */
  Read(request: QueryResourceRequest): Promise<QueryResourceResponse>
  /** HTLC queries the HTLC by the specified hash lock */
  GetHtlc(request: QueryHTLCRequest): Promise<QueryHTLCResponse>
  /** AssetSupply queries the supply of an asset */
  AssetSupply(request: QueryAssetSupplyRequest): Promise<QueryAssetSupplyResponse>
  /** AssetSupplies queries the supplies of all assets */
  AssetSupplies(request: QueryAssetSuppliesRequest): Promise<QueryAssetSuppliesResponse>
  /** Params queries the htlc parameters */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>
  /** Queries a list of resource items. */
  Resource(request: QueryResourceRequest): Promise<QueryResourceResponse>
  /** Supply queries the total supply of a given denom or owner */
  Supply(request: QuerySupplyRequest): Promise<QuerySupplyResponse>
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
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc
  constructor(rpc: Rpc) {
    this.rpc = rpc
  }
  ReadWithPath(request: QueryResourceRequest): Promise<QueryResourceResponse> {
    const data = QueryResourceRequest.encode(request).finish()
    const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Query', 'ReadWithPath', data)
    return promise.then((data) => QueryResourceResponse.decode(new Reader(data)))
  }

  ReadFile(request: QueryResourceRequest): Promise<QueryResourceResponse> {
    const data = QueryResourceRequest.encode(request).finish()
    const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Query', 'ReadFile', data)
    return promise.then((data) => QueryResourceResponse.decode(new Reader(data)))
  }

  Read(request: QueryResourceRequest): Promise<QueryResourceResponse> {
    const data = QueryResourceRequest.encode(request).finish()
    const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Query', 'Read', data)
    return promise.then((data) => QueryResourceResponse.decode(new Reader(data)))
  }

  GetHtlc(request: QueryHTLCRequest): Promise<QueryHTLCResponse> {
    const data = QueryHTLCRequest.encode(request).finish()
    const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Query', 'GetHtlc', data)
    return promise.then((data) => QueryHTLCResponse.decode(new Reader(data)))
  }

  AssetSupply(request: QueryAssetSupplyRequest): Promise<QueryAssetSupplyResponse> {
    const data = QueryAssetSupplyRequest.encode(request).finish()
    const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Query', 'AssetSupply', data)
    return promise.then((data) => QueryAssetSupplyResponse.decode(new Reader(data)))
  }

  AssetSupplies(request: QueryAssetSuppliesRequest): Promise<QueryAssetSuppliesResponse> {
    const data = QueryAssetSuppliesRequest.encode(request).finish()
    const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Query', 'AssetSupplies', data)
    return promise.then((data) => QueryAssetSuppliesResponse.decode(new Reader(data)))
  }

  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish()
    const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Query', 'Params', data)
    return promise.then((data) => QueryParamsResponse.decode(new Reader(data)))
  }

  Resource(request: QueryResourceRequest): Promise<QueryResourceResponse> {
    const data = QueryResourceRequest.encode(request).finish()
    const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Query', 'Resource', data)
    return promise.then((data) => QueryResourceResponse.decode(new Reader(data)))
  }

  Supply(request: QuerySupplyRequest): Promise<QuerySupplyResponse> {
    const data = QuerySupplyRequest.encode(request).finish()
    const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Query', 'Supply', data)
    return promise.then((data) => QuerySupplyResponse.decode(new Reader(data)))
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
