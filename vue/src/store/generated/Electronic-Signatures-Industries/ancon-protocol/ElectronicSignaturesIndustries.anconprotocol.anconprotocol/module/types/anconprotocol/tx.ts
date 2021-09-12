/* eslint-disable */
import { Reader, util, configure, Writer } from 'protobufjs/minimal'
import * as Long from 'long'

export const protobufPackage = 'ElectronicSignaturesIndustries.anconprotocol.anconprotocol'

export interface MsgMintTrustedContent {
  creator: string
  did: string
  metadata: string
  cid: string
}

export interface MsgMintTrustedContentResponse {}

export interface MsgInitiateSwap {
  creator: string
  did: string
  metadata: string
  cid: string
}

export interface MsgInitiateSwapResponse {}

export interface MsgClaimSwap {
  creator: string
  did: string
  metadata: string
  cid: string
}

export interface MsgClaimSwapResponse {}

export interface MsgMintTrustedResource {
  creator: string
  did: string
  metadata: string
  cid: string
}

export interface MsgMintTrustedResourceResponse {}

/** MsgRoyaltyInfo */
export interface MsgRoyaltyInfo {
  creator: string
  receiver: string
  royaltyFeePercentage: number
  metadataUri: string
  denomId: string
}

/** MsgRoyaltyInfoResponse */
export interface MsgRoyaltyInfoResponse {
  receiver: string
  royaltyFeePercentage: number
  metadataUri: string
}

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

export interface MsgChangeOwnerResponse {
  identity: string
  owner: string
  previousChange: number
}

export interface MsgCreateDIDOwner {
  creator: string
  owner: string
  didKey: string
  didWeb: string
}

export interface MsgCreateDIDOwnerResponse {}

export interface MsgChangeOwner {
  creator: string
  identity: string
  newOwner: string
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
  validity: number
}

export interface MsgGrantAttributeResponse {
  ok: boolean
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

export interface MsgFileMetadataResponse {
  hash: Uint8Array
}

export interface MsgMetadata {
  /** cosmos sdk* */
  creator: string
  name: string
  description: string
  image: string
  /** did owner*eg. did:ancon:{hex-bech32} */
  owner: string
  /** change/diff , ancestor is parent */
  parent: string
  sources: string
  links: string
  verifiedCredentialRef: string
  /** did doc* */
  did: string
  /** reserved */
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

const baseMsgMintTrustedContent: object = { creator: '', did: '', metadata: '', cid: '' }

export const MsgMintTrustedContent = {
  encode(message: MsgMintTrustedContent, writer: Writer = Writer.create()): Writer {
    if (message.creator !== '') {
      writer.uint32(10).string(message.creator)
    }
    if (message.did !== '') {
      writer.uint32(18).string(message.did)
    }
    if (message.metadata !== '') {
      writer.uint32(26).string(message.metadata)
    }
    if (message.cid !== '') {
      writer.uint32(34).string(message.cid)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgMintTrustedContent {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgMintTrustedContent } as MsgMintTrustedContent
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string()
          break
        case 2:
          message.did = reader.string()
          break
        case 3:
          message.metadata = reader.string()
          break
        case 4:
          message.cid = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgMintTrustedContent {
    const message = { ...baseMsgMintTrustedContent } as MsgMintTrustedContent
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator)
    } else {
      message.creator = ''
    }
    if (object.did !== undefined && object.did !== null) {
      message.did = String(object.did)
    } else {
      message.did = ''
    }
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = String(object.metadata)
    } else {
      message.metadata = ''
    }
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = String(object.cid)
    } else {
      message.cid = ''
    }
    return message
  },

  toJSON(message: MsgMintTrustedContent): unknown {
    const obj: any = {}
    message.creator !== undefined && (obj.creator = message.creator)
    message.did !== undefined && (obj.did = message.did)
    message.metadata !== undefined && (obj.metadata = message.metadata)
    message.cid !== undefined && (obj.cid = message.cid)
    return obj
  },

