import { ProxyNetworkProvider } from "@elrondnetwork/erdjs-network-providers";
import {
  Transaction,
  Nonce,
  Balance,
  GasPrice,
  GasLimit,
  TransactionPayload,
  ChainID,
  TransactionVersion,
  Address,
  NetworkConfig,
  GasPriceModifier,
  AbiRegistry,
  SmartContractAbi,
  SmartContract
} from '@elrondnetwork/erdjs';
import { promises } from 'fs';


async function abi()
{
let networkProvider = new ProxyNetworkProvider("https://devnet-gateway.elrond.com");

let networkConfig = await networkProvider.getNetworkConfig();
console.log(networkConfig.MinGasPrice);
console.log(networkConfig.ChainID);

let jsonContent = await promises.readFile('elven-nft-minter.abi.json', {
  encoding: 'utf8',
});
let json = JSON.parse(jsonContent);
let abi;
let abiRegistry = AbiRegistry.load(json).then((result) => abi = new SmartContractAbi(result, ['test']));
let contract = new SmartContract({ address: new Address('erd1...'), abi: abi });
console.log(contract);
}

abi();