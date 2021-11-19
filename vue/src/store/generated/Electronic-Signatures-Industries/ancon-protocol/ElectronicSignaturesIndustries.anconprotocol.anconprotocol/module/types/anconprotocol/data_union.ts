/* eslint-disable */
import * as Long from 'long'
import { util, configure, Writer, Reader } from 'protobufjs/minimal'

export const protobufPackage = 'ElectronicSignaturesIndustries.anconprotocol.anconprotocol'

/** Data Source is a container of links which contains the data source to be offer */
export interface DataSource {
  parentCid: string
  didOwner: string
  anchors: string[]
  name: string
  description: string
  creator: string
}

/**
 * Data Union represents a data provider.
 * It offers data sources with linkable dags to be available for
 * users of Ancon Data Union Marketplace
 */
export interface DataUnion {
  /** name */
  name: string
  /** did identity */
  did: string
  /** is active */
  active: boolean
  creator: string
}

/** Anchor connects a CID to an onchain record, in this a data source */
export interface Anchor {
  didOwner: string
  link: string
  parentCid: string
  creator: string
}

/** Pricing contains prices for fixed prices data sources */
export interface Pricing {
  didOwner: string
  price: number
  dataSourceRef: number
  creator: string
}

export interface MsgAddDataSource {
  dataSource: DataSource | undefined
  creator: string
}

export interface MsgAddDataSourceResponse {
  ok: boolean
  cid: string
}

export interface MsgRemoveDataSource {
  creator: string
  cid: string
}

export interface MsgRemoveDataSourceResponse {
  ok: boolean
}

export interface MsgUpdateDataSource {
  creator: string
  cid: string
  name: string
  description: string
  anchors: number[]
}

export interface MsgUpdateDataSourceResponse {
  ok: boolean
  cid: string
}

export interface MsgAddDataUnion {
  dataUnion: DataUnion | undefined
  creator: string
}

export interface MsgAddDataUnionResponse {}

export interface MsgRemoveDataUnion {
  creator: string
  cid: string
}

export interface MsgRemoveDataUnionResponse {}

export interface MsgUpdateDataUnion {
  creator: string
  cid: string
  name: string
}

export interface MsgUpdateDataUnionResponse {}

const baseDataSource: object = { parentCid: '', didOwner: '', anchors: '', name: '', description: '', creator: '' }

export const DataSource = {
  encode(message: DataSource, writer: Writer = Writer.create()): Writer {
    if (message.parentCid !== '') {
      writer.uint32(10).string(message.parentCid)
    }
    if (message.didOwner !== '') {
      writer.uint32(18).string(message.didOwner)
    }
    for (const v of message.anchors) {
      writer.uint32(26).string(v!)
    }
    if (message.name !== '') {
      writer.uint32(34).string(message.name)
    }
    if (message.description !== '') {
      writer.uint32(42).string(message.description)
    }
    if (message.creator !== '') {
      writer.uint32(50).string(message.creator)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): DataSource {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseDataSource } as DataSource
    message.anchors = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.parentCid = reader.string()
          break
        case 2:
          message.didOwner = reader.string()
          break
        case 3:
          message.anchors.push(reader.string())
          break
        case 4:
          message.name = reader.string()
          break
        case 5:
          message.description = reader.string()
          break
        case 6:
          message.creator = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): DataSource {
    const message = { ...baseDataSource } as DataSource
    message.anchors = []
    if (object.parentCid !== undefined && object.parentCid !== null) {
      message.parentCid = String(object.parentCid)
    } else {
      message.parentCid = ''
    }
    if (object.didOwner !== undefined && object.didOwner !== null) {
      message.didOwner = String(object.didOwner)
    } else {
      message.didOwner = ''
    }
    if (object.anchors !== undefined && object.anchors !== null) {
      for (const e of object.anchors) {
        message.anchors.push(String(e))
      }
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
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator)
    } else {
      message.creator = ''
    }
    return message
  },

  toJSON(message: DataSource): unknown {
    const obj: any = {}
    message.parentCid !== undefined && (obj.parentCid = message.parentCid)
    message.didOwner !== undefined && (obj.didOwner = message.didOwner)
    if (message.anchors) {
      obj.anchors = message.anchors.map((e) => e)
    } else {
      obj.anchors = []
    }
    message.name !== undefined && (obj.name = message.name)
    message.description !== undefined && (obj.description = message.description)
    message.creator !== undefined && (obj.creator = message.creator)
    return obj
  },

  fromPartial(object: DeepPartial<DataSource>): DataSource {
    const message = { ...baseDataSource } as DataSource
    message.anchors = []
    if (object.parentCid !== undefined && object.parentCid !== null) {
      message.parentCid = object.parentCid
    } else {
      message.parentCid = ''
    }
    if (object.didOwner !== undefined && object.didOwner !== null) {
      message.didOwner = object.didOwner
    } else {
      message.didOwner = ''
    }
    if (object.anchors !== undefined && object.anchors !== null) {
      for (const e of object.anchors) {
        message.anchors.push(e)
      }
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
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator
    } else {
      message.creator = ''
    }
    return message
  }
}

