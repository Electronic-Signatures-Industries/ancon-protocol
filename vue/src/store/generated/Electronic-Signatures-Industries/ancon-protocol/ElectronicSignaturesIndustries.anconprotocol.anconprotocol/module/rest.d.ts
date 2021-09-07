export interface AnconprotocolMsgAddDelegateResponse {
    /** @format byte */
    hash?: string;
}
export interface AnconprotocolMsgChangeOwnerResponse {
    /** @format byte */
    hash?: string;
}
export interface AnconprotocolMsgFileResponse {
    hash?: string;
}
export interface AnconprotocolMsgMetadataResponse {
    cid?: string;
}
export declare type AnconprotocolMsgNonceResponse = object;
export interface AnconprotocolMsgRevokeDelegateResponse {
    /** @format byte */
    hash?: string;
}
export interface AnconprotocolMsgSetAttributeResponse {
    /** @format byte */
    hash?: string;
}
export declare type AnconprotocolQueryGetAttributesResponse = object;
export declare type AnconprotocolQueryGetDelegatesResponse = object;
export declare type AnconprotocolQueryIdentifyOwnerResponse = object;
export declare type AnconprotocolQueryNonceResponse = object;
export interface AnconprotocolQueryResourceResponse {
    data?: string;
}
export interface ProtobufAny {
    typeUrl?: string;
    /** @format byte */
    value?: string;
}
export interface RpcStatus {
    /** @format int32 */
    code?: number;
    message?: string;
    details?: ProtobufAny[];
}
export declare type QueryParamsType = Record<string | number, any>;
export declare type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;
export interface FullRequestParams extends Omit<RequestInit, "body"> {
    /** set parameter to `true` for call `securityWorker` for this request */
    secure?: boolean;
    /** request path */
    path: string;
    /** content type of request body */
    type?: ContentType;
    /** query params */
    query?: QueryParamsType;
    /** format of response (i.e. response.json() -> format: "json") */
    format?: keyof Omit<Body, "body" | "bodyUsed">;
    /** request body */
    body?: unknown;
    /** base url */
    baseUrl?: string;
    /** request cancellation token */
    cancelToken?: CancelToken;
}
export declare type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;
export interface ApiConfig<SecurityDataType = unknown> {
    baseUrl?: string;
    baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
    securityWorker?: (securityData: SecurityDataType) => RequestParams | void;
}
export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
    data: D;
    error: E;
}
declare type CancelToken = Symbol | string | number;
export declare enum ContentType {
    Json = "application/json",
    FormData = "multipart/form-data",
    UrlEncoded = "application/x-www-form-urlencoded"
}
export declare class HttpClient<SecurityDataType = unknown> {
    baseUrl: string;
    private securityData;
    private securityWorker;
    private abortControllers;
    private baseApiParams;
    constructor(apiConfig?: ApiConfig<SecurityDataType>);
    setSecurityData: (data: SecurityDataType) => void;
    private addQueryParam;
    protected toQueryString(rawQuery?: QueryParamsType): string;
    protected addQueryParams(rawQuery?: QueryParamsType): string;
    private contentFormatters;
    private mergeRequestParams;
    private createAbortSignal;
    abortRequest: (cancelToken: CancelToken) => void;
    request: <T = any, E = any>({ body, secure, path, type, query, format, baseUrl, cancelToken, ...params }: FullRequestParams) => Promise<HttpResponse<T, E>>;
}
/**
 * @title anconprotocol/genesis.proto
 * @version version not set
 */
export declare class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags Query
     * @name QueryReadDelegates
     * @summary Queries a list of nonce items.
     * @request GET:/ancon/didregistry/delegates
     */
    queryReadDelegates: (query?: {
        id?: string;
    }, params?: RequestParams) => Promise<HttpResponse<object, RpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryReadDelegate
     * @summary Queries a list of delegates items.
     * @request GET:/ancon/didregistry/delegates/{id}
     */
    queryReadDelegate: (id: string, params?: RequestParams) => Promise<HttpResponse<object, RpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryReadNonces
     * @summary Queries a list of nonce items.
     * @request GET:/ancon/didregistry/nonces
     */
    queryReadNonces: (query?: {
        id?: string;
    }, params?: RequestParams) => Promise<HttpResponse<object, RpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryReadNonce
     * @summary Queries a list of nonce items.
     * @request GET:/ancon/didregistry/nonces/{id}
     */
    queryReadNonce: (id: string, params?: RequestParams) => Promise<HttpResponse<object, RpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryIdentifyOwner
     * @summary Queries a list of owners items.
     * @request GET:/ancon/didregistry/{address}
     */
    queryIdentifyOwner: (address: string, params?: RequestParams) => Promise<HttpResponse<object, RpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryGetAttributes
     * @summary Queries a list of Attributes items.
     * @request GET:/ancon/didregistry/{address}/attributes
     */
    queryGetAttributes: (address: string, params?: RequestParams) => Promise<HttpResponse<object, RpcStatus>>;
    /**
   * No description
   *
   * @tags Query
   * @name QueryReadFile
   * @summary additional handler that uses ReadFile
  Queries a list of resource items.
   * @request GET:/ancon/file/{cid}/{path}
   */
    queryReadFile: (cid: string, path: string, params?: RequestParams) => Promise<HttpResponse<AnconprotocolQueryResourceResponse, RpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryResource
     * @summary Queries a list of resource items.
     * @request GET:/ancon/resource/{cid}
     */
    queryResource: (cid: string, query?: {
        path?: string;
    }, params?: RequestParams) => Promise<HttpResponse<AnconprotocolQueryResourceResponse, RpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryRead
     * @summary Queries a list of resource items.
     * @request GET:/ancon/{cid}
     */
    queryRead: (cid: string, query?: {
        path?: string;
    }, params?: RequestParams) => Promise<HttpResponse<AnconprotocolQueryResourceResponse, RpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryReadWithPath
     * @summary Queries a list of resource items.
     * @request GET:/ancon/{cid}/{path}
     */
    queryReadWithPath: (cid: string, path: string, params?: RequestParams) => Promise<HttpResponse<AnconprotocolQueryResourceResponse, RpcStatus>>;
}
export {};
