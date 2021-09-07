/* eslint-disable */
import * as Long from 'long'
import { util, configure, Writer, Reader } from 'protobufjs/minimal'
import { Coin } from '../cosmos/base/v1beta1/coin'
import { Duration } from '../google/protobuf/duration'

export const protobufPackage = 'ElectronicSignaturesIndustries.anconprotocol.anconprotocol'

/** HTLCState defines the state of an HTLC */
export enum HTLCState {
  /** HTLC_STATE_OPEN - HTLC_STATE_OPEN defines an open state. */
  HTLC_STATE_OPEN = 0,
  /** HTLC_STATE_COMPLETED - HTLC_STATE_COMPLETED defines a completed state. */
  HTLC_STATE_COMPLETED = 1,
  /** HTLC_STATE_REFUNDED - HTLC_STATE_REFUNDED defines a refunded state. */
  HTLC_STATE_REFUNDED = 2,
  UNRECOGNIZED = -1
}

export function hTLCStateFromJSON(object: any): HTLCState {
  switch (object) {
    case 0:
    case 'HTLC_STATE_OPEN':
      return HTLCState.HTLC_STATE_OPEN
    case 1:
    case 'HTLC_STATE_COMPLETED':
      return HTLCState.HTLC_STATE_COMPLETED
    case 2:
    case 'HTLC_STATE_REFUNDED':
      return HTLCState.HTLC_STATE_REFUNDED
    case -1:
    case 'UNRECOGNIZED':
    default:
      return HTLCState.UNRECOGNIZED
  }
}

export function hTLCStateToJSON(object: HTLCState): string {
  switch (object) {
    case HTLCState.HTLC_STATE_OPEN:
      return 'HTLC_STATE_OPEN'
    case HTLCState.HTLC_STATE_COMPLETED:
      return 'HTLC_STATE_COMPLETED'
    case HTLCState.HTLC_STATE_REFUNDED:
      return 'HTLC_STATE_REFUNDED'
    default:
      return 'UNKNOWN'
  }
}

/** SwapDirection defines the direction of an HTLT */
export enum SwapDirection {
  /** NONE - NONE defines an htlt none direction. */
  NONE = 0,
  /** INCOMING - INCOMING defines an htlt incoming direction. */
  INCOMING = 1,
  /** OUTGOING - OUTGOING defines an htlt outgoing direction. */
  OUTGOING = 2,
  UNRECOGNIZED = -1
}

export function swapDirectionFromJSON(object: any): SwapDirection {
  switch (object) {
    case 0:
    case 'NONE':
      return SwapDirection.NONE
    case 1:
    case 'INCOMING':
      return SwapDirection.INCOMING
    case 2:
    case 'OUTGOING':
      return SwapDirection.OUTGOING
    case -1:
    case 'UNRECOGNIZED':
    default:
      return SwapDirection.UNRECOGNIZED
  }
}

export function swapDirectionToJSON(object: SwapDirection): string {
  switch (object) {
    case SwapDirection.NONE:
      return 'NONE'
    case SwapDirection.INCOMING:
      return 'INCOMING'
    case SwapDirection.OUTGOING:
      return 'OUTGOING'
    default:
      return 'UNKNOWN'
  }
}

/** HTLC defines the struct of an HTLC */
export interface HTLC {
  id: string
  sender: string
  to: string
  receiverOnOtherChain: string
  senderOnOtherChain: string
  amount: Coin[]
  hashLock: string
  secret: string
  timestamp: number
  expirationHeight: number
  state: HTLCState
  closedBlock: number
  transfer: boolean
  direction: SwapDirection
}

export interface AssetSupply {
  incomingSupply: Coin | undefined
  outgoingSupply: Coin | undefined
  currentSupply: Coin | undefined
  timeLimitedCurrentSupply: Coin | undefined
  timeElapsed: Duration | undefined
}

/** Params defines token module's parameters */
export interface Params {
  assetParams: AssetParam[]
}