const baseDataUnion: object = { name: '', did: '', active: false, creator: '' }

export const DataUnion = {
  encode(message: DataUnion, writer: Writer = Writer.create()): Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name)
    }
    if (message.did !== '') {
      writer.uint32(18).string(message.did)
    }
    if (message.active === true) {
      writer.uint32(24).bool(message.active)
    }
    if (message.creator !== '') {
      writer.uint32(34).string(message.creator)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): DataUnion {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseDataUnion } as DataUnion
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string()
          break
        case 2:
          message.did = reader.string()
          break
        case 3:
          message.active = reader.bool()
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

  fromJSON(object: any): DataUnion {
    const message = { ...baseDataUnion } as DataUnion
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name)
    } else {
      message.name = ''
    }
    if (object.did !== undefined && object.did !== null) {
      message.did = String(object.did)
    } else {
      message.did = ''
    }
    if (object.active !== undefined && object.active !== null) {
      message.active = Boolean(object.active)
    } else {
      message.active = false
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator)
    } else {
      message.creator = ''
    }
    return message
  },

  toJSON(message: DataUnion): unknown {
    const obj: any = {}
    message.name !== undefined && (obj.name = message.name)
    message.did !== undefined && (obj.did = message.did)
    message.active !== undefined && (obj.active = message.active)
    message.creator !== undefined && (obj.creator = message.creator)
    return obj
  },

  fromPartial(object: DeepPartial<DataUnion>): DataUnion {
    const message = { ...baseDataUnion } as DataUnion
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name
    } else {
      message.name = ''
    }
    if (object.did !== undefined && object.did !== null) {
      message.did = object.did
    } else {
      message.did = ''
    }
    if (object.active !== undefined && object.active !== null) {
      message.active = object.active
    } else {
      message.active = false
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator
    } else {
      message.creator = ''
    }
    return message
  }
}

const baseAnchor: object = { didOwner: '', link: '', parentCid: '', creator: '' }

