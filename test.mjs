import { ApiNetworkProvider } from "@elrondnetwork/erdjs-network-providers";
import { AbiRegistry, SmartContractAbi } from "@elrondnetwork/erdjs";
import { promises } from "fs";

let networkProvider = new ApiNetworkProvider("https://devnet-api.elrond.com");

let networkConfig = await networkProvider.getNetworkConfig();
console.log(networkConfig.MinGasPrice);
console.log(networkConfig.ChainID);

let jsonContent = await promises.readFile("elven-nft-minter.abi.json", {
  encoding: "utf8",
});
let json = JSON.parse(jsonContent);
let abiRegistry = AbiRegistry.create(json);
let abi = new SmartContractAbi(abiRegistry, "test");
let contract = new SmartContract({ address: new Address("erd1..."), abi: abi });
console.log(contract);
