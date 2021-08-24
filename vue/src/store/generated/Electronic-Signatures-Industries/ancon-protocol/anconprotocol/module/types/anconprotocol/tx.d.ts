import { Reader, Writer } from 'protobufjs/minimal';
export declare const protobufPackage = "anconprotocol";
/** MsgEthereumTxResponse defines the Msg/EthereumTx response type. */
export interface MsgFileMetadataResponse {
    hash: Uint8Array;
}
export interface MsgFileTx {
    path: string;
    content: string;
    mode: string;
    time: number;
    contentType: string;
    did: string;
    from: string;
}
export interface MsgMetadataTx {
    name: string;
    description: string;
    image: string;
    owner: string;
    parent: string;
    sources: string[];
    links: string[];
    verifiedCredentialRef: string;
    did: string;
    from: string;
}
/** this line is used by starport scaffolding # proto/tx/message */
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
export declare const MsgFileMetadataResponse: {
    encode(message: MsgFileMetadataResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgFileMetadataResponse;
    fromJSON(object: any): MsgFileMetadataResponse;
    toJSON(message: MsgFileMetadataResponse): unknown;
    fromPartial(object: DeepPartial<MsgFileMetadataResponse>): MsgFileMetadataResponse;
};
export declare const MsgFileTx: {
    encode(message: MsgFileTx, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgFileTx;
    fromJSON(object: any): MsgFileTx;
    toJSON(message: MsgFileTx): unknown;
    fromPartial(object: DeepPartial<MsgFileTx>): MsgFileTx;
};
export declare const MsgMetadataTx: {
    encode(message: MsgMetadataTx, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgMetadataTx;
    fromJSON(object: any): MsgMetadataTx;
    toJSON(message: MsgMetadataTx): unknown;
    fromPartial(object: DeepPartial<MsgMetadataTx>): MsgMetadataTx;
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
    Metadata(request: MsgMetadata): Promise<MsgMetadataResponse>;
    File(request: MsgFile): Promise<MsgFileResponse>;
}
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    constructor(rpc: Rpc);
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