export interface AssetParam {
  /** name of the asset */
  denom: string
  /** asset supply limit */
  supplyLimit: SupplyLimit | undefined
  /** denotes if asset is available or paused */
  active: boolean
  /** the address of the relayer process */
  deputyAddress: string
  /** the fixed fee charged by the relayer process for outgoing swaps */
  fixedFee: string
  /** Minimum swap amount */
  minSwapAmount: string
  /** Maximum swap amount */
  maxSwapAmount: string
  /** Minimum swap block lock */
  minBlockLock: number
  /** Maximum swap block lock */
  maxBlockLock: number
}

export interface SupplyLimit {
  /** the absolute supply limit for an asset */
  limit: string
  /** boolean for if the supply is also limited by time */
  timeLimited: boolean
  /** the duration for which the supply time limit applies */
  timePeriod: Duration | undefined
  /** the supply limit for an asset for each time period */
  timeBasedLimit: string
}

const baseHTLC: object = {
  id: '',
  sender: '',
  to: '',
  receiverOnOtherChain: '',
  senderOnOtherChain: '',
  hashLock: '',
  secret: '',
  timestamp: 0,
  expirationHeight: 0,
  state: 0,
  closedBlock: 0,
  transfer: false,
  direction: 0
}

export const HTLC = {
  encode(message: HTLC, writer: Writer = Writer.create()): Writer {
    if (message.id !== '') {
      writer.uint32(10).string(message.id)
    }
    if (message.sender !== '') {
      writer.uint32(18).string(message.sender)
    }
    if (message.to !== '') {
      writer.uint32(26).string(message.to)
    }
    if (message.receiverOnOtherChain !== '') {
      writer.uint32(34).string(message.receiverOnOtherChain)
    }
    if (message.senderOnOtherChain !== '') {
      writer.uint32(42).string(message.senderOnOtherChain)
    }
    for (const v of message.amount) {
      Coin.encode(v!, writer.uint32(50).fork()).ldelim()
    }
    if (message.hashLock !== '') {
      writer.uint32(58).string(message.hashLock)
    }
    if (message.secret !== '') {
      writer.uint32(66).string(message.secret)
    }
    if (message.timestamp !== 0) {
      writer.uint32(72).uint64(message.timestamp)
    }
    if (message.expirationHeight !== 0) {
      writer.uint32(80).uint64(message.expirationHeight)
    }
    if (message.state !== 0) {
      writer.uint32(88).int32(message.state)
    }
    if (message.closedBlock !== 0) {
      writer.uint32(96).uint64(message.closedBlock)
    }
    if (message.transfer === true) {
      writer.uint32(104).bool(message.transfer)
    }
    if (message.direction !== 0) {
      writer.uint32(112).int32(message.direction)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): HTLC {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseHTLC } as HTLC
    message.amount = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string()
          break
        case 2:
          message.sender = reader.string()
          break
        case 3:
          message.to = reader.string()
          break
        case 4:
          message.receiverOnOtherChain = reader.string()
          break
        case 5:
          message.senderOnOtherChain = reader.string()
          break
        case 6:
          message.amount.push(Coin.decode(reader, reader.uint32()))
          break
        case 7:
          message.hashLock = reader.string()
          break
        case 8:
          message.secret = reader.string()
          break
        case 9:
          message.timestamp = longToNumber(reader.uint64() as Long)
          break
        case 10:
          message.expirationHeight = longToNumber(reader.uint64() as Long)
          break
        case 11:
          message.state = reader.int32() as any
          break
        case 12:
          message.closedBlock = longToNumber(reader.uint64() as Long)
          break
        case 13:
          message.transfer = reader.bool()
          break
        case 14:
          message.direction = reader.int32() as any
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): HTLC {
    const message = { ...baseHTLC } as HTLC
    message.amount = []
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id)
    } else {
      message.id = ''
    }
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = String(object.sender)
    } else {
      message.sender = ''
    }
    if (object.to !== undefined && object.to !== null) {
      message.to = String(object.to)
    } else {
      message.to = ''
    }
    if (object.receiverOnOtherChain !== undefined && object.receiverOnOtherChain !== null) {
      message.receiverOnOtherChain = String(object.receiverOnOtherChain)
    } else {
      message.receiverOnOtherChain = ''
    }
    if (object.senderOnOtherChain !== undefined && object.senderOnOtherChain !== null) {
      message.senderOnOtherChain = String(object.senderOnOtherChain)
    } else {
      message.senderOnOtherChain = ''
    }
    if (object.amount !== undefined && object.amount !== null) {
      for (const e of object.amount) {
        message.amount.push(Coin.fromJSON(e))
      }
    }
    if (object.hashLock !== undefined && object.hashLock !== null) {
      message.hashLock = String(object.hashLock)
    } else {
      message.hashLock = ''
    }
    if (object.secret !== undefined && object.secret !== null) {
      message.secret = String(object.secret)
    } else {
      message.secret = ''
    }
    if (object.timestamp !== undefined && object.timestamp !== null) {
      message.timestamp = Number(object.timestamp)
    } else {
      message.timestamp = 0
    }
    if (object.expirationHeight !== undefined && object.expirationHeight !== null) {
      message.expirationHeight = Number(object.expirationHeight)
    } else {
      message.expirationHeight = 0
    }
    if (object.state !== undefined && object.state !== null) {
      message.state = hTLCStateFromJSON(object.state)
    } else {
      message.state = 0
    }
    if (object.closedBlock !== undefined && object.closedBlock !== null) {
      message.closedBlock = Number(object.closedBlock)
    } else {
      message.closedBlock = 0
    }
    if (object.transfer !== undefined && object.transfer !== null) {
      message.transfer = Boolean(object.transfer)
    } else {
      message.transfer = false
    }
    if (object.direction !== undefined && object.direction !== null) {
      message.direction = swapDirectionFromJSON(object.direction)
    } else {
      message.direction = 0
    }
    return message
  },

  toJSON(message: HTLC): unknown {
    const obj: any = {}
    message.id !== undefined && (obj.id = message.id)
    message.sender !== undefined && (obj.sender = message.sender)
    message.to !== undefined && (obj.to = message.to)
    message.receiverOnOtherChain !== undefined && (obj.receiverOnOtherChain = message.receiverOnOtherChain)
    message.senderOnOtherChain !== undefined && (obj.senderOnOtherChain = message.senderOnOtherChain)
    if (message.amount) {
      obj.amount = message.amount.map((e) => (e ? Coin.toJSON(e) : undefined))
    } else {
      obj.amount = []
    }
    message.hashLock !== undefined && (obj.hashLock = message.hashLock)
    message.secret !== undefined && (obj.secret = message.secret)
    message.timestamp !== undefined && (obj.timestamp = message.timestamp)
    message.expirationHeight !== undefined && (obj.expirationHeight = message.expirationHeight)
    message.state !== undefined && (obj.state = hTLCStateToJSON(message.state))
    message.closedBlock !== undefined && (obj.closedBlock = message.closedBlock)
    message.transfer !== undefined && (obj.transfer = message.transfer)
    message.direction !== undefined && (obj.direction = swapDirectionToJSON(message.direction))
    return obj
  },

  fromPartial(object: DeepPartial<HTLC>): HTLC {
    const message = { ...baseHTLC } as HTLC
    message.amount = []
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id
    } else {
      message.id = ''
    }
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender
    } else {
      message.sender = ''
    }
    if (object.to !== undefined && object.to !== null) {
      message.to = object.to
    } else {
      message.to = ''
    }
    if (object.receiverOnOtherChain !== undefined && object.receiverOnOtherChain !== null) {
      message.receiverOnOtherChain = object.receiverOnOtherChain
    } else {
      message.receiverOnOtherChain = ''
    }
    if (object.senderOnOtherChain !== undefined && object.senderOnOtherChain !== null) {
      message.senderOnOtherChain = object.senderOnOtherChain
    } else {
      message.senderOnOtherChain = ''
    }
    if (object.amount !== undefined && object.amount !== null) {
      for (const e of object.amount) {
        message.amount.push(Coin.fromPartial(e))
      }
    }
    if (object.hashLock !== undefined && object.hashLock !== null) {
      message.hashLock = object.hashLock
    } else {
      message.hashLock = ''
    }
    if (object.secret !== undefined && object.secret !== null) {
      message.secret = object.secret
    } else {
      message.secret = ''
    }
    if (object.timestamp !== undefined && object.timestamp !== null) {
      message.timestamp = object.timestamp
    } else {
      message.timestamp = 0
    }
    if (object.expirationHeight !== undefined && object.expirationHeight !== null) {
      message.expirationHeight = object.expirationHeight
    } else {
      message.expirationHeight = 0
    }
    if (object.state !== undefined && object.state !== null) {
      message.state = object.state
    } else {
      message.state = 0
    }
    if (object.closedBlock !== undefined && object.closedBlock !== null) {
      message.closedBlock = object.closedBlock
    } else {
      message.closedBlock = 0
    }
    if (object.transfer !== undefined && object.transfer !== null) {
      message.transfer = object.transfer
    } else {
      message.transfer = false
    }
    if (object.direction !== undefined && object.direction !== null) {
      message.direction = object.direction
    } else {
      message.direction = 0
    }
    return message
  }
}

