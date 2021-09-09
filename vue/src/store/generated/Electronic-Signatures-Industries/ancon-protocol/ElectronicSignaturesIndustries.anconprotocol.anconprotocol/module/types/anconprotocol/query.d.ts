import { Reader, Writer } from 'protobufjs/minimal';
export declare const protobufPackage = "ElectronicSignaturesIndustries.anconprotocol.anconprotocol";
export interface QueryGetDelegateRequest {
    id: string;
}
export interface QueryGetDelegateResponse {
}
export interface QueryNonceRequest {
    id: string;
}
export interface QueryNonceResponse {
}
export interface QueryGetAttributesResponse {
}
export interface QueryIdentifyOwnerResponse {
}
export interface QueryGetAttributesRequest {
    address: string;
}
export interface QueryIdentifyOwnerRequest {
    address: string;
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
export declare const QueryGetDelegateRequest: {
    encode(message: QueryGetDelegateRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetDelegateRequest;
    fromJSON(object: any): QueryGetDelegateRequest;
    toJSON(message: QueryGetDelegateRequest): unknown;
    fromPartial(object: DeepPartial<QueryGetDelegateRequest>): QueryGetDelegateRequest;
};
export declare const QueryGetDelegateResponse: {
    encode(_: QueryGetDelegateResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetDelegateResponse;
    fromJSON(_: any): QueryGetDelegateResponse;
    toJSON(_: QueryGetDelegateResponse): unknown;
    fromPartial(_: DeepPartial<QueryGetDelegateResponse>): QueryGetDelegateResponse;
};
export declare const QueryNonceRequest: {
    encode(message: QueryNonceRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryNonceRequest;
    fromJSON(object: any): QueryNonceRequest;
    toJSON(message: QueryNonceRequest): unknown;
    fromPartial(object: DeepPartial<QueryNonceRequest>): QueryNonceRequest;
};
export declare const QueryNonceResponse: {
    encode(_: QueryNonceResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryNonceResponse;
    fromJSON(_: any): QueryNonceResponse;
    toJSON(_: QueryNonceResponse): unknown;
    fromPartial(_: DeepPartial<QueryNonceResponse>): QueryNonceResponse;
};
export declare const QueryGetAttributesResponse: {
    encode(_: QueryGetAttributesResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetAttributesResponse;
    fromJSON(_: any): QueryGetAttributesResponse;
    toJSON(_: QueryGetAttributesResponse): unknown;
    fromPartial(_: DeepPartial<QueryGetAttributesResponse>): QueryGetAttributesResponse;
};
export declare const QueryIdentifyOwnerResponse: {
    encode(_: QueryIdentifyOwnerResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryIdentifyOwnerResponse;
    fromJSON(_: any): QueryIdentifyOwnerResponse;
    toJSON(_: QueryIdentifyOwnerResponse): unknown;
    fromPartial(_: DeepPartial<QueryIdentifyOwnerResponse>): QueryIdentifyOwnerResponse;
};
export declare const QueryGetAttributesRequest: {
    encode(message: QueryGetAttributesRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetAttributesRequest;
    fromJSON(object: any): QueryGetAttributesRequest;
    toJSON(message: QueryGetAttributesRequest): unknown;
    fromPartial(object: DeepPartial<QueryGetAttributesRequest>): QueryGetAttributesRequest;
};
export declare const QueryIdentifyOwnerRequest: {
    encode(message: QueryIdentifyOwnerRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryIdentifyOwnerRequest;
    fromJSON(object: any): QueryIdentifyOwnerRequest;
    toJSON(message: QueryIdentifyOwnerRequest): unknown;
    fromPartial(object: DeepPartial<QueryIdentifyOwnerRequest>): QueryIdentifyOwnerRequest;
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
    IdentifyOwner(request: QueryIdentifyOwnerRequest): Promise<QueryIdentifyOwnerResponse>;
    /** Queries a list of Attributes items. */
    GetAttributes(request: QueryGetAttributesRequest): Promise<QueryGetAttributesResponse>;
    /** Queries a list of resource items. */
    Resource(request: QueryResourceRequest): Promise<QueryResourceResponse>;
    /** Queries a list of delegates items. */
    ReadDelegate(request: QueryGetDelegateRequest): Promise<QueryGetDelegateResponse>;
}
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    constructor(rpc: Rpc);
    ReadWithPath(request: QueryResourceRequest): Promise<QueryResourceResponse>;
    ReadFile(request: QueryResourceRequest): Promise<QueryResourceResponse>;
    Read(request: QueryResourceRequest): Promise<QueryResourceResponse>;
    IdentifyOwner(request: QueryIdentifyOwnerRequest): Promise<QueryIdentifyOwnerResponse>;
    GetAttributes(request: QueryGetAttributesRequest): Promise<QueryGetAttributesResponse>;
    Resource(request: QueryResourceRequest): Promise<QueryResourceResponse>;
    ReadDelegate(request: QueryGetDelegateRequest): Promise<QueryGetDelegateResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
