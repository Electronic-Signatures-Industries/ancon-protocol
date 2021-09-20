/* eslint-disable */
import { Reader, util, configure, Writer } from 'protobufjs/minimal';
import * as Long from 'long';
import { Height } from '../ibc/core/client/v1/client';
export const protobufPackage = 'ElectronicSignaturesIndustries.anconprotocol.mintswap';
const baseMsgMintSwap = {
    sourcePort: '',
    sourceChannel: '',
    metadataRef: '',
    sender: '',
    receiver: '',
    tokenName: '',
    tokenSymbol: '',
    didOwner: '',
    price: 0,
    timeoutTimestamp: 0
};
export const MsgMintSwap = {
    encode(message, writer = Writer.create()) {
        if (message.sourcePort !== '') {
            writer.uint32(10).string(message.sourcePort);
        }
        if (message.sourceChannel !== '') {
            writer.uint32(18).string(message.sourceChannel);
        }
        if (message.metadataRef !== '') {
            writer.uint32(26).string(message.metadataRef);
        }
        if (message.sender !== '') {
            writer.uint32(34).string(message.sender);
        }
        if (message.receiver !== '') {
            writer.uint32(42).string(message.receiver);
        }
        if (message.tokenName !== '') {
            writer.uint32(50).string(message.tokenName);
        }
        if (message.tokenSymbol !== '') {
            writer.uint32(58).string(message.tokenSymbol);
        }
        if (message.didOwner !== '') {
            writer.uint32(66).string(message.didOwner);
        }
        if (message.price !== 0) {
            writer.uint32(72).uint64(message.price);
        }
        if (message.timeoutHeight !== undefined) {
            Height.encode(message.timeoutHeight, writer.uint32(82).fork()).ldelim();
        }
        if (message.timeoutTimestamp !== 0) {
            writer.uint32(88).uint64(message.timeoutTimestamp);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgMintSwap };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sourcePort = reader.string();
                    break;
                case 2:
                    message.sourceChannel = reader.string();
                    break;
                case 3:
                    message.metadataRef = reader.string();
                    break;
                case 4:
                    message.sender = reader.string();
                    break;
                case 5:
                    message.receiver = reader.string();
                    break;
                case 6:
                    message.tokenName = reader.string();
                    break;
                case 7:
                    message.tokenSymbol = reader.string();
                    break;
                case 8:
                    message.didOwner = reader.string();
                    break;
                case 9:
                    message.price = longToNumber(reader.uint64());
                    break;
                case 10:
                    message.timeoutHeight = Height.decode(reader, reader.uint32());
                    break;
                case 11:
                    message.timeoutTimestamp = longToNumber(reader.uint64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgMintSwap };
        if (object.sourcePort !== undefined && object.sourcePort !== null) {
            message.sourcePort = String(object.sourcePort);
        }
        else {
            message.sourcePort = '';
        }
        if (object.sourceChannel !== undefined && object.sourceChannel !== null) {
            message.sourceChannel = String(object.sourceChannel);
        }
        else {
            message.sourceChannel = '';
        }
        if (object.metadataRef !== undefined && object.metadataRef !== null) {
            message.metadataRef = String(object.metadataRef);
        }
        else {
            message.metadataRef = '';
        }
        if (object.sender !== undefined && object.sender !== null) {
            message.sender = String(object.sender);
        }
        else {
            message.sender = '';
        }
        if (object.receiver !== undefined && object.receiver !== null) {
            message.receiver = String(object.receiver);
        }
        else {
            message.receiver = '';
        }
        if (object.tokenName !== undefined && object.tokenName !== null) {
            message.tokenName = String(object.tokenName);
        }
        else {
            message.tokenName = '';
        }
        if (object.tokenSymbol !== undefined && object.tokenSymbol !== null) {
            message.tokenSymbol = String(object.tokenSymbol);
        }
        else {
            message.tokenSymbol = '';
        }
        if (object.didOwner !== undefined && object.didOwner !== null) {
            message.didOwner = String(object.didOwner);
        }
        else {
            message.didOwner = '';
        }
        if (object.price !== undefined && object.price !== null) {
            message.price = Number(object.price);
        }
        else {
            message.price = 0;
        }
        if (object.timeoutHeight !== undefined && object.timeoutHeight !== null) {
            message.timeoutHeight = Height.fromJSON(object.timeoutHeight);
        }
        else {
            message.timeoutHeight = undefined;
        }
        if (object.timeoutTimestamp !== undefined && object.timeoutTimestamp !== null) {
            message.timeoutTimestamp = Number(object.timeoutTimestamp);
        }
        else {
            message.timeoutTimestamp = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.sourcePort !== undefined && (obj.sourcePort = message.sourcePort);
        message.sourceChannel !== undefined && (obj.sourceChannel = message.sourceChannel);
        message.metadataRef !== undefined && (obj.metadataRef = message.metadataRef);
        message.sender !== undefined && (obj.sender = message.sender);
        message.receiver !== undefined && (obj.receiver = message.receiver);
        message.tokenName !== undefined && (obj.tokenName = message.tokenName);
        message.tokenSymbol !== undefined && (obj.tokenSymbol = message.tokenSymbol);
        message.didOwner !== undefined && (obj.didOwner = message.didOwner);
        message.price !== undefined && (obj.price = message.price);
        message.timeoutHeight !== undefined && (obj.timeoutHeight = message.timeoutHeight ? Height.toJSON(message.timeoutHeight) : undefined);
        message.timeoutTimestamp !== undefined && (obj.timeoutTimestamp = message.timeoutTimestamp);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgMintSwap };
        if (object.sourcePort !== undefined && object.sourcePort !== null) {
            message.sourcePort = object.sourcePort;
        }
        else {
            message.sourcePort = '';
        }
        if (object.sourceChannel !== undefined && object.sourceChannel !== null) {
            message.sourceChannel = object.sourceChannel;
        }
        else {
            message.sourceChannel = '';
        }
        if (object.metadataRef !== undefined && object.metadataRef !== null) {
            message.metadataRef = object.metadataRef;
        }
        else {
            message.metadataRef = '';
        }
        if (object.sender !== undefined && object.sender !== null) {
            message.sender = object.sender;
        }
        else {
            message.sender = '';
        }
        if (object.receiver !== undefined && object.receiver !== null) {
            message.receiver = object.receiver;
        }
        else {
            message.receiver = '';
        }
        if (object.tokenName !== undefined && object.tokenName !== null) {
            message.tokenName = object.tokenName;
        }
        else {
            message.tokenName = '';
        }
        if (object.tokenSymbol !== undefined && object.tokenSymbol !== null) {
            message.tokenSymbol = object.tokenSymbol;
        }
        else {
            message.tokenSymbol = '';
        }
        if (object.didOwner !== undefined && object.didOwner !== null) {
            message.didOwner = object.didOwner;
        }
        else {
            message.didOwner = '';
        }
        if (object.price !== undefined && object.price !== null) {
            message.price = object.price;
        }
        else {
            message.price = 0;
        }
        if (object.timeoutHeight !== undefined && object.timeoutHeight !== null) {
            message.timeoutHeight = Height.fromPartial(object.timeoutHeight);
        }
        else {
            message.timeoutHeight = undefined;
        }
        if (object.timeoutTimestamp !== undefined && object.timeoutTimestamp !== null) {
            message.timeoutTimestamp = object.timeoutTimestamp;
        }
        else {
            message.timeoutTimestamp = 0;
        }
        return message;
    }
};
const baseMsgMintSwapResponse = {};
export const MsgMintSwapResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgMintSwapResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        const message = { ...baseMsgMintSwapResponse };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseMsgMintSwapResponse };
        return message;
    }
};
export class MsgClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
    }
    MintSwap(request) {
        const data = MsgMintSwap.encode(request).finish();
        const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.mintswap.Msg', 'MintSwap', data);
        return promise.then((data) => MsgMintSwapResponse.decode(new Reader(data)));
    }
}
var globalThis = (() => {
    if (typeof globalThis !== 'undefined')
        return globalThis;
    if (typeof self !== 'undefined')
        return self;
    if (typeof window !== 'undefined')
        return window;
    if (typeof global !== 'undefined')
        return global;
    throw 'Unable to locate global object';
})();
function longToNumber(long) {
    if (long.gt(Number.MAX_SAFE_INTEGER)) {
        throw new globalThis.Error('Value is larger than Number.MAX_SAFE_INTEGER');
    }
    return long.toNumber();
}
if (util.Long !== Long) {
    util.Long = Long;
    configure();
}
