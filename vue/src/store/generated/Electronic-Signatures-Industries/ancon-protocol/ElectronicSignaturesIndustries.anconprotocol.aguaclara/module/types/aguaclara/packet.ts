/* eslint-disable */
import { Writer, Reader } from 'protobufjs/minimal'

export const protobufPackage = 'ElectronicSignaturesIndustries.anconprotocol.aguaclara'

export interface AguaclaraPacketData {
  creator: string
  tokenAddress: string
  tokenId: string
  didRecipient: string
  toMetadata: string
}

export interface NoData {}

const baseAguaclaraPacketData: object = { creator: '', tokenAddress: '', tokenId: '', didRecipient: '', toMetadata: '' }

export const AguaclaraPacketData = {
  encode(message: AguaclaraPacketData, writer: Writer = Writer.create()): Writer {
    if (message.creator !== '') {
      writer.uint32(10).string(message.creator)
    }
    if (message.tokenAddress !== '') {
      writer.uint32(18).string(message.tokenAddress)
    }
    if (message.tokenId !== '') {
      writer.uint32(26).string(message.tokenId)
    }
    if (message.didRecipient !== '') {
      writer.uint32(34).string(message.didRecipient)
    }
    if (message.toMetadata !== '') {
      writer.uint32(42).string(message.toMetadata)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): AguaclaraPacketData {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseAguaclaraPacketData } as AguaclaraPacketData
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string()
          break
        case 2:
          message.tokenAddress = reader.string()
          break
        case 3:
          message.tokenId = reader.string()
          break
        case 4:
          message.didRecipient = reader.string()
          break
        case 5:
          message.toMetadata = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): AguaclaraPacketData {
    const message = { ...baseAguaclaraPacketData } as AguaclaraPacketData
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator)
    } else {
      message.creator = ''
    }
    if (object.tokenAddress !== undefined && object.tokenAddress !== null) {
      message.tokenAddress = String(object.tokenAddress)
    } else {
      message.tokenAddress = ''
    }
    if (object.tokenId !== undefined && object.tokenId !== null) {
      message.tokenId = String(object.tokenId)
    } else {
      message.tokenId = ''
    }
    if (object.didRecipient !== undefined && object.didRecipient !== null) {
      message.didRecipient = String(object.didRecipient)
    } else {
      message.didRecipient = ''
    }
    if (object.toMetadata !== undefined && object.toMetadata !== null) {
      message.toMetadata = String(object.toMetadata)
    } else {
      message.toMetadata = ''
    }
    return message
  },

  toJSON(message: AguaclaraPacketData): unknown {
    const obj: any = {}
    message.creator !== undefined && (obj.creator = message.creator)
    message.tokenAddress !== undefined && (obj.tokenAddress = message.tokenAddress)
    message.tokenId !== undefined && (obj.tokenId = message.tokenId)
    message.didRecipient !== undefined && (obj.didRecipient = message.didRecipient)
    message.toMetadata !== undefined && (obj.toMetadata = message.toMetadata)
    return obj
  },

  fromPartial(object: DeepPartial<AguaclaraPacketData>): AguaclaraPacketData {
    const message = { ...baseAguaclaraPacketData } as AguaclaraPacketData
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator
    } else {
      message.creator = ''
    }
    if (object.tokenAddress !== undefined && object.tokenAddress !== null) {
      message.tokenAddress = object.tokenAddress
    } else {
      message.tokenAddress = ''
    }
    if (object.tokenId !== undefined && object.tokenId !== null) {
      message.tokenId = object.tokenId
    } else {
      message.tokenId = ''
    }
    if (object.didRecipient !== undefined && object.didRecipient !== null) {
      message.didRecipient = object.didRecipient
    } else {
      message.didRecipient = ''
    }
    if (object.toMetadata !== undefined && object.toMetadata !== null) {
      message.toMetadata = object.toMetadata
    } else {
      message.toMetadata = ''
    }
    return message
  }
}

const baseNoData: object = {}

export const NoData = {
  encode(_: NoData, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): NoData {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseNoData } as NoData
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

  fromJSON(_: any): NoData {
    const message = { ...baseNoData } as NoData
    return message
  },

  toJSON(_: NoData): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<NoData>): NoData {
    const message = { ...baseNoData } as NoData
    return message
  }
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
