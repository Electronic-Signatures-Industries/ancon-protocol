// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY.

import { StdFee } from "@cosmjs/launchpad";
import { SigningStargateClient } from "@cosmjs/stargate";
import { Registry, OfflineSigner, EncodeObject, DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
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

const registry = new Registry(<any>types);

const defaultFee = {
  amount: [],
  gas: "200000",
};

interface TxClientOptions {
  addr: string
}

interface SignAndBroadcastOptions {
  fee: StdFee,
  memo?: string
}

const txClient = async (wallet: OfflineSigner, { addr: addr }: TxClientOptions = { addr: "http://localhost:26657" }) => {
  if (!wallet) throw MissingWalletError;

  const client = await SigningStargateClient.connectWithSigner(addr, wallet, { registry });
  const { address } = (await wallet.getAccounts())[0];

  return {
    signAndBroadcast: (msgs: EncodeObject[], { fee, memo }: SignAndBroadcastOptions = {fee: defaultFee, memo: ""}) => client.signAndBroadcast(address, msgs, fee,memo),
    msgCreateDid: (data: MsgCreateDid): EncodeObject => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgCreateDid", value: data }),
    msgRevokeDid: (data: MsgRevokeDid): EncodeObject => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgRevokeDid", value: data }),
    msgFile: (data: MsgFile): EncodeObject => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgFile", value: data }),
    msgRevokeAttribute: (data: MsgRevokeAttribute): EncodeObject => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgRevokeAttribute", value: data }),
    msgUpdateDataSource: (data: MsgUpdateDataSource): EncodeObject => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgUpdateDataSource", value: data }),
    msgTransferNFT: (data: MsgTransferNFT): EncodeObject => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgTransferNFT", value: data }),
    msgAnchorCid: (data: MsgAnchorCid): EncodeObject => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgAnchorCid", value: data }),
    msgSendMetadataOwnership: (data: MsgSendMetadataOwnership): EncodeObject => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgSendMetadataOwnership", value: data }),
    msgRoyaltyInfo: (data: MsgRoyaltyInfo): EncodeObject => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgRoyaltyInfo", value: data }),
    msgUpdateMetadataOwnership: (data: MsgUpdateMetadataOwnership): EncodeObject => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgUpdateMetadataOwnership", value: data }),
    msgBurnNFT: (data: MsgBurnNFT): EncodeObject => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgBurnNFT", value: data }),
    msgAddDataUnion: (data: MsgAddDataUnion): EncodeObject => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgAddDataUnion", value: data }),
    msgMintTrustedResource: (data: MsgMintTrustedResource): EncodeObject => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgMintTrustedResource", value: data }),
    msgRevokeDelegate: (data: MsgRevokeDelegate): EncodeObject => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgRevokeDelegate", value: data }),
    msgTransferDenom: (data: MsgTransferDenom): EncodeObject => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgTransferDenom", value: data }),
    msgMintNFT: (data: MsgMintNFT): EncodeObject => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgMintNFT", value: data }),
    msgAnchorCidWithProof: (data: MsgAnchorCidWithProof): EncodeObject => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgAnchorCidWithProof", value: data }),
    msgIssueDenom: (data: MsgIssueDenom): EncodeObject => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgIssueDenom", value: data }),
    msgRemoveDataSource: (data: MsgRemoveDataSource): EncodeObject => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgRemoveDataSource", value: data }),
    msgEditNFT: (data: MsgEditNFT): EncodeObject => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgEditNFT", value: data }),
    msgMetadata: (data: MsgMetadata): EncodeObject => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgMetadata", value: data }),
    msgRemoveDataUnion: (data: MsgRemoveDataUnion): EncodeObject => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgRemoveDataUnion", value: data }),
    msgMintTrustedContent: (data: MsgMintTrustedContent): EncodeObject => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgMintTrustedContent", value: data }),
    msgUpdateDid: (data: MsgUpdateDid): EncodeObject => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgUpdateDid", value: data }),
    msgGrantDelegate: (data: MsgGrantDelegate): EncodeObject => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgGrantDelegate", value: data }),
    msgAddDataSource: (data: MsgAddDataSource): EncodeObject => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgAddDataSource", value: data }),
    msgChangeOwner: (data: MsgChangeOwner): EncodeObject => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgChangeOwner", value: data }),
    msgSetAttribute: (data: MsgSetAttribute): EncodeObject => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgSetAttribute", value: data }),
    msgUpdateDataUnion: (data: MsgUpdateDataUnion): EncodeObject => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgUpdateDataUnion", value: data }),
    
  };
};

interface QueryClientOptions {
  addr: string
}

const queryClient = async ({ addr: addr }: QueryClientOptions = { addr: "http://localhost:1317" }) => {
  return new Api({ baseUrl: addr });
};

export {
  txClient,
  queryClient,
};
