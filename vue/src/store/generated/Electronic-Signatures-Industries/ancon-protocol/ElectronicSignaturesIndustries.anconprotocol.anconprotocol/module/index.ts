// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY.

import { StdFee } from "@cosmjs/launchpad";
import { SigningStargateClient } from "@cosmjs/stargate";
import { Registry, OfflineSigner, EncodeObject, DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgSetAttribute } from "./types/anconprotocol/tx";
import { MsgRevokeDelegate } from "./types/anconprotocol/tx";
import { MsgChangeOwner } from "./types/anconprotocol/tx";
import { MsgNonce } from "./types/anconprotocol/tx";
import { MsgAddDelegate } from "./types/anconprotocol/tx";
import { MsgMetadata } from "./types/anconprotocol/tx";
import { MsgFile } from "./types/anconprotocol/tx";


const types = [
  ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgSetAttribute", MsgSetAttribute],
  ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgRevokeDelegate", MsgRevokeDelegate],
  ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgChangeOwner", MsgChangeOwner],
  ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgNonce", MsgNonce],
  ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgAddDelegate", MsgAddDelegate],
  ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgMetadata", MsgMetadata],
  ["/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgFile", MsgFile],
  
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
    msgSetAttribute: (data: MsgSetAttribute): EncodeObject => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgSetAttribute", value: data }),
    msgRevokeDelegate: (data: MsgRevokeDelegate): EncodeObject => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgRevokeDelegate", value: data }),
    msgChangeOwner: (data: MsgChangeOwner): EncodeObject => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgChangeOwner", value: data }),
    msgNonce: (data: MsgNonce): EncodeObject => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgNonce", value: data }),
    msgAddDelegate: (data: MsgAddDelegate): EncodeObject => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgAddDelegate", value: data }),
    msgMetadata: (data: MsgMetadata): EncodeObject => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgMetadata", value: data }),
    msgFile: (data: MsgFile): EncodeObject => ({ typeUrl: "/ElectronicSignaturesIndustries.anconprotocol.anconprotocol.MsgFile", value: data }),
    
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
