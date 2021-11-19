// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY.
import { SigningStargateClient } from "@cosmjs/stargate";
import { Registry } from "@cosmjs/proto-signing";
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
const types = [
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgCreateDid", MsgCreateDid],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgRevokeDid", MsgRevokeDid],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgFile", MsgFile],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgRevokeAttribute", MsgRevokeAttribute],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgUpdateDataSource", MsgUpdateDataSource],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgTransferNFT", MsgTransferNFT],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgAnchorCid", MsgAnchorCid],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgSendMetadataOwnership", MsgSendMetadataOwnership],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgRoyaltyInfo", MsgRoyaltyInfo],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgUpdateMetadataOwnership", MsgUpdateMetadataOwnership],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgBurnNFT", MsgBurnNFT],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgAddDataUnion", MsgAddDataUnion],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgMintTrustedResource", MsgMintTrustedResource],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgRevokeDelegate", MsgRevokeDelegate],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgTransferDenom", MsgTransferDenom],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgMintNFT", MsgMintNFT],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgAnchorCidWithProof", MsgAnchorCidWithProof],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgIssueDenom", MsgIssueDenom],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgRemoveDataSource", MsgRemoveDataSource],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgEditNFT", MsgEditNFT],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgMetadata", MsgMetadata],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgRemoveDataUnion", MsgRemoveDataUnion],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgMintTrustedContent", MsgMintTrustedContent],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgUpdateDid", MsgUpdateDid],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgGrantDelegate", MsgGrantDelegate],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgAddDataSource", MsgAddDataSource],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgChangeOwner", MsgChangeOwner],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgSetAttribute", MsgSetAttribute],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgUpdateDataUnion", MsgUpdateDataUnion],
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
        msgCreateDid: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgCreateDid", value: data }),
        msgRevokeDid: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgRevokeDid", value: data }),
        msgFile: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgFile", value: data }),
        msgRevokeAttribute: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgRevokeAttribute", value: data }),
        msgUpdateDataSource: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgUpdateDataSource", value: data }),
        msgTransferNFT: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgTransferNFT", value: data }),
        msgAnchorCid: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgAnchorCid", value: data }),
        msgSendMetadataOwnership: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgSendMetadataOwnership", value: data }),
        msgRoyaltyInfo: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgRoyaltyInfo", value: data }),
        msgUpdateMetadataOwnership: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgUpdateMetadataOwnership", value: data }),
        msgBurnNFT: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgBurnNFT", value: data }),
        msgAddDataUnion: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgAddDataUnion", value: data }),
        msgMintTrustedResource: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgMintTrustedResource", value: data }),
        msgRevokeDelegate: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgRevokeDelegate", value: data }),
        msgTransferDenom: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgTransferDenom", value: data }),
        msgMintNFT: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgMintNFT", value: data }),
        msgAnchorCidWithProof: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgAnchorCidWithProof", value: data }),
        msgIssueDenom: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgIssueDenom", value: data }),
        msgRemoveDataSource: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgRemoveDataSource", value: data }),
        msgEditNFT: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgEditNFT", value: data }),
        msgMetadata: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgMetadata", value: data }),
        msgRemoveDataUnion: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgRemoveDataUnion", value: data }),
        msgMintTrustedContent: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgMintTrustedContent", value: data }),
        msgUpdateDid: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgUpdateDid", value: data }),
        msgGrantDelegate: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgGrantDelegate", value: data }),
        msgAddDataSource: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgAddDataSource", value: data }),
        msgChangeOwner: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgChangeOwner", value: data }),
        msgSetAttribute: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgSetAttribute", value: data }),
        msgUpdateDataUnion: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgUpdateDataUnion", value: data }),
    };
};
const queryClient = async ({ addr: addr } = { addr: "http://localhost:1317" }) => {
    return new Api({ baseUrl: addr });
};
export { txClient, queryClient, };
