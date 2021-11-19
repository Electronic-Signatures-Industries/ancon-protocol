import { StdFee } from "@cosmjs/launchpad";
import { OfflineSigner, EncodeObject } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgCreateDid } from "./types/anconprotocol/tx";
import { MsgRevokeDid } from "./types/anconprotocol/tx";
import { MsgFile } from "./types/anconprotocol/tx";
import { MsgRevokeAttribute } from "./types/anconprotocol/tx";
import { MsgUpdateDataSource } from "./types/anconprotocol/data_union";
import { MsgTransferNFT } from "./types/anconprotocol/tx";
import { MsgAnchorCid } from "./types/anconprotocol/tx";
import { MsgSendMetadataOwnership } from "./types/anconprotocol/tx";
import { MsgRoyaltyInfo } from "./types/anconprotocol/tx";
import { MsgUpdateMetadataOwnership } from "./types/anconprotocol/tx";
import { MsgBurnNFT } from "./types/anconprotocol/tx";
import { MsgAddDataUnion } from "./types/anconprotocol/data_union";
import { MsgMintTrustedResource } from "./types/anconprotocol/tx";
import { MsgRevokeDelegate } from "./types/anconprotocol/tx";
import { MsgTransferDenom } from "./types/anconprotocol/tx";
import { MsgMintNFT } from "./types/anconprotocol/tx";
import { MsgAnchorCidWithProof } from "./types/anconprotocol/tx";
import { MsgIssueDenom } from "./types/anconprotocol/tx";
import { MsgRemoveDataSource } from "./types/anconprotocol/data_union";
import { MsgEditNFT } from "./types/anconprotocol/tx";
import { MsgMetadata } from "./types/anconprotocol/tx";
import { MsgRemoveDataUnion } from "./types/anconprotocol/data_union";
import { MsgMintTrustedContent } from "./types/anconprotocol/tx";
import { MsgUpdateDid } from "./types/anconprotocol/tx";
import { MsgGrantDelegate } from "./types/anconprotocol/tx";
import { MsgAddDataSource } from "./types/anconprotocol/data_union";
import { MsgChangeOwner } from "./types/anconprotocol/tx";
import { MsgSetAttribute } from "./types/anconprotocol/tx";
import { MsgUpdateDataUnion } from "./types/anconprotocol/data_union";
export declare const MissingWalletError: Error;
interface TxClientOptions {
    addr: string;
}
interface SignAndBroadcastOptions {
    fee: StdFee;
    memo?: string;
}
declare const txClient: (wallet: OfflineSigner, { addr: addr }?: TxClientOptions) => Promise<{
    signAndBroadcast: (msgs: EncodeObject[], { fee, memo }?: SignAndBroadcastOptions) => Promise<import("@cosmjs/stargate").BroadcastTxResponse>;
    msgCreateDid: (data: MsgCreateDid) => EncodeObject;
    msgRevokeDid: (data: MsgRevokeDid) => EncodeObject;
    msgFile: (data: MsgFile) => EncodeObject;
    msgRevokeAttribute: (data: MsgRevokeAttribute) => EncodeObject;
    msgUpdateDataSource: (data: MsgUpdateDataSource) => EncodeObject;
    msgTransferNFT: (data: MsgTransferNFT) => EncodeObject;
    msgAnchorCid: (data: MsgAnchorCid) => EncodeObject;
    msgSendMetadataOwnership: (data: MsgSendMetadataOwnership) => EncodeObject;
    msgRoyaltyInfo: (data: MsgRoyaltyInfo) => EncodeObject;
    msgUpdateMetadataOwnership: (data: MsgUpdateMetadataOwnership) => EncodeObject;
    msgBurnNFT: (data: MsgBurnNFT) => EncodeObject;
    msgAddDataUnion: (data: MsgAddDataUnion) => EncodeObject;
    msgMintTrustedResource: (data: MsgMintTrustedResource) => EncodeObject;
    msgRevokeDelegate: (data: MsgRevokeDelegate) => EncodeObject;
    msgTransferDenom: (data: MsgTransferDenom) => EncodeObject;
    msgMintNFT: (data: MsgMintNFT) => EncodeObject;
    msgAnchorCidWithProof: (data: MsgAnchorCidWithProof) => EncodeObject;
    msgIssueDenom: (data: MsgIssueDenom) => EncodeObject;
    msgRemoveDataSource: (data: MsgRemoveDataSource) => EncodeObject;
    msgEditNFT: (data: MsgEditNFT) => EncodeObject;
    msgMetadata: (data: MsgMetadata) => EncodeObject;
    msgRemoveDataUnion: (data: MsgRemoveDataUnion) => EncodeObject;
    msgMintTrustedContent: (data: MsgMintTrustedContent) => EncodeObject;
    msgUpdateDid: (data: MsgUpdateDid) => EncodeObject;
    msgGrantDelegate: (data: MsgGrantDelegate) => EncodeObject;
    msgAddDataSource: (data: MsgAddDataSource) => EncodeObject;
    msgChangeOwner: (data: MsgChangeOwner) => EncodeObject;
    msgSetAttribute: (data: MsgSetAttribute) => EncodeObject;
    msgUpdateDataUnion: (data: MsgUpdateDataUnion) => EncodeObject;
}>;
interface QueryClientOptions {
    addr: string;
}
declare const queryClient: ({ addr: addr }?: QueryClientOptions) => Promise<Api<unknown>>;
export { txClient, queryClient, };
