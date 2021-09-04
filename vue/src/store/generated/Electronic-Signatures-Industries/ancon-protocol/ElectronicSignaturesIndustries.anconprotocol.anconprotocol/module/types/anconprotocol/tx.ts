/* eslint-disable */
import { Reader, util, configure, Writer } from 'protobufjs/minimal'
import * as Long from 'long'
import { Coin } from '../cosmos/base/v1beta1/coin'

export const protobufPackage = 'ElectronicSignaturesIndustries.anconprotocol.anconprotocol'

/** MsgIssueDenom defines an SDK message for creating a new denom. */
export interface MsgIssueDenom {
  id: string
  name: string
  schema: string
  sender: string
  symbol: string
  mintRestricted: boolean
  updateRestricted: boolean
}

/** MsgIssueDenomResponse defines the Msg/IssueDenom response type. */
export interface MsgIssueDenomResponse {}

/** MsgTransferNFT defines an SDK message for transferring an NFT to recipient. */
export interface MsgTransferNFT {
  id: string
  denomId: string
  name: string
  uri: string
  data: string
  sender: string
  recipient: string
}

/** MsgTransferNFTResponse defines the Msg/TransferNFT response type. */
export interface MsgTransferNFTResponse {}

/** MsgEditNFT defines an SDK message for editing a nft. */
export interface MsgEditNFT {
  id: string
  denomId: string
  name: string
  uri: string
  data: string
  sender: string
}

/** MsgEditNFTResponse defines the Msg/EditNFT response type. */
export interface MsgEditNFTResponse {}

/** MsgMintNFT defines an SDK message for creating a new NFT. */
export interface MsgMintNFT {
  id: string
  denomId: string
  name: string
  uri: string
  data: string
  sender: string
  recipient: string
}

/** MsgMintNFTResponse defines the Msg/MintNFT response type. */
export interface MsgMintNFTResponse {}

/** MsgBurnNFT defines an SDK message for burning a NFT. */
export interface MsgBurnNFT {
  id: string
  denomId: string
  sender: string
}

/** MsgBurnNFTResponse defines the Msg/BurnNFT response type. */
export interface MsgBurnNFTResponse {}

/** MsgTransferDenom defines an SDK message for transferring an denom to recipient. */
export interface MsgTransferDenom {
  id: string
  sender: string
  recipient: string
}

/** MsgTransferDenomResponse defines the Msg/TransferDenom response type. */
export interface MsgTransferDenomResponse {}

/** MsgCreateHTLC defines a message to create an HTLC */
export interface MsgCreateHTLC {
  sender: string
  to: string
  receiverOnOtherChain: string
  senderOnOtherChain: string
  amount: Coin[]
  hashLock: string
  timestamp: number
  timeLock: number
  transfer: boolean
}

/** MsgCreateHTLCResponse defines the Msg/CreateHTLC response type */
export interface MsgCreateHTLCResponse {
  id: string
}

/** MsgClaimHTLC defines a message to claim an HTLC */
export interface MsgClaimHTLC {
  sender: string
  id: string
  secret: string
}

/** MsgClaimHTLCResponse defines the Msg/ClaimHTLC response type */
export interface MsgClaimHTLCResponse {}

/** MsgEthereumTxResponse defines the Msg/EthereumTx response type. */
export interface MsgFileMetadataResponse {
  hash: Uint8Array
}

/** this line is used by starport scaffolding # proto/tx/message */
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

const baseMsgIssueDenom: object = { id: '', name: '', schema: '', sender: '', symbol: '', mintRestricted: false, updateRestricted: false }

