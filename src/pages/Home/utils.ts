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
  QueryResponse,
} from "@elrondnetwork/erdjs";
import { Provider } from "react";
//import { Provider } from "react";
import data from "./wallet.json";
import axios, { AxiosResponse } from "axios";
let LoggedUseraddress = "";

export const getMintTransaction = (
  contractAddress: string,
  baseGasLimit: number,
  tokensAmount: number,
  tokenSellingPrice: number,
) => {
  const contract = new SmartContract({
    address: new Address(contractAddress),
  });
  return contract.call({
    func: new ContractFunction("mint"),
    gasLimit: new GasLimit(
      baseGasLimit * (tokensAmount)
    ),
    args: [new U32Value(tokensAmount)],
    value: Balance.fromString(tokenSellingPrice.toString()).times(tokensAmount),
  });
};

export const GetPrice = (
  contractAddress: string,
  baseGasLimit: number,
) => {
  const contract = new SmartContract({
    address: new Address(contractAddress),
  });
  return contract.call({
    func: new ContractFunction("getNftPrice"),
    gasLimit: new GasLimit(
      baseGasLimit
    )
  });
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
  let syncc = await LoggedUserAccount.sync(provider);
  console.log(syncc);
  const signer = UserSigner.fromWallet(keyFileObject, "u!D?G8Tf48fYL28");
  return {
    signer,
    LoggedUserAccount,
    provider,
  };
};

export const MintTransaction = async (
    price: number, tokens: number, signer: ISigner, UserAccount: Account, provider: ProxyProvider
    ) => {
    let mintx = getMintTransaction(
      "erd1qqqqqqqqqqqqqpgqjwnulxe3eyevsgyslqqfw8ev5juwd6ew5uhsk8ye2g",
      18000000,
      2,
      price,
    );
    mintx.setNonce(UserAccount.getNonceThenIncrement());
    signer.sign(mintx);
    await mintx.send(provider);
    await mintx.awaitExecuted(provider);
    const mnttxHash = mintx.getHash();
    return `Transaction: https://devnet-explorer.elrond.com/transactions/${mnttxHash}`;
}

export const PriceTransaction = async (
    signer: ISigner, UserAccount: Account, provider: ProxyProvider
  ) => {
    let pricetx = GetPrice(
      "erd1qqqqqqqqqqqqqpgqjwnulxe3eyevsgyslqqfw8ev5juwd6ew5uhsk8ye2g",
      18000000,
    );
    console.log(UserAccount.nonce);
    pricetx.setNonce(UserAccount.getNonceThenIncrement());
    await signer.sign(pricetx);
    console.log(UserAccount);
    await pricetx.send(provider);
    await pricetx.awaitExecuted(provider);
    const txHash = pricetx.getHash();
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    console.log(`Transaction: https://devnet-explorer.elrond.com/transactions/${txHash}`);
    let explorer = `https://devnet-gateway.elrond.com/transaction/${txHash}?withResults=true`;
    let res = await axios.get(explorer);
    let value = res.data.data.transaction.smartContractResults[0].data;
    var result = value.substring(value.lastIndexOf("@") + 1);
    return parseInt(result, 16);
  }