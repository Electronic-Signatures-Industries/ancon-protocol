import { Writer, Reader } from 'protobufjs/minimal';
export declare const protobufPackage = "ElectronicSignaturesIndustries.anconprotocol.mintswap";
export interface MintswapPacketData {
    /** this line is used by starport scaffolding # ibc/packet/proto/field */
    data: MintSwapData | undefined;
}
export interface MintSwapData {
    sender: string;
    /** metadata */
    metadataRef: string;
    /** token name */
    tokenName: string;
    /** token symbol/id */
    tokenSymbol: string;
    /** recipient */
    recipient: string;
    /** did owner */
    didOwner: string;
    price: number;
}
export declare const MintswapPacketData: {
    encode(message: MintswapPacketData, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MintswapPacketData;
    fromJSON(object: any): MintswapPacketData;
    toJSON(message: MintswapPacketData): unknown;
    fromPartial(object: DeepPartial<MintswapPacketData>): MintswapPacketData;
};
export declare const MintSwapData: {
    encode(message: MintSwapData, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MintSwapData;
    fromJSON(object: any): MintSwapData;
    toJSON(message: MintSwapData): unknown;
    fromPartial(object: DeepPartial<MintSwapData>): MintSwapData;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