export const MsgIssueDenom = {
  encode(message: MsgIssueDenom, writer: Writer = Writer.create()): Writer {
    if (message.id !== '') {
      writer.uint32(10).string(message.id)
    }
    if (message.name !== '') {
      writer.uint32(18).string(message.name)
    }
    if (message.schema !== '') {
      writer.uint32(26).string(message.schema)
    }
    if (message.sender !== '') {
      writer.uint32(34).string(message.sender)
    }
    if (message.symbol !== '') {
      writer.uint32(42).string(message.symbol)
    }
    if (message.mintRestricted === true) {
      writer.uint32(48).bool(message.mintRestricted)
    }
    if (message.updateRestricted === true) {
      writer.uint32(56).bool(message.updateRestricted)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgIssueDenom {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgIssueDenom } as MsgIssueDenom
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string()
          break
        case 2:
          message.name = reader.string()
          break
        case 3:
          message.schema = reader.string()
          break
        case 4:
          message.sender = reader.string()
          break
        case 5:
          message.symbol = reader.string()
          break
        case 6:
          message.mintRestricted = reader.bool()
          break
        case 7:
          message.updateRestricted = reader.bool()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgIssueDenom {
    const message = { ...baseMsgIssueDenom } as MsgIssueDenom
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id)
    } else {
      message.id = ''
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name)
    } else {
      message.name = ''
    }
    if (object.schema !== undefined && object.schema !== null) {
      message.schema = String(object.schema)
    } else {
      message.schema = ''
    }
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = String(object.sender)
    } else {
      message.sender = ''
    }
    if (object.symbol !== undefined && object.symbol !== null) {
      message.symbol = String(object.symbol)
    } else {
      message.symbol = ''
    }
    if (object.mintRestricted !== undefined && object.mintRestricted !== null) {
      message.mintRestricted = Boolean(object.mintRestricted)
    } else {
      message.mintRestricted = false
    }
    if (object.updateRestricted !== undefined && object.updateRestricted !== null) {
      message.updateRestricted = Boolean(object.updateRestricted)
    } else {
      message.updateRestricted = false
    }
    return message
  },

  toJSON(message: MsgIssueDenom): unknown {
    const obj: any = {}
    message.id !== undefined && (obj.id = message.id)
    message.name !== undefined && (obj.name = message.name)
    message.schema !== undefined && (obj.schema = message.schema)
    message.sender !== undefined && (obj.sender = message.sender)
    message.symbol !== undefined && (obj.symbol = message.symbol)
    message.mintRestricted !== undefined && (obj.mintRestricted = message.mintRestricted)
    message.updateRestricted !== undefined && (obj.updateRestricted = message.updateRestricted)
    return obj
  },

  fromPartial(object: DeepPartial<MsgIssueDenom>): MsgIssueDenom {
    const message = { ...baseMsgIssueDenom } as MsgIssueDenom
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id
    } else {
      message.id = ''
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name
    } else {
      message.name = ''
    }
    if (object.schema !== undefined && object.schema !== null) {
      message.schema = object.schema
    } else {
      message.schema = ''
    }
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender
    } else {
      message.sender = ''
    }
    if (object.symbol !== undefined && object.symbol !== null) {
      message.symbol = object.symbol
    } else {
      message.symbol = ''
    }
    if (object.mintRestricted !== undefined && object.mintRestricted !== null) {
      message.mintRestricted = object.mintRestricted
    } else {
      message.mintRestricted = false
    }
    if (object.updateRestricted !== undefined && object.updateRestricted !== null) {
      message.updateRestricted = object.updateRestricted
    } else {
      message.updateRestricted = false
    }
    return message
  }
}

const baseMsgIssueDenomResponse: object = {}

export const MsgIssueDenomResponse = {
  encode(_: MsgIssueDenomResponse, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgIssueDenomResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgIssueDenomResponse } as MsgIssueDenomResponse
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

  fromJSON(_: any): MsgIssueDenomResponse {
    const message = { ...baseMsgIssueDenomResponse } as MsgIssueDenomResponse
    return message
  },

  toJSON(_: MsgIssueDenomResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<MsgIssueDenomResponse>): MsgIssueDenomResponse {
    const message = { ...baseMsgIssueDenomResponse } as MsgIssueDenomResponse
    return message
  }
}

const baseMsgTransferNFT: object = { id: '', denomId: '', name: '', uri: '', data: '', sender: '', recipient: '' }

