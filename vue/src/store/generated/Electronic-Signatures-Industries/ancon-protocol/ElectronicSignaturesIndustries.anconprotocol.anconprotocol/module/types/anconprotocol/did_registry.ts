/* eslint-disable */
import * as Long from 'long'
import { util, configure, Writer, Reader } from 'protobufjs/minimal'

export const protobufPackage = 'ElectronicSignaturesIndustries.anconprotocol.anconprotocol'

/** BaseNFT defines a non-fungible token */
export interface Voucher {
  /** ---------------------- */
  name: string
  uri: string
  owner: string
  didRecipient: string
  price: number
  /** ---------------------- */
  r: string
  s: string
  v: number
}

export interface DIDOwner {
  identity: string
  owner: string
  /** internal use eg. did:ancon:{hex-bech32} */
  didAncon: string
  didKey: string
  didWeb: string
  didWebDeactivated: boolean
  vanityName: string
}

export interface DIDWebRoute {
  name: string
  route: string
  cid: string
}

export interface Delegate {
  delegate: string
  delegateType: string
  validity: number
  creator: string
  identity: string
}

export interface Change {
  identity: string
  owner: string
  previousChange: number
}

export interface Attribute {
  identity: string
  name: Uint8Array
  value: Uint8Array
}

const baseVoucher: object = { name: '', uri: '', owner: '', didRecipient: '', price: 0, r: '', s: '', v: 0 }

export const Voucher = {
  encode(message: Voucher, writer: Writer = Writer.create()): Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name)
    }
    if (message.uri !== '') {
      writer.uint32(18).string(message.uri)
    }
    if (message.owner !== '') {
      writer.uint32(26).string(message.owner)
    }
    if (message.didRecipient !== '') {
      writer.uint32(34).string(message.didRecipient)
    }
    if (message.price !== 0) {
      writer.uint32(40).uint64(message.price)
    }
    if (message.r !== '') {
      writer.uint32(50).string(message.r)
    }
    if (message.s !== '') {
      writer.uint32(58).string(message.s)
    }
    if (message.v !== 0) {
      writer.uint32(64).uint64(message.v)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): Voucher {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseVoucher } as Voucher
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string()
          break
        case 2:
          message.uri = reader.string()
          break
        case 3:
          message.owner = reader.string()
          break
        case 4:
          message.didRecipient = reader.string()
          break
        case 5:
          message.price = longToNumber(reader.uint64() as Long)
          break
        case 6:
          message.r = reader.string()
          break
        case 7:
          message.s = reader.string()
          break
        case 8:
          message.v = longToNumber(reader.uint64() as Long)
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): Voucher {
    const message = { ...baseVoucher } as Voucher
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name)
    } else {
      message.name = ''
    }
    if (object.uri !== undefined && object.uri !== null) {
      message.uri = String(object.uri)
    } else {
      message.uri = ''
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = String(object.owner)
    } else {
      message.owner = ''
    }
    if (object.didRecipient !== undefined && object.didRecipient !== null) {
      message.didRecipient = String(object.didRecipient)
    } else {
      message.didRecipient = ''
    }
    if (object.price !== undefined && object.price !== null) {
      message.price = Number(object.price)
    } else {
      message.price = 0
    }
    if (object.r !== undefined && object.r !== null) {
      message.r = String(object.r)
    } else {
      message.r = ''
    }
    if (object.s !== undefined && object.s !== null) {
      message.s = String(object.s)
    } else {
      message.s = ''
    }
    if (object.v !== undefined && object.v !== null) {
      message.v = Number(object.v)
    } else {
      message.v = 0
    }
    return message
  },

  toJSON(message: Voucher): unknown {
    const obj: any = {}
    message.name !== undefined && (obj.name = message.name)
    message.uri !== undefined && (obj.uri = message.uri)
    message.owner !== undefined && (obj.owner = message.owner)
    message.didRecipient !== undefined && (obj.didRecipient = message.didRecipient)
    message.price !== undefined && (obj.price = message.price)
    message.r !== undefined && (obj.r = message.r)
    message.s !== undefined && (obj.s = message.s)
    message.v !== undefined && (obj.v = message.v)
    return obj
  },

  fromPartial(object: DeepPartial<Voucher>): Voucher {
    const message = { ...baseVoucher } as Voucher
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name
    } else {
      message.name = ''
    }
    if (object.uri !== undefined && object.uri !== null) {
      message.uri = object.uri
    } else {
      message.uri = ''
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner
    } else {
      message.owner = ''
    }
    if (object.didRecipient !== undefined && object.didRecipient !== null) {
      message.didRecipient = object.didRecipient
    } else {
      message.didRecipient = ''
    }
    if (object.price !== undefined && object.price !== null) {
      message.price = object.price
    } else {
      message.price = 0
    }
    if (object.r !== undefined && object.r !== null) {
      message.r = object.r
    } else {
      message.r = ''
    }
    if (object.s !== undefined && object.s !== null) {
      message.s = object.s
    } else {
      message.s = ''
    }
    if (object.v !== undefined && object.v !== null) {
      message.v = object.v
    } else {
      message.v = 0
    }
    return message
  }
}