  fromPartial(object: DeepPartial<MsgMintTrustedContent>): MsgMintTrustedContent {
    const message = { ...baseMsgMintTrustedContent } as MsgMintTrustedContent
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator
    } else {
      message.creator = ''
    }
    if (object.did !== undefined && object.did !== null) {
      message.did = object.did
    } else {
      message.did = ''
    }
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = object.metadata
    } else {
      message.metadata = ''
    }
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = object.cid
    } else {
      message.cid = ''
    }
    return message
  }
}

const baseMsgMintTrustedContentResponse: object = {}

export const MsgMintTrustedContentResponse = {
  encode(_: MsgMintTrustedContentResponse, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgMintTrustedContentResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgMintTrustedContentResponse } as MsgMintTrustedContentResponse
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

  fromJSON(_: any): MsgMintTrustedContentResponse {
    const message = { ...baseMsgMintTrustedContentResponse } as MsgMintTrustedContentResponse
    return message
  },

  toJSON(_: MsgMintTrustedContentResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<MsgMintTrustedContentResponse>): MsgMintTrustedContentResponse {
    const message = { ...baseMsgMintTrustedContentResponse } as MsgMintTrustedContentResponse
    return message
  }
}

const baseMsgInitiateSwap: object = { creator: '', did: '', metadata: '', cid: '' }

export const MsgInitiateSwap = {
  encode(message: MsgInitiateSwap, writer: Writer = Writer.create()): Writer {
    if (message.creator !== '') {
      writer.uint32(10).string(message.creator)
    }
    if (message.did !== '') {
      writer.uint32(18).string(message.did)
    }
    if (message.metadata !== '') {
      writer.uint32(26).string(message.metadata)
    }
    if (message.cid !== '') {
      writer.uint32(34).string(message.cid)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgInitiateSwap {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgInitiateSwap } as MsgInitiateSwap
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string()
          break
        case 2:
          message.did = reader.string()
          break
        case 3:
          message.metadata = reader.string()
          break
        case 4:
          message.cid = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgInitiateSwap {
    const message = { ...baseMsgInitiateSwap } as MsgInitiateSwap
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator)
    } else {
      message.creator = ''
    }
    if (object.did !== undefined && object.did !== null) {
      message.did = String(object.did)
    } else {
      message.did = ''
    }
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = String(object.metadata)
    } else {
      message.metadata = ''
    }
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = String(object.cid)
    } else {
      message.cid = ''
    }
    return message
  },

  toJSON(message: MsgInitiateSwap): unknown {
    const obj: any = {}
    message.creator !== undefined && (obj.creator = message.creator)
    message.did !== undefined && (obj.did = message.did)
    message.metadata !== undefined && (obj.metadata = message.metadata)
    message.cid !== undefined && (obj.cid = message.cid)
    return obj
  },

  fromPartial(object: DeepPartial<MsgInitiateSwap>): MsgInitiateSwap {
    const message = { ...baseMsgInitiateSwap } as MsgInitiateSwap
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator
    } else {
      message.creator = ''
    }
    if (object.did !== undefined && object.did !== null) {
      message.did = object.did
    } else {
      message.did = ''
    }
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = object.metadata
    } else {
      message.metadata = ''
    }
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = object.cid
    } else {
      message.cid = ''
    }
    return message
  }
}

const baseMsgInitiateSwapResponse: object = {}

export const MsgInitiateSwapResponse = {
  encode(_: MsgInitiateSwapResponse, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgInitiateSwapResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgInitiateSwapResponse } as MsgInitiateSwapResponse
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

  fromJSON(_: any): MsgInitiateSwapResponse {
    const message = { ...baseMsgInitiateSwapResponse } as MsgInitiateSwapResponse
    return message
  },

  toJSON(_: MsgInitiateSwapResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<MsgInitiateSwapResponse>): MsgInitiateSwapResponse {
    const message = { ...baseMsgInitiateSwapResponse } as MsgInitiateSwapResponse
    return message
  }
}

