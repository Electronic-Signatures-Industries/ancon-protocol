// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY.

import { StdFee } from "@cosmjs/launchpad";
import { SigningStargateClient } from "@cosmjs/stargate";
import { Registry, OfflineSigner, EncodeObject, DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgEditNFT } from "./types/anconprotocol/tx";
import { MsgChangeOwner } from "./types/anconprotocol/tx";
import { MsgTransferNFT } from "./types/anconprotocol/tx";
import { MsgGrantAttribute } from "./types/anconprotocol/tx";
import { MsgBurnNFT } from "./types/anconprotocol/tx";
import { MsgRevokeDelegate } from "./types/anconprotocol/tx";
import { MsgIssueDenom } from "./types/anconprotocol/tx";
import { MsgMintNFT } from "./types/anconprotocol/tx";
import { MsgMetadata } from "./types/anconprotocol/tx";
import { MsgRevokeAttribute } from "./types/anconprotocol/tx";
import { MsgFile } from "./types/anconprotocol/tx";
import { MsgGrantDelegate } from "./types/anconprotocol/tx";
import { MsgTransferDenom } from "./types/anconprotocol/tx";


const types = [
  ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgEditNFT", MsgEditNFT],
  ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgChangeOwner", MsgChangeOwner],
  ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgTransferNFT", MsgTransferNFT],
  ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgGrantAttribute", MsgGrantAttribute],
  ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgBurnNFT", MsgBurnNFT],
  ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgRevokeDelegate", MsgRevokeDelegate],
  ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgIssueDenom", MsgIssueDenom],
  ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgMintNFT", MsgMintNFT],
  ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgMetadata", MsgMetadata],
  ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgRevokeAttribute", MsgRevokeAttribute],
  ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgFile", MsgFile],
  ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgGrantDelegate", MsgGrantDelegate],
  ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgTransferDenom", MsgTransferDenom],
  
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
    msgEditNFT: (data: MsgEditNFT): EncodeObject => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgEditNFT", value: data }),
    msgChangeOwner: (data: MsgChangeOwner): EncodeObject => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgChangeOwner", value: data }),
    msgTransferNFT: (data: MsgTransferNFT): EncodeObject => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgTransferNFT", value: data }),
    msgGrantAttribute: (data: MsgGrantAttribute): EncodeObject => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgGrantAttribute", value: data }),
    msgBurnNFT: (data: MsgBurnNFT): EncodeObject => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgBurnNFT", value: data }),
    msgRevokeDelegate: (data: MsgRevokeDelegate): EncodeObject => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgRevokeDelegate", value: data }),
    msgIssueDenom: (data: MsgIssueDenom): EncodeObject => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgIssueDenom", value: data }),
    msgMintNFT: (data: MsgMintNFT): EncodeObject => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgMintNFT", value: data }),
    msgMetadata: (data: MsgMetadata): EncodeObject => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgMetadata", value: data }),
    msgRevokeAttribute: (data: MsgRevokeAttribute): EncodeObject => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgRevokeAttribute", value: data }),
    msgFile: (data: MsgFile): EncodeObject => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgFile", value: data }),
    msgGrantDelegate: (data: MsgGrantDelegate): EncodeObject => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgGrantDelegate", value: data }),
    msgTransferDenom: (data: MsgTransferDenom): EncodeObject => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgTransferDenom", value: data }),
    
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