const baseAssetSupply: object = {}

export const AssetSupply = {
  encode(message: AssetSupply, writer: Writer = Writer.create()): Writer {
    if (message.incomingSupply !== undefined) {
      Coin.encode(message.incomingSupply, writer.uint32(10).fork()).ldelim()
    }
    if (message.outgoingSupply !== undefined) {
      Coin.encode(message.outgoingSupply, writer.uint32(18).fork()).ldelim()
    }
    if (message.currentSupply !== undefined) {
      Coin.encode(message.currentSupply, writer.uint32(26).fork()).ldelim()
    }
    if (message.timeLimitedCurrentSupply !== undefined) {
      Coin.encode(message.timeLimitedCurrentSupply, writer.uint32(34).fork()).ldelim()
    }
    if (message.timeElapsed !== undefined) {
      Duration.encode(message.timeElapsed, writer.uint32(42).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): AssetSupply {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseAssetSupply } as AssetSupply
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.incomingSupply = Coin.decode(reader, reader.uint32())
          break
        case 2:
          message.outgoingSupply = Coin.decode(reader, reader.uint32())
          break
        case 3:
          message.currentSupply = Coin.decode(reader, reader.uint32())
          break
        case 4:
          message.timeLimitedCurrentSupply = Coin.decode(reader, reader.uint32())
          break
        case 5:
          message.timeElapsed = Duration.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): AssetSupply {
    const message = { ...baseAssetSupply } as AssetSupply
    if (object.incomingSupply !== undefined && object.incomingSupply !== null) {
      message.incomingSupply = Coin.fromJSON(object.incomingSupply)
    } else {
      message.incomingSupply = undefined
    }
    if (object.outgoingSupply !== undefined && object.outgoingSupply !== null) {
      message.outgoingSupply = Coin.fromJSON(object.outgoingSupply)
    } else {
      message.outgoingSupply = undefined
    }
    if (object.currentSupply !== undefined && object.currentSupply !== null) {
      message.currentSupply = Coin.fromJSON(object.currentSupply)
    } else {
      message.currentSupply = undefined
    }
    if (object.timeLimitedCurrentSupply !== undefined && object.timeLimitedCurrentSupply !== null) {
      message.timeLimitedCurrentSupply = Coin.fromJSON(object.timeLimitedCurrentSupply)
    } else {
      message.timeLimitedCurrentSupply = undefined
    }
    if (object.timeElapsed !== undefined && object.timeElapsed !== null) {
      message.timeElapsed = Duration.fromJSON(object.timeElapsed)
    } else {
      message.timeElapsed = undefined
    }
    return message
  },

  toJSON(message: AssetSupply): unknown {
    const obj: any = {}
    message.incomingSupply !== undefined && (obj.incomingSupply = message.incomingSupply ? Coin.toJSON(message.incomingSupply) : undefined)
    message.outgoingSupply !== undefined && (obj.outgoingSupply = message.outgoingSupply ? Coin.toJSON(message.outgoingSupply) : undefined)
    message.currentSupply !== undefined && (obj.currentSupply = message.currentSupply ? Coin.toJSON(message.currentSupply) : undefined)
    message.timeLimitedCurrentSupply !== undefined &&
      (obj.timeLimitedCurrentSupply = message.timeLimitedCurrentSupply ? Coin.toJSON(message.timeLimitedCurrentSupply) : undefined)
    message.timeElapsed !== undefined && (obj.timeElapsed = message.timeElapsed ? Duration.toJSON(message.timeElapsed) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<AssetSupply>): AssetSupply {
    const message = { ...baseAssetSupply } as AssetSupply
    if (object.incomingSupply !== undefined && object.incomingSupply !== null) {
      message.incomingSupply = Coin.fromPartial(object.incomingSupply)
    } else {
      message.incomingSupply = undefined
    }
    if (object.outgoingSupply !== undefined && object.outgoingSupply !== null) {
      message.outgoingSupply = Coin.fromPartial(object.outgoingSupply)
    } else {
      message.outgoingSupply = undefined
    }
    if (object.currentSupply !== undefined && object.currentSupply !== null) {
      message.currentSupply = Coin.fromPartial(object.currentSupply)
    } else {
      message.currentSupply = undefined
    }
    if (object.timeLimitedCurrentSupply !== undefined && object.timeLimitedCurrentSupply !== null) {
      message.timeLimitedCurrentSupply = Coin.fromPartial(object.timeLimitedCurrentSupply)
    } else {
      message.timeLimitedCurrentSupply = undefined
    }
    if (object.timeElapsed !== undefined && object.timeElapsed !== null) {
      message.timeElapsed = Duration.fromPartial(object.timeElapsed)
    } else {
      message.timeElapsed = undefined
    }
    return message
  }
}

const baseParams: object = {}

export const Params = {
  encode(message: Params, writer: Writer = Writer.create()): Writer {
    for (const v of message.assetParams) {
      AssetParam.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): Params {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseParams } as Params
    message.assetParams = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.assetParams.push(AssetParam.decode(reader, reader.uint32()))
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): Params {
    const message = { ...baseParams } as Params
    message.assetParams = []
    if (object.assetParams !== undefined && object.assetParams !== null) {
      for (const e of object.assetParams) {
        message.assetParams.push(AssetParam.fromJSON(e))
      }
    }
    return message
  },

  toJSON(message: Params): unknown {
    const obj: any = {}
    if (message.assetParams) {
      obj.assetParams = message.assetParams.map((e) => (e ? AssetParam.toJSON(e) : undefined))
    } else {
      obj.assetParams = []
    }
    return obj
  },

  fromPartial(object: DeepPartial<Params>): Params {
    const message = { ...baseParams } as Params
    message.assetParams = []
    if (object.assetParams !== undefined && object.assetParams !== null) {
      for (const e of object.assetParams) {
        message.assetParams.push(AssetParam.fromPartial(e))
      }
    }
    return message
  }
}

const baseAssetParam: object = {
  denom: '',
  active: false,
  deputyAddress: '',
  fixedFee: '',
  minSwapAmount: '',
  maxSwapAmount: '',
  minBlockLock: 0,
  maxBlockLock: 0
}

export const AssetParam = {
  encode(message: AssetParam, writer: Writer = Writer.create()): Writer {
    if (message.denom !== '') {
      writer.uint32(10).string(message.denom)
    }
    if (message.supplyLimit !== undefined) {
      SupplyLimit.encode(message.supplyLimit, writer.uint32(18).fork()).ldelim()
    }
    if (message.active === true) {
      writer.uint32(24).bool(message.active)
    }
    if (message.deputyAddress !== '') {
      writer.uint32(34).string(message.deputyAddress)
    }
    if (message.fixedFee !== '') {
      writer.uint32(42).string(message.fixedFee)
    }
    if (message.minSwapAmount !== '') {
      writer.uint32(50).string(message.minSwapAmount)
    }
    if (message.maxSwapAmount !== '') {
      writer.uint32(58).string(message.maxSwapAmount)
    }
    if (message.minBlockLock !== 0) {
      writer.uint32(64).uint64(message.minBlockLock)
    }
    if (message.maxBlockLock !== 0) {
      writer.uint32(72).uint64(message.maxBlockLock)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): AssetParam {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseAssetParam } as AssetParam
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string()
          break
        case 2:
          message.supplyLimit = SupplyLimit.decode(reader, reader.uint32())
          break
        case 3:
          message.active = reader.bool()
          break
        case 4:
          message.deputyAddress = reader.string()
          break
        case 5:
          message.fixedFee = reader.string()
          break
        case 6:
          message.minSwapAmount = reader.string()
          break
        case 7:
          message.maxSwapAmount = reader.string()
          break
        case 8:
          message.minBlockLock = longToNumber(reader.uint64() as Long)
          break
        case 9:
          message.maxBlockLock = longToNumber(reader.uint64() as Long)
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): AssetParam {
    const message = { ...baseAssetParam } as AssetParam
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = String(object.denom)
    } else {
      message.denom = ''
    }
    if (object.supplyLimit !== undefined && object.supplyLimit !== null) {
      message.supplyLimit = SupplyLimit.fromJSON(object.supplyLimit)
    } else {
      message.supplyLimit = undefined
    }
    if (object.active !== undefined && object.active !== null) {
      message.active = Boolean(object.active)
    } else {
      message.active = false
    }
    if (object.deputyAddress !== undefined && object.deputyAddress !== null) {
      message.deputyAddress = String(object.deputyAddress)
    } else {
      message.deputyAddress = ''
    }
    if (object.fixedFee !== undefined && object.fixedFee !== null) {
      message.fixedFee = String(object.fixedFee)
    } else {
      message.fixedFee = ''
    }
    if (object.minSwapAmount !== undefined && object.minSwapAmount !== null) {
      message.minSwapAmount = String(object.minSwapAmount)
    } else {
      message.minSwapAmount = ''
    }
    if (object.maxSwapAmount !== undefined && object.maxSwapAmount !== null) {
      message.maxSwapAmount = String(object.maxSwapAmount)
    } else {
      message.maxSwapAmount = ''
    }
    if (object.minBlockLock !== undefined && object.minBlockLock !== null) {
      message.minBlockLock = Number(object.minBlockLock)
    } else {
      message.minBlockLock = 0
    }
    if (object.maxBlockLock !== undefined && object.maxBlockLock !== null) {
      message.maxBlockLock = Number(object.maxBlockLock)
    } else {
      message.maxBlockLock = 0
    }
    return message
  },

  toJSON(message: AssetParam): unknown {
    const obj: any = {}
    message.denom !== undefined && (obj.denom = message.denom)
    message.supplyLimit !== undefined && (obj.supplyLimit = message.supplyLimit ? SupplyLimit.toJSON(message.supplyLimit) : undefined)
    message.active !== undefined && (obj.active = message.active)
    message.deputyAddress !== undefined && (obj.deputyAddress = message.deputyAddress)
    message.fixedFee !== undefined && (obj.fixedFee = message.fixedFee)
    message.minSwapAmount !== undefined && (obj.minSwapAmount = message.minSwapAmount)
    message.maxSwapAmount !== undefined && (obj.maxSwapAmount = message.maxSwapAmount)
    message.minBlockLock !== undefined && (obj.minBlockLock = message.minBlockLock)
    message.maxBlockLock !== undefined && (obj.maxBlockLock = message.maxBlockLock)
    return obj
  },

  fromPartial(object: DeepPartial<AssetParam>): AssetParam {
    const message = { ...baseAssetParam } as AssetParam
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom
    } else {
      message.denom = ''
    }
    if (object.supplyLimit !== undefined && object.supplyLimit !== null) {
      message.supplyLimit = SupplyLimit.fromPartial(object.supplyLimit)
    } else {
      message.supplyLimit = undefined
    }
    if (object.active !== undefined && object.active !== null) {
      message.active = object.active
    } else {
      message.active = false
    }
    if (object.deputyAddress !== undefined && object.deputyAddress !== null) {
      message.deputyAddress = object.deputyAddress
    } else {
      message.deputyAddress = ''
    }
    if (object.fixedFee !== undefined && object.fixedFee !== null) {
      message.fixedFee = object.fixedFee
    } else {
      message.fixedFee = ''
    }
    if (object.minSwapAmount !== undefined && object.minSwapAmount !== null) {
      message.minSwapAmount = object.minSwapAmount
    } else {
      message.minSwapAmount = ''
    }
    if (object.maxSwapAmount !== undefined && object.maxSwapAmount !== null) {
      message.maxSwapAmount = object.maxSwapAmount
    } else {
      message.maxSwapAmount = ''
    }
    if (object.minBlockLock !== undefined && object.minBlockLock !== null) {
      message.minBlockLock = object.minBlockLock
    } else {
      message.minBlockLock = 0
    }
    if (object.maxBlockLock !== undefined && object.maxBlockLock !== null) {
      message.maxBlockLock = object.maxBlockLock
    } else {
      message.maxBlockLock = 0
    }
    return message
  }
}

