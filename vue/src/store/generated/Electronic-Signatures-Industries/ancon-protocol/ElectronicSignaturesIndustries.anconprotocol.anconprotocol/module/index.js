// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY.
import { SigningStargateClient } from "@cosmjs/stargate";
import { Registry } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgRevokeAttribute } from "./types/anconprotocol/tx";
import { MsgEditNFT } from "./types/anconprotocol/tx";
import { MsgRevokeDid } from "./types/anconprotocol/tx";
import { MsgRoyaltyInfo } from "./types/anconprotocol/tx";
import { MsgBurnNFT } from "./types/anconprotocol/tx";
import { MsgGrantAttribute } from "./types/anconprotocol/tx";
import { MsgChangeOwner } from "./types/anconprotocol/tx";
import { MsgMintNFT } from "./types/anconprotocol/tx";
import { MsgTransferNFT } from "./types/anconprotocol/tx";
import { MsgTransferDenom } from "./types/anconprotocol/tx";
import { MsgClaimSwap } from "./types/anconprotocol/tx";
import { MsgFile } from "./types/anconprotocol/tx";
import { MsgCreateDid } from "./types/anconprotocol/tx";
import { MsgGrantDelegate } from "./types/anconprotocol/tx";
import { MsgIssueDenom } from "./types/anconprotocol/tx";
import { MsgUpdateDid } from "./types/anconprotocol/tx";
import { MsgRevokeDelegate } from "./types/anconprotocol/tx";
import { MsgMintTrustedResource } from "./types/anconprotocol/tx";
import { MsgMintTrustedContent } from "./types/anconprotocol/tx";
import { MsgInitiateSwap } from "./types/anconprotocol/tx";
import { MsgMetadata } from "./types/anconprotocol/tx";
const types = [
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgRevokeAttribute", MsgRevokeAttribute],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgEditNFT", MsgEditNFT],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgRevokeDid", MsgRevokeDid],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgRoyaltyInfo", MsgRoyaltyInfo],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgBurnNFT", MsgBurnNFT],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgGrantAttribute", MsgGrantAttribute],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgChangeOwner", MsgChangeOwner],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgMintNFT", MsgMintNFT],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgTransferNFT", MsgTransferNFT],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgTransferDenom", MsgTransferDenom],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgClaimSwap", MsgClaimSwap],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgFile", MsgFile],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgCreateDid", MsgCreateDid],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgGrantDelegate", MsgGrantDelegate],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgIssueDenom", MsgIssueDenom],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgUpdateDid", MsgUpdateDid],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgRevokeDelegate", MsgRevokeDelegate],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgMintTrustedResource", MsgMintTrustedResource],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgMintTrustedContent", MsgMintTrustedContent],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgInitiateSwap", MsgInitiateSwap],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgMetadata", MsgMetadata],
];
export const MissingWalletError = new Error("wallet is required");
const registry = new Registry(types);
const defaultFee = {
    amount: [],
    gas: "200000",
};
const txClient = async (wallet, { addr: addr } = { addr: "http://localhost:26657" }) => {
    if (!wallet)
        throw MissingWalletError;
    const client = await SigningStargateClient.connectWithSigner(addr, wallet, { registry });
    const { address } = (await wallet.getAccounts())[0];
    return {
        signAndBroadcast: (msgs, { fee, memo } = { fee: defaultFee, memo: "" }) => client.signAndBroadcast(address, msgs, fee, memo),
        msgRevokeAttribute: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgRevokeAttribute", value: data }),
        msgEditNFT: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgEditNFT", value: data }),
        msgRevokeDid: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgRevokeDid", value: data }),
        msgRoyaltyInfo: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgRoyaltyInfo", value: data }),
        msgBurnNFT: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgBurnNFT", value: data }),
        msgGrantAttribute: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgGrantAttribute", value: data }),
        msgChangeOwner: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgChangeOwner", value: data }),
        msgMintNFT: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgMintNFT", value: data }),
        msgTransferNFT: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgTransferNFT", value: data }),
        msgTransferDenom: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgTransferDenom", value: data }),
        msgClaimSwap: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgClaimSwap", value: data }),
        msgFile: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgFile", value: data }),
        msgCreateDid: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgCreateDid", value: data }),
        msgGrantDelegate: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgGrantDelegate", value: data }),
        msgIssueDenom: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgIssueDenom", value: data }),
        msgUpdateDid: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgUpdateDid", value: data }),
        msgRevokeDelegate: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgRevokeDelegate", value: data }),
        msgMintTrustedResource: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgMintTrustedResource", value: data }),
        msgMintTrustedContent: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgMintTrustedContent", value: data }),
        msgInitiateSwap: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgInitiateSwap", value: data }),
        msgMetadata: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgMetadata", value: data }),
    };
};
const queryClient = async ({ addr: addr } = { addr: "http://localhost:1317" }) => {
    return new Api({ baseUrl: addr });
};
export { txClient, queryClient, };