const baseDIDOwner: object = { identity: '', owner: '', didAncon: '', didKey: '', didWeb: '', didWebDeactivated: false, vanityName: '' }

export const DIDOwner = {
  encode(message: DIDOwner, writer: Writer = Writer.create()): Writer {
    if (message.identity !== '') {
      writer.uint32(10).string(message.identity)
    }
    if (message.owner !== '') {
      writer.uint32(18).string(message.owner)
    }
    if (message.didAncon !== '') {
      writer.uint32(26).string(message.didAncon)
    }
    if (message.didKey !== '') {
      writer.uint32(34).string(message.didKey)
    }
    if (message.didWeb !== '') {
      writer.uint32(42).string(message.didWeb)
    }
    if (message.didWebDeactivated === true) {
      writer.uint32(48).bool(message.didWebDeactivated)
    }
    if (message.vanityName !== '') {
      writer.uint32(58).string(message.vanityName)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): DIDOwner {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseDIDOwner } as DIDOwner
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.identity = reader.string()
          break
        case 2:
          message.owner = reader.string()
          break
        case 3:
          message.didAncon = reader.string()
          break
        case 4:
          message.didKey = reader.string()
          break
        case 5:
          message.didWeb = reader.string()
          break
        case 6:
          message.didWebDeactivated = reader.bool()
          break
        case 7:
          message.vanityName = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): DIDOwner {
    const message = { ...baseDIDOwner } as DIDOwner
    if (object.identity !== undefined && object.identity !== null) {
      message.identity = String(object.identity)
    } else {
      message.identity = ''
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = String(object.owner)
    } else {
      message.owner = ''
    }
    if (object.didAncon !== undefined && object.didAncon !== null) {
      message.didAncon = String(object.didAncon)
    } else {
      message.didAncon = ''
    }
    if (object.didKey !== undefined && object.didKey !== null) {
      message.didKey = String(object.didKey)
    } else {
      message.didKey = ''
    }
    if (object.didWeb !== undefined && object.didWeb !== null) {
      message.didWeb = String(object.didWeb)
    } else {
      message.didWeb = ''
    }
    if (object.didWebDeactivated !== undefined && object.didWebDeactivated !== null) {
      message.didWebDeactivated = Boolean(object.didWebDeactivated)
    } else {
      message.didWebDeactivated = false
    }
    if (object.vanityName !== undefined && object.vanityName !== null) {
      message.vanityName = String(object.vanityName)
    } else {
      message.vanityName = ''
    }
    return message
  },

  toJSON(message: DIDOwner): unknown {
    const obj: any = {}
    message.identity !== undefined && (obj.identity = message.identity)
    message.owner !== undefined && (obj.owner = message.owner)
    message.didAncon !== undefined && (obj.didAncon = message.didAncon)
    message.didKey !== undefined && (obj.didKey = message.didKey)
    message.didWeb !== undefined && (obj.didWeb = message.didWeb)
    message.didWebDeactivated !== undefined && (obj.didWebDeactivated = message.didWebDeactivated)
    message.vanityName !== undefined && (obj.vanityName = message.vanityName)
    return obj
  },

  fromPartial(object: DeepPartial<DIDOwner>): DIDOwner {
    const message = { ...baseDIDOwner } as DIDOwner
    if (object.identity !== undefined && object.identity !== null) {
      message.identity = object.identity
    } else {
      message.identity = ''
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner
    } else {
      message.owner = ''
    }
    if (object.didAncon !== undefined && object.didAncon !== null) {
      message.didAncon = object.didAncon
    } else {
      message.didAncon = ''
    }
    if (object.didKey !== undefined && object.didKey !== null) {
      message.didKey = object.didKey
    } else {
      message.didKey = ''
    }
    if (object.didWeb !== undefined && object.didWeb !== null) {
      message.didWeb = object.didWeb
    } else {
      message.didWeb = ''
    }
    if (object.didWebDeactivated !== undefined && object.didWebDeactivated !== null) {
      message.didWebDeactivated = object.didWebDeactivated
    } else {
      message.didWebDeactivated = false
    }
    if (object.vanityName !== undefined && object.vanityName !== null) {
      message.vanityName = object.vanityName
    } else {
      message.vanityName = ''
    }
    return message
  }
}

