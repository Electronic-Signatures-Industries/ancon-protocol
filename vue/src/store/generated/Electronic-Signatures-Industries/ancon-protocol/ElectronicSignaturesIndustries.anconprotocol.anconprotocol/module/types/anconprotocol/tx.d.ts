import { Reader, Writer } from 'protobufjs/minimal';
export declare const protobufPackage = "ElectronicSignaturesIndustries.anconprotocol.anconprotocol";
/** MsgIssueDenom defines an SDK message for creating a new denom. */
export interface MsgIssueDenom {
    id: string;
    name: string;
    schema: string;
    sender: string;
    symbol: string;
    mintRestricted: boolean;
    updateRestricted: boolean;
}
/** MsgIssueDenomResponse defines the Msg/IssueDenom response type. */
export interface MsgIssueDenomResponse {
}
/** MsgTransferNFT defines an SDK message for transferring an NFT to recipient. */
export interface MsgTransferNFT {
    id: string;
    denomId: string;
    name: string;
    uri: string;
    data: string;
    sender: string;
    recipient: string;
}
/** MsgTransferNFTResponse defines the Msg/TransferNFT response type. */
export interface MsgTransferNFTResponse {
}
/** MsgEditNFT defines an SDK message for editing a nft. */
export interface MsgEditNFT {
    id: string;
    denomId: string;
    name: string;
    uri: string;
    data: string;
    sender: string;
}
/** MsgEditNFTResponse defines the Msg/EditNFT response type. */
export interface MsgEditNFTResponse {
}
/** MsgMintNFT defines an SDK message for creating a new NFT. */
export interface MsgMintNFT {
    id: string;
    denomId: string;
    name: string;
    uri: string;
    data: string;
    sender: string;
    recipient: string;
}
/** MsgMintNFTResponse defines the Msg/MintNFT response type. */
export interface MsgMintNFTResponse {
}
/** MsgBurnNFT defines an SDK message for burning a NFT. */
export interface MsgBurnNFT {
    id: string;
    denomId: string;
    sender: string;
}
/** MsgBurnNFTResponse defines the Msg/BurnNFT response type. */
export interface MsgBurnNFTResponse {
}
/** MsgTransferDenom defines an SDK message for transferring an denom to recipient. */
export interface MsgTransferDenom {
    id: string;
    sender: string;
    recipient: string;
}
/** MsgTransferDenomResponse defines the Msg/TransferDenom response type. */
export interface MsgTransferDenomResponse {
}
/** MsgCreateHTLC defines a message to create an HTLC */
export interface MsgCreateHTLC {
    sender: string;
    to: string;
    receiverOnOtherChain: string;
    senderOnOtherChain: string;
    tokenId: number;
    hashLock: string;
    timestamp: number;
    timeLock: number;
    transfer: boolean;
}
/** MsgCreateHTLCResponse defines the Msg/CreateHTLC response type */
export interface MsgCreateHTLCResponse {
    id: string;
}
/** MsgClaimHTLC defines a message to claim an HTLC */
export interface MsgClaimHTLC {
    sender: string;
    id: string;
    secret: string;
}
/** MsgClaimHTLCResponse defines the Msg/ClaimHTLC response type */
export interface MsgClaimHTLCResponse {
}
/** MsgEthereumTxResponse defines the Msg/EthereumTx response type. */
export interface MsgFileMetadataResponse {
    hash: Uint8Array;
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
export declare const MsgIssueDenom: {
    encode(message: MsgIssueDenom, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgIssueDenom;
    fromJSON(object: any): MsgIssueDenom;
    toJSON(message: MsgIssueDenom): unknown;
    fromPartial(object: DeepPartial<MsgIssueDenom>): MsgIssueDenom;
};
export declare const MsgIssueDenomResponse: {
    encode(_: MsgIssueDenomResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgIssueDenomResponse;
    fromJSON(_: any): MsgIssueDenomResponse;
    toJSON(_: MsgIssueDenomResponse): unknown;
    fromPartial(_: DeepPartial<MsgIssueDenomResponse>): MsgIssueDenomResponse;
};
export declare const MsgTransferNFT: {
    encode(message: MsgTransferNFT, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgTransferNFT;
    fromJSON(object: any): MsgTransferNFT;
    toJSON(message: MsgTransferNFT): unknown;
    fromPartial(object: DeepPartial<MsgTransferNFT>): MsgTransferNFT;
};
export declare const MsgTransferNFTResponse: {
    encode(_: MsgTransferNFTResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgTransferNFTResponse;
    fromJSON(_: any): MsgTransferNFTResponse;
    toJSON(_: MsgTransferNFTResponse): unknown;
    fromPartial(_: DeepPartial<MsgTransferNFTResponse>): MsgTransferNFTResponse;
};
export declare const MsgEditNFT: {
    encode(message: MsgEditNFT, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgEditNFT;
    fromJSON(object: any): MsgEditNFT;
    toJSON(message: MsgEditNFT): unknown;
    fromPartial(object: DeepPartial<MsgEditNFT>): MsgEditNFT;
};
export declare const MsgEditNFTResponse: {
    encode(_: MsgEditNFTResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgEditNFTResponse;
    fromJSON(_: any): MsgEditNFTResponse;
    toJSON(_: MsgEditNFTResponse): unknown;
    fromPartial(_: DeepPartial<MsgEditNFTResponse>): MsgEditNFTResponse;
};
export declare const MsgMintNFT: {
    encode(message: MsgMintNFT, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgMintNFT;
    fromJSON(object: any): MsgMintNFT;
    toJSON(message: MsgMintNFT): unknown;
    fromPartial(object: DeepPartial<MsgMintNFT>): MsgMintNFT;
};
export declare const MsgMintNFTResponse: {
    encode(_: MsgMintNFTResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgMintNFTResponse;
    fromJSON(_: any): MsgMintNFTResponse;
    toJSON(_: MsgMintNFTResponse): unknown;
    fromPartial(_: DeepPartial<MsgMintNFTResponse>): MsgMintNFTResponse;
};
export declare const MsgBurnNFT: {
    encode(message: MsgBurnNFT, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgBurnNFT;
    fromJSON(object: any): MsgBurnNFT;
    toJSON(message: MsgBurnNFT): unknown;
    fromPartial(object: DeepPartial<MsgBurnNFT>): MsgBurnNFT;
};
export declare const MsgBurnNFTResponse: {
    encode(_: MsgBurnNFTResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgBurnNFTResponse;
    fromJSON(_: any): MsgBurnNFTResponse;
    toJSON(_: MsgBurnNFTResponse): unknown;
    fromPartial(_: DeepPartial<MsgBurnNFTResponse>): MsgBurnNFTResponse;
};
export declare const MsgTransferDenom: {
    encode(message: MsgTransferDenom, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgTransferDenom;
    fromJSON(object: any): MsgTransferDenom;
    toJSON(message: MsgTransferDenom): unknown;
    fromPartial(object: DeepPartial<MsgTransferDenom>): MsgTransferDenom;
};
export declare const MsgTransferDenomResponse: {
    encode(_: MsgTransferDenomResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgTransferDenomResponse;
    fromJSON(_: any): MsgTransferDenomResponse;
    toJSON(_: MsgTransferDenomResponse): unknown;
    fromPartial(_: DeepPartial<MsgTransferDenomResponse>): MsgTransferDenomResponse;
};
export declare const MsgCreateHTLC: {
    encode(message: MsgCreateHTLC, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCreateHTLC;
    fromJSON(object: any): MsgCreateHTLC;
    toJSON(message: MsgCreateHTLC): unknown;
    fromPartial(object: DeepPartial<MsgCreateHTLC>): MsgCreateHTLC;
};
export declare const MsgCreateHTLCResponse: {
    encode(message: MsgCreateHTLCResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCreateHTLCResponse;
    fromJSON(object: any): MsgCreateHTLCResponse;
    toJSON(message: MsgCreateHTLCResponse): unknown;
    fromPartial(object: DeepPartial<MsgCreateHTLCResponse>): MsgCreateHTLCResponse;
};
export declare const MsgClaimHTLC: {
    encode(message: MsgClaimHTLC, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgClaimHTLC;
    fromJSON(object: any): MsgClaimHTLC;
    toJSON(message: MsgClaimHTLC): unknown;
    fromPartial(object: DeepPartial<MsgClaimHTLC>): MsgClaimHTLC;
};
export declare const MsgClaimHTLCResponse: {
    encode(_: MsgClaimHTLCResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgClaimHTLCResponse;
    fromJSON(_: any): MsgClaimHTLCResponse;
    toJSON(_: MsgClaimHTLCResponse): unknown;
    fromPartial(_: DeepPartial<MsgClaimHTLCResponse>): MsgClaimHTLCResponse;
};
export declare const MsgFileMetadataResponse: {
    encode(message: MsgFileMetadataResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgFileMetadataResponse;
    fromJSON(object: any): MsgFileMetadataResponse;
    toJSON(message: MsgFileMetadataResponse): unknown;
    fromPartial(object: DeepPartial<MsgFileMetadataResponse>): MsgFileMetadataResponse;
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
    /** CreateHTLC defines a method for creating a HTLC */
    CreateHTLC(request: MsgCreateHTLC): Promise<MsgCreateHTLCResponse>;
    /** ClaimHTLC defines a method for claiming a HTLC */
    ClaimHTLC(request: MsgClaimHTLC): Promise<MsgClaimHTLCResponse>;
    /** IssueDenom defines a method for issue a denom. */
    IssueDenom(request: MsgIssueDenom): Promise<MsgIssueDenomResponse>;
    /** MintNFT defines a method for mint a new nft */
    MintNFT(request: MsgMintNFT): Promise<MsgMintNFTResponse>;
    /** RefundHTLC defines a method for editing a nft. */
    EditNFT(request: MsgEditNFT): Promise<MsgEditNFTResponse>;
    /** TransferNFT defines a method for transferring a nft. */
    TransferNFT(request: MsgTransferNFT): Promise<MsgTransferNFTResponse>;
    /** BurnNFT defines a method for burning a nft. */
    BurnNFT(request: MsgBurnNFT): Promise<MsgBurnNFTResponse>;
    /** TransferDenom defines a method for transferring a denom. */
    TransferDenom(request: MsgTransferDenom): Promise<MsgTransferDenomResponse>;
}
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    constructor(rpc: Rpc);
    Metadata(request: MsgMetadata): Promise<MsgMetadataResponse>;
    File(request: MsgFile): Promise<MsgFileResponse>;
    CreateHTLC(request: MsgCreateHTLC): Promise<MsgCreateHTLCResponse>;
    ClaimHTLC(request: MsgClaimHTLC): Promise<MsgClaimHTLCResponse>;
    IssueDenom(request: MsgIssueDenom): Promise<MsgIssueDenomResponse>;
    MintNFT(request: MsgMintNFT): Promise<MsgMintNFTResponse>;
    EditNFT(request: MsgEditNFT): Promise<MsgEditNFTResponse>;
    TransferNFT(request: MsgTransferNFT): Promise<MsgTransferNFTResponse>;
    BurnNFT(request: MsgBurnNFT): Promise<MsgBurnNFTResponse>;
    TransferDenom(request: MsgTransferDenom): Promise<MsgTransferDenomResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
