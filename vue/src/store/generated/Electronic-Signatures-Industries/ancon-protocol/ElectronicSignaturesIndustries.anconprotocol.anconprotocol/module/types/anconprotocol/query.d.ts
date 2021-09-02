import { Reader, Writer } from 'protobufjs/minimal';
export declare const protobufPackage = "ElectronicSignaturesIndustries.anconprotocol.anconprotocol";
/** this line is used by starport scaffolding # 3 */
export interface QueryOwnersRequest {
}
export interface QueryOwnersResponse {
}
export interface QueryResourceRequest {
    cid: string;
    path: string;
}
export interface QueryResourceResponse {
    data: string;
}
export declare const QueryOwnersRequest: {
    encode(_: QueryOwnersRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryOwnersRequest;
    fromJSON(_: any): QueryOwnersRequest;
    toJSON(_: QueryOwnersRequest): unknown;
    fromPartial(_: DeepPartial<QueryOwnersRequest>): QueryOwnersRequest;
};
export declare const QueryOwnersResponse: {
    encode(_: QueryOwnersResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryOwnersResponse;
    fromJSON(_: any): QueryOwnersResponse;
    toJSON(_: QueryOwnersResponse): unknown;
    fromPartial(_: DeepPartial<QueryOwnersResponse>): QueryOwnersResponse;
};
export declare const QueryResourceRequest: {
    encode(message: QueryResourceRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryResourceRequest;
    fromJSON(object: any): QueryResourceRequest;
    toJSON(message: QueryResourceRequest): unknown;
    fromPartial(object: DeepPartial<QueryResourceRequest>): QueryResourceRequest;
};
export declare const QueryResourceResponse: {
    encode(message: QueryResourceResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryResourceResponse;
    fromJSON(object: any): QueryResourceResponse;
    toJSON(message: QueryResourceResponse): unknown;
    fromPartial(object: DeepPartial<QueryResourceResponse>): QueryResourceResponse;
};
/** Query defines the gRPC querier service. */
export interface Query {
    /** Queries a list of resource items. */
    ReadWithPath(request: QueryResourceRequest): Promise<QueryResourceResponse>;
    /**
     * additional handler that uses ReadFile
     * Queries a list of resource items.
     */
    ReadFile(request: QueryResourceRequest): Promise<QueryResourceResponse>;
    /** Queries a list of resource items. */
    Read(request: QueryResourceRequest): Promise<QueryResourceResponse>;
    /** Queries a list of owners items. */
    Owners(request: QueryOwnersRequest): Promise<QueryOwnersResponse>;
    /** Queries a list of resource items. */
    Resource(request: QueryResourceRequest): Promise<QueryResourceResponse>;
}
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    constructor(rpc: Rpc);
    ReadWithPath(request: QueryResourceRequest): Promise<QueryResourceResponse>;
    ReadFile(request: QueryResourceRequest): Promise<QueryResourceResponse>;
    Read(request: QueryResourceRequest): Promise<QueryResourceResponse>;
    Owners(request: QueryOwnersRequest): Promise<QueryOwnersResponse>;
    Resource(request: QueryResourceRequest): Promise<QueryResourceResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