const baseDIDWebRoute: object = { name: '', route: '', cid: '' }

export const DIDWebRoute = {
  encode(message: DIDWebRoute, writer: Writer = Writer.create()): Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name)
    }
    if (message.route !== '') {
      writer.uint32(18).string(message.route)
    }
    if (message.cid !== '') {
      writer.uint32(26).string(message.cid)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): DIDWebRoute {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseDIDWebRoute } as DIDWebRoute
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string()
          break
        case 2:
          message.route = reader.string()
          break
        case 3:
          message.cid = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): DIDWebRoute {
    const message = { ...baseDIDWebRoute } as DIDWebRoute
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name)
    } else {
      message.name = ''
    }
    if (object.route !== undefined && object.route !== null) {
      message.route = String(object.route)
    } else {
      message.route = ''
    }
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = String(object.cid)
    } else {
      message.cid = ''
    }
    return message
  },

  toJSON(message: DIDWebRoute): unknown {
    const obj: any = {}
    message.name !== undefined && (obj.name = message.name)
    message.route !== undefined && (obj.route = message.route)
    message.cid !== undefined && (obj.cid = message.cid)
    return obj
  },

  fromPartial(object: DeepPartial<DIDWebRoute>): DIDWebRoute {
    const message = { ...baseDIDWebRoute } as DIDWebRoute
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name
    } else {
      message.name = ''
    }
    if (object.route !== undefined && object.route !== null) {
      message.route = object.route
    } else {
      message.route = ''
    }
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = object.cid
    } else {
      message.cid = ''
    }
    return message
  }
}

const baseDelegate: object = { delegate: '', delegateType: '', validity: 0, creator: '', identity: '' }

export const Delegate = {
  encode(message: Delegate, writer: Writer = Writer.create()): Writer {
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
    if (message.identity !== '') {
      writer.uint32(42).string(message.identity)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): Delegate {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseDelegate } as Delegate
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
        case 5:
          message.identity = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): Delegate {
    const message = { ...baseDelegate } as Delegate
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
    if (object.identity !== undefined && object.identity !== null) {
      message.identity = String(object.identity)
    } else {
      message.identity = ''
    }
    return message
  },

  toJSON(message: Delegate): unknown {
    const obj: any = {}
    message.delegate !== undefined && (obj.delegate = message.delegate)
    message.delegateType !== undefined && (obj.delegateType = message.delegateType)
    message.validity !== undefined && (obj.validity = message.validity)
    message.creator !== undefined && (obj.creator = message.creator)
    message.identity !== undefined && (obj.identity = message.identity)
    return obj
  },

  fromPartial(object: DeepPartial<Delegate>): Delegate {
    const message = { ...baseDelegate } as Delegate
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
    if (object.identity !== undefined && object.identity !== null) {
      message.identity = object.identity
    } else {
      message.identity = ''
    }
    return message
  }
}

