import { Reader, Writer } from 'protobufjs/minimal';
import { PageRequest, PageResponse } from '../cosmos/base/query/v1beta1/pagination';
import { Owner, Collection, Denom, BaseNFT } from '../anconprotocol/nft';
export declare const protobufPackage = "ElectronicSignaturesIndustries.anconprotocol.anconprotocol";
export interface QuerySupplyResponse {
    amount: number;
}
/** QueryOwnerRequest is the request type for the Query/Owner RPC method */
export interface QueryOwnerRequest {
    denomId: string;
    owner: string;
    /** pagination defines an optional pagination for the request. */
    pagination: PageRequest | undefined;
}
/** QueryOwnerResponse is the response type for the Query/Owner RPC method */
export interface QueryOwnerResponse {
    owner: Owner | undefined;
    pagination: PageResponse | undefined;
}
/** QueryCollectionRequest is the request type for the Query/Collection RPC method */
export interface QueryCollectionRequest {
    denomId: string;
    /** pagination defines an optional pagination for the request. */
    pagination: PageRequest | undefined;
}
/** QueryCollectionResponse is the response type for the Query/Collection RPC method */
export interface QueryCollectionResponse {
    collection: Collection | undefined;
    pagination: PageResponse | undefined;
}
/** QueryDenomRequest is the request type for the Query/Denom RPC method */
export interface QueryDenomRequest {
    denomId: string;
}
/** QueryDenomResponse is the response type for the Query/Denom RPC method */
export interface QueryDenomResponse {
    denom: Denom | undefined;
}
/** QueryDenomsRequest is the request type for the Query/Denoms RPC method */
export interface QueryDenomsRequest {
    /** pagination defines an optional pagination for the request. */
    pagination: PageRequest | undefined;
}
/** QueryDenomsResponse is the response type for the Query/Denoms RPC method */
export interface QueryDenomsResponse {
    denoms: Denom[];
    pagination: PageResponse | undefined;
}
/** QueryNFTRequest is the request type for the Query/NFT RPC method */
export interface QueryNFTRequest {
    denomId: string;
    tokenId: string;
}
/** QueryNFTResponse is the response type for the Query/NFT RPC method */
export interface QueryNFTResponse {
    nft: BaseNFT | undefined;
}
/** this line is used by starport scaffolding # 3 */
export interface QueryResourceRequest {
    cid: string;
    path: string;
}
export interface QueryResourceResponse {
    data: string;
}
export declare const QuerySupplyResponse: {
    encode(message: QuerySupplyResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QuerySupplyResponse;
    fromJSON(object: any): QuerySupplyResponse;
    toJSON(message: QuerySupplyResponse): unknown;
    fromPartial(object: DeepPartial<QuerySupplyResponse>): QuerySupplyResponse;
};
export declare const QueryOwnerRequest: {
    encode(message: QueryOwnerRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryOwnerRequest;
    fromJSON(object: any): QueryOwnerRequest;
    toJSON(message: QueryOwnerRequest): unknown;
    fromPartial(object: DeepPartial<QueryOwnerRequest>): QueryOwnerRequest;
};
export declare const QueryOwnerResponse: {
    encode(message: QueryOwnerResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryOwnerResponse;
    fromJSON(object: any): QueryOwnerResponse;
    toJSON(message: QueryOwnerResponse): unknown;
    fromPartial(object: DeepPartial<QueryOwnerResponse>): QueryOwnerResponse;
};
export declare const QueryCollectionRequest: {
    encode(message: QueryCollectionRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryCollectionRequest;
    fromJSON(object: any): QueryCollectionRequest;
    toJSON(message: QueryCollectionRequest): unknown;
    fromPartial(object: DeepPartial<QueryCollectionRequest>): QueryCollectionRequest;
};
export declare const QueryCollectionResponse: {
    encode(message: QueryCollectionResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryCollectionResponse;
    fromJSON(object: any): QueryCollectionResponse;
    toJSON(message: QueryCollectionResponse): unknown;
    fromPartial(object: DeepPartial<QueryCollectionResponse>): QueryCollectionResponse;
};
export declare const QueryDenomRequest: {
    encode(message: QueryDenomRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryDenomRequest;
    fromJSON(object: any): QueryDenomRequest;
    toJSON(message: QueryDenomRequest): unknown;
    fromPartial(object: DeepPartial<QueryDenomRequest>): QueryDenomRequest;
};
export declare const QueryDenomResponse: {
    encode(message: QueryDenomResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryDenomResponse;
    fromJSON(object: any): QueryDenomResponse;
    toJSON(message: QueryDenomResponse): unknown;
    fromPartial(object: DeepPartial<QueryDenomResponse>): QueryDenomResponse;
};
export declare const QueryDenomsRequest: {
    encode(message: QueryDenomsRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryDenomsRequest;
    fromJSON(object: any): QueryDenomsRequest;
    toJSON(message: QueryDenomsRequest): unknown;
    fromPartial(object: DeepPartial<QueryDenomsRequest>): QueryDenomsRequest;
};
export declare const QueryDenomsResponse: {
    encode(message: QueryDenomsResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryDenomsResponse;
    fromJSON(object: any): QueryDenomsResponse;
    toJSON(message: QueryDenomsResponse): unknown;
    fromPartial(object: DeepPartial<QueryDenomsResponse>): QueryDenomsResponse;
};
export declare const QueryNFTRequest: {
    encode(message: QueryNFTRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryNFTRequest;
    fromJSON(object: any): QueryNFTRequest;
    toJSON(message: QueryNFTRequest): unknown;
    fromPartial(object: DeepPartial<QueryNFTRequest>): QueryNFTRequest;
};
export declare const QueryNFTResponse: {
    encode(message: QueryNFTResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryNFTResponse;
    fromJSON(object: any): QueryNFTResponse;
    toJSON(message: QueryNFTResponse): unknown;
    fromPartial(object: DeepPartial<QueryNFTResponse>): QueryNFTResponse;
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
    /** Queries a list of resource items. */
    Resource(request: QueryResourceRequest): Promise<QueryResourceResponse>;
    /** Owner queries the NFTs of the specified owner */
    Owner(request: QueryOwnerRequest): Promise<QueryOwnerResponse>;
    /** Collection queries the NFTs of the specified denom */
    Collection(request: QueryCollectionRequest): Promise<QueryCollectionResponse>;
    /** Denom queries the definition of a given denom */
    Denom(request: QueryDenomRequest): Promise<QueryDenomResponse>;
    /** Denoms queries all the denoms */
    Denoms(request: QueryDenomsRequest): Promise<QueryDenomsResponse>;
    /** NFT queries the NFT for the given denom and token ID */
    GetNft(request: QueryNFTRequest): Promise<QueryNFTResponse>;
}
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    constructor(rpc: Rpc);
    ReadWithPath(request: QueryResourceRequest): Promise<QueryResourceResponse>;
    ReadFile(request: QueryResourceRequest): Promise<QueryResourceResponse>;
    Read(request: QueryResourceRequest): Promise<QueryResourceResponse>;
    Resource(request: QueryResourceRequest): Promise<QueryResourceResponse>;
    Owner(request: QueryOwnerRequest): Promise<QueryOwnerResponse>;
    Collection(request: QueryCollectionRequest): Promise<QueryCollectionResponse>;
    Denom(request: QueryDenomRequest): Promise<QueryDenomResponse>;
    Denoms(request: QueryDenomsRequest): Promise<QueryDenomsResponse>;
    GetNft(request: QueryNFTRequest): Promise<QueryNFTResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