const baseMsgClaimSwap: object = { creator: '', did: '', metadata: '', cid: '' }

export const MsgClaimSwap = {
  encode(message: MsgClaimSwap, writer: Writer = Writer.create()): Writer {
    if (message.creator !== '') {
      writer.uint32(10).string(message.creator)
    }
    if (message.did !== '') {
      writer.uint32(18).string(message.did)
    }
    if (message.metadata !== '') {
      writer.uint32(26).string(message.metadata)
    }
    if (message.cid !== '') {
      writer.uint32(34).string(message.cid)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgClaimSwap {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgClaimSwap } as MsgClaimSwap
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string()
          break
        case 2:
          message.did = reader.string()
          break
        case 3:
          message.metadata = reader.string()
          break
        case 4:
          message.cid = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgClaimSwap {
    const message = { ...baseMsgClaimSwap } as MsgClaimSwap
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator)
    } else {
      message.creator = ''
    }
    if (object.did !== undefined && object.did !== null) {
      message.did = String(object.did)
    } else {
      message.did = ''
    }
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = String(object.metadata)
    } else {
      message.metadata = ''
    }
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = String(object.cid)
    } else {
      message.cid = ''
    }
    return message
  },

  toJSON(message: MsgClaimSwap): unknown {
    const obj: any = {}
    message.creator !== undefined && (obj.creator = message.creator)
    message.did !== undefined && (obj.did = message.did)
    message.metadata !== undefined && (obj.metadata = message.metadata)
    message.cid !== undefined && (obj.cid = message.cid)
    return obj
  },

  fromPartial(object: DeepPartial<MsgClaimSwap>): MsgClaimSwap {
    const message = { ...baseMsgClaimSwap } as MsgClaimSwap
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator
    } else {
      message.creator = ''
    }
    if (object.did !== undefined && object.did !== null) {
      message.did = object.did
    } else {
      message.did = ''
    }
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = object.metadata
    } else {
      message.metadata = ''
    }
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = object.cid
    } else {
      message.cid = ''
    }
    return message
  }
}

const baseMsgClaimSwapResponse: object = {}

export const MsgClaimSwapResponse = {
  encode(_: MsgClaimSwapResponse, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgClaimSwapResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgClaimSwapResponse } as MsgClaimSwapResponse
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

  fromJSON(_: any): MsgClaimSwapResponse {
    const message = { ...baseMsgClaimSwapResponse } as MsgClaimSwapResponse
    return message
  },

  toJSON(_: MsgClaimSwapResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<MsgClaimSwapResponse>): MsgClaimSwapResponse {
    const message = { ...baseMsgClaimSwapResponse } as MsgClaimSwapResponse
    return message
  }
}

const baseMsgMintTrustedResource: object = { creator: '', did: '', metadata: '', cid: '' }

export const MsgMintTrustedResource = {
  encode(message: MsgMintTrustedResource, writer: Writer = Writer.create()): Writer {
    if (message.creator !== '') {
      writer.uint32(10).string(message.creator)
    }
    if (message.did !== '') {
      writer.uint32(18).string(message.did)
    }
    if (message.metadata !== '') {
      writer.uint32(26).string(message.metadata)
    }
    if (message.cid !== '') {
      writer.uint32(34).string(message.cid)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgMintTrustedResource {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgMintTrustedResource } as MsgMintTrustedResource
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string()
          break
        case 2:
          message.did = reader.string()
          break
        case 3:
          message.metadata = reader.string()
          break
        case 4:
          message.cid = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgMintTrustedResource {
    const message = { ...baseMsgMintTrustedResource } as MsgMintTrustedResource
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator)
    } else {
      message.creator = ''
    }
    if (object.did !== undefined && object.did !== null) {
      message.did = String(object.did)
    } else {
      message.did = ''
    }
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = String(object.metadata)
    } else {
      message.metadata = ''
    }
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = String(object.cid)
    } else {
      message.cid = ''
    }
    return message
  },

  toJSON(message: MsgMintTrustedResource): unknown {
    const obj: any = {}
    message.creator !== undefined && (obj.creator = message.creator)
    message.did !== undefined && (obj.did = message.did)
    message.metadata !== undefined && (obj.metadata = message.metadata)
    message.cid !== undefined && (obj.cid = message.cid)
    return obj
  },

  fromPartial(object: DeepPartial<MsgMintTrustedResource>): MsgMintTrustedResource {
    const message = { ...baseMsgMintTrustedResource } as MsgMintTrustedResource
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator
    } else {
      message.creator = ''
    }
    if (object.did !== undefined && object.did !== null) {
      message.did = object.did
    } else {
      message.did = ''
    }
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = object.metadata
    } else {
      message.metadata = ''
    }
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = object.cid
    } else {
      message.cid = ''
    }
    return message
  }
}

