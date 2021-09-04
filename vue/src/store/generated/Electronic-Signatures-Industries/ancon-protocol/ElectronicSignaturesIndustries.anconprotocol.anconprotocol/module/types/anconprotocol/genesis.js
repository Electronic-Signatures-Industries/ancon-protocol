/* eslint-disable */
import { Timestamp } from '../google/protobuf/timestamp';
import { Params, HTLC, AssetSupply } from '../anconprotocol/htlc';
import { Collection } from '../anconprotocol/nft';
import { Writer, Reader } from 'protobufjs/minimal';
export const protobufPackage = 'ElectronicSignaturesIndustries.anconprotocol.anconprotocol';
const baseGenesisState = {};
export const GenesisState = {
    encode(message, writer = Writer.create()) {
        if (message.params !== undefined) {
            Params.encode(message.params, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.htlcs) {
            HTLC.encode(v, writer.uint32(18).fork()).ldelim();
        }
        for (const v of message.supplies) {
            AssetSupply.encode(v, writer.uint32(26).fork()).ldelim();
        }
        if (message.previousBlockTime !== undefined) {
            Timestamp.encode(toTimestamp(message.previousBlockTime), writer.uint32(34).fork()).ldelim();
        }
        for (const v of message.collections) {
            Collection.encode(v, writer.uint32(42).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseGenesisState };
        message.htlcs = [];
        message.supplies = [];
        message.collections = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.params = Params.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.htlcs.push(HTLC.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.supplies.push(AssetSupply.decode(reader, reader.uint32()));
                    break;
                case 4:
                    message.previousBlockTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
                    break;
                case 5:
                    message.collections.push(Collection.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseGenesisState };
        message.htlcs = [];
        message.supplies = [];
        message.collections = [];
        if (object.params !== undefined && object.params !== null) {
            message.params = Params.fromJSON(object.params);
        }
        else {
            message.params = undefined;
        }
        if (object.htlcs !== undefined && object.htlcs !== null) {
            for (const e of object.htlcs) {
                message.htlcs.push(HTLC.fromJSON(e));
            }
        }
        if (object.supplies !== undefined && object.supplies !== null) {
            for (const e of object.supplies) {
                message.supplies.push(AssetSupply.fromJSON(e));
            }
        }
        if (object.previousBlockTime !== undefined && object.previousBlockTime !== null) {
            message.previousBlockTime = fromJsonTimestamp(object.previousBlockTime);
        }
        else {
            message.previousBlockTime = undefined;
        }
        if (object.collections !== undefined && object.collections !== null) {
            for (const e of object.collections) {
                message.collections.push(Collection.fromJSON(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
        if (message.htlcs) {
            obj.htlcs = message.htlcs.map((e) => (e ? HTLC.toJSON(e) : undefined));
        }
        else {
            obj.htlcs = [];
        }
        if (message.supplies) {
            obj.supplies = message.supplies.map((e) => (e ? AssetSupply.toJSON(e) : undefined));
        }
        else {
            obj.supplies = [];
        }
        message.previousBlockTime !== undefined &&
            (obj.previousBlockTime = message.previousBlockTime !== undefined ? message.previousBlockTime.toISOString() : null);
        if (message.collections) {
            obj.collections = message.collections.map((e) => (e ? Collection.toJSON(e) : undefined));
        }
        else {
            obj.collections = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseGenesisState };
        message.htlcs = [];
        message.supplies = [];
        message.collections = [];
        if (object.params !== undefined && object.params !== null) {
            message.params = Params.fromPartial(object.params);
        }
        else {
            message.params = undefined;
        }
        if (object.htlcs !== undefined && object.htlcs !== null) {
            for (const e of object.htlcs) {
                message.htlcs.push(HTLC.fromPartial(e));
            }
        }
        if (object.supplies !== undefined && object.supplies !== null) {
            for (const e of object.supplies) {
                message.supplies.push(AssetSupply.fromPartial(e));
            }
        }
        if (object.previousBlockTime !== undefined && object.previousBlockTime !== null) {
            message.previousBlockTime = object.previousBlockTime;
        }
        else {
            message.previousBlockTime = undefined;
        }
        if (object.collections !== undefined && object.collections !== null) {
            for (const e of object.collections) {
                message.collections.push(Collection.fromPartial(e));
            }
        }
        return message;
    }
};
function toTimestamp(date) {
    const seconds = date.getTime() / 1000;
    const nanos = (date.getTime() % 1000) * 1000000;
    return { seconds, nanos };
}
function fromTimestamp(t) {
    let millis = t.seconds * 1000;
    millis += t.nanos / 1000000;
    return new Date(millis);
}
function fromJsonTimestamp(o) {
    if (o instanceof Date) {
        return o;
    }
    else if (typeof o === 'string') {
        return new Date(o);
    }
    else {
        return fromTimestamp(Timestamp.fromJSON(o));
    }
}