export const MsgTransferNFT = {
  encode(message: MsgTransferNFT, writer: Writer = Writer.create()): Writer {
    if (message.id !== '') {
      writer.uint32(10).string(message.id)
    }
    if (message.denomId !== '') {
      writer.uint32(18).string(message.denomId)
    }
    if (message.name !== '') {
      writer.uint32(26).string(message.name)
    }
    if (message.uri !== '') {
      writer.uint32(34).string(message.uri)
    }
    if (message.data !== '') {
      writer.uint32(42).string(message.data)
    }
    if (message.sender !== '') {
      writer.uint32(50).string(message.sender)
    }
    if (message.recipient !== '') {
      writer.uint32(58).string(message.recipient)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgTransferNFT {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgTransferNFT } as MsgTransferNFT
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string()
          break
        case 2:
          message.denomId = reader.string()
          break
        case 3:
          message.name = reader.string()
          break
        case 4:
          message.uri = reader.string()
          break
        case 5:
          message.data = reader.string()
          break
        case 6:
          message.sender = reader.string()
          break
        case 7:
          message.recipient = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgTransferNFT {
    const message = { ...baseMsgTransferNFT } as MsgTransferNFT
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id)
    } else {
      message.id = ''
    }
    if (object.denomId !== undefined && object.denomId !== null) {
      message.denomId = String(object.denomId)
    } else {
      message.denomId = ''
    }
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
    if (object.data !== undefined && object.data !== null) {
      message.data = String(object.data)
    } else {
      message.data = ''
    }
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = String(object.sender)
    } else {
      message.sender = ''
    }
    if (object.recipient !== undefined && object.recipient !== null) {
      message.recipient = String(object.recipient)
    } else {
      message.recipient = ''
    }
    return message
  },

  toJSON(message: MsgTransferNFT): unknown {
    const obj: any = {}
    message.id !== undefined && (obj.id = message.id)
    message.denomId !== undefined && (obj.denomId = message.denomId)
    message.name !== undefined && (obj.name = message.name)
    message.uri !== undefined && (obj.uri = message.uri)
    message.data !== undefined && (obj.data = message.data)
    message.sender !== undefined && (obj.sender = message.sender)
    message.recipient !== undefined && (obj.recipient = message.recipient)
    return obj
  },

  fromPartial(object: DeepPartial<MsgTransferNFT>): MsgTransferNFT {
    const message = { ...baseMsgTransferNFT } as MsgTransferNFT
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id
    } else {
      message.id = ''
    }
    if (object.denomId !== undefined && object.denomId !== null) {
      message.denomId = object.denomId
    } else {
      message.denomId = ''
    }
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
    if (object.data !== undefined && object.data !== null) {
      message.data = object.data
    } else {
      message.data = ''
    }
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender
    } else {
      message.sender = ''
    }
    if (object.recipient !== undefined && object.recipient !== null) {
      message.recipient = object.recipient
    } else {
      message.recipient = ''
    }
    return message
  }
}

const baseMsgTransferNFTResponse: object = {}

export const MsgTransferNFTResponse = {
  encode(_: MsgTransferNFTResponse, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgTransferNFTResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgTransferNFTResponse } as MsgTransferNFTResponse
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

  fromJSON(_: any): MsgTransferNFTResponse {
    const message = { ...baseMsgTransferNFTResponse } as MsgTransferNFTResponse
    return message
  },

  toJSON(_: MsgTransferNFTResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<MsgTransferNFTResponse>): MsgTransferNFTResponse {
    const message = { ...baseMsgTransferNFTResponse } as MsgTransferNFTResponse
    return message
  }
}

const baseMsgEditNFT: object = { id: '', denomId: '', name: '', uri: '', data: '', sender: '' }