export const Anchor = {
  encode(message: Anchor, writer: Writer = Writer.create()): Writer {
    if (message.didOwner !== '') {
      writer.uint32(10).string(message.didOwner)
    }
    if (message.link !== '') {
      writer.uint32(18).string(message.link)
    }
    if (message.parentCid !== '') {
      writer.uint32(26).string(message.parentCid)
    }
    if (message.creator !== '') {
      writer.uint32(34).string(message.creator)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): Anchor {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseAnchor } as Anchor
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.didOwner = reader.string()
          break
        case 2:
          message.link = reader.string()
          break
        case 3:
          message.parentCid = reader.string()
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

  fromJSON(object: any): Anchor {
    const message = { ...baseAnchor } as Anchor
    if (object.didOwner !== undefined && object.didOwner !== null) {
      message.didOwner = String(object.didOwner)
    } else {
      message.didOwner = ''
    }
    if (object.link !== undefined && object.link !== null) {
      message.link = String(object.link)
    } else {
      message.link = ''
    }
    if (object.parentCid !== undefined && object.parentCid !== null) {
      message.parentCid = String(object.parentCid)
    } else {
      message.parentCid = ''
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator)
    } else {
      message.creator = ''
    }
    return message
  },

  toJSON(message: Anchor): unknown {
    const obj: any = {}
    message.didOwner !== undefined && (obj.didOwner = message.didOwner)
    message.link !== undefined && (obj.link = message.link)
    message.parentCid !== undefined && (obj.parentCid = message.parentCid)
    message.creator !== undefined && (obj.creator = message.creator)
    return obj
  },

  fromPartial(object: DeepPartial<Anchor>): Anchor {
    const message = { ...baseAnchor } as Anchor
    if (object.didOwner !== undefined && object.didOwner !== null) {
      message.didOwner = object.didOwner
    } else {
      message.didOwner = ''
    }
    if (object.link !== undefined && object.link !== null) {
      message.link = object.link
    } else {
      message.link = ''
    }
    if (object.parentCid !== undefined && object.parentCid !== null) {
      message.parentCid = object.parentCid
    } else {
      message.parentCid = ''
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator
    } else {
      message.creator = ''
    }
    return message
  }
}

const basePricing: object = { didOwner: '', price: 0, dataSourceRef: 0, creator: '' }

export const Pricing = {
  encode(message: Pricing, writer: Writer = Writer.create()): Writer {
    if (message.didOwner !== '') {
      writer.uint32(10).string(message.didOwner)
    }
    if (message.price !== 0) {
      writer.uint32(16).uint64(message.price)
    }
    if (message.dataSourceRef !== 0) {
      writer.uint32(24).uint64(message.dataSourceRef)
    }
    if (message.creator !== '') {
      writer.uint32(34).string(message.creator)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): Pricing {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...basePricing } as Pricing
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.didOwner = reader.string()
          break
        case 2:
          message.price = longToNumber(reader.uint64() as Long)
          break
        case 3:
          message.dataSourceRef = longToNumber(reader.uint64() as Long)
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

  fromJSON(object: any): Pricing {
    const message = { ...basePricing } as Pricing
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
    if (object.dataSourceRef !== undefined && object.dataSourceRef !== null) {
      message.dataSourceRef = Number(object.dataSourceRef)
    } else {
      message.dataSourceRef = 0
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator)
    } else {
      message.creator = ''
    }
    return message
  },

  toJSON(message: Pricing): unknown {
    const obj: any = {}
    message.didOwner !== undefined && (obj.didOwner = message.didOwner)
    message.price !== undefined && (obj.price = message.price)
    message.dataSourceRef !== undefined && (obj.dataSourceRef = message.dataSourceRef)
    message.creator !== undefined && (obj.creator = message.creator)
    return obj
  },

  fromPartial(object: DeepPartial<Pricing>): Pricing {
    const message = { ...basePricing } as Pricing
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
    if (object.dataSourceRef !== undefined && object.dataSourceRef !== null) {
      message.dataSourceRef = object.dataSourceRef
    } else {
      message.dataSourceRef = 0
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator
    } else {
      message.creator = ''
    }
    return message
  }
}

const baseMsgAddDataSource: object = { creator: '' }

