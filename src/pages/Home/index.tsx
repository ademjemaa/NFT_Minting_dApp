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
import { contractAddress,GateWay } from "config";
import logo from "./logo.png";
import gif1 from "./gif1.gif";
import { StateType } from "./types";
import "./Homeindex.css";
//import { stringify } from "querystring";
import {
  getMintTransaction,
  publicEndpointSetup,
  GetAddress,
  GetPrice,
  MintTransaction,
  PriceTransaction,
} from "./utils";
//import { propTypes } from "react-bootstrap/esm/Image";

interface Props {
  title: string;
  initialCount: number;
  SCaddress: Address;
}

export const Home: FC<Props> = () => {
  const [count , setCount] = useState(1);
  let NFTPrice = 0.35;
  let transactionUrl = "https://explorer.elrond.com/transactions/";
  const { address } = useGetAccountInfo();
  const [mintState, setMintState] = useState(0); // 0 - null - 1 success - 2 failure - 3 loading


  const { success, fail, hasActiveTransactions } =
    transactionServices.useGetActiveTransactionsStatus();

  const {
    network: { apiAddress },
  } = useGetNetworkConfig();

  const [state, setState] = React.useState<StateType>({
    transactions: [],
    transactionsFetched: undefined,
  });

  const handleMint = () => {
    setMintState(3);
    mint();
  }

  const account = useGetAccountInfo();


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
      if (count > 1) setCount(count + factor);
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
  let provider = new ProxyProvider("https://gateway.elrond.com");
  const mint = async () => {
    let networkProvider = new ProxyNetworkProvider(
      "https://gateway.elrond.com"
    );
    let networkConfig = await networkProvider.getNetworkConfig();
    
    await GetAddress(address);
    await syncProviderConfig(provider);
    const { signer, LoggedUserAccount } = await publicEndpointSetup(provider);
    
    let minted = await MintTransaction(350000000000000000, count, signer, LoggedUserAccount, provider).then((res) => {
      if(typeof(res) != typeof("")){
        setMintState(2);
      }else{
        setMintState(1);
      }
      
    });
    transactionUrl = transactionUrl+minted;
    console.log(transactionUrl);
    console.log(minted);
  };


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
              {address && mintState!=3 ? (
                
                <button
                  className="btn btn-lg mt-3 text-white golden"
                  onClick={handleMint}
                  
                  style={{
                    margin: "5px",
                    borderColor: "#d2b48c",
                    backgroundColor: "#00665d",
                  }}
                >
                  Mint
                </button> 
              ) : address && mintState==3 ? (
                
                <button
                  className="btn btn-lg mt-3 text-white golden"
                  onClick={handleMint}
                  disabled
                  style={{
                    margin: "5px",
                    borderColor: "#d2b48c",
                    backgroundColor: "#00665d",
                  }}
                >
                  Mint
                </button> 
              ) : null}
              <br />
              <br />
              {mintState == 3 ? <p className="mb-3" style={{fontSize:'15px', fontWeight:'500', color:'blue'}}>
                Transaction in Progress
              </p> : mintState == 2 ?
               <p className="mb-3" style={{fontSize:'15px', fontWeight:'500', color:'red'}}>
                Mint Failed try again later or check your wallet for insufficent funds
              </p> : mintState == 1 ? <p className="mb-3" style={{fontSize:'15px', fontWeight:'500', color:'green'}}>
              Mint Success, <a href={transactionUrl}>Transaction details</a>
            </p> : null}
              {!address ? <p className="mb-3">
                This is the official N4P foresters NFTs Minting Site
                <br /> Login using your Elrond wallet.
              </p> : <p className="mb-3">
                This is the official N4P foresters NFTs Minting Site
                <br /> NFT Price <span style={{color:'green',fontWeight:'500',fontSize:'17px'}}>{NFTPrice} xEGLD</span>
              </p>}
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
            We have set the gas limit to 180000000 for the contract to successfully
            mint your NFT. We recommend that you do not lower the gas limit.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
