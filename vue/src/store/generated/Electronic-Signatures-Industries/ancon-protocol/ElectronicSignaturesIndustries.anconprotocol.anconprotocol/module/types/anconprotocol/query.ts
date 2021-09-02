/* eslint-disable */
import { Reader, Writer } from 'protobufjs/minimal'

export const protobufPackage = 'ElectronicSignaturesIndustries.anconprotocol.anconprotocol'

/** this line is used by starport scaffolding # 3 */
export interface QueryOwnersRequest {}

export interface QueryOwnersResponse {}

export interface QueryResourceRequest {
  cid: string
  path: string
}

export interface QueryResourceResponse {
  data: string
}

const baseQueryOwnersRequest: object = {}

export const QueryOwnersRequest = {
  encode(_: QueryOwnersRequest, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryOwnersRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryOwnersRequest } as QueryOwnersRequest
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

  fromJSON(_: any): QueryOwnersRequest {
    const message = { ...baseQueryOwnersRequest } as QueryOwnersRequest
    return message
  },

  toJSON(_: QueryOwnersRequest): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<QueryOwnersRequest>): QueryOwnersRequest {
    const message = { ...baseQueryOwnersRequest } as QueryOwnersRequest
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
  Owners(request: QueryOwnersRequest): Promise<QueryOwnersResponse>
  /** Queries a list of resource items. */
  Resource(request: QueryResourceRequest): Promise<QueryResourceResponse>
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

  Owners(request: QueryOwnersRequest): Promise<QueryOwnersResponse> {
    const data = QueryOwnersRequest.encode(request).finish()
    const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Query', 'Owners', data)
    return promise.then((data) => QueryOwnersResponse.decode(new Reader(data)))
  }

  Resource(request: QueryResourceRequest): Promise<QueryResourceResponse> {
    const data = QueryResourceRequest.encode(request).finish()
    const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Query', 'Resource', data)
    return promise.then((data) => QueryResourceResponse.decode(new Reader(data)))
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