export const MsgAddDataSource = {
  encode(message: MsgAddDataSource, writer: Writer = Writer.create()): Writer {
    if (message.dataSource !== undefined) {
      DataSource.encode(message.dataSource, writer.uint32(10).fork()).ldelim()
    }
    if (message.creator !== '') {
      writer.uint32(18).string(message.creator)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgAddDataSource {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgAddDataSource } as MsgAddDataSource
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.dataSource = DataSource.decode(reader, reader.uint32())
          break
        case 2:
          message.creator = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgAddDataSource {
    const message = { ...baseMsgAddDataSource } as MsgAddDataSource
    if (object.dataSource !== undefined && object.dataSource !== null) {
      message.dataSource = DataSource.fromJSON(object.dataSource)
    } else {
      message.dataSource = undefined
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator)
    } else {
      message.creator = ''
    }
    return message
  },

  toJSON(message: MsgAddDataSource): unknown {
    const obj: any = {}
    message.dataSource !== undefined && (obj.dataSource = message.dataSource ? DataSource.toJSON(message.dataSource) : undefined)
    message.creator !== undefined && (obj.creator = message.creator)
    return obj
  },

  fromPartial(object: DeepPartial<MsgAddDataSource>): MsgAddDataSource {
    const message = { ...baseMsgAddDataSource } as MsgAddDataSource
    if (object.dataSource !== undefined && object.dataSource !== null) {
      message.dataSource = DataSource.fromPartial(object.dataSource)
    } else {
      message.dataSource = undefined
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator
    } else {
      message.creator = ''
    }
    return message
  }
}

const baseMsgAddDataSourceResponse: object = { ok: false, cid: '' }

export const MsgAddDataSourceResponse = {
  encode(message: MsgAddDataSourceResponse, writer: Writer = Writer.create()): Writer {
    if (message.ok === true) {
      writer.uint32(8).bool(message.ok)
    }
    if (message.cid !== '') {
      writer.uint32(18).string(message.cid)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgAddDataSourceResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgAddDataSourceResponse } as MsgAddDataSourceResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.ok = reader.bool()
          break
        case 2:
          message.cid = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgAddDataSourceResponse {
    const message = { ...baseMsgAddDataSourceResponse } as MsgAddDataSourceResponse
    if (object.ok !== undefined && object.ok !== null) {
      message.ok = Boolean(object.ok)
    } else {
      message.ok = false
    }
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = String(object.cid)
    } else {
      message.cid = ''
    }
    return message
  },

  toJSON(message: MsgAddDataSourceResponse): unknown {
    const obj: any = {}
    message.ok !== undefined && (obj.ok = message.ok)
    message.cid !== undefined && (obj.cid = message.cid)
    return obj
  },

  fromPartial(object: DeepPartial<MsgAddDataSourceResponse>): MsgAddDataSourceResponse {
    const message = { ...baseMsgAddDataSourceResponse } as MsgAddDataSourceResponse
    if (object.ok !== undefined && object.ok !== null) {
      message.ok = object.ok
    } else {
      message.ok = false
    }
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = object.cid
    } else {
      message.cid = ''
    }
    return message
  }
}

const baseMsgRemoveDataSource: object = { creator: '', cid: '' }

export const MsgRemoveDataSource = {
  encode(message: MsgRemoveDataSource, writer: Writer = Writer.create()): Writer {
    if (message.creator !== '') {
      writer.uint32(10).string(message.creator)
    }
    if (message.cid !== '') {
      writer.uint32(18).string(message.cid)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgRemoveDataSource {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgRemoveDataSource } as MsgRemoveDataSource
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string()
          break
        case 2:
          message.cid = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgRemoveDataSource {
    const message = { ...baseMsgRemoveDataSource } as MsgRemoveDataSource
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator)
    } else {
      message.creator = ''
    }
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = String(object.cid)
    } else {
      message.cid = ''
    }
    return message
  },

  toJSON(message: MsgRemoveDataSource): unknown {
    const obj: any = {}
    message.creator !== undefined && (obj.creator = message.creator)
    message.cid !== undefined && (obj.cid = message.cid)
    return obj
  },

  fromPartial(object: DeepPartial<MsgRemoveDataSource>): MsgRemoveDataSource {
    const message = { ...baseMsgRemoveDataSource } as MsgRemoveDataSource
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator
    } else {
      message.creator = ''
    }
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = object.cid
    } else {
      message.cid = ''
    }
    return message
  }
}

const baseMsgRemoveDataSourceResponse: object = { ok: false }

