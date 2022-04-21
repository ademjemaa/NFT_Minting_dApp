import {
    ProxyProvider,
    IProvider,
    NetworkConfig,
    SmartContract,
    Account,
    parseUserKey,
    UserSigner,
    SmartContractAbi,
    Code,
    GasLimit,
    AbiRegistry,
    Address,
    ContractFunction,
    BytesValue,
    Balance,
    U32Value,
    BigUIntValue,
    AddressValue,
    Transaction,
    TransactionPayload,
    QueryResponse,
    TypedValue,
    CodeMetadata,
    BooleanValue,
    List,
    ListType,
    AddressType,
    ISigner,
  } from '@elrondnetwork/erdjs';
import { sign } from 'crypto';
import { Provider } from 'react';

  import data from './wallet.json';
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

  export const prepareUserAccount = async (walletPemKey: string) => {
    const userKey = parseUserKey(walletPemKey);
    const address = userKey.generatePublicKey().toAddress();
    return new Account(address);
  };

  export const publicEndpointSetup = async (provider: ProxyProvider) => {
    let keyFileObject = JSON.parse(JSON.stringify(data));
    // Provider type based on initial configuration
    const signer = UserSigner.fromWallet(keyFileObject, "u!D?G8Tf48fYL28");
    let userAccount = new Account(signer.getAddress());
    console.log(signer);
    return {
      signer,
      userAccount,
      provider,
    };
  };