const baseSupplyLimit: object = { limit: '', timeLimited: false, timeBasedLimit: '' }

export const SupplyLimit = {
  encode(message: SupplyLimit, writer: Writer = Writer.create()): Writer {
    if (message.limit !== '') {
      writer.uint32(10).string(message.limit)
    }
    if (message.timeLimited === true) {
      writer.uint32(16).bool(message.timeLimited)
    }
    if (message.timePeriod !== undefined) {
      Duration.encode(message.timePeriod, writer.uint32(26).fork()).ldelim()
    }
    if (message.timeBasedLimit !== '') {
      writer.uint32(34).string(message.timeBasedLimit)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): SupplyLimit {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseSupplyLimit } as SupplyLimit
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.limit = reader.string()
          break
        case 2:
          message.timeLimited = reader.bool()
          break
        case 3:
          message.timePeriod = Duration.decode(reader, reader.uint32())
          break
        case 4:
          message.timeBasedLimit = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): SupplyLimit {
    const message = { ...baseSupplyLimit } as SupplyLimit
    if (object.limit !== undefined && object.limit !== null) {
      message.limit = String(object.limit)
    } else {
      message.limit = ''
    }
    if (object.timeLimited !== undefined && object.timeLimited !== null) {
      message.timeLimited = Boolean(object.timeLimited)
    } else {
      message.timeLimited = false
    }
    if (object.timePeriod !== undefined && object.timePeriod !== null) {
      message.timePeriod = Duration.fromJSON(object.timePeriod)
    } else {
      message.timePeriod = undefined
    }
    if (object.timeBasedLimit !== undefined && object.timeBasedLimit !== null) {
      message.timeBasedLimit = String(object.timeBasedLimit)
    } else {
      message.timeBasedLimit = ''
    }
    return message
  },

  toJSON(message: SupplyLimit): unknown {
    const obj: any = {}
    message.limit !== undefined && (obj.limit = message.limit)
    message.timeLimited !== undefined && (obj.timeLimited = message.timeLimited)
    message.timePeriod !== undefined && (obj.timePeriod = message.timePeriod ? Duration.toJSON(message.timePeriod) : undefined)
    message.timeBasedLimit !== undefined && (obj.timeBasedLimit = message.timeBasedLimit)
    return obj
  },

  fromPartial(object: DeepPartial<SupplyLimit>): SupplyLimit {
    const message = { ...baseSupplyLimit } as SupplyLimit
    if (object.limit !== undefined && object.limit !== null) {
      message.limit = object.limit
    } else {
      message.limit = ''
    }
    if (object.timeLimited !== undefined && object.timeLimited !== null) {
      message.timeLimited = object.timeLimited
    } else {
      message.timeLimited = false
    }
    if (object.timePeriod !== undefined && object.timePeriod !== null) {
      message.timePeriod = Duration.fromPartial(object.timePeriod)
    } else {
      message.timePeriod = undefined
    }
    if (object.timeBasedLimit !== undefined && object.timeBasedLimit !== null) {
      message.timeBasedLimit = object.timeBasedLimit
    } else {
      message.timeBasedLimit = ''
    }
    return message
  }
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
