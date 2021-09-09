/* eslint-disable */
import { Reader, util, configure, Writer } from 'protobufjs/minimal'
import * as Long from 'long'

export const protobufPackage = 'ElectronicSignaturesIndustries.anconprotocol.anconprotocol'

export interface MsgChangeOwner {
  creator: string
  identity: string
  newOwner: string
}

export interface MsgChangeOwnerResponse {
  identity: string
  owner: string
  previousChange: number
}

export interface MsgGrantDelegate {
  delegate: string
  delegateType: string
  validity: number
  creator: string
  identity: string
}

export interface MsgGrantDelegateResponse {
  hash: Uint8Array
}

export interface MsgRevokeDelegate {
  delegate: string
  delegateType: string
  validity: number
  creator: string
  identity: string
}

export interface MsgRevokeDelegateResponse {
  hash: Uint8Array
}

export interface MsgSetAttribute {
  identity: string
  actor: string
  creator: string
  name: Uint8Array
  value: Uint8Array
}

export interface MsgSetAttributeResponse {
  hash: Uint8Array
}

export interface MsgGrantAttribute {
  identity: string
  actor: string
  name: Uint8Array
  value: Uint8Array
  creator: string
}

export interface MsgGrantAttributeResponse {
  hash: Uint8Array
}

export interface MsgRevokeAttribute {
  identity: string
  actor: string
  name: Uint8Array
  value: Uint8Array
  creator: string
}

export interface MsgRevokeAttributeResponse {
  hash: Uint8Array
}

export interface MsgFileMetadataResponse {
  hash: Uint8Array
}

export interface MsgMetadata {
  creator: string
  name: string
  description: string
  image: string
  owner: string
  parent: string
  sources: string
  links: string
  verifiedCredentialRef: string
  did: string
  from: string
}

export interface MsgMetadataResponse {
  cid: string
}

export interface MsgFile {
  creator: string
  path: string
  content: string
  mode: string
  time: string
  contentType: string
  did: string
  from: string
}

export interface MsgFileResponse {
  hash: string
}

const baseMsgChangeOwner: object = { creator: '', identity: '', newOwner: '' }

