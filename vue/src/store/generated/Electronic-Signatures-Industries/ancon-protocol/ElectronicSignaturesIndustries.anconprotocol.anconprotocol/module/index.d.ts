import { StdFee } from "@cosmjs/launchpad";
import { OfflineSigner, EncodeObject } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgMetadata } from "./types/anconprotocol/tx";
import { MsgIssueDenom } from "./types/anconprotocol/tx";
import { MsgBurnNFT } from "./types/anconprotocol/tx";
import { MsgTransferNFT } from "./types/anconprotocol/tx";
import { MsgClaimHTLC } from "./types/anconprotocol/tx";
import { MsgTransferDenom } from "./types/anconprotocol/tx";
import { MsgEditNFT } from "./types/anconprotocol/tx";
import { MsgMintNFT } from "./types/anconprotocol/tx";
import { MsgCreateHTLC } from "./types/anconprotocol/tx";
import { MsgFile } from "./types/anconprotocol/tx";
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
    msgMetadata: (data: MsgMetadata) => EncodeObject;
    msgIssueDenom: (data: MsgIssueDenom) => EncodeObject;
    msgBurnNFT: (data: MsgBurnNFT) => EncodeObject;
    msgTransferNFT: (data: MsgTransferNFT) => EncodeObject;
    msgClaimHTLC: (data: MsgClaimHTLC) => EncodeObject;
    msgTransferDenom: (data: MsgTransferDenom) => EncodeObject;
    msgEditNFT: (data: MsgEditNFT) => EncodeObject;
    msgMintNFT: (data: MsgMintNFT) => EncodeObject;
    msgCreateHTLC: (data: MsgCreateHTLC) => EncodeObject;
    msgFile: (data: MsgFile) => EncodeObject;
}>;
interface QueryClientOptions {
    addr: string;
}
declare const queryClient: ({ addr: addr }?: QueryClientOptions) => Promise<Api<unknown>>;
export { txClient, queryClient, };
