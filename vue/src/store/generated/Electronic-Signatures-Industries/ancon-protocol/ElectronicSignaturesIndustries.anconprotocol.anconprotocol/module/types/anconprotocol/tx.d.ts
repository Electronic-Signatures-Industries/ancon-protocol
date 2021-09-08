import { Reader, Writer } from 'protobufjs/minimal';
export declare const protobufPackage = "ElectronicSignaturesIndustries.anconprotocol.anconprotocol";
export interface MsgChangeOwner {
    creator: string;
    identity: string;
    newOwner: string;
}
export interface MsgChangeOwnerResponse {
    identity: string;
    owner: string;
    previousChange: number;
}
export interface MsgGrantDelegate {
    delegate: string;
    delegateType: string;
    validity: boolean;
    creator: string;
    identity: string;
}
export interface MsgGrantDelegateResponse {
    hash: Uint8Array;
}
export interface MsgRevokeDelegate {
    delegate: string;
    delegateType: string;
    validity: boolean;
    creator: string;
    identity: string;
}
export interface MsgRevokeDelegateResponse {
    hash: Uint8Array;
}
export interface MsgSetAttribute {
    identity: string;
    actor: string;
    name: Uint8Array;
    value: Uint8Array;
    validity: boolean;
}
export interface MsgSetAttributeResponse {
    hash: Uint8Array;
}
export interface MsgRevokeAttribute {
    identity: string;
    actor: string;
    name: Uint8Array;
    value: Uint8Array;
}
export interface MsgRevokeAttributeResponse {
    hash: Uint8Array;
}
export interface MsgFileMetadataResponse {
    hash: Uint8Array;
}
/** this line is used by starport scaffolding # proto/tx/message */
export interface MsgNonce {
    creator: string;
    delegates: string;
}
export interface MsgNonceResponse {
}
export interface MsgMetadata {
    creator: string;
    name: string;
    description: string;
    image: string;
    owner: string;
    parent: string;
    sources: string;
    links: string;
    verifiedCredentialRef: string;
    did: string;
    from: string;
}
export interface MsgMetadataResponse {
    cid: string;
}
export interface MsgFile {
    creator: string;
    path: string;
    content: string;
    mode: string;
    time: string;
    contentType: string;
    did: string;
    from: string;
}
export interface MsgFileResponse {
    hash: string;
}
export declare const MsgChangeOwner: {
    encode(message: MsgChangeOwner, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgChangeOwner;
    fromJSON(object: any): MsgChangeOwner;
    toJSON(message: MsgChangeOwner): unknown;
    fromPartial(object: DeepPartial<MsgChangeOwner>): MsgChangeOwner;
};
export declare const MsgChangeOwnerResponse: {
    encode(message: MsgChangeOwnerResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgChangeOwnerResponse;
    fromJSON(object: any): MsgChangeOwnerResponse;
    toJSON(message: MsgChangeOwnerResponse): unknown;
    fromPartial(object: DeepPartial<MsgChangeOwnerResponse>): MsgChangeOwnerResponse;
};
export declare const MsgGrantDelegate: {
    encode(message: MsgGrantDelegate, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgGrantDelegate;
    fromJSON(object: any): MsgGrantDelegate;
    toJSON(message: MsgGrantDelegate): unknown;
    fromPartial(object: DeepPartial<MsgGrantDelegate>): MsgGrantDelegate;
};
export declare const MsgGrantDelegateResponse: {
    encode(message: MsgGrantDelegateResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgGrantDelegateResponse;
    fromJSON(object: any): MsgGrantDelegateResponse;
    toJSON(message: MsgGrantDelegateResponse): unknown;
    fromPartial(object: DeepPartial<MsgGrantDelegateResponse>): MsgGrantDelegateResponse;
};
export declare const MsgRevokeDelegate: {
    encode(message: MsgRevokeDelegate, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgRevokeDelegate;
    fromJSON(object: any): MsgRevokeDelegate;
    toJSON(message: MsgRevokeDelegate): unknown;
    fromPartial(object: DeepPartial<MsgRevokeDelegate>): MsgRevokeDelegate;
};
export declare const MsgRevokeDelegateResponse: {
    encode(message: MsgRevokeDelegateResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgRevokeDelegateResponse;
    fromJSON(object: any): MsgRevokeDelegateResponse;
    toJSON(message: MsgRevokeDelegateResponse): unknown;
    fromPartial(object: DeepPartial<MsgRevokeDelegateResponse>): MsgRevokeDelegateResponse;
};
export declare const MsgSetAttribute: {
    encode(message: MsgSetAttribute, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgSetAttribute;
    fromJSON(object: any): MsgSetAttribute;
    toJSON(message: MsgSetAttribute): unknown;
    fromPartial(object: DeepPartial<MsgSetAttribute>): MsgSetAttribute;
};
export declare const MsgSetAttributeResponse: {
    encode(message: MsgSetAttributeResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgSetAttributeResponse;
    fromJSON(object: any): MsgSetAttributeResponse;
    toJSON(message: MsgSetAttributeResponse): unknown;
    fromPartial(object: DeepPartial<MsgSetAttributeResponse>): MsgSetAttributeResponse;
};
export declare const MsgRevokeAttribute: {
    encode(message: MsgRevokeAttribute, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgRevokeAttribute;
    fromJSON(object: any): MsgRevokeAttribute;
    toJSON(message: MsgRevokeAttribute): unknown;
    fromPartial(object: DeepPartial<MsgRevokeAttribute>): MsgRevokeAttribute;
};
export declare const MsgRevokeAttributeResponse: {
    encode(message: MsgRevokeAttributeResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgRevokeAttributeResponse;
    fromJSON(object: any): MsgRevokeAttributeResponse;
    toJSON(message: MsgRevokeAttributeResponse): unknown;
    fromPartial(object: DeepPartial<MsgRevokeAttributeResponse>): MsgRevokeAttributeResponse;
};
export declare const MsgFileMetadataResponse: {
    encode(message: MsgFileMetadataResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgFileMetadataResponse;
    fromJSON(object: any): MsgFileMetadataResponse;
    toJSON(message: MsgFileMetadataResponse): unknown;
    fromPartial(object: DeepPartial<MsgFileMetadataResponse>): MsgFileMetadataResponse;
};
export declare const MsgNonce: {
    encode(message: MsgNonce, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgNonce;
    fromJSON(object: any): MsgNonce;
    toJSON(message: MsgNonce): unknown;
    fromPartial(object: DeepPartial<MsgNonce>): MsgNonce;
};
export declare const MsgNonceResponse: {
    encode(_: MsgNonceResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgNonceResponse;
    fromJSON(_: any): MsgNonceResponse;
    toJSON(_: MsgNonceResponse): unknown;
    fromPartial(_: DeepPartial<MsgNonceResponse>): MsgNonceResponse;
};
export declare const MsgMetadata: {
    encode(message: MsgMetadata, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgMetadata;
    fromJSON(object: any): MsgMetadata;
    toJSON(message: MsgMetadata): unknown;
    fromPartial(object: DeepPartial<MsgMetadata>): MsgMetadata;
};
export declare const MsgMetadataResponse: {
    encode(message: MsgMetadataResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgMetadataResponse;
    fromJSON(object: any): MsgMetadataResponse;
    toJSON(message: MsgMetadataResponse): unknown;
    fromPartial(object: DeepPartial<MsgMetadataResponse>): MsgMetadataResponse;
};
export declare const MsgFile: {
    encode(message: MsgFile, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgFile;
    fromJSON(object: any): MsgFile;
    toJSON(message: MsgFile): unknown;
    fromPartial(object: DeepPartial<MsgFile>): MsgFile;
};
export declare const MsgFileResponse: {
    encode(message: MsgFileResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgFileResponse;
    fromJSON(object: any): MsgFileResponse;
    toJSON(message: MsgFileResponse): unknown;
    fromPartial(object: DeepPartial<MsgFileResponse>): MsgFileResponse;
};
/** Msg defines the Msg service. */
export interface Msg {
    /**
     * rpc MetadataHandlerTx(MsgMetadataTx) returns (MsgFileMetadataResponse);
     * rpc FileHandlerTx(MsgFileTx) returns (MsgFileMetadataResponse);
     * this line is used by starport scaffolding # proto/tx/rpc
     */
    Nonce(request: MsgNonce): Promise<MsgNonceResponse>;
    ChangeOwner(request: MsgChangeOwner): Promise<MsgChangeOwnerResponse>;
    /** rpc ValidDelegate(MsgValidDelegate) returns (MsgValidDelegateResponse); */
    AddDelegate(request: MsgGrantDelegate): Promise<MsgGrantDelegateResponse>;
    RevokeDelegate(request: MsgRevokeDelegate): Promise<MsgRevokeDelegateResponse>;
    SetAttribute(request: MsgSetAttribute): Promise<MsgSetAttributeResponse>;
    RevokeAttribute(request: MsgRevokeAttribute): Promise<MsgRevokeAttributeResponse>;
    Metadata(request: MsgMetadata): Promise<MsgMetadataResponse>;
    /** rpc CreateDid (MsgCreateDid) returns (MsgCreateDidResponse) */
    File(request: MsgFile): Promise<MsgFileResponse>;
}
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    constructor(rpc: Rpc);
    Nonce(request: MsgNonce): Promise<MsgNonceResponse>;
    ChangeOwner(request: MsgChangeOwner): Promise<MsgChangeOwnerResponse>;
    AddDelegate(request: MsgGrantDelegate): Promise<MsgGrantDelegateResponse>;
    RevokeDelegate(request: MsgRevokeDelegate): Promise<MsgRevokeDelegateResponse>;
    SetAttribute(request: MsgSetAttribute): Promise<MsgSetAttributeResponse>;
    RevokeAttribute(request: MsgRevokeAttribute): Promise<MsgRevokeAttributeResponse>;
    Metadata(request: MsgMetadata): Promise<MsgMetadataResponse>;
    File(request: MsgFile): Promise<MsgFileResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