export const MsgEditNFT = {
  encode(message: MsgEditNFT, writer: Writer = Writer.create()): Writer {
    if (message.id !== '') {
      writer.uint32(10).string(message.id)
    }
    if (message.denomId !== '') {
      writer.uint32(18).string(message.denomId)
    }
    if (message.name !== '') {
      writer.uint32(26).string(message.name)
    }
    if (message.uri !== '') {
      writer.uint32(34).string(message.uri)
    }
    if (message.data !== '') {
      writer.uint32(42).string(message.data)
    }
    if (message.sender !== '') {
      writer.uint32(50).string(message.sender)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgEditNFT {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgEditNFT } as MsgEditNFT
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string()
          break
        case 2:
          message.denomId = reader.string()
          break
        case 3:
          message.name = reader.string()
          break
        case 4:
          message.uri = reader.string()
          break
        case 5:
          message.data = reader.string()
          break
        case 6:
          message.sender = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgEditNFT {
    const message = { ...baseMsgEditNFT } as MsgEditNFT
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id)
    } else {
      message.id = ''
    }
    if (object.denomId !== undefined && object.denomId !== null) {
      message.denomId = String(object.denomId)
    } else {
      message.denomId = ''
    }
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
    if (object.data !== undefined && object.data !== null) {
      message.data = String(object.data)
    } else {
      message.data = ''
    }
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = String(object.sender)
    } else {
      message.sender = ''
    }
    return message
  },

  toJSON(message: MsgEditNFT): unknown {
    const obj: any = {}
    message.id !== undefined && (obj.id = message.id)
    message.denomId !== undefined && (obj.denomId = message.denomId)
    message.name !== undefined && (obj.name = message.name)
    message.uri !== undefined && (obj.uri = message.uri)
    message.data !== undefined && (obj.data = message.data)
    message.sender !== undefined && (obj.sender = message.sender)
    return obj
  },

  fromPartial(object: DeepPartial<MsgEditNFT>): MsgEditNFT {
    const message = { ...baseMsgEditNFT } as MsgEditNFT
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id
    } else {
      message.id = ''
    }
    if (object.denomId !== undefined && object.denomId !== null) {
      message.denomId = object.denomId
    } else {
      message.denomId = ''
    }
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
    if (object.data !== undefined && object.data !== null) {
      message.data = object.data
    } else {
      message.data = ''
    }
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender
    } else {
      message.sender = ''
    }
    return message
  }
}

const baseMsgEditNFTResponse: object = {}

export const MsgEditNFTResponse = {
  encode(_: MsgEditNFTResponse, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgEditNFTResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgEditNFTResponse } as MsgEditNFTResponse
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

  fromJSON(_: any): MsgEditNFTResponse {
    const message = { ...baseMsgEditNFTResponse } as MsgEditNFTResponse
    return message
  },

  toJSON(_: MsgEditNFTResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<MsgEditNFTResponse>): MsgEditNFTResponse {
    const message = { ...baseMsgEditNFTResponse } as MsgEditNFTResponse
    return message
  }
}

const baseMsgMintNFT: object = { id: '', denomId: '', name: '', uri: '', data: '', sender: '', recipient: '' }

export const MsgMintNFT = {
  encode(message: MsgMintNFT, writer: Writer = Writer.create()): Writer {
    if (message.id !== '') {
      writer.uint32(10).string(message.id)
    }
    if (message.denomId !== '') {
      writer.uint32(18).string(message.denomId)
    }
    if (message.name !== '') {
      writer.uint32(26).string(message.name)
    }
    if (message.uri !== '') {
      writer.uint32(34).string(message.uri)
    }
    if (message.data !== '') {
      writer.uint32(42).string(message.data)
    }
    if (message.sender !== '') {
      writer.uint32(50).string(message.sender)
    }
    if (message.recipient !== '') {
      writer.uint32(58).string(message.recipient)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgMintNFT {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgMintNFT } as MsgMintNFT
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string()
          break
        case 2:
          message.denomId = reader.string()
          break
        case 3:
          message.name = reader.string()
          break
        case 4:
          message.uri = reader.string()
          break
        case 5:
          message.data = reader.string()
          break
        case 6:
          message.sender = reader.string()
          break
        case 7:
          message.recipient = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgMintNFT {
    const message = { ...baseMsgMintNFT } as MsgMintNFT
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id)
    } else {
      message.id = ''
    }
    if (object.denomId !== undefined && object.denomId !== null) {
      message.denomId = String(object.denomId)
    } else {
      message.denomId = ''
    }
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
    if (object.data !== undefined && object.data !== null) {
      message.data = String(object.data)
    } else {
      message.data = ''
    }
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = String(object.sender)
    } else {
      message.sender = ''
    }
    if (object.recipient !== undefined && object.recipient !== null) {
      message.recipient = String(object.recipient)
    } else {
      message.recipient = ''
    }
    return message
  },

  toJSON(message: MsgMintNFT): unknown {
    const obj: any = {}
    message.id !== undefined && (obj.id = message.id)
    message.denomId !== undefined && (obj.denomId = message.denomId)
    message.name !== undefined && (obj.name = message.name)
    message.uri !== undefined && (obj.uri = message.uri)
    message.data !== undefined && (obj.data = message.data)
    message.sender !== undefined && (obj.sender = message.sender)
    message.recipient !== undefined && (obj.recipient = message.recipient)
    return obj
  },

  fromPartial(object: DeepPartial<MsgMintNFT>): MsgMintNFT {
    const message = { ...baseMsgMintNFT } as MsgMintNFT
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id
    } else {
      message.id = ''
    }
    if (object.denomId !== undefined && object.denomId !== null) {
      message.denomId = object.denomId
    } else {
      message.denomId = ''
    }
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
    if (object.data !== undefined && object.data !== null) {
      message.data = object.data
    } else {
      message.data = ''
    }
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender
    } else {
      message.sender = ''
    }
    if (object.recipient !== undefined && object.recipient !== null) {
      message.recipient = object.recipient
    } else {
      message.recipient = ''
    }
    return message
  }
}

