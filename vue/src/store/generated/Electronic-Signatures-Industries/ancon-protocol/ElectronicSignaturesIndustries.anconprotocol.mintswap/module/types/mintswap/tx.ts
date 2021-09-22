/* eslint-disable */
import { Reader, util, configure, Writer } from 'protobufjs/minimal'
import * as Long from 'long'

export const protobufPackage = 'ElectronicSignaturesIndustries.anconprotocol.mintswap'

export interface MsgMintSwap {
  /** the port on which the packet will be sent */
  sourcePort: string
  /** the channel by which the packet will be sent */
  sourceChannel: string
  /** the tokens to be transferred */
  metadataRef: string
  /** the sender address */
  sender: string
  /** the recipient address on the destination chain */
  receiver: string
  /** token name */
  tokenName: string
  /** token symbol/id */
  tokenSymbol: string
  /** did owner */
  didOwner: string
  price: number
  /**
   * Timeout height relative to the current block height.
   * The timeout is disabled when set to 0.
   */
  timeoutHeight: number
  /**
   * Timeout timestamp (in nanoseconds) relative to the current block timestamp.
   * The timeout is disabled when set to 0.
   */
  timeoutTimestamp: number
}

/** MsgMintSwap defines the Msg/Transfer response type. */
export interface MsgMintSwapResponse {}

const baseMsgMintSwap: object = {
  sourcePort: '',
  sourceChannel: '',
  metadataRef: '',
  sender: '',
  receiver: '',
  tokenName: '',
  tokenSymbol: '',
  didOwner: '',
  price: 0,
  timeoutHeight: 0,
  timeoutTimestamp: 0
}

