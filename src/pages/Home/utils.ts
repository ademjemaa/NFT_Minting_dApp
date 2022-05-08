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
  ErrInvalidTxSignReturnValue,
} from "@elrondnetwork/erdjs";
import {
  transactionServices,
  useGetAccountInfo,
  useGetNetworkConfig,
  refreshAccount,
} from "@elrondnetwork/dapp-core";
import { Provider } from "react";
//import { Provider } from "react";
import data from "./wallet.json";
import axios, { AxiosResponse } from "axios";
import { contractAddress, GateWay } from "../../config";


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
      contractAddress,
      18000000,
      tokens,
      price,
    );
    const { sendTransactions } = transactionServices; 
    const sessionId = await sendTransactions({
      transactions: mintx,
      transactionsDisplayInfo: {
        processingMessage: 'Processing Mint transaction',
        errorMessage: 'An error has occured during Mint',
        successMessage: 'Mint transaction successful'
      },
    });
    const mnttxHash = mintx.getHash();
    return mnttxHash;
}

export const PriceTransaction = async (
  provider: ProxyProvider
  ) => {
    let pricetx = GetPrice(
      contractAddress,
      18000000,
    );
    const { sendTransactions } = transactionServices; 
    const sessionId = await sendTransactions({
      transactions: pricetx,
      transactionsDisplayInfo: {
        processingMessage: 'Processing Mint transaction',
        errorMessage: 'An error has occured during Mint',
        successMessage: 'Mint transaction successful'
      },
    });
    const txHash = pricetx.getHash();
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    console.log(`Transaction: https://devnet-explorer.elrond.com/transactions/${txHash}`);
    let explorer = `${GateWay}/transaction/${txHash}?withResults=true`;
    let res = await axios.get(explorer);
    let value = res.data.data.transaction.smartContractResults[0].data;
    console.log(value);
    var result = value.substring(value.lastIndexOf("@") + 1);
    return parseInt(result, 16);
  }