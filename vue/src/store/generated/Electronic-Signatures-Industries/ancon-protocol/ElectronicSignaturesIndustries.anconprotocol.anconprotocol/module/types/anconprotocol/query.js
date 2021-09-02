/* eslint-disable */
import { Reader, Writer } from 'protobufjs/minimal';
export const protobufPackage = 'ElectronicSignaturesIndustries.anconprotocol.anconprotocol';
const baseQueryOwnersRequest = {};
export const QueryOwnersRequest = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryOwnersRequest };
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
        const message = { ...baseQueryOwnersRequest };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseQueryOwnersRequest };
        return message;
    }
};
const baseQueryOwnersResponse = {};
export const QueryOwnersResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryOwnersResponse };
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
        const message = { ...baseQueryOwnersResponse };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseQueryOwnersResponse };
        return message;
    }
};
const baseQueryResourceRequest = { cid: '', path: '' };
export const QueryResourceRequest = {
    encode(message, writer = Writer.create()) {
        if (message.cid !== '') {
            writer.uint32(10).string(message.cid);
        }
        if (message.path !== '') {
            writer.uint32(18).string(message.path);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryResourceRequest };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.cid = reader.string();
                    break;
                case 2:
                    message.path = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryResourceRequest };
        if (object.cid !== undefined && object.cid !== null) {
            message.cid = String(object.cid);
        }
        else {
            message.cid = '';
        }
        if (object.path !== undefined && object.path !== null) {
            message.path = String(object.path);
        }
        else {
            message.path = '';
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.cid !== undefined && (obj.cid = message.cid);
        message.path !== undefined && (obj.path = message.path);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryResourceRequest };
        if (object.cid !== undefined && object.cid !== null) {
            message.cid = object.cid;
        }
        else {
            message.cid = '';
        }
        if (object.path !== undefined && object.path !== null) {
            message.path = object.path;
        }
        else {
            message.path = '';
        }
        return message;
    }
};
const baseQueryResourceResponse = { data: '' };
export const QueryResourceResponse = {
    encode(message, writer = Writer.create()) {
        if (message.data !== '') {
            writer.uint32(10).string(message.data);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryResourceResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.data = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryResourceResponse };
        if (object.data !== undefined && object.data !== null) {
            message.data = String(object.data);
        }
        else {
            message.data = '';
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.data !== undefined && (obj.data = message.data);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryResourceResponse };
        if (object.data !== undefined && object.data !== null) {
            message.data = object.data;
        }
        else {
            message.data = '';
        }
        return message;
    }
};
export class QueryClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
    }
    ReadWithPath(request) {
        const data = QueryResourceRequest.encode(request).finish();
        const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Query', 'ReadWithPath', data);
        return promise.then((data) => QueryResourceResponse.decode(new Reader(data)));
    }
    ReadFile(request) {
        const data = QueryResourceRequest.encode(request).finish();
        const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Query', 'ReadFile', data);
        return promise.then((data) => QueryResourceResponse.decode(new Reader(data)));
    }
    Read(request) {
        const data = QueryResourceRequest.encode(request).finish();
        const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Query', 'Read', data);
        return promise.then((data) => QueryResourceResponse.decode(new Reader(data)));
    }
    Owners(request) {
        const data = QueryOwnersRequest.encode(request).finish();
        const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Query', 'Owners', data);
        return promise.then((data) => QueryOwnersResponse.decode(new Reader(data)));
    }
    Resource(request) {
        const data = QueryResourceRequest.encode(request).finish();
        const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Query', 'Resource', data);
        return promise.then((data) => QueryResourceResponse.decode(new Reader(data)));
    }
}