export const MsgMintSwap = {
  encode(message: MsgMintSwap, writer: Writer = Writer.create()): Writer {
    if (message.sourcePort !== '') {
      writer.uint32(10).string(message.sourcePort)
    }
    if (message.sourceChannel !== '') {
      writer.uint32(18).string(message.sourceChannel)
    }
    if (message.metadataRef !== '') {
      writer.uint32(26).string(message.metadataRef)
    }
    if (message.sender !== '') {
      writer.uint32(34).string(message.sender)
    }
    if (message.receiver !== '') {
      writer.uint32(42).string(message.receiver)
    }
    if (message.tokenName !== '') {
      writer.uint32(50).string(message.tokenName)
    }
    if (message.tokenSymbol !== '') {
      writer.uint32(58).string(message.tokenSymbol)
    }
    if (message.didOwner !== '') {
      writer.uint32(66).string(message.didOwner)
    }
    if (message.price !== 0) {
      writer.uint32(72).uint64(message.price)
    }
    if (message.timeoutHeight !== 0) {
      writer.uint32(80).uint64(message.timeoutHeight)
    }
    if (message.timeoutTimestamp !== 0) {
      writer.uint32(88).uint64(message.timeoutTimestamp)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgMintSwap {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgMintSwap } as MsgMintSwap
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.sourcePort = reader.string()
          break
        case 2:
          message.sourceChannel = reader.string()
          break
        case 3:
          message.metadataRef = reader.string()
          break
        case 4:
          message.sender = reader.string()
          break
        case 5:
          message.receiver = reader.string()
          break
        case 6:
          message.tokenName = reader.string()
          break
        case 7:
          message.tokenSymbol = reader.string()
          break
        case 8:
          message.didOwner = reader.string()
          break
        case 9:
          message.price = longToNumber(reader.uint64() as Long)
          break
        case 10:
          message.timeoutHeight = longToNumber(reader.uint64() as Long)
          break
        case 11:
          message.timeoutTimestamp = longToNumber(reader.uint64() as Long)
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgMintSwap {
    const message = { ...baseMsgMintSwap } as MsgMintSwap
    if (object.sourcePort !== undefined && object.sourcePort !== null) {
      message.sourcePort = String(object.sourcePort)
    } else {
      message.sourcePort = ''
    }
    if (object.sourceChannel !== undefined && object.sourceChannel !== null) {
      message.sourceChannel = String(object.sourceChannel)
    } else {
      message.sourceChannel = ''
    }
    if (object.metadataRef !== undefined && object.metadataRef !== null) {
      message.metadataRef = String(object.metadataRef)
    } else {
      message.metadataRef = ''
    }
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = String(object.sender)
    } else {
      message.sender = ''
    }
    if (object.receiver !== undefined && object.receiver !== null) {
      message.receiver = String(object.receiver)
    } else {
      message.receiver = ''
    }
    if (object.tokenName !== undefined && object.tokenName !== null) {
      message.tokenName = String(object.tokenName)
    } else {
      message.tokenName = ''
    }
    if (object.tokenSymbol !== undefined && object.tokenSymbol !== null) {
      message.tokenSymbol = String(object.tokenSymbol)
    } else {
      message.tokenSymbol = ''
    }
    if (object.didOwner !== undefined && object.didOwner !== null) {
      message.didOwner = String(object.didOwner)
    } else {
      message.didOwner = ''
    }
    if (object.price !== undefined && object.price !== null) {
      message.price = Number(object.price)
    } else {
      message.price = 0
    }
    if (object.timeoutHeight !== undefined && object.timeoutHeight !== null) {
      message.timeoutHeight = Number(object.timeoutHeight)
    } else {
      message.timeoutHeight = 0
    }
    if (object.timeoutTimestamp !== undefined && object.timeoutTimestamp !== null) {
      message.timeoutTimestamp = Number(object.timeoutTimestamp)
    } else {
      message.timeoutTimestamp = 0
    }
    return message
  },

  toJSON(message: MsgMintSwap): unknown {
    const obj: any = {}
    message.sourcePort !== undefined && (obj.sourcePort = message.sourcePort)
    message.sourceChannel !== undefined && (obj.sourceChannel = message.sourceChannel)
    message.metadataRef !== undefined && (obj.metadataRef = message.metadataRef)
    message.sender !== undefined && (obj.sender = message.sender)
    message.receiver !== undefined && (obj.receiver = message.receiver)
    message.tokenName !== undefined && (obj.tokenName = message.tokenName)
    message.tokenSymbol !== undefined && (obj.tokenSymbol = message.tokenSymbol)
    message.didOwner !== undefined && (obj.didOwner = message.didOwner)
    message.price !== undefined && (obj.price = message.price)
    message.timeoutHeight !== undefined && (obj.timeoutHeight = message.timeoutHeight)
    message.timeoutTimestamp !== undefined && (obj.timeoutTimestamp = message.timeoutTimestamp)
    return obj
  },

  fromPartial(object: DeepPartial<MsgMintSwap>): MsgMintSwap {
    const message = { ...baseMsgMintSwap } as MsgMintSwap
    if (object.sourcePort !== undefined && object.sourcePort !== null) {
      message.sourcePort = object.sourcePort
    } else {
      message.sourcePort = ''
    }
    if (object.sourceChannel !== undefined && object.sourceChannel !== null) {
      message.sourceChannel = object.sourceChannel
    } else {
      message.sourceChannel = ''
    }
    if (object.metadataRef !== undefined && object.metadataRef !== null) {
      message.metadataRef = object.metadataRef
    } else {
      message.metadataRef = ''
    }
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender
    } else {
      message.sender = ''
    }
    if (object.receiver !== undefined && object.receiver !== null) {
      message.receiver = object.receiver
    } else {
      message.receiver = ''
    }
    if (object.tokenName !== undefined && object.tokenName !== null) {
      message.tokenName = object.tokenName
    } else {
      message.tokenName = ''
    }
    if (object.tokenSymbol !== undefined && object.tokenSymbol !== null) {
      message.tokenSymbol = object.tokenSymbol
    } else {
      message.tokenSymbol = ''
    }
    if (object.didOwner !== undefined && object.didOwner !== null) {
      message.didOwner = object.didOwner
    } else {
      message.didOwner = ''
    }
    if (object.price !== undefined && object.price !== null) {
      message.price = object.price
    } else {
      message.price = 0
    }
    if (object.timeoutHeight !== undefined && object.timeoutHeight !== null) {
      message.timeoutHeight = object.timeoutHeight
    } else {
      message.timeoutHeight = 0
    }
    if (object.timeoutTimestamp !== undefined && object.timeoutTimestamp !== null) {
      message.timeoutTimestamp = object.timeoutTimestamp
    } else {
      message.timeoutTimestamp = 0
    }
    return message
  }
}

const baseMsgMintSwapResponse: object = {}

export const MsgMintSwapResponse = {
  encode(_: MsgMintSwapResponse, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgMintSwapResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgMintSwapResponse } as MsgMintSwapResponse
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

  fromJSON(_: any): MsgMintSwapResponse {
    const message = { ...baseMsgMintSwapResponse } as MsgMintSwapResponse
    return message
  },

  toJSON(_: MsgMintSwapResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<MsgMintSwapResponse>): MsgMintSwapResponse {
    const message = { ...baseMsgMintSwapResponse } as MsgMintSwapResponse
    return message
  }
}

/** Msg defines the ibc/transfer Msg service. */
export interface Msg {
  /** MintSwap defines a rpc handler method for MsgMintSwap. */
  MintSwap(request: MsgMintSwap): Promise<MsgMintSwapResponse>
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc
  constructor(rpc: Rpc) {
    this.rpc = rpc
  }
  MintSwap(request: MsgMintSwap): Promise<MsgMintSwapResponse> {
    const data = MsgMintSwap.encode(request).finish()
    const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.mintswap.Msg', 'MintSwap', data)
    return promise.then((data) => MsgMintSwapResponse.decode(new Reader(data)))
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