const baseMsgMintNFTResponse: object = {}

export const MsgMintNFTResponse = {
  encode(_: MsgMintNFTResponse, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgMintNFTResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgMintNFTResponse } as MsgMintNFTResponse
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

  fromJSON(_: any): MsgMintNFTResponse {
    const message = { ...baseMsgMintNFTResponse } as MsgMintNFTResponse
    return message
  },

  toJSON(_: MsgMintNFTResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<MsgMintNFTResponse>): MsgMintNFTResponse {
    const message = { ...baseMsgMintNFTResponse } as MsgMintNFTResponse
    return message
  }
}

const baseMsgBurnNFT: object = { id: '', denomId: '', sender: '' }

export const MsgBurnNFT = {
  encode(message: MsgBurnNFT, writer: Writer = Writer.create()): Writer {
    if (message.id !== '') {
      writer.uint32(10).string(message.id)
    }
    if (message.denomId !== '') {
      writer.uint32(18).string(message.denomId)
    }
    if (message.sender !== '') {
      writer.uint32(26).string(message.sender)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgBurnNFT {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgBurnNFT } as MsgBurnNFT
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string()
          break
        case 2:
          message.denomId = reader.string()
          break
        case 3:
          message.sender = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgBurnNFT {
    const message = { ...baseMsgBurnNFT } as MsgBurnNFT
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id)
    } else {
      message.id = ''
    }
    if (object.denomId !== undefined && object.denomId !== null) {
      message.denomId = String(object.denomId)
    } else {
      message.denomId = ''
    }
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = String(object.sender)
    } else {
      message.sender = ''
    }
    return message
  },

  toJSON(message: MsgBurnNFT): unknown {
    const obj: any = {}
    message.id !== undefined && (obj.id = message.id)
    message.denomId !== undefined && (obj.denomId = message.denomId)
    message.sender !== undefined && (obj.sender = message.sender)
    return obj
  },

  fromPartial(object: DeepPartial<MsgBurnNFT>): MsgBurnNFT {
    const message = { ...baseMsgBurnNFT } as MsgBurnNFT
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id
    } else {
      message.id = ''
    }
    if (object.denomId !== undefined && object.denomId !== null) {
      message.denomId = object.denomId
    } else {
      message.denomId = ''
    }
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender
    } else {
      message.sender = ''
    }
    return message
  }
}

const baseMsgBurnNFTResponse: object = {}

export const MsgBurnNFTResponse = {
  encode(_: MsgBurnNFTResponse, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgBurnNFTResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgBurnNFTResponse } as MsgBurnNFTResponse
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

  fromJSON(_: any): MsgBurnNFTResponse {
    const message = { ...baseMsgBurnNFTResponse } as MsgBurnNFTResponse
    return message
  },

  toJSON(_: MsgBurnNFTResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<MsgBurnNFTResponse>): MsgBurnNFTResponse {
    const message = { ...baseMsgBurnNFTResponse } as MsgBurnNFTResponse
    return message
  }
}

const baseMsgTransferDenom: object = { id: '', sender: '', recipient: '' }

