import { Writer, Reader } from 'protobufjs/minimal';
export declare const protobufPackage = "ElectronicSignaturesIndustries.anconprotocol.anconprotocol";
export interface Owner {
    identity: string;
    owner: string;
}
export interface Delegate {
    delegate: string;
    delegateType: string;
    validity: boolean;
    creator: string;
    identity: string;
}
export interface Change {
    identity: string;
    owner: string;
    previousChange: number;
}
export interface Attribute {
    identity: string;
    name: Uint8Array;
    value: Uint8Array;
    validity: boolean;
    previousChange: number;
}
export declare const Owner: {
    encode(message: Owner, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): Owner;
    fromJSON(object: any): Owner;
    toJSON(message: Owner): unknown;
    fromPartial(object: DeepPartial<Owner>): Owner;
};
export declare const Delegate: {
    encode(message: Delegate, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): Delegate;
    fromJSON(object: any): Delegate;
    toJSON(message: Delegate): unknown;
    fromPartial(object: DeepPartial<Delegate>): Delegate;
};
export declare const Change: {
    encode(message: Change, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): Change;
    fromJSON(object: any): Change;
    toJSON(message: Change): unknown;
    fromPartial(object: DeepPartial<Change>): Change;
};
export declare const Attribute: {
    encode(message: Attribute, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): Attribute;
    fromJSON(object: any): Attribute;
    toJSON(message: Attribute): unknown;
    fromPartial(object: DeepPartial<Attribute>): Attribute;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
