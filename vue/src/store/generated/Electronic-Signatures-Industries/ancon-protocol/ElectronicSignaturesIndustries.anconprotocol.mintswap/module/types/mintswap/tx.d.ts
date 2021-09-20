import { Reader, Writer } from 'protobufjs/minimal';
import { Height } from '../ibc/core/client/v1/client';
export declare const protobufPackage = "ElectronicSignaturesIndustries.anconprotocol.mintswap";
export interface MsgMintSwap {
    /** the port on which the packet will be sent */
    sourcePort: string;
    /** the channel by which the packet will be sent */
    sourceChannel: string;
    /** the tokens to be transferred */
    metadataRef: string;
    /** the sender address */
    sender: string;
    /** the recipient address on the destination chain */
    receiver: string;
    /** token name */
    tokenName: string;
    /** token symbol/id */
    tokenSymbol: string;
    /** did owner */
    didOwner: string;
    price: number;
    /**
     * Timeout height relative to the current block height.
     * The timeout is disabled when set to 0.
     */
    timeoutHeight: Height | undefined;
    /**
     * Timeout timestamp (in nanoseconds) relative to the current block timestamp.
     * The timeout is disabled when set to 0.
     */
    timeoutTimestamp: number;
}
/** MsgMintSwap defines the Msg/Transfer response type. */
export interface MsgMintSwapResponse {
}
export declare const MsgMintSwap: {
    encode(message: MsgMintSwap, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgMintSwap;
    fromJSON(object: any): MsgMintSwap;
    toJSON(message: MsgMintSwap): unknown;
    fromPartial(object: DeepPartial<MsgMintSwap>): MsgMintSwap;
};
export declare const MsgMintSwapResponse: {
    encode(_: MsgMintSwapResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgMintSwapResponse;
    fromJSON(_: any): MsgMintSwapResponse;
    toJSON(_: MsgMintSwapResponse): unknown;
    fromPartial(_: DeepPartial<MsgMintSwapResponse>): MsgMintSwapResponse;
};
/** Msg defines the ibc/transfer Msg service. */
export interface Msg {
    /** MintSwap defines a rpc handler method for MsgMintSwap. */
    MintSwap(request: MsgMintSwap): Promise<MsgMintSwapResponse>;
}
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    constructor(rpc: Rpc);
    MintSwap(request: MsgMintSwap): Promise<MsgMintSwapResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