const baseChange: object = { identity: '', owner: '', previousChange: 0 }

export const Change = {
  encode(message: Change, writer: Writer = Writer.create()): Writer {
    if (message.identity !== '') {
      writer.uint32(10).string(message.identity)
    }
    if (message.owner !== '') {
      writer.uint32(18).string(message.owner)
    }
    if (message.previousChange !== 0) {
      writer.uint32(24).uint64(message.previousChange)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): Change {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseChange } as Change
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.identity = reader.string()
          break
        case 2:
          message.owner = reader.string()
          break
        case 3:
          message.previousChange = longToNumber(reader.uint64() as Long)
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): Change {
    const message = { ...baseChange } as Change
    if (object.identity !== undefined && object.identity !== null) {
      message.identity = String(object.identity)
    } else {
      message.identity = ''
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = String(object.owner)
    } else {
      message.owner = ''
    }
    if (object.previousChange !== undefined && object.previousChange !== null) {
      message.previousChange = Number(object.previousChange)
    } else {
      message.previousChange = 0
    }
    return message
  },

  toJSON(message: Change): unknown {
    const obj: any = {}
    message.identity !== undefined && (obj.identity = message.identity)
    message.owner !== undefined && (obj.owner = message.owner)
    message.previousChange !== undefined && (obj.previousChange = message.previousChange)
    return obj
  },

  fromPartial(object: DeepPartial<Change>): Change {
    const message = { ...baseChange } as Change
    if (object.identity !== undefined && object.identity !== null) {
      message.identity = object.identity
    } else {
      message.identity = ''
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner
    } else {
      message.owner = ''
    }
    if (object.previousChange !== undefined && object.previousChange !== null) {
      message.previousChange = object.previousChange
    } else {
      message.previousChange = 0
    }
    return message
  }
}

const baseAttribute: object = { identity: '' }

export const Attribute = {
  encode(message: Attribute, writer: Writer = Writer.create()): Writer {
    if (message.identity !== '') {
      writer.uint32(10).string(message.identity)
    }
    if (message.name.length !== 0) {
      writer.uint32(18).bytes(message.name)
    }
    if (message.value.length !== 0) {
      writer.uint32(26).bytes(message.value)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): Attribute {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseAttribute } as Attribute
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.identity = reader.string()
          break
        case 2:
          message.name = reader.bytes()
          break
        case 3:
          message.value = reader.bytes()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): Attribute {
    const message = { ...baseAttribute } as Attribute
    if (object.identity !== undefined && object.identity !== null) {
      message.identity = String(object.identity)
    } else {
      message.identity = ''
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = bytesFromBase64(object.name)
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = bytesFromBase64(object.value)
    }
    return message
  },

  toJSON(message: Attribute): unknown {
    const obj: any = {}
    message.identity !== undefined && (obj.identity = message.identity)
    message.name !== undefined && (obj.name = base64FromBytes(message.name !== undefined ? message.name : new Uint8Array()))
    message.value !== undefined && (obj.value = base64FromBytes(message.value !== undefined ? message.value : new Uint8Array()))
    return obj
  },

  fromPartial(object: DeepPartial<Attribute>): Attribute {
    const message = { ...baseAttribute } as Attribute
    if (object.identity !== undefined && object.identity !== null) {
      message.identity = object.identity
    } else {
      message.identity = ''
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name
    } else {
      message.name = new Uint8Array()
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value
    } else {
      message.value = new Uint8Array()
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
