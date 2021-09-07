/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

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

export type AnconprotocolMsgNonceResponse = object;

export interface AnconprotocolMsgRevokeDelegateResponse {
  /** @format byte */
  hash?: string;
}

export interface AnconprotocolMsgSetAttributeResponse {
  /** @format byte */
  hash?: string;
}

export type AnconprotocolQueryGetAttributesResponse = object;

export type AnconprotocolQueryGetDelegatesResponse = object;

export type AnconprotocolQueryIdentifyOwnerResponse = object;

export type AnconprotocolQueryNonceResponse = object;

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

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

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

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType) => RequestParams | void;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType = null as any;
  private securityWorker: null | ApiConfig<SecurityDataType>["securityWorker"] = null;
  private abortControllers = new Map<CancelToken, AbortController>();

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType) => {
    this.securityData = data;
  };

  private addQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];

    return (
      encodeURIComponent(key) +
      "=" +
      encodeURIComponent(Array.isArray(value) ? value.join(",") : typeof value === "number" ? value : `${value}`)
    );
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) =>
        typeof query[key] === "object" && !Array.isArray(query[key])
          ? this.toQueryString(query[key] as QueryParamsType)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((data, key) => {
        data.append(key, input[key]);
        return data;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  private mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format = "json",
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams = (secure && this.securityWorker && this.securityWorker(this.securityData)) || {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];

    return fetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        ...(requestParams.headers || {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : void 0,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = (null as unknown) as T;
      r.error = (null as unknown) as E;

      const data = await response[format]()
        .then((data) => {
          if (r.ok) {
            r.data = data;
          } else {
            r.error = data;
          }
          return r;
        })
        .catch((e) => {
          r.error = e;
          return r;
        });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title anconprotocol/genesis.proto
 * @version version not set
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Query
   * @name QueryReadDelegates
   * @summary Queries a list of nonce items.
   * @request GET:/ancon/didregistry/delegates
   */
  queryReadDelegates = (query?: { id?: string }, params: RequestParams = {}) =>
    this.request<AnconprotocolQueryGetDelegatesResponse, RpcStatus>({
      path: `/ancon/didregistry/delegates`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryReadDelegate
   * @summary Queries a list of delegates items.
   * @request GET:/ancon/didregistry/delegates/{id}
   */
  queryReadDelegate = (id: string, params: RequestParams = {}) =>
    this.request<AnconprotocolQueryGetDelegatesResponse, RpcStatus>({
      path: `/ancon/didregistry/delegates/${id}`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryReadNonces
   * @summary Queries a list of nonce items.
   * @request GET:/ancon/didregistry/nonces
   */
  queryReadNonces = (query?: { id?: string }, params: RequestParams = {}) =>
    this.request<AnconprotocolQueryNonceResponse, RpcStatus>({
      path: `/ancon/didregistry/nonces`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryReadNonce
   * @summary Queries a list of nonce items.
   * @request GET:/ancon/didregistry/nonces/{id}
   */
  queryReadNonce = (id: string, params: RequestParams = {}) =>
    this.request<AnconprotocolQueryNonceResponse, RpcStatus>({
      path: `/ancon/didregistry/nonces/${id}`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryIdentifyOwner
   * @summary Queries a list of owners items.
   * @request GET:/ancon/didregistry/{address}
   */
  queryIdentifyOwner = (address: string, params: RequestParams = {}) =>
    this.request<AnconprotocolQueryIdentifyOwnerResponse, RpcStatus>({
      path: `/ancon/didregistry/${address}`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryGetAttributes
   * @summary Queries a list of Attributes items.
   * @request GET:/ancon/didregistry/{address}/attributes
   */
  queryGetAttributes = (address: string, params: RequestParams = {}) =>
    this.request<AnconprotocolQueryGetAttributesResponse, RpcStatus>({
      path: `/ancon/didregistry/${address}/attributes`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
 * No description
 * 
 * @tags Query
 * @name QueryReadFile
 * @summary additional handler that uses ReadFile
Queries a list of resource items.
 * @request GET:/ancon/file/{cid}/{path}
 */
  queryReadFile = (cid: string, path: string, params: RequestParams = {}) =>
    this.request<AnconprotocolQueryResourceResponse, RpcStatus>({
      path: `/ancon/file/${cid}/${path}`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryResource
   * @summary Queries a list of resource items.
   * @request GET:/ancon/resource/{cid}
   */
  queryResource = (cid: string, query?: { path?: string }, params: RequestParams = {}) =>
    this.request<AnconprotocolQueryResourceResponse, RpcStatus>({
      path: `/ancon/resource/${cid}`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryRead
   * @summary Queries a list of resource items.
   * @request GET:/ancon/{cid}
   */
  queryRead = (cid: string, query?: { path?: string }, params: RequestParams = {}) =>
    this.request<AnconprotocolQueryResourceResponse, RpcStatus>({
      path: `/ancon/${cid}`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryReadWithPath
   * @summary Queries a list of resource items.
   * @request GET:/ancon/{cid}/{path}
   */
  queryReadWithPath = (cid: string, path: string, params: RequestParams = {}) =>
    this.request<AnconprotocolQueryResourceResponse, RpcStatus>({
      path: `/ancon/${cid}/${path}`,
      method: "GET",
      format: "json",
      ...params,
    });
}
