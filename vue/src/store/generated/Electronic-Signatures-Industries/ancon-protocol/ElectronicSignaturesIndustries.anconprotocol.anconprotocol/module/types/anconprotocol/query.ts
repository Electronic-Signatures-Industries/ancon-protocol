/* eslint-disable */
import { Reader, Writer } from 'protobufjs/minimal'

export const protobufPackage = 'ElectronicSignaturesIndustries.anconprotocol.anconprotocol'

export interface QueryGetDelegatesRequest {
  id: string
}

export interface QueryGetDelegatesResponse {}

export interface QueryNonceRequest {
  id: string
}

export interface QueryNonceResponse {}

export interface QueryGetAttributesResponse {}

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

const baseQueryGetDelegatesRequest: object = { id: '' }

export const QueryGetDelegatesRequest = {
  encode(message: QueryGetDelegatesRequest, writer: Writer = Writer.create()): Writer {
    if (message.id !== '') {
      writer.uint32(10).string(message.id)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetDelegatesRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryGetDelegatesRequest } as QueryGetDelegatesRequest
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

  fromJSON(object: any): QueryGetDelegatesRequest {
    const message = { ...baseQueryGetDelegatesRequest } as QueryGetDelegatesRequest
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id)
    } else {
      message.id = ''
    }
    return message
  },

  toJSON(message: QueryGetDelegatesRequest): unknown {
    const obj: any = {}
    message.id !== undefined && (obj.id = message.id)
    return obj
  },

  fromPartial(object: DeepPartial<QueryGetDelegatesRequest>): QueryGetDelegatesRequest {
    const message = { ...baseQueryGetDelegatesRequest } as QueryGetDelegatesRequest
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id
    } else {
      message.id = ''
    }
    return message
  }
}

const baseQueryGetDelegatesResponse: object = {}

export const QueryGetDelegatesResponse = {
  encode(_: QueryGetDelegatesResponse, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetDelegatesResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryGetDelegatesResponse } as QueryGetDelegatesResponse
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

  fromJSON(_: any): QueryGetDelegatesResponse {
    const message = { ...baseQueryGetDelegatesResponse } as QueryGetDelegatesResponse
    return message
  },

  toJSON(_: QueryGetDelegatesResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<QueryGetDelegatesResponse>): QueryGetDelegatesResponse {
    const message = { ...baseQueryGetDelegatesResponse } as QueryGetDelegatesResponse
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

const baseQueryGetAttributesResponse: object = {}

export const QueryGetAttributesResponse = {
  encode(_: QueryGetAttributesResponse, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetAttributesResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryGetAttributesResponse } as QueryGetAttributesResponse
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

  fromJSON(_: any): QueryGetAttributesResponse {
    const message = { ...baseQueryGetAttributesResponse } as QueryGetAttributesResponse
    return message
  },

  toJSON(_: QueryGetAttributesResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<QueryGetAttributesResponse>): QueryGetAttributesResponse {
    const message = { ...baseQueryGetAttributesResponse } as QueryGetAttributesResponse
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
  /** Queries a list of owners items. */
  IdentifyOwner(request: QueryIdentifyOwnerRequest): Promise<QueryIdentifyOwnerResponse>
  /** Queries a list of Attributes items. */
  GetAttributes(request: QueryGetAttributesRequest): Promise<QueryGetAttributesResponse>
  /** Queries a list of resource items. */
  Resource(request: QueryResourceRequest): Promise<QueryResourceResponse>
  /** Queries a list of nonce items. */
  ReadNonces(request: QueryNonceRequest): Promise<QueryNonceResponse>
  /** Queries a list of nonce items. */
  ReadNonce(request: QueryNonceRequest): Promise<QueryNonceResponse>
  /** Queries a list of delegates items. */
  ReadDelegate(request: QueryGetDelegatesRequest): Promise<QueryGetDelegatesResponse>
  /** Queries a list of nonce items. */
  ReadDelegates(request: QueryGetDelegatesRequest): Promise<QueryGetDelegatesResponse>
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

  ReadNonces(request: QueryNonceRequest): Promise<QueryNonceResponse> {
    const data = QueryNonceRequest.encode(request).finish()
    const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Query', 'ReadNonces', data)
    return promise.then((data) => QueryNonceResponse.decode(new Reader(data)))
  }

  ReadNonce(request: QueryNonceRequest): Promise<QueryNonceResponse> {
    const data = QueryNonceRequest.encode(request).finish()
    const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Query', 'ReadNonce', data)
    return promise.then((data) => QueryNonceResponse.decode(new Reader(data)))
  }

  ReadDelegate(request: QueryGetDelegatesRequest): Promise<QueryGetDelegatesResponse> {
    const data = QueryGetDelegatesRequest.encode(request).finish()
    const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Query', 'ReadDelegate', data)
    return promise.then((data) => QueryGetDelegatesResponse.decode(new Reader(data)))
  }

  ReadDelegates(request: QueryGetDelegatesRequest): Promise<QueryGetDelegatesResponse> {
    const data = QueryGetDelegatesRequest.encode(request).finish()
    const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Query', 'ReadDelegates', data)
    return promise.then((data) => QueryGetDelegatesResponse.decode(new Reader(data)))
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>
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
