/* eslint-disable */
import { Reader, Writer } from 'protobufjs/minimal'

export const protobufPackage = 'ElectronicSignaturesIndustries.anconprotocol.anconprotocol'

export interface MsgChangeOwner {
  creator: string
}

export interface MsgChangeOwnerResponse {
  hash: Uint8Array
}

export interface MsgAddDelegate {
  creator: string
}

export interface MsgAddDelegateResponse {
  hash: Uint8Array
}

export interface MsgRevokeDelegate {
  creator: string
}

export interface MsgRevokeDelegateResponse {
  hash: Uint8Array
}

export interface MsgSetAttribute {
  creator: string
}

export interface MsgSetAttributeResponse {
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

const baseMsgChangeOwner: object = { creator: '' }

export const MsgChangeOwner = {
  encode(message: MsgChangeOwner, writer: Writer = Writer.create()): Writer {
    if (message.creator !== '') {
      writer.uint32(10).string(message.creator)
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
    return message
  },

  toJSON(message: MsgChangeOwner): unknown {
    const obj: any = {}
    message.creator !== undefined && (obj.creator = message.creator)
    return obj
  },

  fromPartial(object: DeepPartial<MsgChangeOwner>): MsgChangeOwner {
    const message = { ...baseMsgChangeOwner } as MsgChangeOwner
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator
    } else {
      message.creator = ''
    }
    return message
  }
}

const baseMsgChangeOwnerResponse: object = {}

export const MsgChangeOwnerResponse = {
  encode(message: MsgChangeOwnerResponse, writer: Writer = Writer.create()): Writer {
    if (message.hash.length !== 0) {
      writer.uint32(10).bytes(message.hash)
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
          message.hash = reader.bytes()
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
    if (object.hash !== undefined && object.hash !== null) {
      message.hash = bytesFromBase64(object.hash)
    }
    return message
  },

  toJSON(message: MsgChangeOwnerResponse): unknown {
    const obj: any = {}
    message.hash !== undefined && (obj.hash = base64FromBytes(message.hash !== undefined ? message.hash : new Uint8Array()))
    return obj
  },

  fromPartial(object: DeepPartial<MsgChangeOwnerResponse>): MsgChangeOwnerResponse {
    const message = { ...baseMsgChangeOwnerResponse } as MsgChangeOwnerResponse
    if (object.hash !== undefined && object.hash !== null) {
      message.hash = object.hash
    } else {
      message.hash = new Uint8Array()
    }
    return message
  }
}

const baseMsgAddDelegate: object = { creator: '' }

export const MsgAddDelegate = {
  encode(message: MsgAddDelegate, writer: Writer = Writer.create()): Writer {
    if (message.creator !== '') {
      writer.uint32(10).string(message.creator)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgAddDelegate {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgAddDelegate } as MsgAddDelegate
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgAddDelegate {
    const message = { ...baseMsgAddDelegate } as MsgAddDelegate
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator)
    } else {
      message.creator = ''
    }
    return message
  },

  toJSON(message: MsgAddDelegate): unknown {
    const obj: any = {}
    message.creator !== undefined && (obj.creator = message.creator)
    return obj
  },

  fromPartial(object: DeepPartial<MsgAddDelegate>): MsgAddDelegate {
    const message = { ...baseMsgAddDelegate } as MsgAddDelegate
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator
    } else {
      message.creator = ''
    }
    return message
  }
}

const baseMsgAddDelegateResponse: object = {}

export const MsgAddDelegateResponse = {
  encode(message: MsgAddDelegateResponse, writer: Writer = Writer.create()): Writer {
    if (message.hash.length !== 0) {
      writer.uint32(10).bytes(message.hash)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgAddDelegateResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgAddDelegateResponse } as MsgAddDelegateResponse
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

  fromJSON(object: any): MsgAddDelegateResponse {
    const message = { ...baseMsgAddDelegateResponse } as MsgAddDelegateResponse
    if (object.hash !== undefined && object.hash !== null) {
      message.hash = bytesFromBase64(object.hash)
    }
    return message
  },

  toJSON(message: MsgAddDelegateResponse): unknown {
    const obj: any = {}
    message.hash !== undefined && (obj.hash = base64FromBytes(message.hash !== undefined ? message.hash : new Uint8Array()))
    return obj
  },

  fromPartial(object: DeepPartial<MsgAddDelegateResponse>): MsgAddDelegateResponse {
    const message = { ...baseMsgAddDelegateResponse } as MsgAddDelegateResponse
    if (object.hash !== undefined && object.hash !== null) {
      message.hash = object.hash
    } else {
      message.hash = new Uint8Array()
    }
    return message
  }
}

const baseMsgRevokeDelegate: object = { creator: '' }

export const MsgRevokeDelegate = {
  encode(message: MsgRevokeDelegate, writer: Writer = Writer.create()): Writer {
    if (message.creator !== '') {
      writer.uint32(10).string(message.creator)
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
          message.creator = reader.string()
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
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator)
    } else {
      message.creator = ''
    }
    return message
  },

  toJSON(message: MsgRevokeDelegate): unknown {
    const obj: any = {}
    message.creator !== undefined && (obj.creator = message.creator)
    return obj
  },

  fromPartial(object: DeepPartial<MsgRevokeDelegate>): MsgRevokeDelegate {
    const message = { ...baseMsgRevokeDelegate } as MsgRevokeDelegate
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator
    } else {
      message.creator = ''
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

const baseMsgSetAttribute: object = { creator: '' }

export const MsgSetAttribute = {
  encode(message: MsgSetAttribute, writer: Writer = Writer.create()): Writer {
    if (message.creator !== '') {
      writer.uint32(10).string(message.creator)
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
          message.creator = reader.string()
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
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator)
    } else {
      message.creator = ''
    }
    return message
  },

  toJSON(message: MsgSetAttribute): unknown {
    const obj: any = {}
    message.creator !== undefined && (obj.creator = message.creator)
    return obj
  },

  fromPartial(object: DeepPartial<MsgSetAttribute>): MsgSetAttribute {
    const message = { ...baseMsgSetAttribute } as MsgSetAttribute
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator
    } else {
      message.creator = ''
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
  AddDelegate(request: MsgAddDelegate): Promise<MsgAddDelegateResponse>
  RevokeDelegate(request: MsgRevokeDelegate): Promise<MsgRevokeDelegateResponse>
  SetAttribute(request: MsgSetAttribute): Promise<MsgSetAttributeResponse>
  Metadata(request: MsgMetadata): Promise<MsgMetadataResponse>
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

  AddDelegate(request: MsgAddDelegate): Promise<MsgAddDelegateResponse> {
    const data = MsgAddDelegate.encode(request).finish()
    const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Msg', 'AddDelegate', data)
    return promise.then((data) => MsgAddDelegateResponse.decode(new Reader(data)))
  }

  RevokeDelegate(request: MsgRevokeDelegate): Promise<MsgRevokeDelegateResponse> {
    const data = MsgRevokeDelegate.encode(request).finish()
    const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Msg', 'RevokeDelegate', data)
    return promise.then((data) => MsgRevokeDelegateResponse.decode(new Reader(data)))
  }

  SetAttribute(request: MsgSetAttribute): Promise<MsgSetAttributeResponse> {
    const data = MsgSetAttribute.encode(request).finish()
    const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Msg', 'SetAttribute', data)
    return promise.then((data) => MsgSetAttributeResponse.decode(new Reader(data)))
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
