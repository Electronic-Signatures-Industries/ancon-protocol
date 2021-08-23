/* eslint-disable */
import { Reader, util, configure, Writer } from 'protobufjs/minimal';
import * as Long from 'long';
export const protobufPackage = 'ElectronicSignaturesIndustries.anconprotocol.anconprotocol';
const baseMsgFileMetadataResponse = {};
export const MsgFileMetadataResponse = {
    encode(message, writer = Writer.create()) {
        if (message.hash.length !== 0) {
            writer.uint32(10).bytes(message.hash);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgFileMetadataResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.hash = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgFileMetadataResponse };
        if (object.hash !== undefined && object.hash !== null) {
            message.hash = bytesFromBase64(object.hash);
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.hash !== undefined && (obj.hash = base64FromBytes(message.hash !== undefined ? message.hash : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgFileMetadataResponse };
        if (object.hash !== undefined && object.hash !== null) {
            message.hash = object.hash;
        }
        else {
            message.hash = new Uint8Array();
        }
        return message;
    }
};
const baseMsgFileTx = { path: '', content: '', mode: '', time: 0, contentType: '', did: '', from: '' };
export const MsgFileTx = {
    encode(message, writer = Writer.create()) {
        if (message.path !== '') {
            writer.uint32(10).string(message.path);
        }
        if (message.content !== '') {
            writer.uint32(18).string(message.content);
        }
        if (message.mode !== '') {
            writer.uint32(26).string(message.mode);
        }
        if (message.time !== 0) {
            writer.uint32(32).uint64(message.time);
        }
        if (message.contentType !== '') {
            writer.uint32(42).string(message.contentType);
        }
        if (message.did !== '') {
            writer.uint32(50).string(message.did);
        }
        if (message.from !== '') {
            writer.uint32(58).string(message.from);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgFileTx };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.path = reader.string();
                    break;
                case 2:
                    message.content = reader.string();
                    break;
                case 3:
                    message.mode = reader.string();
                    break;
                case 4:
                    message.time = longToNumber(reader.uint64());
                    break;
                case 5:
                    message.contentType = reader.string();
                    break;
                case 6:
                    message.did = reader.string();
                    break;
                case 7:
                    message.from = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgFileTx };
        if (object.path !== undefined && object.path !== null) {
            message.path = String(object.path);
        }
        else {
            message.path = '';
        }
        if (object.content !== undefined && object.content !== null) {
            message.content = String(object.content);
        }
        else {
            message.content = '';
        }
        if (object.mode !== undefined && object.mode !== null) {
            message.mode = String(object.mode);
        }
        else {
            message.mode = '';
        }
        if (object.time !== undefined && object.time !== null) {
            message.time = Number(object.time);
        }
        else {
            message.time = 0;
        }
        if (object.contentType !== undefined && object.contentType !== null) {
            message.contentType = String(object.contentType);
        }
        else {
            message.contentType = '';
        }
        if (object.did !== undefined && object.did !== null) {
            message.did = String(object.did);
        }
        else {
            message.did = '';
        }
        if (object.from !== undefined && object.from !== null) {
            message.from = String(object.from);
        }
        else {
            message.from = '';
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.path !== undefined && (obj.path = message.path);
        message.content !== undefined && (obj.content = message.content);
        message.mode !== undefined && (obj.mode = message.mode);
        message.time !== undefined && (obj.time = message.time);
        message.contentType !== undefined && (obj.contentType = message.contentType);
        message.did !== undefined && (obj.did = message.did);
        message.from !== undefined && (obj.from = message.from);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgFileTx };
        if (object.path !== undefined && object.path !== null) {
            message.path = object.path;
        }
        else {
            message.path = '';
        }
        if (object.content !== undefined && object.content !== null) {
            message.content = object.content;
        }
        else {
            message.content = '';
        }
        if (object.mode !== undefined && object.mode !== null) {
            message.mode = object.mode;
        }
        else {
            message.mode = '';
        }
        if (object.time !== undefined && object.time !== null) {
            message.time = object.time;
        }
        else {
            message.time = 0;
        }
        if (object.contentType !== undefined && object.contentType !== null) {
            message.contentType = object.contentType;
        }
        else {
            message.contentType = '';
        }
        if (object.did !== undefined && object.did !== null) {
            message.did = object.did;
        }
        else {
            message.did = '';
        }
        if (object.from !== undefined && object.from !== null) {
            message.from = object.from;
        }
        else {
            message.from = '';
        }
        return message;
    }
};
const baseMsgMetadataTx = {
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
};
export const MsgMetadataTx = {
    encode(message, writer = Writer.create()) {
        if (message.name !== '') {
            writer.uint32(10).string(message.name);
        }
        if (message.description !== '') {
            writer.uint32(18).string(message.description);
        }
        if (message.image !== '') {
            writer.uint32(26).string(message.image);
        }
        if (message.owner !== '') {
            writer.uint32(34).string(message.owner);
        }
        if (message.parent !== '') {
            writer.uint32(42).string(message.parent);
        }
        for (const v of message.sources) {
            writer.uint32(50).string(v);
        }
        for (const v of message.links) {
            writer.uint32(58).string(v);
        }
        if (message.verifiedCredentialRef !== '') {
            writer.uint32(66).string(message.verifiedCredentialRef);
        }
        if (message.did !== '') {
            writer.uint32(74).string(message.did);
        }
        if (message.from !== '') {
            writer.uint32(82).string(message.from);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgMetadataTx };
        message.sources = [];
        message.links = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.name = reader.string();
                    break;
                case 2:
                    message.description = reader.string();
                    break;
                case 3:
                    message.image = reader.string();
                    break;
                case 4:
                    message.owner = reader.string();
                    break;
                case 5:
                    message.parent = reader.string();
                    break;
                case 6:
                    message.sources.push(reader.string());
                    break;
                case 7:
                    message.links.push(reader.string());
                    break;
                case 8:
                    message.verifiedCredentialRef = reader.string();
                    break;
                case 9:
                    message.did = reader.string();
                    break;
                case 10:
                    message.from = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgMetadataTx };
        message.sources = [];
        message.links = [];
        if (object.name !== undefined && object.name !== null) {
            message.name = String(object.name);
        }
        else {
            message.name = '';
        }
        if (object.description !== undefined && object.description !== null) {
            message.description = String(object.description);
        }
        else {
            message.description = '';
        }
        if (object.image !== undefined && object.image !== null) {
            message.image = String(object.image);
        }
        else {
            message.image = '';
        }
        if (object.owner !== undefined && object.owner !== null) {
            message.owner = String(object.owner);
        }
        else {
            message.owner = '';
        }
        if (object.parent !== undefined && object.parent !== null) {
            message.parent = String(object.parent);
        }
        else {
            message.parent = '';
        }
        if (object.sources !== undefined && object.sources !== null) {
            for (const e of object.sources) {
                message.sources.push(String(e));
            }
        }
        if (object.links !== undefined && object.links !== null) {
            for (const e of object.links) {
                message.links.push(String(e));
            }
        }
        if (object.verifiedCredentialRef !== undefined && object.verifiedCredentialRef !== null) {
            message.verifiedCredentialRef = String(object.verifiedCredentialRef);
        }
        else {
            message.verifiedCredentialRef = '';
        }
        if (object.did !== undefined && object.did !== null) {
            message.did = String(object.did);
        }
        else {
            message.did = '';
        }
        if (object.from !== undefined && object.from !== null) {
            message.from = String(object.from);
        }
        else {
            message.from = '';
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.name !== undefined && (obj.name = message.name);
        message.description !== undefined && (obj.description = message.description);
        message.image !== undefined && (obj.image = message.image);
        message.owner !== undefined && (obj.owner = message.owner);
        message.parent !== undefined && (obj.parent = message.parent);
        if (message.sources) {
            obj.sources = message.sources.map((e) => e);
        }
        else {
            obj.sources = [];
        }
        if (message.links) {
            obj.links = message.links.map((e) => e);
        }
        else {
            obj.links = [];
        }
        message.verifiedCredentialRef !== undefined && (obj.verifiedCredentialRef = message.verifiedCredentialRef);
        message.did !== undefined && (obj.did = message.did);
        message.from !== undefined && (obj.from = message.from);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgMetadataTx };
        message.sources = [];
        message.links = [];
        if (object.name !== undefined && object.name !== null) {
            message.name = object.name;
        }
        else {
            message.name = '';
        }
        if (object.description !== undefined && object.description !== null) {
            message.description = object.description;
        }
        else {
            message.description = '';
        }
        if (object.image !== undefined && object.image !== null) {
            message.image = object.image;
        }
        else {
            message.image = '';
        }
        if (object.owner !== undefined && object.owner !== null) {
            message.owner = object.owner;
        }
        else {
            message.owner = '';
        }
        if (object.parent !== undefined && object.parent !== null) {
            message.parent = object.parent;
        }
        else {
            message.parent = '';
        }
        if (object.sources !== undefined && object.sources !== null) {
            for (const e of object.sources) {
                message.sources.push(e);
            }
        }
        if (object.links !== undefined && object.links !== null) {
            for (const e of object.links) {
                message.links.push(e);
            }
        }
        if (object.verifiedCredentialRef !== undefined && object.verifiedCredentialRef !== null) {
            message.verifiedCredentialRef = object.verifiedCredentialRef;
        }
        else {
            message.verifiedCredentialRef = '';
        }
        if (object.did !== undefined && object.did !== null) {
            message.did = object.did;
        }
        else {
            message.did = '';
        }
        if (object.from !== undefined && object.from !== null) {
            message.from = object.from;
        }
        else {
            message.from = '';
        }
        return message;
    }
};
const baseMsgMetadata = {
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
};
export const MsgMetadata = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== '') {
            writer.uint32(10).string(message.creator);
        }
        if (message.name !== '') {
            writer.uint32(18).string(message.name);
        }
        if (message.description !== '') {
            writer.uint32(26).string(message.description);
        }
        if (message.image !== '') {
            writer.uint32(34).string(message.image);
        }
        if (message.owner !== '') {
            writer.uint32(42).string(message.owner);
        }
        if (message.parent !== '') {
            writer.uint32(50).string(message.parent);
        }
        if (message.sources !== '') {
            writer.uint32(58).string(message.sources);
        }
        if (message.links !== '') {
            writer.uint32(66).string(message.links);
        }
        if (message.verifiedCredentialRef !== '') {
            writer.uint32(74).string(message.verifiedCredentialRef);
        }
        if (message.did !== '') {
            writer.uint32(82).string(message.did);
        }
        if (message.from !== '') {
            writer.uint32(90).string(message.from);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgMetadata };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.name = reader.string();
                    break;
                case 3:
                    message.description = reader.string();
                    break;
                case 4:
                    message.image = reader.string();
                    break;
                case 5:
                    message.owner = reader.string();
                    break;
                case 6:
                    message.parent = reader.string();
                    break;
                case 7:
                    message.sources = reader.string();
                    break;
                case 8:
                    message.links = reader.string();
                    break;
                case 9:
                    message.verifiedCredentialRef = reader.string();
                    break;
                case 10:
                    message.did = reader.string();
                    break;
                case 11:
                    message.from = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgMetadata };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = '';
        }
        if (object.name !== undefined && object.name !== null) {
            message.name = String(object.name);
        }
        else {
            message.name = '';
        }
        if (object.description !== undefined && object.description !== null) {
            message.description = String(object.description);
        }
        else {
            message.description = '';
        }
        if (object.image !== undefined && object.image !== null) {
            message.image = String(object.image);
        }
        else {
            message.image = '';
        }
        if (object.owner !== undefined && object.owner !== null) {
            message.owner = String(object.owner);
        }
        else {
            message.owner = '';
        }
        if (object.parent !== undefined && object.parent !== null) {
            message.parent = String(object.parent);
        }
        else {
            message.parent = '';
        }
        if (object.sources !== undefined && object.sources !== null) {
            message.sources = String(object.sources);
        }
        else {
            message.sources = '';
        }
        if (object.links !== undefined && object.links !== null) {
            message.links = String(object.links);
        }
        else {
            message.links = '';
        }
        if (object.verifiedCredentialRef !== undefined && object.verifiedCredentialRef !== null) {
            message.verifiedCredentialRef = String(object.verifiedCredentialRef);
        }
        else {
            message.verifiedCredentialRef = '';
        }
        if (object.did !== undefined && object.did !== null) {
            message.did = String(object.did);
        }
        else {
            message.did = '';
        }
        if (object.from !== undefined && object.from !== null) {
            message.from = String(object.from);
        }
        else {
            message.from = '';
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.name !== undefined && (obj.name = message.name);
        message.description !== undefined && (obj.description = message.description);
        message.image !== undefined && (obj.image = message.image);
        message.owner !== undefined && (obj.owner = message.owner);
        message.parent !== undefined && (obj.parent = message.parent);
        message.sources !== undefined && (obj.sources = message.sources);
        message.links !== undefined && (obj.links = message.links);
        message.verifiedCredentialRef !== undefined && (obj.verifiedCredentialRef = message.verifiedCredentialRef);
        message.did !== undefined && (obj.did = message.did);
        message.from !== undefined && (obj.from = message.from);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgMetadata };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = '';
        }
        if (object.name !== undefined && object.name !== null) {
            message.name = object.name;
        }
        else {
            message.name = '';
        }
        if (object.description !== undefined && object.description !== null) {
            message.description = object.description;
        }
        else {
            message.description = '';
        }
        if (object.image !== undefined && object.image !== null) {
            message.image = object.image;
        }
        else {
            message.image = '';
        }
        if (object.owner !== undefined && object.owner !== null) {
            message.owner = object.owner;
        }
        else {
            message.owner = '';
        }
        if (object.parent !== undefined && object.parent !== null) {
            message.parent = object.parent;
        }
        else {
            message.parent = '';
        }
        if (object.sources !== undefined && object.sources !== null) {
            message.sources = object.sources;
        }
        else {
            message.sources = '';
        }
        if (object.links !== undefined && object.links !== null) {
            message.links = object.links;
        }
        else {
            message.links = '';
        }
        if (object.verifiedCredentialRef !== undefined && object.verifiedCredentialRef !== null) {
            message.verifiedCredentialRef = object.verifiedCredentialRef;
        }
        else {
            message.verifiedCredentialRef = '';
        }
        if (object.did !== undefined && object.did !== null) {
            message.did = object.did;
        }
        else {
            message.did = '';
        }
        if (object.from !== undefined && object.from !== null) {
            message.from = object.from;
        }
        else {
            message.from = '';
        }
        return message;
    }
};
const baseMsgMetadataResponse = { cid: '' };
export const MsgMetadataResponse = {
    encode(message, writer = Writer.create()) {
        if (message.cid !== '') {
            writer.uint32(10).string(message.cid);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgMetadataResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.cid = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgMetadataResponse };
        if (object.cid !== undefined && object.cid !== null) {
            message.cid = String(object.cid);
        }
        else {
            message.cid = '';
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.cid !== undefined && (obj.cid = message.cid);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgMetadataResponse };
        if (object.cid !== undefined && object.cid !== null) {
            message.cid = object.cid;
        }
        else {
            message.cid = '';
        }
        return message;
    }
};
const baseMsgFile = { creator: '', path: '', content: '', mode: '', time: '', contentType: '', did: '', from: '' };
export const MsgFile = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== '') {
            writer.uint32(10).string(message.creator);
        }
        if (message.path !== '') {
            writer.uint32(18).string(message.path);
        }
        if (message.content !== '') {
            writer.uint32(26).string(message.content);
        }
        if (message.mode !== '') {
            writer.uint32(34).string(message.mode);
        }
        if (message.time !== '') {
            writer.uint32(42).string(message.time);
        }
        if (message.contentType !== '') {
            writer.uint32(50).string(message.contentType);
        }
        if (message.did !== '') {
            writer.uint32(58).string(message.did);
        }
        if (message.from !== '') {
            writer.uint32(66).string(message.from);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgFile };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.path = reader.string();
                    break;
                case 3:
                    message.content = reader.string();
                    break;
                case 4:
                    message.mode = reader.string();
                    break;
                case 5:
                    message.time = reader.string();
                    break;
                case 6:
                    message.contentType = reader.string();
                    break;
                case 7:
                    message.did = reader.string();
                    break;
                case 8:
                    message.from = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgFile };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = '';
        }
        if (object.path !== undefined && object.path !== null) {
            message.path = String(object.path);
        }
        else {
            message.path = '';
        }
        if (object.content !== undefined && object.content !== null) {
            message.content = String(object.content);
        }
        else {
            message.content = '';
        }
        if (object.mode !== undefined && object.mode !== null) {
            message.mode = String(object.mode);
        }
        else {
            message.mode = '';
        }
        if (object.time !== undefined && object.time !== null) {
            message.time = String(object.time);
        }
        else {
            message.time = '';
        }
        if (object.contentType !== undefined && object.contentType !== null) {
            message.contentType = String(object.contentType);
        }
        else {
            message.contentType = '';
        }
        if (object.did !== undefined && object.did !== null) {
            message.did = String(object.did);
        }
        else {
            message.did = '';
        }
        if (object.from !== undefined && object.from !== null) {
            message.from = String(object.from);
        }
        else {
            message.from = '';
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.path !== undefined && (obj.path = message.path);
        message.content !== undefined && (obj.content = message.content);
        message.mode !== undefined && (obj.mode = message.mode);
        message.time !== undefined && (obj.time = message.time);
        message.contentType !== undefined && (obj.contentType = message.contentType);
        message.did !== undefined && (obj.did = message.did);
        message.from !== undefined && (obj.from = message.from);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgFile };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = '';
        }
        if (object.path !== undefined && object.path !== null) {
            message.path = object.path;
        }
        else {
            message.path = '';
        }
        if (object.content !== undefined && object.content !== null) {
            message.content = object.content;
        }
        else {
            message.content = '';
        }
        if (object.mode !== undefined && object.mode !== null) {
            message.mode = object.mode;
        }
        else {
            message.mode = '';
        }
        if (object.time !== undefined && object.time !== null) {
            message.time = object.time;
        }
        else {
            message.time = '';
        }
        if (object.contentType !== undefined && object.contentType !== null) {
            message.contentType = object.contentType;
        }
        else {
            message.contentType = '';
        }
        if (object.did !== undefined && object.did !== null) {
            message.did = object.did;
        }
        else {
            message.did = '';
        }
        if (object.from !== undefined && object.from !== null) {
            message.from = object.from;
        }
        else {
            message.from = '';
        }
        return message;
    }
};
const baseMsgFileResponse = { hash: '' };
export const MsgFileResponse = {
    encode(message, writer = Writer.create()) {
        if (message.hash !== '') {
            writer.uint32(10).string(message.hash);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgFileResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.hash = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgFileResponse };
        if (object.hash !== undefined && object.hash !== null) {
            message.hash = String(object.hash);
        }
        else {
            message.hash = '';
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.hash !== undefined && (obj.hash = message.hash);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgFileResponse };
        if (object.hash !== undefined && object.hash !== null) {
            message.hash = object.hash;
        }
        else {
            message.hash = '';
        }
        return message;
    }
};
export class MsgClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
    }
    Metadata(request) {
        const data = MsgMetadata.encode(request).finish();
        const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Msg', 'Metadata', data);
        return promise.then((data) => MsgMetadataResponse.decode(new Reader(data)));
    }
    File(request) {
        const data = MsgFile.encode(request).finish();
        const promise = this.rpc.request('ElectronicSignaturesIndustries.anconprotocol.anconprotocol.Msg', 'File', data);
        return promise.then((data) => MsgFileResponse.decode(new Reader(data)));
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
const atob = globalThis.atob || ((b64) => globalThis.Buffer.from(b64, 'base64').toString('binary'));
function bytesFromBase64(b64) {
    const bin = atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
        arr[i] = bin.charCodeAt(i);
    }
    return arr;
}
const btoa = globalThis.btoa || ((bin) => globalThis.Buffer.from(bin, 'binary').toString('base64'));
function base64FromBytes(arr) {
    const bin = [];
    for (let i = 0; i < arr.byteLength; ++i) {
        bin.push(String.fromCharCode(arr[i]));
    }
    return btoa(bin.join(''));
}
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
