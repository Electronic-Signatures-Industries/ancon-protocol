import { StdFee } from "@cosmjs/launchpad";
import { OfflineSigner, EncodeObject } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgFile } from "./types/anconprotocol/tx";
import { MsgInitiateSwap } from "./types/anconprotocol/tx";
import { MsgClaimSwap } from "./types/anconprotocol/tx";
import { MsgMintNFT } from "./types/anconprotocol/tx";
import { MsgBurnNFT } from "./types/anconprotocol/tx";
import { MsgRevokeDelegate } from "./types/anconprotocol/tx";
import { MsgRoyaltyInfo } from "./types/anconprotocol/tx";
import { MsgMetadata } from "./types/anconprotocol/tx";
import { MsgChangeOwner } from "./types/anconprotocol/tx";
import { MsgUpdateDid } from "./types/anconprotocol/tx";
import { MsgGrantDelegate } from "./types/anconprotocol/tx";
import { MsgMintTrustedResource } from "./types/anconprotocol/tx";
import { MsgCreateDid } from "./types/anconprotocol/tx";
import { MsgTransferNFT } from "./types/anconprotocol/tx";
import { MsgRevokeAttribute } from "./types/anconprotocol/tx";
import { MsgEditNFT } from "./types/anconprotocol/tx";
import { MsgRevokeDid } from "./types/anconprotocol/tx";
import { MsgIssueDenom } from "./types/anconprotocol/tx";
import { MsgMintTrustedContent } from "./types/anconprotocol/tx";
import { MsgTransferDenom } from "./types/anconprotocol/tx";
import { MsgGrantAttribute } from "./types/anconprotocol/tx";
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
    msgFile: (data: MsgFile) => EncodeObject;
    msgInitiateSwap: (data: MsgInitiateSwap) => EncodeObject;
    msgClaimSwap: (data: MsgClaimSwap) => EncodeObject;
    msgMintNFT: (data: MsgMintNFT) => EncodeObject;
    msgBurnNFT: (data: MsgBurnNFT) => EncodeObject;
    msgRevokeDelegate: (data: MsgRevokeDelegate) => EncodeObject;
    msgRoyaltyInfo: (data: MsgRoyaltyInfo) => EncodeObject;
    msgMetadata: (data: MsgMetadata) => EncodeObject;
    msgChangeOwner: (data: MsgChangeOwner) => EncodeObject;
    msgUpdateDid: (data: MsgUpdateDid) => EncodeObject;
    msgGrantDelegate: (data: MsgGrantDelegate) => EncodeObject;
    msgMintTrustedResource: (data: MsgMintTrustedResource) => EncodeObject;
    msgCreateDid: (data: MsgCreateDid) => EncodeObject;
    msgTransferNFT: (data: MsgTransferNFT) => EncodeObject;
    msgRevokeAttribute: (data: MsgRevokeAttribute) => EncodeObject;
    msgEditNFT: (data: MsgEditNFT) => EncodeObject;
    msgRevokeDid: (data: MsgRevokeDid) => EncodeObject;
    msgIssueDenom: (data: MsgIssueDenom) => EncodeObject;
    msgMintTrustedContent: (data: MsgMintTrustedContent) => EncodeObject;
    msgTransferDenom: (data: MsgTransferDenom) => EncodeObject;
    msgGrantAttribute: (data: MsgGrantAttribute) => EncodeObject;
}>;
interface QueryClientOptions {
    addr: string;
}
declare const queryClient: ({ addr: addr }?: QueryClientOptions) => Promise<Api<unknown>>;
export { txClient, queryClient, };
