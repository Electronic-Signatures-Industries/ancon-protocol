import { StdFee } from "@cosmjs/launchpad";
import { OfflineSigner, EncodeObject } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgChangeOwner } from "./types/anconprotocol/tx";
import { MsgMintSwap } from "./types/anconprotocol/tx";
import { MsgRoyaltyInfo } from "./types/anconprotocol/tx";
import { MsgBurnNFT } from "./types/anconprotocol/tx";
import { MsgUpdateDid } from "./types/anconprotocol/tx";
import { MsgRevokeAttribute } from "./types/anconprotocol/tx";
import { MsgGrantDelegate } from "./types/anconprotocol/tx";
import { MsgMintTrustedContent } from "./types/anconprotocol/tx";
import { MsgTransferNFT } from "./types/anconprotocol/tx";
import { MsgTransferDenom } from "./types/anconprotocol/tx";
import { MsgInitiateSwap } from "./types/anconprotocol/tx";
import { MsgMintTrustedResource } from "./types/anconprotocol/tx";
import { MsgRevokeDid } from "./types/anconprotocol/tx";
import { MsgClaimSwap } from "./types/anconprotocol/tx";
import { MsgRevokeDelegate } from "./types/anconprotocol/tx";
import { MsgEditNFT } from "./types/anconprotocol/tx";
import { MsgGrantAttribute } from "./types/anconprotocol/tx";
import { MsgCreateDid } from "./types/anconprotocol/tx";
import { MsgMetadata } from "./types/anconprotocol/tx";
import { MsgMintNFT } from "./types/anconprotocol/tx";
import { MsgFile } from "./types/anconprotocol/tx";
import { MsgIssueDenom } from "./types/anconprotocol/tx";
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
    msgChangeOwner: (data: MsgChangeOwner) => EncodeObject;
    msgMintSwap: (data: MsgMintSwap) => EncodeObject;
    msgRoyaltyInfo: (data: MsgRoyaltyInfo) => EncodeObject;
    msgBurnNFT: (data: MsgBurnNFT) => EncodeObject;
    msgUpdateDid: (data: MsgUpdateDid) => EncodeObject;
    msgRevokeAttribute: (data: MsgRevokeAttribute) => EncodeObject;
    msgGrantDelegate: (data: MsgGrantDelegate) => EncodeObject;
    msgMintTrustedContent: (data: MsgMintTrustedContent) => EncodeObject;
    msgTransferNFT: (data: MsgTransferNFT) => EncodeObject;
    msgTransferDenom: (data: MsgTransferDenom) => EncodeObject;
    msgInitiateSwap: (data: MsgInitiateSwap) => EncodeObject;
    msgMintTrustedResource: (data: MsgMintTrustedResource) => EncodeObject;
    msgRevokeDid: (data: MsgRevokeDid) => EncodeObject;
    msgClaimSwap: (data: MsgClaimSwap) => EncodeObject;
    msgRevokeDelegate: (data: MsgRevokeDelegate) => EncodeObject;
    msgEditNFT: (data: MsgEditNFT) => EncodeObject;
    msgGrantAttribute: (data: MsgGrantAttribute) => EncodeObject;
    msgCreateDid: (data: MsgCreateDid) => EncodeObject;
    msgMetadata: (data: MsgMetadata) => EncodeObject;
    msgMintNFT: (data: MsgMintNFT) => EncodeObject;
    msgFile: (data: MsgFile) => EncodeObject;
    msgIssueDenom: (data: MsgIssueDenom) => EncodeObject;
}>;
interface QueryClientOptions {
    addr: string;
}
declare const queryClient: ({ addr: addr }?: QueryClientOptions) => Promise<Api<unknown>>;
export { txClient, queryClient, };