export const MsgRemoveDataSourceResponse = {
  encode(message: MsgRemoveDataSourceResponse, writer: Writer = Writer.create()): Writer {
    if (message.ok === true) {
      writer.uint32(8).bool(message.ok)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgRemoveDataSourceResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgRemoveDataSourceResponse } as MsgRemoveDataSourceResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.ok = reader.bool()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgRemoveDataSourceResponse {
    const message = { ...baseMsgRemoveDataSourceResponse } as MsgRemoveDataSourceResponse
    if (object.ok !== undefined && object.ok !== null) {
      message.ok = Boolean(object.ok)
    } else {
      message.ok = false
    }
    return message
  },

  toJSON(message: MsgRemoveDataSourceResponse): unknown {
    const obj: any = {}
    message.ok !== undefined && (obj.ok = message.ok)
    return obj
  },

  fromPartial(object: DeepPartial<MsgRemoveDataSourceResponse>): MsgRemoveDataSourceResponse {
    const message = { ...baseMsgRemoveDataSourceResponse } as MsgRemoveDataSourceResponse
    if (object.ok !== undefined && object.ok !== null) {
      message.ok = object.ok
    } else {
      message.ok = false
    }
    return message
  }
}

const baseMsgUpdateDataSource: object = { creator: '', cid: '', name: '', description: '', anchors: 0 }

export const MsgUpdateDataSource = {
  encode(message: MsgUpdateDataSource, writer: Writer = Writer.create()): Writer {
    if (message.creator !== '') {
      writer.uint32(10).string(message.creator)
    }
    if (message.cid !== '') {
      writer.uint32(18).string(message.cid)
    }
    if (message.name !== '') {
      writer.uint32(26).string(message.name)
    }
    if (message.description !== '') {
      writer.uint32(34).string(message.description)
    }
    writer.uint32(42).fork()
    for (const v of message.anchors) {
      writer.uint64(v)
    }
    writer.ldelim()
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgUpdateDataSource {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgUpdateDataSource } as MsgUpdateDataSource
    message.anchors = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string()
          break
        case 2:
          message.cid = reader.string()
          break
        case 3:
          message.name = reader.string()
          break
        case 4:
          message.description = reader.string()
          break
        case 5:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos
            while (reader.pos < end2) {
              message.anchors.push(longToNumber(reader.uint64() as Long))
            }
          } else {
            message.anchors.push(longToNumber(reader.uint64() as Long))
          }
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgUpdateDataSource {
    const message = { ...baseMsgUpdateDataSource } as MsgUpdateDataSource
    message.anchors = []
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator)
    } else {
      message.creator = ''
    }
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = String(object.cid)
    } else {
      message.cid = ''
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
    if (object.anchors !== undefined && object.anchors !== null) {
      for (const e of object.anchors) {
        message.anchors.push(Number(e))
      }
    }
    return message
  },

  toJSON(message: MsgUpdateDataSource): unknown {
    const obj: any = {}
    message.creator !== undefined && (obj.creator = message.creator)
    message.cid !== undefined && (obj.cid = message.cid)
    message.name !== undefined && (obj.name = message.name)
    message.description !== undefined && (obj.description = message.description)
    if (message.anchors) {
      obj.anchors = message.anchors.map((e) => e)
    } else {
      obj.anchors = []
    }
    return obj
  },

  fromPartial(object: DeepPartial<MsgUpdateDataSource>): MsgUpdateDataSource {
    const message = { ...baseMsgUpdateDataSource } as MsgUpdateDataSource
    message.anchors = []
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator
    } else {
      message.creator = ''
    }
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = object.cid
    } else {
      message.cid = ''
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
    if (object.anchors !== undefined && object.anchors !== null) {
      for (const e of object.anchors) {
        message.anchors.push(e)
      }
    }
    return message
  }
}

const baseMsgUpdateDataSourceResponse: object = { ok: false, cid: '' }

