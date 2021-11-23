// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY.
import { SigningStargateClient } from "@cosmjs/stargate";
import { Registry } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgCreateDid } from "./types/anconprotocol/tx";
import { MsgUpdateMetadataOwnership } from "./types/anconprotocol/tx";
import { MsgRevokeDelegate } from "./types/anconprotocol/tx";
import { MsgUpdateDid } from "./types/anconprotocol/tx";
import { MsgAnchorCid } from "./types/anconprotocol/tx";
import { MsgChangeOwner } from "./types/anconprotocol/tx";
import { MsgEditNFT } from "./types/anconprotocol/tx";
import { MsgMintNFT } from "./types/anconprotocol/tx";
import { MsgUpdateDataSource } from "./types/anconprotocol/data_union";
import { MsgMintTrustedResource } from "./types/anconprotocol/tx";
import { MsgRevokeAttribute } from "./types/anconprotocol/tx";
import { MsgSetAttribute } from "./types/anconprotocol/tx";
import { MsgFile } from "./types/anconprotocol/tx";
import { MsgRemoveDataSource } from "./types/anconprotocol/data_union";
import { MsgTransferDenom } from "./types/anconprotocol/tx";
import { MsgAddDataContract } from "./types/anconprotocol/tx";
import { MsgTransferNFT } from "./types/anconprotocol/tx";
import { MsgGrantDelegate } from "./types/anconprotocol/tx";
import { MsgAddSchema } from "./types/anconprotocol/tx";
import { MsgComputeDataContract } from "./types/anconprotocol/tx";
import { MsgRoyaltyInfo } from "./types/anconprotocol/tx";
import { MsgMintTrustedContent } from "./types/anconprotocol/tx";
import { MsgMetadata } from "./types/anconprotocol/tx";
import { MsgIssueDenom } from "./types/anconprotocol/tx";
import { MsgRemoveDataUnion } from "./types/anconprotocol/data_union";
import { MsgUpdateDataUnion } from "./types/anconprotocol/data_union";
import { MsgBurnNFT } from "./types/anconprotocol/tx";
import { MsgAddDataSource } from "./types/anconprotocol/data_union";
import { MsgSendMetadataOwnership } from "./types/anconprotocol/tx";
import { MsgRevokeDid } from "./types/anconprotocol/tx";
import { MsgAddDataUnion } from "./types/anconprotocol/data_union";
import { MsgAnchorCidWithProof } from "./types/anconprotocol/tx";
const types = [
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgCreateDid", MsgCreateDid],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgUpdateMetadataOwnership", MsgUpdateMetadataOwnership],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgRevokeDelegate", MsgRevokeDelegate],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgUpdateDid", MsgUpdateDid],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgAnchorCid", MsgAnchorCid],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgChangeOwner", MsgChangeOwner],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgEditNFT", MsgEditNFT],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgMintNFT", MsgMintNFT],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgUpdateDataSource", MsgUpdateDataSource],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgMintTrustedResource", MsgMintTrustedResource],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgRevokeAttribute", MsgRevokeAttribute],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgSetAttribute", MsgSetAttribute],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgFile", MsgFile],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgRemoveDataSource", MsgRemoveDataSource],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgTransferDenom", MsgTransferDenom],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgAddDataContract", MsgAddDataContract],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgTransferNFT", MsgTransferNFT],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgGrantDelegate", MsgGrantDelegate],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgAddSchema", MsgAddSchema],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgComputeDataContract", MsgComputeDataContract],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgRoyaltyInfo", MsgRoyaltyInfo],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgMintTrustedContent", MsgMintTrustedContent],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgMetadata", MsgMetadata],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgIssueDenom", MsgIssueDenom],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgRemoveDataUnion", MsgRemoveDataUnion],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgUpdateDataUnion", MsgUpdateDataUnion],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgBurnNFT", MsgBurnNFT],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgAddDataSource", MsgAddDataSource],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgSendMetadataOwnership", MsgSendMetadataOwnership],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgRevokeDid", MsgRevokeDid],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgAddDataUnion", MsgAddDataUnion],
    ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgAnchorCidWithProof", MsgAnchorCidWithProof],
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
        msgUpdateMetadataOwnership: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgUpdateMetadataOwnership", value: data }),
        msgRevokeDelegate: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgRevokeDelegate", value: data }),
        msgUpdateDid: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgUpdateDid", value: data }),
        msgAnchorCid: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgAnchorCid", value: data }),
        msgChangeOwner: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgChangeOwner", value: data }),
        msgEditNFT: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgEditNFT", value: data }),
        msgMintNFT: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgMintNFT", value: data }),
        msgUpdateDataSource: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgUpdateDataSource", value: data }),
        msgMintTrustedResource: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgMintTrustedResource", value: data }),
        msgRevokeAttribute: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgRevokeAttribute", value: data }),
        msgSetAttribute: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgSetAttribute", value: data }),
        msgFile: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgFile", value: data }),
        msgRemoveDataSource: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgRemoveDataSource", value: data }),
        msgTransferDenom: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgTransferDenom", value: data }),
        msgAddDataContract: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgAddDataContract", value: data }),
        msgTransferNFT: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgTransferNFT", value: data }),
        msgGrantDelegate: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgGrantDelegate", value: data }),
        msgAddSchema: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgAddSchema", value: data }),
        msgComputeDataContract: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgComputeDataContract", value: data }),
        msgRoyaltyInfo: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgRoyaltyInfo", value: data }),
        msgMintTrustedContent: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgMintTrustedContent", value: data }),
        msgMetadata: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgMetadata", value: data }),
        msgIssueDenom: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgIssueDenom", value: data }),
        msgRemoveDataUnion: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgRemoveDataUnion", value: data }),
        msgUpdateDataUnion: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgUpdateDataUnion", value: data }),
        msgBurnNFT: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgBurnNFT", value: data }),
        msgAddDataSource: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgAddDataSource", value: data }),
        msgSendMetadataOwnership: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgSendMetadataOwnership", value: data }),
        msgRevokeDid: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgRevokeDid", value: data }),
        msgAddDataUnion: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgAddDataUnion", value: data }),
        msgAnchorCidWithProof: (data) => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgAnchorCidWithProof", value: data }),
    };
};
const queryClient = async ({ addr: addr } = { addr: "http://localhost:1317" }) => {
    return new Api({ baseUrl: addr });
};
export { txClient, queryClient, };
