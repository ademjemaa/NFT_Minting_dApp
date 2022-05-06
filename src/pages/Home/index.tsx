import React, { FC, useState } from "react";
import {
  transactionServices,
  useGetAccountInfo,
  useGetNetworkConfig,
  refreshAccount,
} from "@elrondnetwork/dapp-core";
import axios, { AxiosResponse } from "axios";
import { Link } from "react-router-dom";
import { dAppName } from "config";
import { routeNames } from "routes";
import BigNumber from 'bignumber.js';
import { ProxyNetworkProvider } from "@elrondnetwork/erdjs-network-providers";
import {
  Address,
  NetworkConfig,
  AbiRegistry,
  SmartContractAbi,
  SmartContract,
  ContractFunction,
  IProvider,
  ProxyProvider,
  Nonce,
  QueryResponse,
} from "@elrondnetwork/erdjs";
//import { promises } from "fs";
//import * as fs from "fs";
import { TransactionOnNetwork } from "@elrondnetwork/erdjs/out/transactionOnNetwork";
import { getTransactions } from "apiRequests";
import { contractAddress } from "config";
import logo from "./logo.png";
import gif1 from "./gif1.gif";
import { StateType } from "./types";
import "./Homeindex.css";
//import { stringify } from "querystring";
import data from "./test.json";
import {
  getMintTransaction,
  publicEndpointSetup,
  GetAddress,
  GetPrice,
  MintTransaction,
  PriceTransaction,
} from "./utils";
import { sign } from "crypto";
import { config } from "process";
//import { propTypes } from "react-bootstrap/esm/Image";

interface Props {
  title: string;
  initialCount: number;
  SCaddress: Address;
}

export const Home: FC<Props> = () => {
  const [count, setCount] = useState(0);
  const { address } = useGetAccountInfo();

  /**************************************************Block Jdid **************************/
  const { success, fail, hasActiveTransactions } =
    transactionServices.useGetActiveTransactionsStatus();

  const {
    network: { apiAddress },
  } = useGetNetworkConfig();
  //console.log("******************", apiAddress); //https://devnet-api.elrond.com

  const [state, setState] = React.useState<StateType>({
    transactions: [],
    transactionsFetched: undefined,
  });
  const account = useGetAccountInfo();
  console.log("***ACCOUNT ADRESS***:", account.address); //erd14vwdlxxn93nxpph830f00y5g6qal3nndp7mtjg00verhtykp9nnqrmethw

  const fetchData = () => {
    if (success || fail || !hasActiveTransactions) {
      getTransactions({
        apiAddress,
        address: account.address,
        timeout: 3000,
        contractAddress,
      }).then(({ data, success: transactionsFetched }) => {
        refreshAccount();
        setState({
          transactions: data,
          transactionsFetched,
        });
      });
    }
  };
  React.useEffect(fetchData, [success, fail, hasActiveTransactions]);

  const add = (factor = 1) => {
    if (factor < 0) {
      if (count > 0) setCount(count + factor);
    } else {
      setCount(count + factor);
    }
  };

  const syncProviderConfig = async (provider: IProvider) => {
    return NetworkConfig.getDefault().sync(provider);
    //return UserSigner.fromWallet() get user wallet signer
  };

  function createSmartContractInstance(abi?: AbiRegistry, SCaddress?: string) {
    const contract = new SmartContract({
      address: SCaddress ? new Address(SCaddress) : undefined,
      abi:
        abi &&
        new SmartContractAbi(
          abi,
          abi.interfaces.map((iface) => iface.name)
        ),
    });

    return contract;
  }

  const mint = async () => {
    let networkProvider = new ProxyNetworkProvider(
      "https://devnet-gateway.elrond.com"
    );
    let networkConfig = await networkProvider.getNetworkConfig();
    let provider = new ProxyProvider("https://devnet-gateway.elrond.com");
    await GetAddress(address);
    await syncProviderConfig(provider);
    const { signer, LoggedUserAccount } = await publicEndpointSetup(provider);
    let pricestr = await PriceTransaction(signer, LoggedUserAccount, provider);
    let minted = await MintTransaction(pricestr, 2, signer, LoggedUserAccount, provider);
    console.log(minted);
  };

  console.log(mint());

  return (
    <div
      className="d-flex flex-fill align-items-center  rounded-pill"
      style={{
        height: "70vh",
        paddingTop: "25%",
        marginTop: "15%",
        marginRight: "5%",
        marginLeft: "5%",
        marginBottom: "15%",
        paddingBottom: "40%",
        backgroundColor: "#2e765e",
      }}
    >
      <div className="row w-100 justify-content-between">
        <div className="col-12 col-md-8 col-lg-5 mx-auto">
          <img
            src={String(logo)}
            alt="Logo"
            className="rounded mx-auto d-block"
            style={{
              width: "370px",
              height: "320px",
              marginTop: "30%",
              padding: "25px",
            }}
          />

          <div
            className="card shadow-sm rounded-pill border border-warning p-4"
            style={{
              width: "100%",
              height: "60%",
            }}
          >
            <div className="card-body text-center">
              <img
                src={String(gif1)}
                className="rounded border rounded-circle mx-auto d-block"
                style={{
                  width: "50%",
                  height: "50%",
                  border: "10px",
                  margin: "2%",
                }}
                alt="gif"
              ></img>
              <h2 className="mb-3" data-testid="title">
                {dAppName}
              </h2>
              <div className="container ">
                {address ? (
                  <button
                    className="btn btn-lg mt-3 text-white"
                    style={{
                      margin: "10px",
                      backgroundColor: "#00665d",
                    }}
                    onClick={() => add()}
                  >
                    +
                  </button>
                ) : null}
                {address ? <h5>{count}</h5> : null}
                {address ? (
                  <button
                    className="btn btn-lg mt-3 text-white"
                    style={{
                      margin: "5px",
                      backgroundColor: "#d2b48c",
                    }}
                    onClick={() => add(-1)}
                  >
                    -
                  </button>
                ) : null}
              </div>
              {address ? (
                <button
                  className="btn btn-lg mt-3 text-white golden"
                  style={{
                    margin: "5px",
                    borderColor: "#d2b48c",
                    backgroundColor: "#00665d",
                  }}
                >
                  Mint
                </button>
              ) : null}{" "}
              <br />
              <br />
              <p className="mb-3">
                This is the official N4P foresters NFTs Minting Site
                <br /> Login using your Elrond wallet.
              </p>
              {!address ? (
                <Link
                  to={routeNames.unlock}
                  className="btn btn-primary mt-3 text-white golden"
                  data-testid="loginBtn"
                >
                  Login
                </Link>
              ) : null}
            </div>
          </div>

          <p
            style={{
              padding: "15px",
              textAlign: "center",
              alignContent: "center",
              color: "white",
            }}
          >
            We have set the gas limit to 14000000 for the contract to successfully
            mint your NFT. We recommend that you do not lower the gas limit.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
