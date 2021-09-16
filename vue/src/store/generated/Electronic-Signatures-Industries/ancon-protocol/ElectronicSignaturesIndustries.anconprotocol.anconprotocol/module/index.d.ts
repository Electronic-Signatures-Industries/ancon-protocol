import { StdFee } from "@cosmjs/launchpad";
import { OfflineSigner, EncodeObject } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgIssueDenom } from "./types/anconprotocol/tx";
import { MsgInitiateSwap } from "./types/anconprotocol/tx";
import { MsgGrantAttribute } from "./types/anconprotocol/tx";
import { MsgRevokeDelegate } from "./types/anconprotocol/tx";
import { MsgTransferNFT } from "./types/anconprotocol/tx";
import { MsgMintTrustedResource } from "./types/anconprotocol/tx";
import { MsgClaimSwap } from "./types/anconprotocol/tx";
import { MsgBurnNFT } from "./types/anconprotocol/tx";
import { MsgGrantDelegate } from "./types/anconprotocol/tx";
import { MsgFile } from "./types/anconprotocol/tx";
import { MsgTransferDenom } from "./types/anconprotocol/tx";
import { MsgUpdateDid } from "./types/anconprotocol/tx";
import { MsgCreateDid } from "./types/anconprotocol/tx";
import { MsgChangeOwner } from "./types/anconprotocol/tx";
import { MsgMintNFT } from "./types/anconprotocol/tx";
import { MsgMetadata } from "./types/anconprotocol/tx";
import { MsgMintTrustedContent } from "./types/anconprotocol/tx";
import { MsgEditNFT } from "./types/anconprotocol/tx";
import { MsgRoyaltyInfo } from "./types/anconprotocol/tx";
import { MsgRevokeDid } from "./types/anconprotocol/tx";
import { MsgRevokeAttribute } from "./types/anconprotocol/tx";
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
    msgIssueDenom: (data: MsgIssueDenom) => EncodeObject;
    msgInitiateSwap: (data: MsgInitiateSwap) => EncodeObject;
    msgGrantAttribute: (data: MsgGrantAttribute) => EncodeObject;
    msgRevokeDelegate: (data: MsgRevokeDelegate) => EncodeObject;
    msgTransferNFT: (data: MsgTransferNFT) => EncodeObject;
    msgMintTrustedResource: (data: MsgMintTrustedResource) => EncodeObject;
    msgClaimSwap: (data: MsgClaimSwap) => EncodeObject;
    msgBurnNFT: (data: MsgBurnNFT) => EncodeObject;
    msgGrantDelegate: (data: MsgGrantDelegate) => EncodeObject;
    msgFile: (data: MsgFile) => EncodeObject;
    msgTransferDenom: (data: MsgTransferDenom) => EncodeObject;
    msgUpdateDid: (data: MsgUpdateDid) => EncodeObject;
    msgCreateDid: (data: MsgCreateDid) => EncodeObject;
    msgChangeOwner: (data: MsgChangeOwner) => EncodeObject;
    msgMintNFT: (data: MsgMintNFT) => EncodeObject;
    msgMetadata: (data: MsgMetadata) => EncodeObject;
    msgMintTrustedContent: (data: MsgMintTrustedContent) => EncodeObject;
    msgEditNFT: (data: MsgEditNFT) => EncodeObject;
    msgRoyaltyInfo: (data: MsgRoyaltyInfo) => EncodeObject;
    msgRevokeDid: (data: MsgRevokeDid) => EncodeObject;
    msgRevokeAttribute: (data: MsgRevokeAttribute) => EncodeObject;
}>;
interface QueryClientOptions {
    addr: string;
}
declare const queryClient: ({ addr: addr }?: QueryClientOptions) => Promise<Api<unknown>>;
export { txClient, queryClient, };