const baseMsgMintTrustedResourceResponse: object = {}

export const MsgMintTrustedResourceResponse = {
  encode(_: MsgMintTrustedResourceResponse, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgMintTrustedResourceResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgMintTrustedResourceResponse } as MsgMintTrustedResourceResponse
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

  fromJSON(_: any): MsgMintTrustedResourceResponse {
    const message = { ...baseMsgMintTrustedResourceResponse } as MsgMintTrustedResourceResponse
    return message
  },

  toJSON(_: MsgMintTrustedResourceResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<MsgMintTrustedResourceResponse>): MsgMintTrustedResourceResponse {
    const message = { ...baseMsgMintTrustedResourceResponse } as MsgMintTrustedResourceResponse
    return message
  }
}

const baseMsgRoyaltyInfo: object = { creator: '', receiver: '', royaltyFeePercentage: 0, metadataUri: '', denomId: '' }

export const MsgRoyaltyInfo = {
  encode(message: MsgRoyaltyInfo, writer: Writer = Writer.create()): Writer {
    if (message.creator !== '') {
      writer.uint32(10).string(message.creator)
    }
    if (message.receiver !== '') {
      writer.uint32(18).string(message.receiver)
    }
    if (message.royaltyFeePercentage !== 0) {
      writer.uint32(24).uint64(message.royaltyFeePercentage)
    }
    if (message.metadataUri !== '') {
      writer.uint32(34).string(message.metadataUri)
    }
    if (message.denomId !== '') {
      writer.uint32(42).string(message.denomId)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgRoyaltyInfo {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgRoyaltyInfo } as MsgRoyaltyInfo
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string()
          break
        case 2:
          message.receiver = reader.string()
          break
        case 3:
          message.royaltyFeePercentage = longToNumber(reader.uint64() as Long)
          break
        case 4:
          message.metadataUri = reader.string()
          break
        case 5:
          message.denomId = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgRoyaltyInfo {
    const message = { ...baseMsgRoyaltyInfo } as MsgRoyaltyInfo
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator)
    } else {
      message.creator = ''
    }
    if (object.receiver !== undefined && object.receiver !== null) {
      message.receiver = String(object.receiver)
    } else {
      message.receiver = ''
    }
    if (object.royaltyFeePercentage !== undefined && object.royaltyFeePercentage !== null) {
      message.royaltyFeePercentage = Number(object.royaltyFeePercentage)
    } else {
      message.royaltyFeePercentage = 0
    }
    if (object.metadataUri !== undefined && object.metadataUri !== null) {
      message.metadataUri = String(object.metadataUri)
    } else {
      message.metadataUri = ''
    }
    if (object.denomId !== undefined && object.denomId !== null) {
      message.denomId = String(object.denomId)
    } else {
      message.denomId = ''
    }
    return message
  },

  toJSON(message: MsgRoyaltyInfo): unknown {
    const obj: any = {}
    message.creator !== undefined && (obj.creator = message.creator)
    message.receiver !== undefined && (obj.receiver = message.receiver)
    message.royaltyFeePercentage !== undefined && (obj.royaltyFeePercentage = message.royaltyFeePercentage)
    message.metadataUri !== undefined && (obj.metadataUri = message.metadataUri)
    message.denomId !== undefined && (obj.denomId = message.denomId)
    return obj
  },

  fromPartial(object: DeepPartial<MsgRoyaltyInfo>): MsgRoyaltyInfo {
    const message = { ...baseMsgRoyaltyInfo } as MsgRoyaltyInfo
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator
    } else {
      message.creator = ''
    }
    if (object.receiver !== undefined && object.receiver !== null) {
      message.receiver = object.receiver
    } else {
      message.receiver = ''
    }
    if (object.royaltyFeePercentage !== undefined && object.royaltyFeePercentage !== null) {
      message.royaltyFeePercentage = object.royaltyFeePercentage
    } else {
      message.royaltyFeePercentage = 0
    }
    if (object.metadataUri !== undefined && object.metadataUri !== null) {
      message.metadataUri = object.metadataUri
    } else {
      message.metadataUri = ''
    }
    if (object.denomId !== undefined && object.denomId !== null) {
      message.denomId = object.denomId
    } else {
      message.denomId = ''
    }
    return message
  }
}