export const MsgUpdateDataSourceResponse = {
  encode(message: MsgUpdateDataSourceResponse, writer: Writer = Writer.create()): Writer {
    if (message.ok === true) {
      writer.uint32(8).bool(message.ok)
    }
    if (message.cid !== '') {
      writer.uint32(18).string(message.cid)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgUpdateDataSourceResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgUpdateDataSourceResponse } as MsgUpdateDataSourceResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.ok = reader.bool()
          break
        case 2:
          message.cid = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgUpdateDataSourceResponse {
    const message = { ...baseMsgUpdateDataSourceResponse } as MsgUpdateDataSourceResponse
    if (object.ok !== undefined && object.ok !== null) {
      message.ok = Boolean(object.ok)
    } else {
      message.ok = false
    }
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = String(object.cid)
    } else {
      message.cid = ''
    }
    return message
  },

  toJSON(message: MsgUpdateDataSourceResponse): unknown {
    const obj: any = {}
    message.ok !== undefined && (obj.ok = message.ok)
    message.cid !== undefined && (obj.cid = message.cid)
    return obj
  },

  fromPartial(object: DeepPartial<MsgUpdateDataSourceResponse>): MsgUpdateDataSourceResponse {
    const message = { ...baseMsgUpdateDataSourceResponse } as MsgUpdateDataSourceResponse
    if (object.ok !== undefined && object.ok !== null) {
      message.ok = object.ok
    } else {
      message.ok = false
    }
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = object.cid
    } else {
      message.cid = ''
    }
    return message
  }
}

const baseMsgAddDataUnion: object = { creator: '' }

export const MsgAddDataUnion = {
  encode(message: MsgAddDataUnion, writer: Writer = Writer.create()): Writer {
    if (message.dataUnion !== undefined) {
      DataUnion.encode(message.dataUnion, writer.uint32(10).fork()).ldelim()
    }
    if (message.creator !== '') {
      writer.uint32(18).string(message.creator)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgAddDataUnion {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgAddDataUnion } as MsgAddDataUnion
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.dataUnion = DataUnion.decode(reader, reader.uint32())
          break
        case 2:
          message.creator = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgAddDataUnion {
    const message = { ...baseMsgAddDataUnion } as MsgAddDataUnion
    if (object.dataUnion !== undefined && object.dataUnion !== null) {
      message.dataUnion = DataUnion.fromJSON(object.dataUnion)
    } else {
      message.dataUnion = undefined
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator)
    } else {
      message.creator = ''
    }
    return message
  },

  toJSON(message: MsgAddDataUnion): unknown {
    const obj: any = {}
    message.dataUnion !== undefined && (obj.dataUnion = message.dataUnion ? DataUnion.toJSON(message.dataUnion) : undefined)
    message.creator !== undefined && (obj.creator = message.creator)
    return obj
  },

  fromPartial(object: DeepPartial<MsgAddDataUnion>): MsgAddDataUnion {
    const message = { ...baseMsgAddDataUnion } as MsgAddDataUnion
    if (object.dataUnion !== undefined && object.dataUnion !== null) {
      message.dataUnion = DataUnion.fromPartial(object.dataUnion)
    } else {
      message.dataUnion = undefined
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator
    } else {
      message.creator = ''
    }
    return message
  }
}

const baseMsgAddDataUnionResponse: object = {}

export const MsgAddDataUnionResponse = {
  encode(_: MsgAddDataUnionResponse, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgAddDataUnionResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgAddDataUnionResponse } as MsgAddDataUnionResponse
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

  fromJSON(_: any): MsgAddDataUnionResponse {
    const message = { ...baseMsgAddDataUnionResponse } as MsgAddDataUnionResponse
    return message
  },

  toJSON(_: MsgAddDataUnionResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<MsgAddDataUnionResponse>): MsgAddDataUnionResponse {
    const message = { ...baseMsgAddDataUnionResponse } as MsgAddDataUnionResponse
    return message
  }
}

const baseMsgRemoveDataUnion: object = { creator: '', cid: '' }

export const MsgRemoveDataUnion = {
  encode(message: MsgRemoveDataUnion, writer: Writer = Writer.create()): Writer {
    if (message.creator !== '') {
      writer.uint32(10).string(message.creator)
    }
    if (message.cid !== '') {
      writer.uint32(18).string(message.cid)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgRemoveDataUnion {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgRemoveDataUnion } as MsgRemoveDataUnion
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string()
          break
        case 2:
          message.cid = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgRemoveDataUnion {
    const message = { ...baseMsgRemoveDataUnion } as MsgRemoveDataUnion
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator)
    } else {
      message.creator = ''
    }
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = String(object.cid)
    } else {
      message.cid = ''
    }
    return message
  },

  toJSON(message: MsgRemoveDataUnion): unknown {
    const obj: any = {}
    message.creator !== undefined && (obj.creator = message.creator)
    message.cid !== undefined && (obj.cid = message.cid)
    return obj
  },

  fromPartial(object: DeepPartial<MsgRemoveDataUnion>): MsgRemoveDataUnion {
    const message = { ...baseMsgRemoveDataUnion } as MsgRemoveDataUnion
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator
    } else {
      message.creator = ''
    }
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = object.cid
    } else {
      message.cid = ''
    }
    return message
  }
}

