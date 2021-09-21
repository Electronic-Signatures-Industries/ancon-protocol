import { Reader, Writer } from 'protobufjs/minimal';
export declare const protobufPackage = "ElectronicSignaturesIndustries.anconprotocol.anconprotocol";
export interface MsgRegisterRelay {
    sender: string;
    chain: string;
    alg: string;
    pub: string;
}
export interface MsgRegisterRelayResponse {
    id: string;
}
/** https://github.com/hyperledger/aries-framework-go/blob/5e24fee3adbaf5a462c8951f0e92cada81cd288b/pkg/doc/did/doc_test.go#L1164 */
export interface MsgCreateDid {
    creator: string;
    vanityName: string;
    didType: string;
}
export interface MsgCreateDidResponse {
    cid: string;
    did: string;
}
export interface MsgUpdateDid {
    creator: string;
    did: string;
    metadata: string;
    cid: string;
}
export interface MsgUpdateDidResponse {
}
export interface MsgRevokeDid {
    creator: string;
    did: string;
    metadata: string;
    cid: string;
}
export interface MsgRevokeDidResponse {
    id: number;
}
export interface MsgMintTrustedContent {
    creator: string;
    /** metadata */
    metadataRef: string;
    /** denom id */
    denomId: string;
    /** nft name */
    name: string;
    /** recipient */
    recipient: string;
    /** did owner */
    didOwner: string;
    /** lazy mint */
    lazyMint: boolean;
    price: number;
    r: string;
    s: string;
    v: number;
}
export interface MsgMintTrustedContentResponse {
    id: number;
}
export interface MsgMintSwapResponse {
    id: number;
}
export interface MsgMintSwap {
    creator: string;
    /** metadata */
    metadataRef: string;
    /** denom id */
    denomId: string;
    /** nft name */
    name: string;
    /** recipient */
    recipient: string;
    /** did owner */
    didOwner: string;
    destinationDenomId: string;
    price: number;
    r: string;
    s: string;
    v: number;
}
export interface MsgInitiateSwap {
    creator: string;
}
export interface MsgInitiateSwapResponse {
    relayTo: number;
    voucher: string;
    key: string;
}
export interface MsgClaimSwap {
    creator: string;
    did: string;
    metadata: string;
    cid: string;
}
export interface MsgClaimSwapResponse {
    id: number;
}
export interface MsgMintTrustedResource {
    creator: string;
    /** metadata */
    metadataRef: string;
    /** did owner */
    didOwner: string;
    /** denom id */
    denomId: string;
    /** nft name */
    name: string;
    /** recipient */
    recipient: string;
    /** private whitelist */
    resourceWhitelistAccess: string[];
    /** resource location */
    resourceLocation: string;
    /** lazy mint */
    lazyMint: boolean;
    price: number;
    r: string;
    s: string;
    v: number;
}
export interface MsgMintTrustedResourceResponse {
    id: number;
}
/** MsgRoyaltyInfo */
export interface MsgRoyaltyInfo {
    creator: string;
    receiver: string;
    royaltyFeePercentage: number;
    metadataRef: string;
    denomId: string;
}
/** MsgRoyaltyInfoResponse */
export interface MsgRoyaltyInfoResponse {
    receiver: string;
    royaltyFeePercentage: number;
    metadataRef: string;
}
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
export interface MsgChangeOwnerResponse {
    identity: string;
    owner: string;
    previousChange: number;
}
export interface MsgCreateDIDOwner {
    creator: string;
    owner: string;
    didKey: string;
    didWeb: string;
}
export interface MsgCreateDIDOwnerResponse {
}
export interface MsgChangeOwner {
    creator: string;
    identity: string;
    newOwner: string;
}
export interface MsgGrantDelegate {
    delegate: string;
    delegateType: string;
    validity: number;
    creator: string;
    identity: string;
}
export interface MsgGrantDelegateResponse {
    hash: Uint8Array;
}
export interface MsgRevokeDelegate {
    delegate: string;
    delegateType: string;
    validity: number;
    creator: string;
    identity: string;
}
export interface MsgRevokeDelegateResponse {
    hash: Uint8Array;
}
export interface MsgSetAttribute {
    identity: string;
    actor: string;
    creator: string;
    name: Uint8Array;
    value: Uint8Array;
}
export interface MsgSetAttributeResponse {
    hash: Uint8Array;
}
export interface MsgGrantAttribute {
    identity: string;
    actor: string;
    name: Uint8Array;
    value: Uint8Array;
    creator: string;
    validity: number;
}
export interface MsgGrantAttributeResponse {
    ok: boolean;
}
export interface MsgRevokeAttribute {
    identity: string;
    actor: string;
    name: Uint8Array;
    value: Uint8Array;
    creator: string;
}
export interface MsgRevokeAttributeResponse {
    hash: Uint8Array;
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
export interface MsgFileMetadataResponse {
    hash: Uint8Array;
}
export interface MsgMetadata {
    /** cosmos sdk* */
    creator: string;
    name: string;
    description: string;
    image: string;
    /** did owner*eg. did:ancon:{hex-bech32} */
    owner: string;
    /** change/diff , ancestor is parent, version */
    parent: string;
    /** data sources */
    sources: string;
    /** reference links */
    links: string;
    /** mutate */
    verifiedCredentialRef: string;
    /** did doc* #my_document */
    did: string;
    /** reserved */
    from: string;
    /** ipld forest access */
    enableIpldForestAccess: boolean;
    /** fact metadata */
    factRef: string;
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
export declare const MsgRegisterRelay: {
    encode(message: MsgRegisterRelay, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgRegisterRelay;
    fromJSON(object: any): MsgRegisterRelay;
    toJSON(message: MsgRegisterRelay): unknown;
    fromPartial(object: DeepPartial<MsgRegisterRelay>): MsgRegisterRelay;
};
export declare const MsgRegisterRelayResponse: {
    encode(message: MsgRegisterRelayResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgRegisterRelayResponse;
    fromJSON(object: any): MsgRegisterRelayResponse;
    toJSON(message: MsgRegisterRelayResponse): unknown;
    fromPartial(object: DeepPartial<MsgRegisterRelayResponse>): MsgRegisterRelayResponse;
};
export declare const MsgCreateDid: {
    encode(message: MsgCreateDid, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCreateDid;
    fromJSON(object: any): MsgCreateDid;
    toJSON(message: MsgCreateDid): unknown;
    fromPartial(object: DeepPartial<MsgCreateDid>): MsgCreateDid;
};
export declare const MsgCreateDidResponse: {
    encode(message: MsgCreateDidResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCreateDidResponse;
    fromJSON(object: any): MsgCreateDidResponse;
    toJSON(message: MsgCreateDidResponse): unknown;
    fromPartial(object: DeepPartial<MsgCreateDidResponse>): MsgCreateDidResponse;
};
export declare const MsgUpdateDid: {
    encode(message: MsgUpdateDid, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdateDid;
    fromJSON(object: any): MsgUpdateDid;
    toJSON(message: MsgUpdateDid): unknown;
    fromPartial(object: DeepPartial<MsgUpdateDid>): MsgUpdateDid;
};
export declare const MsgUpdateDidResponse: {
    encode(_: MsgUpdateDidResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdateDidResponse;
    fromJSON(_: any): MsgUpdateDidResponse;
    toJSON(_: MsgUpdateDidResponse): unknown;
    fromPartial(_: DeepPartial<MsgUpdateDidResponse>): MsgUpdateDidResponse;
};
export declare const MsgRevokeDid: {
    encode(message: MsgRevokeDid, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgRevokeDid;
    fromJSON(object: any): MsgRevokeDid;
    toJSON(message: MsgRevokeDid): unknown;
    fromPartial(object: DeepPartial<MsgRevokeDid>): MsgRevokeDid;
};
export declare const MsgRevokeDidResponse: {
    encode(message: MsgRevokeDidResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgRevokeDidResponse;
    fromJSON(object: any): MsgRevokeDidResponse;
    toJSON(message: MsgRevokeDidResponse): unknown;
    fromPartial(object: DeepPartial<MsgRevokeDidResponse>): MsgRevokeDidResponse;
};
export declare const MsgMintTrustedContent: {
    encode(message: MsgMintTrustedContent, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgMintTrustedContent;
    fromJSON(object: any): MsgMintTrustedContent;
    toJSON(message: MsgMintTrustedContent): unknown;
    fromPartial(object: DeepPartial<MsgMintTrustedContent>): MsgMintTrustedContent;
};
export declare const MsgMintTrustedContentResponse: {
    encode(message: MsgMintTrustedContentResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgMintTrustedContentResponse;
    fromJSON(object: any): MsgMintTrustedContentResponse;
    toJSON(message: MsgMintTrustedContentResponse): unknown;
    fromPartial(object: DeepPartial<MsgMintTrustedContentResponse>): MsgMintTrustedContentResponse;
};
export declare const MsgMintSwapResponse: {
    encode(message: MsgMintSwapResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgMintSwapResponse;
    fromJSON(object: any): MsgMintSwapResponse;
    toJSON(message: MsgMintSwapResponse): unknown;
    fromPartial(object: DeepPartial<MsgMintSwapResponse>): MsgMintSwapResponse;
};
export declare const MsgMintSwap: {
    encode(message: MsgMintSwap, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgMintSwap;
    fromJSON(object: any): MsgMintSwap;
    toJSON(message: MsgMintSwap): unknown;
    fromPartial(object: DeepPartial<MsgMintSwap>): MsgMintSwap;
};
export declare const MsgInitiateSwap: {
    encode(message: MsgInitiateSwap, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgInitiateSwap;
    fromJSON(object: any): MsgInitiateSwap;
    toJSON(message: MsgInitiateSwap): unknown;
    fromPartial(object: DeepPartial<MsgInitiateSwap>): MsgInitiateSwap;
};
export declare const MsgInitiateSwapResponse: {
    encode(message: MsgInitiateSwapResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgInitiateSwapResponse;
    fromJSON(object: any): MsgInitiateSwapResponse;
    toJSON(message: MsgInitiateSwapResponse): unknown;
    fromPartial(object: DeepPartial<MsgInitiateSwapResponse>): MsgInitiateSwapResponse;
};
export declare const MsgClaimSwap: {
    encode(message: MsgClaimSwap, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgClaimSwap;
    fromJSON(object: any): MsgClaimSwap;
    toJSON(message: MsgClaimSwap): unknown;
    fromPartial(object: DeepPartial<MsgClaimSwap>): MsgClaimSwap;
};
export declare const MsgClaimSwapResponse: {
    encode(message: MsgClaimSwapResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgClaimSwapResponse;
    fromJSON(object: any): MsgClaimSwapResponse;
    toJSON(message: MsgClaimSwapResponse): unknown;
    fromPartial(object: DeepPartial<MsgClaimSwapResponse>): MsgClaimSwapResponse;
};
export declare const MsgMintTrustedResource: {
    encode(message: MsgMintTrustedResource, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgMintTrustedResource;
    fromJSON(object: any): MsgMintTrustedResource;
    toJSON(message: MsgMintTrustedResource): unknown;
    fromPartial(object: DeepPartial<MsgMintTrustedResource>): MsgMintTrustedResource;
};
export declare const MsgMintTrustedResourceResponse: {
    encode(message: MsgMintTrustedResourceResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgMintTrustedResourceResponse;
    fromJSON(object: any): MsgMintTrustedResourceResponse;
    toJSON(message: MsgMintTrustedResourceResponse): unknown;
    fromPartial(object: DeepPartial<MsgMintTrustedResourceResponse>): MsgMintTrustedResourceResponse;
};
export declare const MsgRoyaltyInfo: {
    encode(message: MsgRoyaltyInfo, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgRoyaltyInfo;
    fromJSON(object: any): MsgRoyaltyInfo;
    toJSON(message: MsgRoyaltyInfo): unknown;
    fromPartial(object: DeepPartial<MsgRoyaltyInfo>): MsgRoyaltyInfo;
};
export declare const MsgRoyaltyInfoResponse: {
    encode(message: MsgRoyaltyInfoResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgRoyaltyInfoResponse;
    fromJSON(object: any): MsgRoyaltyInfoResponse;
    toJSON(message: MsgRoyaltyInfoResponse): unknown;
    fromPartial(object: DeepPartial<MsgRoyaltyInfoResponse>): MsgRoyaltyInfoResponse;
};
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
export declare const MsgChangeOwnerResponse: {
    encode(message: MsgChangeOwnerResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgChangeOwnerResponse;
    fromJSON(object: any): MsgChangeOwnerResponse;
    toJSON(message: MsgChangeOwnerResponse): unknown;
    fromPartial(object: DeepPartial<MsgChangeOwnerResponse>): MsgChangeOwnerResponse;
};
export declare const MsgCreateDIDOwner: {
    encode(message: MsgCreateDIDOwner, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCreateDIDOwner;
    fromJSON(object: any): MsgCreateDIDOwner;
    toJSON(message: MsgCreateDIDOwner): unknown;
    fromPartial(object: DeepPartial<MsgCreateDIDOwner>): MsgCreateDIDOwner;
};
export declare const MsgCreateDIDOwnerResponse: {
    encode(_: MsgCreateDIDOwnerResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCreateDIDOwnerResponse;
    fromJSON(_: any): MsgCreateDIDOwnerResponse;
    toJSON(_: MsgCreateDIDOwnerResponse): unknown;
    fromPartial(_: DeepPartial<MsgCreateDIDOwnerResponse>): MsgCreateDIDOwnerResponse;
};
export declare const MsgChangeOwner: {
    encode(message: MsgChangeOwner, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgChangeOwner;
    fromJSON(object: any): MsgChangeOwner;
    toJSON(message: MsgChangeOwner): unknown;
    fromPartial(object: DeepPartial<MsgChangeOwner>): MsgChangeOwner;
};
export declare const MsgGrantDelegate: {
    encode(message: MsgGrantDelegate, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgGrantDelegate;
    fromJSON(object: any): MsgGrantDelegate;
    toJSON(message: MsgGrantDelegate): unknown;
    fromPartial(object: DeepPartial<MsgGrantDelegate>): MsgGrantDelegate;
};
export declare const MsgGrantDelegateResponse: {
    encode(message: MsgGrantDelegateResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgGrantDelegateResponse;
    fromJSON(object: any): MsgGrantDelegateResponse;
    toJSON(message: MsgGrantDelegateResponse): unknown;
    fromPartial(object: DeepPartial<MsgGrantDelegateResponse>): MsgGrantDelegateResponse;
};
export declare const MsgRevokeDelegate: {
    encode(message: MsgRevokeDelegate, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgRevokeDelegate;
    fromJSON(object: any): MsgRevokeDelegate;
    toJSON(message: MsgRevokeDelegate): unknown;
    fromPartial(object: DeepPartial<MsgRevokeDelegate>): MsgRevokeDelegate;
};
export declare const MsgRevokeDelegateResponse: {
    encode(message: MsgRevokeDelegateResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgRevokeDelegateResponse;
    fromJSON(object: any): MsgRevokeDelegateResponse;
    toJSON(message: MsgRevokeDelegateResponse): unknown;
    fromPartial(object: DeepPartial<MsgRevokeDelegateResponse>): MsgRevokeDelegateResponse;
};
export declare const MsgSetAttribute: {
    encode(message: MsgSetAttribute, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgSetAttribute;
    fromJSON(object: any): MsgSetAttribute;
    toJSON(message: MsgSetAttribute): unknown;
    fromPartial(object: DeepPartial<MsgSetAttribute>): MsgSetAttribute;
};
export declare const MsgSetAttributeResponse: {
    encode(message: MsgSetAttributeResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgSetAttributeResponse;
    fromJSON(object: any): MsgSetAttributeResponse;
    toJSON(message: MsgSetAttributeResponse): unknown;
    fromPartial(object: DeepPartial<MsgSetAttributeResponse>): MsgSetAttributeResponse;
};
export declare const MsgGrantAttribute: {
    encode(message: MsgGrantAttribute, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgGrantAttribute;
    fromJSON(object: any): MsgGrantAttribute;
    toJSON(message: MsgGrantAttribute): unknown;
    fromPartial(object: DeepPartial<MsgGrantAttribute>): MsgGrantAttribute;
};
export declare const MsgGrantAttributeResponse: {
    encode(message: MsgGrantAttributeResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgGrantAttributeResponse;
    fromJSON(object: any): MsgGrantAttributeResponse;
    toJSON(message: MsgGrantAttributeResponse): unknown;
    fromPartial(object: DeepPartial<MsgGrantAttributeResponse>): MsgGrantAttributeResponse;
};
export declare const MsgRevokeAttribute: {
    encode(message: MsgRevokeAttribute, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgRevokeAttribute;
    fromJSON(object: any): MsgRevokeAttribute;
    toJSON(message: MsgRevokeAttribute): unknown;
    fromPartial(object: DeepPartial<MsgRevokeAttribute>): MsgRevokeAttribute;
};
export declare const MsgRevokeAttributeResponse: {
    encode(message: MsgRevokeAttributeResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgRevokeAttributeResponse;
    fromJSON(object: any): MsgRevokeAttributeResponse;
    toJSON(message: MsgRevokeAttributeResponse): unknown;
    fromPartial(object: DeepPartial<MsgRevokeAttributeResponse>): MsgRevokeAttributeResponse;
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
    /** CreateDid */
    CreateDid(request: MsgCreateDid): Promise<MsgCreateDidResponse>;
    /** UpdateDid */
    UpdateDid(request: MsgUpdateDid): Promise<MsgUpdateDidResponse>;
    /** RevokeDid */
    RevokeDid(request: MsgRevokeDid): Promise<MsgRevokeDidResponse>;
    /** RoyaltyInfo defines a metadata CID royalty info */
    RoyaltyInfo(request: MsgRoyaltyInfo): Promise<MsgRoyaltyInfoResponse>;
    /** ChangeOwer TODO */
    ChangeOwner(request: MsgChangeOwner): Promise<MsgChangeOwnerResponse>;
    /**
     * rpc ValidDelegate(MsgValidDelegate) returns (MsgValidDelegateResponse);
     * RevokeDelegate TODO
     */
    RevokeDelegate(request: MsgRevokeDelegate): Promise<MsgRevokeDelegateResponse>;
    /** GrantDelegate TODO */
    GrantDelegate(request: MsgGrantDelegate): Promise<MsgGrantDelegateResponse>;
    /** GrantAttribute TODO */
    GrantAttribute(request: MsgGrantAttribute): Promise<MsgGrantAttributeResponse>;
    /** RevokeAttribute TODO */
    RevokeAttribute(request: MsgRevokeAttribute): Promise<MsgRevokeAttributeResponse>;
    /** Metadata TODO */
    Metadata(request: MsgMetadata): Promise<MsgMetadataResponse>;
    /** IssueDenom defines a method for issue a denom. */
    IssueDenom(request: MsgIssueDenom): Promise<MsgIssueDenomResponse>;
    /** MintNFT defines a method for mint a new nft */
    MintNFT(request: MsgMintNFT): Promise<MsgMintNFTResponse>;
    /** EditNFT defines a method for editing a nft. */
    EditNFT(request: MsgEditNFT): Promise<MsgEditNFTResponse>;
    /** TransferNFT defines a method for transferring a nft. */
    TransferNFT(request: MsgTransferNFT): Promise<MsgTransferNFTResponse>;
    /** BurnNFT defines a method for burning a nft. */
    BurnNFT(request: MsgBurnNFT): Promise<MsgBurnNFTResponse>;
    /** TransferDenom defines a method for transferring a denom. */
    TransferDenom(request: MsgTransferDenom): Promise<MsgTransferDenomResponse>;
    /** MintTrustedContent defines a method for minting a content. */
    MintTrustedContent(request: MsgMintTrustedContent): Promise<MsgMintTrustedContentResponse>;
    /** MintTrustedResource defines a method for minting a resource. */
    MintTrustedResource(request: MsgMintTrustedResource): Promise<MsgMintTrustedResourceResponse>;
    /** RegisterRelay */
    RegisterRelay(request: MsgRegisterRelay): Promise<MsgRegisterRelayResponse>;
    /** MintSwap */
    MintSwap(request: MsgMintSwap): Promise<MsgMintSwapResponse>;
}
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    constructor(rpc: Rpc);
    CreateDid(request: MsgCreateDid): Promise<MsgCreateDidResponse>;
    UpdateDid(request: MsgUpdateDid): Promise<MsgUpdateDidResponse>;
    RevokeDid(request: MsgRevokeDid): Promise<MsgRevokeDidResponse>;
    RoyaltyInfo(request: MsgRoyaltyInfo): Promise<MsgRoyaltyInfoResponse>;
    ChangeOwner(request: MsgChangeOwner): Promise<MsgChangeOwnerResponse>;
    RevokeDelegate(request: MsgRevokeDelegate): Promise<MsgRevokeDelegateResponse>;
    GrantDelegate(request: MsgGrantDelegate): Promise<MsgGrantDelegateResponse>;
    GrantAttribute(request: MsgGrantAttribute): Promise<MsgGrantAttributeResponse>;
    RevokeAttribute(request: MsgRevokeAttribute): Promise<MsgRevokeAttributeResponse>;
    Metadata(request: MsgMetadata): Promise<MsgMetadataResponse>;
    IssueDenom(request: MsgIssueDenom): Promise<MsgIssueDenomResponse>;
    MintNFT(request: MsgMintNFT): Promise<MsgMintNFTResponse>;
    EditNFT(request: MsgEditNFT): Promise<MsgEditNFTResponse>;
    TransferNFT(request: MsgTransferNFT): Promise<MsgTransferNFTResponse>;
    BurnNFT(request: MsgBurnNFT): Promise<MsgBurnNFTResponse>;
    TransferDenom(request: MsgTransferDenom): Promise<MsgTransferDenomResponse>;
    MintTrustedContent(request: MsgMintTrustedContent): Promise<MsgMintTrustedContentResponse>;
    MintTrustedResource(request: MsgMintTrustedResource): Promise<MsgMintTrustedResourceResponse>;
    RegisterRelay(request: MsgRegisterRelay): Promise<MsgRegisterRelayResponse>;
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