export const MsgTransferDenom = {
  encode(message: MsgTransferDenom, writer: Writer = Writer.create()): Writer {
    if (message.id !== '') {
      writer.uint32(10).string(message.id)
    }
    if (message.sender !== '') {
      writer.uint32(18).string(message.sender)
    }
    if (message.recipient !== '') {
      writer.uint32(26).string(message.recipient)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgTransferDenom {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgTransferDenom } as MsgTransferDenom
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
          message.recipient = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgTransferDenom {
    const message = { ...baseMsgTransferDenom } as MsgTransferDenom
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
    if (object.recipient !== undefined && object.recipient !== null) {
      message.recipient = String(object.recipient)
    } else {
      message.recipient = ''
    }
    return message
  },

  toJSON(message: MsgTransferDenom): unknown {
    const obj: any = {}
    message.id !== undefined && (obj.id = message.id)
    message.sender !== undefined && (obj.sender = message.sender)
    message.recipient !== undefined && (obj.recipient = message.recipient)
    return obj
  },

  fromPartial(object: DeepPartial<MsgTransferDenom>): MsgTransferDenom {
    const message = { ...baseMsgTransferDenom } as MsgTransferDenom
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
    if (object.recipient !== undefined && object.recipient !== null) {
      message.recipient = object.recipient
    } else {
      message.recipient = ''
    }
    return message
  }
}

const baseMsgTransferDenomResponse: object = {}

export const MsgTransferDenomResponse = {
  encode(_: MsgTransferDenomResponse, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgTransferDenomResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgTransferDenomResponse } as MsgTransferDenomResponse
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

  fromJSON(_: any): MsgTransferDenomResponse {
    const message = { ...baseMsgTransferDenomResponse } as MsgTransferDenomResponse
    return message
  },

  toJSON(_: MsgTransferDenomResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<MsgTransferDenomResponse>): MsgTransferDenomResponse {
    const message = { ...baseMsgTransferDenomResponse } as MsgTransferDenomResponse
    return message
  }
}

const baseMsgCreateHTLC: object = {
  sender: '',
  to: '',
  receiverOnOtherChain: '',
  senderOnOtherChain: '',
  hashLock: '',
  timestamp: 0,
  timeLock: 0,
  transfer: false
}

export const MsgCreateHTLC = {
  encode(message: MsgCreateHTLC, writer: Writer = Writer.create()): Writer {
    if (message.sender !== '') {
      writer.uint32(10).string(message.sender)
    }
    if (message.to !== '') {
      writer.uint32(18).string(message.to)
    }
    if (message.receiverOnOtherChain !== '') {
      writer.uint32(26).string(message.receiverOnOtherChain)
    }
    if (message.senderOnOtherChain !== '') {
      writer.uint32(34).string(message.senderOnOtherChain)
    }
    for (const v of message.amount) {
      Coin.encode(v!, writer.uint32(42).fork()).ldelim()
    }
    if (message.hashLock !== '') {
      writer.uint32(50).string(message.hashLock)
    }
    if (message.timestamp !== 0) {
      writer.uint32(56).uint64(message.timestamp)
    }
    if (message.timeLock !== 0) {
      writer.uint32(64).uint64(message.timeLock)
    }
    if (message.transfer === true) {
      writer.uint32(72).bool(message.transfer)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCreateHTLC {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgCreateHTLC } as MsgCreateHTLC
    message.amount = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string()
          break
        case 2:
          message.to = reader.string()
          break
        case 3:
          message.receiverOnOtherChain = reader.string()
          break
        case 4:
          message.senderOnOtherChain = reader.string()
          break
        case 5:
          message.amount.push(Coin.decode(reader, reader.uint32()))
          break
        case 6:
          message.hashLock = reader.string()
          break
        case 7:
          message.timestamp = longToNumber(reader.uint64() as Long)
          break
        case 8:
          message.timeLock = longToNumber(reader.uint64() as Long)
          break
        case 9:
          message.transfer = reader.bool()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgCreateHTLC {
    const message = { ...baseMsgCreateHTLC } as MsgCreateHTLC
    message.amount = []
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
    if (object.timestamp !== undefined && object.timestamp !== null) {
      message.timestamp = Number(object.timestamp)
    } else {
      message.timestamp = 0
    }
    if (object.timeLock !== undefined && object.timeLock !== null) {
      message.timeLock = Number(object.timeLock)
    } else {
      message.timeLock = 0
    }
    if (object.transfer !== undefined && object.transfer !== null) {
      message.transfer = Boolean(object.transfer)
    } else {
      message.transfer = false
    }
    return message
  },

  toJSON(message: MsgCreateHTLC): unknown {
    const obj: any = {}
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
    message.timestamp !== undefined && (obj.timestamp = message.timestamp)
    message.timeLock !== undefined && (obj.timeLock = message.timeLock)
    message.transfer !== undefined && (obj.transfer = message.transfer)
    return obj
  },

  fromPartial(object: DeepPartial<MsgCreateHTLC>): MsgCreateHTLC {
    const message = { ...baseMsgCreateHTLC } as MsgCreateHTLC
    message.amount = []
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
    if (object.timestamp !== undefined && object.timestamp !== null) {
      message.timestamp = object.timestamp
    } else {
      message.timestamp = 0
    }
    if (object.timeLock !== undefined && object.timeLock !== null) {
      message.timeLock = object.timeLock
    } else {
      message.timeLock = 0
    }
    if (object.transfer !== undefined && object.transfer !== null) {
      message.transfer = object.transfer
    } else {
      message.transfer = false
    }
    return message
  }
}

const baseMsgCreateHTLCResponse: object = { id: '' }

export const MsgCreateHTLCResponse = {
  encode(message: MsgCreateHTLCResponse, writer: Writer = Writer.create()): Writer {
    if (message.id !== '') {
      writer.uint32(10).string(message.id)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCreateHTLCResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgCreateHTLCResponse } as MsgCreateHTLCResponse
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

  fromJSON(object: any): MsgCreateHTLCResponse {
    const message = { ...baseMsgCreateHTLCResponse } as MsgCreateHTLCResponse
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id)
    } else {
      message.id = ''
    }
    return message
  },

  toJSON(message: MsgCreateHTLCResponse): unknown {
    const obj: any = {}
    message.id !== undefined && (obj.id = message.id)
    return obj
  },

  fromPartial(object: DeepPartial<MsgCreateHTLCResponse>): MsgCreateHTLCResponse {
    const message = { ...baseMsgCreateHTLCResponse } as MsgCreateHTLCResponse
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id
    } else {
      message.id = ''
    }
    return message
  }
}

const baseMsgClaimHTLC: object = { sender: '', id: '', secret: '' }

export const MsgClaimHTLC = {
  encode(message: MsgClaimHTLC, writer: Writer = Writer.create()): Writer {
    if (message.sender !== '') {
      writer.uint32(10).string(message.sender)
    }
    if (message.id !== '') {
      writer.uint32(18).string(message.id)
    }
    if (message.secret !== '') {
      writer.uint32(26).string(message.secret)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgClaimHTLC {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgClaimHTLC } as MsgClaimHTLC
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string()
          break
        case 2:
          message.id = reader.string()
          break
        case 3:
          message.secret = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgClaimHTLC {
    const message = { ...baseMsgClaimHTLC } as MsgClaimHTLC
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = String(object.sender)
    } else {
      message.sender = ''
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id)
    } else {
      message.id = ''
    }
    if (object.secret !== undefined && object.secret !== null) {
      message.secret = String(object.secret)
    } else {
      message.secret = ''
    }
    return message
  },

  toJSON(message: MsgClaimHTLC): unknown {
    const obj: any = {}
    message.sender !== undefined && (obj.sender = message.sender)
    message.id !== undefined && (obj.id = message.id)
    message.secret !== undefined && (obj.secret = message.secret)
    return obj
  },

  fromPartial(object: DeepPartial<MsgClaimHTLC>): MsgClaimHTLC {
    const message = { ...baseMsgClaimHTLC } as MsgClaimHTLC
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender
    } else {
      message.sender = ''
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id
    } else {
      message.id = ''
    }
    if (object.secret !== undefined && object.secret !== null) {
      message.secret = object.secret
    } else {
      message.secret = ''
    }
    return message
  }
}

const baseMsgClaimHTLCResponse: object = {}

export const MsgClaimHTLCResponse = {
  encode(_: MsgClaimHTLCResponse, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgClaimHTLCResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgClaimHTLCResponse } as MsgClaimHTLCResponse
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

  fromJSON(_: any): MsgClaimHTLCResponse {
    const message = { ...baseMsgClaimHTLCResponse } as MsgClaimHTLCResponse
    return message
  },

  toJSON(_: MsgClaimHTLCResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<MsgClaimHTLCResponse>): MsgClaimHTLCResponse {
    const message = { ...baseMsgClaimHTLCResponse } as MsgClaimHTLCResponse
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
  Metadata(request: MsgMetadata): Promise<MsgMetadataResponse>
  File(request: MsgFile): Promise<MsgFileResponse>
  /** CreateHTLC defines a method for creating a HTLC */
  CreateHTLC(request: MsgCreateHTLC): Promise<MsgCreateHTLCResponse>
  /** ClaimHTLC defines a method for claiming a HTLC */
  ClaimHTLC(request: MsgClaimHTLC): Promise<MsgClaimHTLCResponse>
  /** IssueDenom defines a method for issue a denom. */
  IssueDenom(request: MsgIssueDenom): Promise<MsgIssueDenomResponse>
  /** MintNFT defines a method for mint a new nft */
  MintNFT(request: MsgMintNFT): Promise<MsgMintNFTResponse>
  /** RefundHTLC defines a method for editing a nft. */
  EditNFT(request: MsgEditNFT): Promise<MsgEditNFTResponse>
  /** TransferNFT defines a method for transferring a nft. */
  TransferNFT(request: MsgTransferNFT): Promise<MsgTransferNFTResponse>
  /** BurnNFT defines a method for burning a nft. */
  BurnNFT(request: MsgBurnNFT): Promise<MsgBurnNFTResponse>
  /** TransferDenom defines a method for transferring a denom. */
  TransferDenom(request: MsgTransferDenom): Promise<MsgTransferDenomResponse>
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc
  constructor(rpc: Rpc) {
    this.rpc = rpc
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

  CreateHTLC(request: MsgCreateHTLC): Promise<MsgCreateHTLCResponse> {
    const data = MsgCreateHTLC.encode(request).finish()
    const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Msg', 'CreateHTLC', data)
    return promise.then((data) => MsgCreateHTLCResponse.decode(new Reader(data)))
  }

  ClaimHTLC(request: MsgClaimHTLC): Promise<MsgClaimHTLCResponse> {
    const data = MsgClaimHTLC.encode(request).finish()
    const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Msg', 'ClaimHTLC', data)
    return promise.then((data) => MsgClaimHTLCResponse.decode(new Reader(data)))
  }

  IssueDenom(request: MsgIssueDenom): Promise<MsgIssueDenomResponse> {
    const data = MsgIssueDenom.encode(request).finish()
    const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Msg', 'IssueDenom', data)
    return promise.then((data) => MsgIssueDenomResponse.decode(new Reader(data)))
  }

  MintNFT(request: MsgMintNFT): Promise<MsgMintNFTResponse> {
    const data = MsgMintNFT.encode(request).finish()
    const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Msg', 'MintNFT', data)
    return promise.then((data) => MsgMintNFTResponse.decode(new Reader(data)))
  }

  EditNFT(request: MsgEditNFT): Promise<MsgEditNFTResponse> {
    const data = MsgEditNFT.encode(request).finish()
    const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Msg', 'EditNFT', data)
    return promise.then((data) => MsgEditNFTResponse.decode(new Reader(data)))
  }

  TransferNFT(request: MsgTransferNFT): Promise<MsgTransferNFTResponse> {
    const data = MsgTransferNFT.encode(request).finish()
    const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Msg', 'TransferNFT', data)
    return promise.then((data) => MsgTransferNFTResponse.decode(new Reader(data)))
  }

  BurnNFT(request: MsgBurnNFT): Promise<MsgBurnNFTResponse> {
    const data = MsgBurnNFT.encode(request).finish()
    const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Msg', 'BurnNFT', data)
    return promise.then((data) => MsgBurnNFTResponse.decode(new Reader(data)))
  }

  TransferDenom(request: MsgTransferDenom): Promise<MsgTransferDenomResponse> {
    const data = MsgTransferDenom.encode(request).finish()
    const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Msg', 'TransferDenom', data)
    return promise.then((data) => MsgTransferDenomResponse.decode(new Reader(data)))
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
