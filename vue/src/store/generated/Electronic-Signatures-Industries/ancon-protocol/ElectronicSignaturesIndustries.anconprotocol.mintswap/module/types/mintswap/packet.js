/* eslint-disable */
import * as Long from 'long';
import { util, configure, Writer, Reader } from 'protobufjs/minimal';
export const protobufPackage = 'ElectronicSignaturesIndustries.anconprotocol.mintswap';
const baseMintswapPacketData = {};
export const MintswapPacketData = {
    encode(message, writer = Writer.create()) {
        if (message.data !== undefined) {
            MintSwapData.encode(message.data, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMintswapPacketData };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.data = MintSwapData.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMintswapPacketData };
        if (object.data !== undefined && object.data !== null) {
            message.data = MintSwapData.fromJSON(object.data);
        }
        else {
            message.data = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.data !== undefined && (obj.data = message.data ? MintSwapData.toJSON(message.data) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMintswapPacketData };
        if (object.data !== undefined && object.data !== null) {
            message.data = MintSwapData.fromPartial(object.data);
        }
        else {
            message.data = undefined;
        }
        return message;
    }
};
const baseMintSwapData = { sender: '', metadataRef: '', tokenName: '', tokenSymbol: '', recipient: '', didOwner: '', price: 0 };
export const MintSwapData = {
    encode(message, writer = Writer.create()) {
        if (message.sender !== '') {
            writer.uint32(10).string(message.sender);
        }
        if (message.metadataRef !== '') {
            writer.uint32(18).string(message.metadataRef);
        }
        if (message.tokenName !== '') {
            writer.uint32(26).string(message.tokenName);
        }
        if (message.tokenSymbol !== '') {
            writer.uint32(34).string(message.tokenSymbol);
        }
        if (message.recipient !== '') {
            writer.uint32(42).string(message.recipient);
        }
        if (message.didOwner !== '') {
            writer.uint32(50).string(message.didOwner);
        }
        if (message.price !== 0) {
            writer.uint32(56).uint64(message.price);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMintSwapData };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sender = reader.string();
                    break;
                case 2:
                    message.metadataRef = reader.string();
                    break;
                case 3:
                    message.tokenName = reader.string();
                    break;
                case 4:
                    message.tokenSymbol = reader.string();
                    break;
                case 5:
                    message.recipient = reader.string();
                    break;
                case 6:
                    message.didOwner = reader.string();
                    break;
                case 7:
                    message.price = longToNumber(reader.uint64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMintSwapData };
        if (object.sender !== undefined && object.sender !== null) {
            message.sender = String(object.sender);
        }
        else {
            message.sender = '';
        }
        if (object.metadataRef !== undefined && object.metadataRef !== null) {
            message.metadataRef = String(object.metadataRef);
        }
        else {
            message.metadataRef = '';
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
        if (object.recipient !== undefined && object.recipient !== null) {
            message.recipient = String(object.recipient);
        }
        else {
            message.recipient = '';
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
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.sender !== undefined && (obj.sender = message.sender);
        message.metadataRef !== undefined && (obj.metadataRef = message.metadataRef);
        message.tokenName !== undefined && (obj.tokenName = message.tokenName);
        message.tokenSymbol !== undefined && (obj.tokenSymbol = message.tokenSymbol);
        message.recipient !== undefined && (obj.recipient = message.recipient);
        message.didOwner !== undefined && (obj.didOwner = message.didOwner);
        message.price !== undefined && (obj.price = message.price);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMintSwapData };
        if (object.sender !== undefined && object.sender !== null) {
            message.sender = object.sender;
        }
        else {
            message.sender = '';
        }
        if (object.metadataRef !== undefined && object.metadataRef !== null) {
            message.metadataRef = object.metadataRef;
        }
        else {
            message.metadataRef = '';
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
        if (object.recipient !== undefined && object.recipient !== null) {
            message.recipient = object.recipient;
        }
        else {
            message.recipient = '';
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
        return message;
    }
};
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
