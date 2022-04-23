import {
  ProxyProvider,
  SmartContract,
  Account,
  parseUserKey,
  UserSigner,
  GasLimit,
  Address,
  ContractFunction,
  Balance,
  U32Value,
  Transaction,
  ISigner,
} from "@elrondnetwork/erdjs";
//import { Provider } from "react";
import data from "./wallet.json";

let LoggedUseraddress = "";

export const getMintTransaction = (
  contractAddress: string,
  baseGasLimit: number,
  tokensAmount: number
) => {
  const tokens = tokensAmount || 1;
  const tokenSellingPrice = "500000000000000000";
  const contract = new SmartContract({
    address: new Address(contractAddress),
  });
  return contract.call({
    func: new ContractFunction("getNftPrice"),
    gasLimit: new GasLimit(
      baseGasLimit + (baseGasLimit / 1.4) * (tokensAmount - 1)
    ),
    args: [new U32Value(tokens)],
    value: Balance.fromString(tokenSellingPrice).times(tokens),
  });
};

export const commonTxOperations = async (
  tx: Transaction,
  account: Account,
  signer: ISigner,
  provider: ProxyProvider
) => {
  tx.setNonce(account.nonce);
  account.incrementNonce();
  signer.sign(tx);

  await tx.send(provider);
  await tx.awaitExecuted(provider);
  const txHash = tx.getHash();

  console.log(`Transaction: /transactions/${txHash}`);
};

export const GetAddress = async (LoggedUserAddress: string) => {
  LoggedUseraddress = LoggedUserAddress;
};
export const prepareUserAccount = async (walletPemKey: string) => {
  const userKey = parseUserKey(walletPemKey);
  const address = userKey.generatePublicKey().toAddress();
  return new Account(address);
};

export const publicEndpointSetup = async (provider: ProxyProvider) => {
  let keyFileObject = JSON.parse(JSON.stringify(data));
  // Provider type based on initial configuration
  let LoggedUserAddress = new Address(LoggedUseraddress);
  let LoggedUserAccount = new Account(LoggedUserAddress);
  const signer = UserSigner.fromWallet(keyFileObject, "u!D?G8Tf48fYL28");
  return {
    signer,
    LoggedUserAccount,
    provider,
  };
};
