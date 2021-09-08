import { Writer, Reader } from 'protobufjs/minimal';
import { Coin } from '../cosmos/base/v1beta1/coin';
import { Duration } from '../google/protobuf/duration';
export declare const protobufPackage = "ElectronicSignaturesIndustries.anconprotocol.anconprotocol";
/** HTLCState defines the state of an HTLC */
export declare enum HTLCState {
    /** HTLC_STATE_OPEN - HTLC_STATE_OPEN defines an open state. */
    HTLC_STATE_OPEN = 0,
    /** HTLC_STATE_COMPLETED - HTLC_STATE_COMPLETED defines a completed state. */
    HTLC_STATE_COMPLETED = 1,
    /** HTLC_STATE_REFUNDED - HTLC_STATE_REFUNDED defines a refunded state. */
    HTLC_STATE_REFUNDED = 2,
    UNRECOGNIZED = -1
}
export declare function hTLCStateFromJSON(object: any): HTLCState;
export declare function hTLCStateToJSON(object: HTLCState): string;
/** SwapDirection defines the direction of an HTLT */
export declare enum SwapDirection {
    /** NONE - NONE defines an htlt none direction. */
    NONE = 0,
    /** INCOMING - INCOMING defines an htlt incoming direction. */
    INCOMING = 1,
    /** OUTGOING - OUTGOING defines an htlt outgoing direction. */
    OUTGOING = 2,
    UNRECOGNIZED = -1
}
export declare function swapDirectionFromJSON(object: any): SwapDirection;
export declare function swapDirectionToJSON(object: SwapDirection): string;
/** HTLC defines the struct of an HTLC */
export interface HTLC {
    id: string;
    sender: string;
    to: string;
    receiverOnOtherChain: string;
    senderOnOtherChain: string;
    tokenId: number;
    hashLock: string;
    secret: string;
    timestamp: number;
    expirationHeight: number;
    state: HTLCState;
    closedBlock: number;
    transfer: boolean;
    direction: SwapDirection;
}
export interface AssetSupply {
    incomingSupply: Coin | undefined;
    outgoingSupply: Coin | undefined;
    currentSupply: Coin | undefined;
    timeLimitedCurrentSupply: Coin | undefined;
    timeElapsed: Duration | undefined;
}
/** Params defines token module's parameters */
export interface Params {
    assetParams: AssetParam[];
}
export interface AssetParam {
    /** name of the asset */
    denom: string;
    /** asset supply limit */
    supplyLimit: SupplyLimit | undefined;
    /** denotes if asset is available or paused */
    active: boolean;
    /** the address of the relayer process */
    deputyAddress: string;
    /** the fixed fee charged by the relayer process for outgoing swaps */
    fixedFee: string;
    /** Minimum swap amount */
    minSwapAmount: string;
    /** Maximum swap amount */
    maxSwapAmount: string;
    /** Minimum swap block lock */
    minBlockLock: number;
    /** Maximum swap block lock */
    maxBlockLock: number;
}
export interface SupplyLimit {
    /** the absolute supply limit for an asset */
    limit: string;
    /** boolean for if the supply is also limited by time */
    timeLimited: boolean;
    /** the duration for which the supply time limit applies */
    timePeriod: Duration | undefined;
    /** the supply limit for an asset for each time period */
    timeBasedLimit: string;
}
export declare const HTLC: {
    encode(message: HTLC, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): HTLC;
    fromJSON(object: any): HTLC;
    toJSON(message: HTLC): unknown;
    fromPartial(object: DeepPartial<HTLC>): HTLC;
};
export declare const AssetSupply: {
    encode(message: AssetSupply, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): AssetSupply;
    fromJSON(object: any): AssetSupply;
    toJSON(message: AssetSupply): unknown;
    fromPartial(object: DeepPartial<AssetSupply>): AssetSupply;
};
export declare const Params: {
    encode(message: Params, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): Params;
    fromJSON(object: any): Params;
    toJSON(message: Params): unknown;
    fromPartial(object: DeepPartial<Params>): Params;
};
export declare const AssetParam: {
    encode(message: AssetParam, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): AssetParam;
    fromJSON(object: any): AssetParam;
    toJSON(message: AssetParam): unknown;
    fromPartial(object: DeepPartial<AssetParam>): AssetParam;
};
export declare const SupplyLimit: {
    encode(message: SupplyLimit, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): SupplyLimit;
    fromJSON(object: any): SupplyLimit;
    toJSON(message: SupplyLimit): unknown;
    fromPartial(object: DeepPartial<SupplyLimit>): SupplyLimit;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