const baseMsgRoyaltyInfoResponse: object = { receiver: '', royaltyFeePercentage: 0, metadataUri: '' }

export const MsgRoyaltyInfoResponse = {
  encode(message: MsgRoyaltyInfoResponse, writer: Writer = Writer.create()): Writer {
    if (message.receiver !== '') {
      writer.uint32(10).string(message.receiver)
    }
    if (message.royaltyFeePercentage !== 0) {
      writer.uint32(16).uint64(message.royaltyFeePercentage)
    }
    if (message.metadataUri !== '') {
      writer.uint32(26).string(message.metadataUri)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgRoyaltyInfoResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgRoyaltyInfoResponse } as MsgRoyaltyInfoResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.receiver = reader.string()
          break
        case 2:
          message.royaltyFeePercentage = longToNumber(reader.uint64() as Long)
          break
        case 3:
          message.metadataUri = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgRoyaltyInfoResponse {
    const message = { ...baseMsgRoyaltyInfoResponse } as MsgRoyaltyInfoResponse
    if (object.receiver !== undefined && object.receiver !== null) {
      message.receiver = String(object.receiver)
    } else {
      message.receiver = ''
    }
    if (object.royaltyFeePercentage !== undefined && object.royaltyFeePercentage !== null) {
      message.royaltyFeePercentage = Number(object.royaltyFeePercentage)
    } else {
      message.royaltyFeePercentage = 0
    }
    if (object.metadataUri !== undefined && object.metadataUri !== null) {
      message.metadataUri = String(object.metadataUri)
    } else {
      message.metadataUri = ''
    }
    return message
  },

  toJSON(message: MsgRoyaltyInfoResponse): unknown {
    const obj: any = {}
    message.receiver !== undefined && (obj.receiver = message.receiver)
    message.royaltyFeePercentage !== undefined && (obj.royaltyFeePercentage = message.royaltyFeePercentage)
    message.metadataUri !== undefined && (obj.metadataUri = message.metadataUri)
    return obj
  },

  fromPartial(object: DeepPartial<MsgRoyaltyInfoResponse>): MsgRoyaltyInfoResponse {
    const message = { ...baseMsgRoyaltyInfoResponse } as MsgRoyaltyInfoResponse
    if (object.receiver !== undefined && object.receiver !== null) {
      message.receiver = object.receiver
    } else {
      message.receiver = ''
    }
    if (object.royaltyFeePercentage !== undefined && object.royaltyFeePercentage !== null) {
      message.royaltyFeePercentage = object.royaltyFeePercentage
    } else {
      message.royaltyFeePercentage = 0
    }
    if (object.metadataUri !== undefined && object.metadataUri !== null) {
      message.metadataUri = object.metadataUri
    } else {
      message.metadataUri = ''
    }
    return message
  }
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

const baseMsgCreateDIDOwner: object = { creator: '', owner: '', didKey: '', didWeb: '' }

export const MsgCreateDIDOwner = {
  encode(message: MsgCreateDIDOwner, writer: Writer = Writer.create()): Writer {
    if (message.creator !== '') {
      writer.uint32(10).string(message.creator)
    }
    if (message.owner !== '') {
      writer.uint32(18).string(message.owner)
    }
    if (message.didKey !== '') {
      writer.uint32(26).string(message.didKey)
    }
    if (message.didWeb !== '') {
      writer.uint32(34).string(message.didWeb)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCreateDIDOwner {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgCreateDIDOwner } as MsgCreateDIDOwner
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string()
          break
        case 2:
          message.owner = reader.string()
          break
        case 3:
          message.didKey = reader.string()
          break
        case 4:
          message.didWeb = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgCreateDIDOwner {
    const message = { ...baseMsgCreateDIDOwner } as MsgCreateDIDOwner
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator)
    } else {
      message.creator = ''
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = String(object.owner)
    } else {
      message.owner = ''
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
    return message
  },

  toJSON(message: MsgCreateDIDOwner): unknown {
    const obj: any = {}
    message.creator !== undefined && (obj.creator = message.creator)
    message.owner !== undefined && (obj.owner = message.owner)
    message.didKey !== undefined && (obj.didKey = message.didKey)
    message.didWeb !== undefined && (obj.didWeb = message.didWeb)
    return obj
  },

  fromPartial(object: DeepPartial<MsgCreateDIDOwner>): MsgCreateDIDOwner {
    const message = { ...baseMsgCreateDIDOwner } as MsgCreateDIDOwner
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator
    } else {
      message.creator = ''
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner
    } else {
      message.owner = ''
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
    return message
  }
}

const baseMsgCreateDIDOwnerResponse: object = {}

export const MsgCreateDIDOwnerResponse = {
  encode(_: MsgCreateDIDOwnerResponse, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCreateDIDOwnerResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgCreateDIDOwnerResponse } as MsgCreateDIDOwnerResponse
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

  fromJSON(_: any): MsgCreateDIDOwnerResponse {
    const message = { ...baseMsgCreateDIDOwnerResponse } as MsgCreateDIDOwnerResponse
    return message
  },

  toJSON(_: MsgCreateDIDOwnerResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<MsgCreateDIDOwnerResponse>): MsgCreateDIDOwnerResponse {
    const message = { ...baseMsgCreateDIDOwnerResponse } as MsgCreateDIDOwnerResponse
    return message
  }
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

const baseMsgGrantAttribute: object = { identity: '', actor: '', creator: '', validity: 0 }

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
    if (message.validity !== 0) {
      writer.uint32(48).uint64(message.validity)
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
        case 6:
          message.validity = longToNumber(reader.uint64() as Long)
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
    if (object.validity !== undefined && object.validity !== null) {
      message.validity = Number(object.validity)
    } else {
      message.validity = 0
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
    message.validity !== undefined && (obj.validity = message.validity)
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
    if (object.validity !== undefined && object.validity !== null) {
      message.validity = object.validity
    } else {
      message.validity = 0
    }
    return message
  }
}

const baseMsgGrantAttributeResponse: object = { ok: false }

export const MsgGrantAttributeResponse = {
  encode(message: MsgGrantAttributeResponse, writer: Writer = Writer.create()): Writer {
    if (message.ok === true) {
      writer.uint32(8).bool(message.ok)
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
          message.ok = reader.bool()
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
    if (object.ok !== undefined && object.ok !== null) {
      message.ok = Boolean(object.ok)
    } else {
      message.ok = false
    }
    return message
  },

  toJSON(message: MsgGrantAttributeResponse): unknown {
    const obj: any = {}
    message.ok !== undefined && (obj.ok = message.ok)
    return obj
  },

  fromPartial(object: DeepPartial<MsgGrantAttributeResponse>): MsgGrantAttributeResponse {
    const message = { ...baseMsgGrantAttributeResponse } as MsgGrantAttributeResponse
    if (object.ok !== undefined && object.ok !== null) {
      message.ok = object.ok
    } else {
      message.ok = false
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
  /** RoyaltyInfo defines a metadata CID royalty info */
  RoyaltyInfo(request: MsgRoyaltyInfo): Promise<MsgRoyaltyInfoResponse>
  /** ChangeOwer TODO */
  ChangeOwner(request: MsgChangeOwner): Promise<MsgChangeOwnerResponse>
  /**
   * rpc ValidDelegate(MsgValidDelegate) returns (MsgValidDelegateResponse);
   * RevokeDelegate TODO
   */
  RevokeDelegate(request: MsgRevokeDelegate): Promise<MsgRevokeDelegateResponse>
  /** GrantDelegate TODO */
  GrantDelegate(request: MsgGrantDelegate): Promise<MsgGrantDelegateResponse>
  /** GrantAttribute TODO */
  GrantAttribute(request: MsgGrantAttribute): Promise<MsgGrantAttributeResponse>
  /** RevokeAttribute TODO */
  RevokeAttribute(request: MsgRevokeAttribute): Promise<MsgRevokeAttributeResponse>
  /** Metadata TODO */
  Metadata(request: MsgMetadata): Promise<MsgMetadataResponse>
  File(request: MsgFile): Promise<MsgFileResponse>
  /**
   * rpc CreateDid (MsgCreateDid) returns (MsgCreateDidResponse)
   * IssueDenom defines a method for issue a denom.
   */
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
  /** MintTrustedContent defines a method for minting a content. */
  MintTrustedContent(request: MsgMintTrustedContent): Promise<MsgMintTrustedContentResponse>
  /** MintTrustedResource defines a method for minting a resource. */
  MintTrustedResource(request: MsgMintTrustedResource): Promise<MsgMintTrustedResourceResponse>
  /** InitiateSwap adds a metadata and creates signed voucher */
  InitiateSwap(request: MsgInitiateSwap): Promise<MsgInitiateSwapResponse>
  /** ClaimSwap acknowledges signed voucher lazy minted NFT with trusted metadata */
  ClaimSwap(request: MsgClaimSwap): Promise<MsgClaimSwapResponse>
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc
  constructor(rpc: Rpc) {
    this.rpc = rpc
  }
  RoyaltyInfo(request: MsgRoyaltyInfo): Promise<MsgRoyaltyInfoResponse> {
    const data = MsgRoyaltyInfo.encode(request).finish()
    const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Msg', 'RoyaltyInfo', data)
    return promise.then((data) => MsgRoyaltyInfoResponse.decode(new Reader(data)))
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

  MintTrustedContent(request: MsgMintTrustedContent): Promise<MsgMintTrustedContentResponse> {
    const data = MsgMintTrustedContent.encode(request).finish()
    const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Msg', 'MintTrustedContent', data)
    return promise.then((data) => MsgMintTrustedContentResponse.decode(new Reader(data)))
  }

  MintTrustedResource(request: MsgMintTrustedResource): Promise<MsgMintTrustedResourceResponse> {
    const data = MsgMintTrustedResource.encode(request).finish()
    const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Msg', 'MintTrustedResource', data)
    return promise.then((data) => MsgMintTrustedResourceResponse.decode(new Reader(data)))
  }

  InitiateSwap(request: MsgInitiateSwap): Promise<MsgInitiateSwapResponse> {
    const data = MsgInitiateSwap.encode(request).finish()
    const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Msg', 'InitiateSwap', data)
    return promise.then((data) => MsgInitiateSwapResponse.decode(new Reader(data)))
  }

  ClaimSwap(request: MsgClaimSwap): Promise<MsgClaimSwapResponse> {
    const data = MsgClaimSwap.encode(request).finish()
    const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Msg', 'ClaimSwap', data)
    return promise.then((data) => MsgClaimSwapResponse.decode(new Reader(data)))
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