const baseMsgRemoveDataUnionResponse: object = {}

export const MsgRemoveDataUnionResponse = {
  encode(_: MsgRemoveDataUnionResponse, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgRemoveDataUnionResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgRemoveDataUnionResponse } as MsgRemoveDataUnionResponse
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

  fromJSON(_: any): MsgRemoveDataUnionResponse {
    const message = { ...baseMsgRemoveDataUnionResponse } as MsgRemoveDataUnionResponse
    return message
  },

  toJSON(_: MsgRemoveDataUnionResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<MsgRemoveDataUnionResponse>): MsgRemoveDataUnionResponse {
    const message = { ...baseMsgRemoveDataUnionResponse } as MsgRemoveDataUnionResponse
    return message
  }
}

const baseMsgUpdateDataUnion: object = { creator: '', cid: '', name: '' }

export const MsgUpdateDataUnion = {
  encode(message: MsgUpdateDataUnion, writer: Writer = Writer.create()): Writer {
    if (message.creator !== '') {
      writer.uint32(10).string(message.creator)
    }
    if (message.cid !== '') {
      writer.uint32(18).string(message.cid)
    }
    if (message.name !== '') {
      writer.uint32(26).string(message.name)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgUpdateDataUnion {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgUpdateDataUnion } as MsgUpdateDataUnion
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string()
          break
        case 2:
          message.cid = reader.string()
          break
        case 3:
          message.name = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgUpdateDataUnion {
    const message = { ...baseMsgUpdateDataUnion } as MsgUpdateDataUnion
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator)
    } else {
      message.creator = ''
    }
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = String(object.cid)
    } else {
      message.cid = ''
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name)
    } else {
      message.name = ''
    }
    return message
  },

  toJSON(message: MsgUpdateDataUnion): unknown {
    const obj: any = {}
    message.creator !== undefined && (obj.creator = message.creator)
    message.cid !== undefined && (obj.cid = message.cid)
    message.name !== undefined && (obj.name = message.name)
    return obj
  },

  fromPartial(object: DeepPartial<MsgUpdateDataUnion>): MsgUpdateDataUnion {
    const message = { ...baseMsgUpdateDataUnion } as MsgUpdateDataUnion
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator
    } else {
      message.creator = ''
    }
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = object.cid
    } else {
      message.cid = ''
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name
    } else {
      message.name = ''
    }
    return message
  }
}

const baseMsgUpdateDataUnionResponse: object = {}

export const MsgUpdateDataUnionResponse = {
  encode(_: MsgUpdateDataUnionResponse, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgUpdateDataUnionResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgUpdateDataUnionResponse } as MsgUpdateDataUnionResponse
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

  fromJSON(_: any): MsgUpdateDataUnionResponse {
    const message = { ...baseMsgUpdateDataUnionResponse } as MsgUpdateDataUnionResponse
    return message
  },

  toJSON(_: MsgUpdateDataUnionResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<MsgUpdateDataUnionResponse>): MsgUpdateDataUnionResponse {
    const message = { ...baseMsgUpdateDataUnionResponse } as MsgUpdateDataUnionResponse
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