export const MsgChangeOwner = {
  encode(message: MsgChangeOwner, writer: Writer = Writer.create()): Writer {
    if (message.creator !== '') {
      writer.uint32(10).string(message.creator)
    }
    if (message.identity !== '') {
      writer.uint32(18).string(message.identity)
    }
    if (message.newOwner !== '') {
      writer.uint32(26).string(message.newOwner)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgChangeOwner {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgChangeOwner } as MsgChangeOwner
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string()
          break
        case 2:
          message.identity = reader.string()
          break
        case 3:
          message.newOwner = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgChangeOwner {
    const message = { ...baseMsgChangeOwner } as MsgChangeOwner
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
    if (object.newOwner !== undefined && object.newOwner !== null) {
      message.newOwner = String(object.newOwner)
    } else {
      message.newOwner = ''
    }
    return message
  },

  toJSON(message: MsgChangeOwner): unknown {
    const obj: any = {}
    message.creator !== undefined && (obj.creator = message.creator)
    message.identity !== undefined && (obj.identity = message.identity)
    message.newOwner !== undefined && (obj.newOwner = message.newOwner)
    return obj
  },

  fromPartial(object: DeepPartial<MsgChangeOwner>): MsgChangeOwner {
    const message = { ...baseMsgChangeOwner } as MsgChangeOwner
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
    if (object.newOwner !== undefined && object.newOwner !== null) {
      message.newOwner = object.newOwner
    } else {
      message.newOwner = ''
    }
    return message
  }
}

const baseMsgChangeOwnerResponse: object = { identity: '', owner: '', previousChange: 0 }

export const MsgChangeOwnerResponse = {
  encode(message: MsgChangeOwnerResponse, writer: Writer = Writer.create()): Writer {
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

  decode(input: Reader | Uint8Array, length?: number): MsgChangeOwnerResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgChangeOwnerResponse } as MsgChangeOwnerResponse
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

  fromJSON(object: any): MsgChangeOwnerResponse {
    const message = { ...baseMsgChangeOwnerResponse } as MsgChangeOwnerResponse
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

  toJSON(message: MsgChangeOwnerResponse): unknown {
    const obj: any = {}
    message.identity !== undefined && (obj.identity = message.identity)
    message.owner !== undefined && (obj.owner = message.owner)
    message.previousChange !== undefined && (obj.previousChange = message.previousChange)
    return obj
  },

  fromPartial(object: DeepPartial<MsgChangeOwnerResponse>): MsgChangeOwnerResponse {
    const message = { ...baseMsgChangeOwnerResponse } as MsgChangeOwnerResponse
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

const baseMsgGrantDelegate: object = { delegate: '', delegateType: '', validity: 0, creator: '', identity: '' }

export const MsgGrantDelegate = {
  encode(message: MsgGrantDelegate, writer: Writer = Writer.create()): Writer {
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

  decode(input: Reader | Uint8Array, length?: number): MsgGrantDelegate {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgGrantDelegate } as MsgGrantDelegate
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

  fromJSON(object: any): MsgGrantDelegate {
    const message = { ...baseMsgGrantDelegate } as MsgGrantDelegate
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

  toJSON(message: MsgGrantDelegate): unknown {
    const obj: any = {}
    message.delegate !== undefined && (obj.delegate = message.delegate)
    message.delegateType !== undefined && (obj.delegateType = message.delegateType)
    message.validity !== undefined && (obj.validity = message.validity)
    message.creator !== undefined && (obj.creator = message.creator)
    message.identity !== undefined && (obj.identity = message.identity)
    return obj
  },

  fromPartial(object: DeepPartial<MsgGrantDelegate>): MsgGrantDelegate {
    const message = { ...baseMsgGrantDelegate } as MsgGrantDelegate
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

const baseMsgGrantDelegateResponse: object = {}

export const MsgGrantDelegateResponse = {
  encode(message: MsgGrantDelegateResponse, writer: Writer = Writer.create()): Writer {
    if (message.hash.length !== 0) {
      writer.uint32(10).bytes(message.hash)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgGrantDelegateResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgGrantDelegateResponse } as MsgGrantDelegateResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.hash = reader.bytes()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgGrantDelegateResponse {
    const message = { ...baseMsgGrantDelegateResponse } as MsgGrantDelegateResponse
    if (object.hash !== undefined && object.hash !== null) {
      message.hash = bytesFromBase64(object.hash)
    }
    return message
  },

  toJSON(message: MsgGrantDelegateResponse): unknown {
    const obj: any = {}
    message.hash !== undefined && (obj.hash = base64FromBytes(message.hash !== undefined ? message.hash : new Uint8Array()))
    return obj
  },

  fromPartial(object: DeepPartial<MsgGrantDelegateResponse>): MsgGrantDelegateResponse {
    const message = { ...baseMsgGrantDelegateResponse } as MsgGrantDelegateResponse
    if (object.hash !== undefined && object.hash !== null) {
      message.hash = object.hash
    } else {
      message.hash = new Uint8Array()
    }
    return message
  }
}

const baseMsgRevokeDelegate: object = { delegate: '', delegateType: '', validity: 0, creator: '', identity: '' }

export const MsgRevokeDelegate = {
  encode(message: MsgRevokeDelegate, writer: Writer = Writer.create()): Writer {
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

  decode(input: Reader | Uint8Array, length?: number): MsgRevokeDelegate {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgRevokeDelegate } as MsgRevokeDelegate
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

  fromJSON(object: any): MsgRevokeDelegate {
    const message = { ...baseMsgRevokeDelegate } as MsgRevokeDelegate
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

  toJSON(message: MsgRevokeDelegate): unknown {
    const obj: any = {}
    message.delegate !== undefined && (obj.delegate = message.delegate)
    message.delegateType !== undefined && (obj.delegateType = message.delegateType)
    message.validity !== undefined && (obj.validity = message.validity)
    message.creator !== undefined && (obj.creator = message.creator)
    message.identity !== undefined && (obj.identity = message.identity)
    return obj
  },

  fromPartial(object: DeepPartial<MsgRevokeDelegate>): MsgRevokeDelegate {
    const message = { ...baseMsgRevokeDelegate } as MsgRevokeDelegate
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

const baseMsgRevokeDelegateResponse: object = {}

export const MsgRevokeDelegateResponse = {
  encode(message: MsgRevokeDelegateResponse, writer: Writer = Writer.create()): Writer {
    if (message.hash.length !== 0) {
      writer.uint32(10).bytes(message.hash)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgRevokeDelegateResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgRevokeDelegateResponse } as MsgRevokeDelegateResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.hash = reader.bytes()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgRevokeDelegateResponse {
    const message = { ...baseMsgRevokeDelegateResponse } as MsgRevokeDelegateResponse
    if (object.hash !== undefined && object.hash !== null) {
      message.hash = bytesFromBase64(object.hash)
    }
    return message
  },

  toJSON(message: MsgRevokeDelegateResponse): unknown {
    const obj: any = {}
    message.hash !== undefined && (obj.hash = base64FromBytes(message.hash !== undefined ? message.hash : new Uint8Array()))
    return obj
  },

  fromPartial(object: DeepPartial<MsgRevokeDelegateResponse>): MsgRevokeDelegateResponse {
    const message = { ...baseMsgRevokeDelegateResponse } as MsgRevokeDelegateResponse
    if (object.hash !== undefined && object.hash !== null) {
      message.hash = object.hash
    } else {
      message.hash = new Uint8Array()
    }
    return message
  }
}

const baseMsgSetAttribute: object = { identity: '', actor: '', creator: '' }

export const MsgSetAttribute = {
  encode(message: MsgSetAttribute, writer: Writer = Writer.create()): Writer {
    if (message.identity !== '') {
      writer.uint32(10).string(message.identity)
    }
    if (message.actor !== '') {
      writer.uint32(18).string(message.actor)
    }
    if (message.creator !== '') {
      writer.uint32(26).string(message.creator)
    }
    if (message.name.length !== 0) {
      writer.uint32(34).bytes(message.name)
    }
    if (message.value.length !== 0) {
      writer.uint32(42).bytes(message.value)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgSetAttribute {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgSetAttribute } as MsgSetAttribute
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.identity = reader.string()
          break
        case 2:
          message.actor = reader.string()
          break
        case 3:
          message.creator = reader.string()
          break
        case 4:
          message.name = reader.bytes()
          break
        case 5:
          message.value = reader.bytes()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgSetAttribute {
    const message = { ...baseMsgSetAttribute } as MsgSetAttribute
    if (object.identity !== undefined && object.identity !== null) {
      message.identity = String(object.identity)
    } else {
      message.identity = ''
    }
    if (object.actor !== undefined && object.actor !== null) {
      message.actor = String(object.actor)
    } else {
      message.actor = ''
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator)
    } else {
      message.creator = ''
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = bytesFromBase64(object.name)
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = bytesFromBase64(object.value)
    }
    return message
  },

  toJSON(message: MsgSetAttribute): unknown {
    const obj: any = {}
    message.identity !== undefined && (obj.identity = message.identity)
    message.actor !== undefined && (obj.actor = message.actor)
    message.creator !== undefined && (obj.creator = message.creator)
    message.name !== undefined && (obj.name = base64FromBytes(message.name !== undefined ? message.name : new Uint8Array()))
    message.value !== undefined && (obj.value = base64FromBytes(message.value !== undefined ? message.value : new Uint8Array()))
    return obj
  },

  fromPartial(object: DeepPartial<MsgSetAttribute>): MsgSetAttribute {
    const message = { ...baseMsgSetAttribute } as MsgSetAttribute
    if (object.identity !== undefined && object.identity !== null) {
      message.identity = object.identity
    } else {
      message.identity = ''
    }
    if (object.actor !== undefined && object.actor !== null) {
      message.actor = object.actor
    } else {
      message.actor = ''
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator
    } else {
      message.creator = ''
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

const baseMsgSetAttributeResponse: object = {}

export const MsgSetAttributeResponse = {
  encode(message: MsgSetAttributeResponse, writer: Writer = Writer.create()): Writer {
    if (message.hash.length !== 0) {
      writer.uint32(10).bytes(message.hash)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgSetAttributeResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgSetAttributeResponse } as MsgSetAttributeResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.hash = reader.bytes()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgSetAttributeResponse {
    const message = { ...baseMsgSetAttributeResponse } as MsgSetAttributeResponse
    if (object.hash !== undefined && object.hash !== null) {
      message.hash = bytesFromBase64(object.hash)
    }
    return message
  },

  toJSON(message: MsgSetAttributeResponse): unknown {
    const obj: any = {}
    message.hash !== undefined && (obj.hash = base64FromBytes(message.hash !== undefined ? message.hash : new Uint8Array()))
    return obj
  },

  fromPartial(object: DeepPartial<MsgSetAttributeResponse>): MsgSetAttributeResponse {
    const message = { ...baseMsgSetAttributeResponse } as MsgSetAttributeResponse
    if (object.hash !== undefined && object.hash !== null) {
      message.hash = object.hash
    } else {
      message.hash = new Uint8Array()
    }
    return message
  }
}

const baseMsgGrantAttribute: object = { identity: '', actor: '', creator: '' }

export const MsgGrantAttribute = {
  encode(message: MsgGrantAttribute, writer: Writer = Writer.create()): Writer {
    if (message.identity !== '') {
      writer.uint32(10).string(message.identity)
    }
    if (message.actor !== '') {
      writer.uint32(18).string(message.actor)
    }
    if (message.name.length !== 0) {
      writer.uint32(26).bytes(message.name)
    }
    if (message.value.length !== 0) {
      writer.uint32(34).bytes(message.value)
    }
    if (message.creator !== '') {
      writer.uint32(42).string(message.creator)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgGrantAttribute {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgGrantAttribute } as MsgGrantAttribute
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.identity = reader.string()
          break
        case 2:
          message.actor = reader.string()
          break
        case 3:
          message.name = reader.bytes()
          break
        case 4:
          message.value = reader.bytes()
          break
        case 5:
          message.creator = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgGrantAttribute {
    const message = { ...baseMsgGrantAttribute } as MsgGrantAttribute
    if (object.identity !== undefined && object.identity !== null) {
      message.identity = String(object.identity)
    } else {
      message.identity = ''
    }
    if (object.actor !== undefined && object.actor !== null) {
      message.actor = String(object.actor)
    } else {
      message.actor = ''
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = bytesFromBase64(object.name)
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = bytesFromBase64(object.value)
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator)
    } else {
      message.creator = ''
    }
    return message
  },

  toJSON(message: MsgGrantAttribute): unknown {
    const obj: any = {}
    message.identity !== undefined && (obj.identity = message.identity)
    message.actor !== undefined && (obj.actor = message.actor)
    message.name !== undefined && (obj.name = base64FromBytes(message.name !== undefined ? message.name : new Uint8Array()))
    message.value !== undefined && (obj.value = base64FromBytes(message.value !== undefined ? message.value : new Uint8Array()))
    message.creator !== undefined && (obj.creator = message.creator)
    return obj
  },

  fromPartial(object: DeepPartial<MsgGrantAttribute>): MsgGrantAttribute {
    const message = { ...baseMsgGrantAttribute } as MsgGrantAttribute
    if (object.identity !== undefined && object.identity !== null) {
      message.identity = object.identity
    } else {
      message.identity = ''
    }
    if (object.actor !== undefined && object.actor !== null) {
      message.actor = object.actor
    } else {
      message.actor = ''
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
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator
    } else {
      message.creator = ''
    }
    return message
  }
}

const baseMsgGrantAttributeResponse: object = {}

export const MsgGrantAttributeResponse = {
  encode(message: MsgGrantAttributeResponse, writer: Writer = Writer.create()): Writer {
    if (message.hash.length !== 0) {
      writer.uint32(10).bytes(message.hash)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgGrantAttributeResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgGrantAttributeResponse } as MsgGrantAttributeResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.hash = reader.bytes()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgGrantAttributeResponse {
    const message = { ...baseMsgGrantAttributeResponse } as MsgGrantAttributeResponse
    if (object.hash !== undefined && object.hash !== null) {
      message.hash = bytesFromBase64(object.hash)
    }
    return message
  },

  toJSON(message: MsgGrantAttributeResponse): unknown {
    const obj: any = {}
    message.hash !== undefined && (obj.hash = base64FromBytes(message.hash !== undefined ? message.hash : new Uint8Array()))
    return obj
  },

  fromPartial(object: DeepPartial<MsgGrantAttributeResponse>): MsgGrantAttributeResponse {
    const message = { ...baseMsgGrantAttributeResponse } as MsgGrantAttributeResponse
    if (object.hash !== undefined && object.hash !== null) {
      message.hash = object.hash
    } else {
      message.hash = new Uint8Array()
    }
    return message
  }
}

const baseMsgRevokeAttribute: object = { identity: '', actor: '', creator: '' }

export const MsgRevokeAttribute = {
  encode(message: MsgRevokeAttribute, writer: Writer = Writer.create()): Writer {
    if (message.identity !== '') {
      writer.uint32(10).string(message.identity)
    }
    if (message.actor !== '') {
      writer.uint32(18).string(message.actor)
    }
    if (message.name.length !== 0) {
      writer.uint32(26).bytes(message.name)
    }
    if (message.value.length !== 0) {
      writer.uint32(34).bytes(message.value)
    }
    if (message.creator !== '') {
      writer.uint32(42).string(message.creator)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgRevokeAttribute {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgRevokeAttribute } as MsgRevokeAttribute
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.identity = reader.string()
          break
        case 2:
          message.actor = reader.string()
          break
        case 3:
          message.name = reader.bytes()
          break
        case 4:
          message.value = reader.bytes()
          break
        case 5:
          message.creator = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgRevokeAttribute {
    const message = { ...baseMsgRevokeAttribute } as MsgRevokeAttribute
    if (object.identity !== undefined && object.identity !== null) {
      message.identity = String(object.identity)
    } else {
      message.identity = ''
    }
    if (object.actor !== undefined && object.actor !== null) {
      message.actor = String(object.actor)
    } else {
      message.actor = ''
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = bytesFromBase64(object.name)
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = bytesFromBase64(object.value)
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator)
    } else {
      message.creator = ''
    }
    return message
  },

  toJSON(message: MsgRevokeAttribute): unknown {
    const obj: any = {}
    message.identity !== undefined && (obj.identity = message.identity)
    message.actor !== undefined && (obj.actor = message.actor)
    message.name !== undefined && (obj.name = base64FromBytes(message.name !== undefined ? message.name : new Uint8Array()))
    message.value !== undefined && (obj.value = base64FromBytes(message.value !== undefined ? message.value : new Uint8Array()))
    message.creator !== undefined && (obj.creator = message.creator)
    return obj
  },

  fromPartial(object: DeepPartial<MsgRevokeAttribute>): MsgRevokeAttribute {
    const message = { ...baseMsgRevokeAttribute } as MsgRevokeAttribute
    if (object.identity !== undefined && object.identity !== null) {
      message.identity = object.identity
    } else {
      message.identity = ''
    }
    if (object.actor !== undefined && object.actor !== null) {
      message.actor = object.actor
    } else {
      message.actor = ''
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
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator
    } else {
      message.creator = ''
    }
    return message
  }
}

const baseMsgRevokeAttributeResponse: object = {}

export const MsgRevokeAttributeResponse = {
  encode(message: MsgRevokeAttributeResponse, writer: Writer = Writer.create()): Writer {
    if (message.hash.length !== 0) {
      writer.uint32(10).bytes(message.hash)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgRevokeAttributeResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgRevokeAttributeResponse } as MsgRevokeAttributeResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.hash = reader.bytes()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgRevokeAttributeResponse {
    const message = { ...baseMsgRevokeAttributeResponse } as MsgRevokeAttributeResponse
    if (object.hash !== undefined && object.hash !== null) {
      message.hash = bytesFromBase64(object.hash)
    }
    return message
  },

  toJSON(message: MsgRevokeAttributeResponse): unknown {
    const obj: any = {}
    message.hash !== undefined && (obj.hash = base64FromBytes(message.hash !== undefined ? message.hash : new Uint8Array()))
    return obj
  },

  fromPartial(object: DeepPartial<MsgRevokeAttributeResponse>): MsgRevokeAttributeResponse {
    const message = { ...baseMsgRevokeAttributeResponse } as MsgRevokeAttributeResponse
    if (object.hash !== undefined && object.hash !== null) {
      message.hash = object.hash
    } else {
      message.hash = new Uint8Array()
    }
    return message
  }
}

const baseMsgFileMetadataResponse: object = {}

export const MsgFileMetadataResponse = {
  encode(message: MsgFileMetadataResponse, writer: Writer = Writer.create()): Writer {
    if (message.hash.length !== 0) {
      writer.uint32(10).bytes(message.hash)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgFileMetadataResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgFileMetadataResponse } as MsgFileMetadataResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.hash = reader.bytes()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgFileMetadataResponse {
    const message = { ...baseMsgFileMetadataResponse } as MsgFileMetadataResponse
    if (object.hash !== undefined && object.hash !== null) {
      message.hash = bytesFromBase64(object.hash)
    }
    return message
  },

  toJSON(message: MsgFileMetadataResponse): unknown {
    const obj: any = {}
    message.hash !== undefined && (obj.hash = base64FromBytes(message.hash !== undefined ? message.hash : new Uint8Array()))
    return obj
  },

  fromPartial(object: DeepPartial<MsgFileMetadataResponse>): MsgFileMetadataResponse {
    const message = { ...baseMsgFileMetadataResponse } as MsgFileMetadataResponse
    if (object.hash !== undefined && object.hash !== null) {
      message.hash = object.hash
    } else {
      message.hash = new Uint8Array()
    }
    return message
  }
}

const baseMsgMetadata: object = {
  creator: '',
  name: '',
  description: '',
  image: '',
  owner: '',
  parent: '',
  sources: '',
  links: '',
  verifiedCredentialRef: '',
  did: '',
  from: ''
}

export const MsgMetadata = {
  encode(message: MsgMetadata, writer: Writer = Writer.create()): Writer {
    if (message.creator !== '') {
      writer.uint32(10).string(message.creator)
    }
    if (message.name !== '') {
      writer.uint32(18).string(message.name)
    }
    if (message.description !== '') {
      writer.uint32(26).string(message.description)
    }
    if (message.image !== '') {
      writer.uint32(34).string(message.image)
    }
    if (message.owner !== '') {
      writer.uint32(42).string(message.owner)
    }
    if (message.parent !== '') {
      writer.uint32(50).string(message.parent)
    }
    if (message.sources !== '') {
      writer.uint32(58).string(message.sources)
    }
    if (message.links !== '') {
      writer.uint32(66).string(message.links)
    }
    if (message.verifiedCredentialRef !== '') {
      writer.uint32(74).string(message.verifiedCredentialRef)
    }
    if (message.did !== '') {
      writer.uint32(82).string(message.did)
    }
    if (message.from !== '') {
      writer.uint32(90).string(message.from)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgMetadata {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgMetadata } as MsgMetadata
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string()
          break
        case 2:
          message.name = reader.string()
          break
        case 3:
          message.description = reader.string()
          break
        case 4:
          message.image = reader.string()
          break
        case 5:
          message.owner = reader.string()
          break
        case 6:
          message.parent = reader.string()
          break
        case 7:
          message.sources = reader.string()
          break
        case 8:
          message.links = reader.string()
          break
        case 9:
          message.verifiedCredentialRef = reader.string()
          break
        case 10:
          message.did = reader.string()
          break
        case 11:
          message.from = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgMetadata {
    const message = { ...baseMsgMetadata } as MsgMetadata
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator)
    } else {
      message.creator = ''
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name)
    } else {
      message.name = ''
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description)
    } else {
      message.description = ''
    }
    if (object.image !== undefined && object.image !== null) {
      message.image = String(object.image)
    } else {
      message.image = ''
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = String(object.owner)
    } else {
      message.owner = ''
    }
    if (object.parent !== undefined && object.parent !== null) {
      message.parent = String(object.parent)
    } else {
      message.parent = ''
    }
    if (object.sources !== undefined && object.sources !== null) {
      message.sources = String(object.sources)
    } else {
      message.sources = ''
    }
    if (object.links !== undefined && object.links !== null) {
      message.links = String(object.links)
    } else {
      message.links = ''
    }
    if (object.verifiedCredentialRef !== undefined && object.verifiedCredentialRef !== null) {
      message.verifiedCredentialRef = String(object.verifiedCredentialRef)
    } else {
      message.verifiedCredentialRef = ''
    }
    if (object.did !== undefined && object.did !== null) {
      message.did = String(object.did)
    } else {
      message.did = ''
    }
    if (object.from !== undefined && object.from !== null) {
      message.from = String(object.from)
    } else {
      message.from = ''
    }
    return message
  },

  toJSON(message: MsgMetadata): unknown {
    const obj: any = {}
    message.creator !== undefined && (obj.creator = message.creator)
    message.name !== undefined && (obj.name = message.name)
    message.description !== undefined && (obj.description = message.description)
    message.image !== undefined && (obj.image = message.image)
    message.owner !== undefined && (obj.owner = message.owner)
    message.parent !== undefined && (obj.parent = message.parent)
    message.sources !== undefined && (obj.sources = message.sources)
    message.links !== undefined && (obj.links = message.links)
    message.verifiedCredentialRef !== undefined && (obj.verifiedCredentialRef = message.verifiedCredentialRef)
    message.did !== undefined && (obj.did = message.did)
    message.from !== undefined && (obj.from = message.from)
    return obj
  },

  fromPartial(object: DeepPartial<MsgMetadata>): MsgMetadata {
    const message = { ...baseMsgMetadata } as MsgMetadata
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator
    } else {
      message.creator = ''
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name
    } else {
      message.name = ''
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description
    } else {
      message.description = ''
    }
    if (object.image !== undefined && object.image !== null) {
      message.image = object.image
    } else {
      message.image = ''
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner
    } else {
      message.owner = ''
    }
    if (object.parent !== undefined && object.parent !== null) {
      message.parent = object.parent
    } else {
      message.parent = ''
    }
    if (object.sources !== undefined && object.sources !== null) {
      message.sources = object.sources
    } else {
      message.sources = ''
    }
    if (object.links !== undefined && object.links !== null) {
      message.links = object.links
    } else {
      message.links = ''
    }
    if (object.verifiedCredentialRef !== undefined && object.verifiedCredentialRef !== null) {
      message.verifiedCredentialRef = object.verifiedCredentialRef
    } else {
      message.verifiedCredentialRef = ''
    }
    if (object.did !== undefined && object.did !== null) {
      message.did = object.did
    } else {
      message.did = ''
    }
    if (object.from !== undefined && object.from !== null) {
      message.from = object.from
    } else {
      message.from = ''
    }
    return message
  }
}

const baseMsgMetadataResponse: object = { cid: '' }

export const MsgMetadataResponse = {
  encode(message: MsgMetadataResponse, writer: Writer = Writer.create()): Writer {
    if (message.cid !== '') {
      writer.uint32(10).string(message.cid)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgMetadataResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgMetadataResponse } as MsgMetadataResponse
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

  fromJSON(object: any): MsgMetadataResponse {
    const message = { ...baseMsgMetadataResponse } as MsgMetadataResponse
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = String(object.cid)
    } else {
      message.cid = ''
    }
    return message
  },

  toJSON(message: MsgMetadataResponse): unknown {
    const obj: any = {}
    message.cid !== undefined && (obj.cid = message.cid)
    return obj
  },

  fromPartial(object: DeepPartial<MsgMetadataResponse>): MsgMetadataResponse {
    const message = { ...baseMsgMetadataResponse } as MsgMetadataResponse
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = object.cid
    } else {
      message.cid = ''
    }
    return message
  }
}

const baseMsgFile: object = { creator: '', path: '', content: '', mode: '', time: '', contentType: '', did: '', from: '' }

export const MsgFile = {
  encode(message: MsgFile, writer: Writer = Writer.create()): Writer {
    if (message.creator !== '') {
      writer.uint32(10).string(message.creator)
    }
    if (message.path !== '') {
      writer.uint32(18).string(message.path)
    }
    if (message.content !== '') {
      writer.uint32(26).string(message.content)
    }
    if (message.mode !== '') {
      writer.uint32(34).string(message.mode)
    }
    if (message.time !== '') {
      writer.uint32(42).string(message.time)
    }
    if (message.contentType !== '') {
      writer.uint32(50).string(message.contentType)
    }
    if (message.did !== '') {
      writer.uint32(58).string(message.did)
    }
    if (message.from !== '') {
      writer.uint32(66).string(message.from)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgFile {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgFile } as MsgFile
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string()
          break
        case 2:
          message.path = reader.string()
          break
        case 3:
          message.content = reader.string()
          break
        case 4:
          message.mode = reader.string()
          break
        case 5:
          message.time = reader.string()
          break
        case 6:
          message.contentType = reader.string()
          break
        case 7:
          message.did = reader.string()
          break
        case 8:
          message.from = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgFile {
    const message = { ...baseMsgFile } as MsgFile
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator)
    } else {
      message.creator = ''
    }
    if (object.path !== undefined && object.path !== null) {
      message.path = String(object.path)
    } else {
      message.path = ''
    }
    if (object.content !== undefined && object.content !== null) {
      message.content = String(object.content)
    } else {
      message.content = ''
    }
    if (object.mode !== undefined && object.mode !== null) {
      message.mode = String(object.mode)
    } else {
      message.mode = ''
    }
    if (object.time !== undefined && object.time !== null) {
      message.time = String(object.time)
    } else {
      message.time = ''
    }
    if (object.contentType !== undefined && object.contentType !== null) {
      message.contentType = String(object.contentType)
    } else {
      message.contentType = ''
    }
    if (object.did !== undefined && object.did !== null) {
      message.did = String(object.did)
    } else {
      message.did = ''
    }
    if (object.from !== undefined && object.from !== null) {
      message.from = String(object.from)
    } else {
      message.from = ''
    }
    return message
  },

  toJSON(message: MsgFile): unknown {
    const obj: any = {}
    message.creator !== undefined && (obj.creator = message.creator)
    message.path !== undefined && (obj.path = message.path)
    message.content !== undefined && (obj.content = message.content)
    message.mode !== undefined && (obj.mode = message.mode)
    message.time !== undefined && (obj.time = message.time)
    message.contentType !== undefined && (obj.contentType = message.contentType)
    message.did !== undefined && (obj.did = message.did)
    message.from !== undefined && (obj.from = message.from)
    return obj
  },

  fromPartial(object: DeepPartial<MsgFile>): MsgFile {
    const message = { ...baseMsgFile } as MsgFile
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator
    } else {
      message.creator = ''
    }
    if (object.path !== undefined && object.path !== null) {
      message.path = object.path
    } else {
      message.path = ''
    }
    if (object.content !== undefined && object.content !== null) {
      message.content = object.content
    } else {
      message.content = ''
    }
    if (object.mode !== undefined && object.mode !== null) {
      message.mode = object.mode
    } else {
      message.mode = ''
    }
    if (object.time !== undefined && object.time !== null) {
      message.time = object.time
    } else {
      message.time = ''
    }
    if (object.contentType !== undefined && object.contentType !== null) {
      message.contentType = object.contentType
    } else {
      message.contentType = ''
    }
    if (object.did !== undefined && object.did !== null) {
      message.did = object.did
    } else {
      message.did = ''
    }
    if (object.from !== undefined && object.from !== null) {
      message.from = object.from
    } else {
      message.from = ''
    }
    return message
  }
}

const baseMsgFileResponse: object = { hash: '' }

export const MsgFileResponse = {
  encode(message: MsgFileResponse, writer: Writer = Writer.create()): Writer {
    if (message.hash !== '') {
      writer.uint32(10).string(message.hash)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgFileResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgFileResponse } as MsgFileResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.hash = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgFileResponse {
    const message = { ...baseMsgFileResponse } as MsgFileResponse
    if (object.hash !== undefined && object.hash !== null) {
      message.hash = String(object.hash)
    } else {
      message.hash = ''
    }
    return message
  },

  toJSON(message: MsgFileResponse): unknown {
    const obj: any = {}
    message.hash !== undefined && (obj.hash = message.hash)
    return obj
  },

  fromPartial(object: DeepPartial<MsgFileResponse>): MsgFileResponse {
    const message = { ...baseMsgFileResponse } as MsgFileResponse
    if (object.hash !== undefined && object.hash !== null) {
      message.hash = object.hash
    } else {
      message.hash = ''
    }
    return message
  }
}

/** Msg defines the Msg service. */
export interface Msg {
  /**
   * rpc MetadataHandlerTx(MsgMetadataTx) returns (MsgFileMetadataResponse);
   * rpc FileHandlerTx(MsgFileTx) returns (MsgFileMetadataResponse);
   * this line is used by starport scaffolding # proto/tx/rpc
   */
  ChangeOwner(request: MsgChangeOwner): Promise<MsgChangeOwnerResponse>
  /** rpc ValidDelegate(MsgValidDelegate) returns (MsgValidDelegateResponse); */
  RevokeDelegate(request: MsgRevokeDelegate): Promise<MsgRevokeDelegateResponse>
  GrantDelegate(request: MsgGrantDelegate): Promise<MsgGrantDelegateResponse>
  GrantAttribute(request: MsgGrantAttribute): Promise<MsgGrantAttributeResponse>
  /** rpc SetAttribute(MsgSetAttribute) returns (MsgSetAttributeResponse); */
  RevokeAttribute(request: MsgRevokeAttribute): Promise<MsgRevokeAttributeResponse>
  Metadata(request: MsgMetadata): Promise<MsgMetadataResponse>
  /** rpc CreateDid (MsgCreateDid) returns (MsgCreateDidResponse) */
  File(request: MsgFile): Promise<MsgFileResponse>
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc
  constructor(rpc: Rpc) {
    this.rpc = rpc
  }
  ChangeOwner(request: MsgChangeOwner): Promise<MsgChangeOwnerResponse> {
    const data = MsgChangeOwner.encode(request).finish()
    const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Msg', 'ChangeOwner', data)
    return promise.then((data) => MsgChangeOwnerResponse.decode(new Reader(data)))
  }

  RevokeDelegate(request: MsgRevokeDelegate): Promise<MsgRevokeDelegateResponse> {
    const data = MsgRevokeDelegate.encode(request).finish()
    const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Msg', 'RevokeDelegate', data)
    return promise.then((data) => MsgRevokeDelegateResponse.decode(new Reader(data)))
  }

  GrantDelegate(request: MsgGrantDelegate): Promise<MsgGrantDelegateResponse> {
    const data = MsgGrantDelegate.encode(request).finish()
    const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Msg', 'GrantDelegate', data)
    return promise.then((data) => MsgGrantDelegateResponse.decode(new Reader(data)))
  }

  GrantAttribute(request: MsgGrantAttribute): Promise<MsgGrantAttributeResponse> {
    const data = MsgGrantAttribute.encode(request).finish()
    const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Msg', 'GrantAttribute', data)
    return promise.then((data) => MsgGrantAttributeResponse.decode(new Reader(data)))
  }

  RevokeAttribute(request: MsgRevokeAttribute): Promise<MsgRevokeAttributeResponse> {
    const data = MsgRevokeAttribute.encode(request).finish()
    const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Msg', 'RevokeAttribute', data)
    return promise.then((data) => MsgRevokeAttributeResponse.decode(new Reader(data)))
  }

  Metadata(request: MsgMetadata): Promise<MsgMetadataResponse> {
    const data = MsgMetadata.encode(request).finish()
    const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Msg', 'Metadata', data)
    return promise.then((data) => MsgMetadataResponse.decode(new Reader(data)))
  }

  File(request: MsgFile): Promise<MsgFileResponse> {
    const data = MsgFile.encode(request).finish()
    const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Msg', 'File', data)
    return promise.then((data) => MsgFileResponse.decode(new Reader(data)))
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
