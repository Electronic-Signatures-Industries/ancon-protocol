import { StdFee } from "@cosmjs/launchpad";
import { OfflineSigner, EncodeObject } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgChangeOwner } from "./types/anconprotocol/tx";
import { MsgRevokeAttribute } from "./types/anconprotocol/tx";
import { MsgClaimSwap } from "./types/anconprotocol/tx";
import { MsgMintTrustedResource } from "./types/anconprotocol/tx";
import { MsgRevokeDelegate } from "./types/anconprotocol/tx";
import { MsgMetadata } from "./types/anconprotocol/tx";
import { MsgUpdateDid } from "./types/anconprotocol/tx";
import { MsgEditNFT } from "./types/anconprotocol/tx";
import { MsgRoyaltyInfo } from "./types/anconprotocol/tx";
import { MsgTransferNFT } from "./types/anconprotocol/tx";
import { MsgGrantAttribute } from "./types/anconprotocol/tx";
import { MsgMintNFT } from "./types/anconprotocol/tx";
import { MsgGrantDelegate } from "./types/anconprotocol/tx";
import { MsgTransferDenom } from "./types/anconprotocol/tx";
import { MsgRevokeDid } from "./types/anconprotocol/tx";
import { MsgMintTrustedContent } from "./types/anconprotocol/tx";
import { MsgCreateDid } from "./types/anconprotocol/tx";
import { MsgBurnNFT } from "./types/anconprotocol/tx";
import { MsgIssueDenom } from "./types/anconprotocol/tx";
import { MsgFile } from "./types/anconprotocol/tx";
import { MsgMintSwap } from "./types/anconprotocol/tx";
import { MsgInitiateSwap } from "./types/anconprotocol/tx";
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
    msgRevokeAttribute: (data: MsgRevokeAttribute) => EncodeObject;
    msgClaimSwap: (data: MsgClaimSwap) => EncodeObject;
    msgMintTrustedResource: (data: MsgMintTrustedResource) => EncodeObject;
    msgRevokeDelegate: (data: MsgRevokeDelegate) => EncodeObject;
    msgMetadata: (data: MsgMetadata) => EncodeObject;
    msgUpdateDid: (data: MsgUpdateDid) => EncodeObject;
    msgEditNFT: (data: MsgEditNFT) => EncodeObject;
    msgRoyaltyInfo: (data: MsgRoyaltyInfo) => EncodeObject;
    msgTransferNFT: (data: MsgTransferNFT) => EncodeObject;
    msgGrantAttribute: (data: MsgGrantAttribute) => EncodeObject;
    msgMintNFT: (data: MsgMintNFT) => EncodeObject;
    msgGrantDelegate: (data: MsgGrantDelegate) => EncodeObject;
    msgTransferDenom: (data: MsgTransferDenom) => EncodeObject;
    msgRevokeDid: (data: MsgRevokeDid) => EncodeObject;
    msgMintTrustedContent: (data: MsgMintTrustedContent) => EncodeObject;
    msgCreateDid: (data: MsgCreateDid) => EncodeObject;
    msgBurnNFT: (data: MsgBurnNFT) => EncodeObject;
    msgIssueDenom: (data: MsgIssueDenom) => EncodeObject;
    msgFile: (data: MsgFile) => EncodeObject;
    msgMintSwap: (data: MsgMintSwap) => EncodeObject;
    msgInitiateSwap: (data: MsgInitiateSwap) => EncodeObject;
}>;
interface QueryClientOptions {
    addr: string;
}
declare const queryClient: ({ addr: addr }?: QueryClientOptions) => Promise<Api<unknown>>;
export { txClient, queryClient, };
