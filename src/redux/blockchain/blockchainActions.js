// constants
import Web3 from "web3";
import { fetchData } from "../data/dataActions";
import Lottery from "../../contracts/Lottery.json";

import SM from "./blockChain.json"


const connectRequest = () => {
  return {
    type: "CONNECTION_REQUEST",
  };
};

const connectSuccess = (payload) => {
  return {
    type: "CONNECTION_SUCCESS",
    payload: payload,
  };
};

const connectFailed = (payload) => {
  return {
    type: "CONNECTION_FAILED",
    payload: payload,
  };
};

const updateAccountRequest = (payload) => {
  return {
    type: "UPDATE_ACCOUNT",
    payload: payload,
  };
};

const updateBalanceRequest = (payload) => {
  return {
    type: "UPDATE_BALANCE",
    payload: payload,
  };
};


export const connect = () => {
  return async (dispatch) => {
    dispatch(connectRequest());
    if (window.ethereum) {
      let web3 = new Web3(window.ethereum);
      try {

        await window.ethereum.enable();

        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        // console.log("accounts", accounts)

         const balance =  Web3.utils.fromWei(await window.ethereum.request(
           {method: 'eth_getBalance',
            params: [accounts[0], 'latest']
          }), 'ether')

          // const getBalance = async (account) => {
          // const balance =  Web3.utils.fromWei(await window.ethereum.request(
          //     {method: 'eth_getBalance',
          //      params: [account, 'latest']
          //    }), 'ether')
          // }
        

        const networkId = await window.ethereum.request({
          method: "net_version",
        });

         const NetworkData = await Lottery.networks[networkId];
        if (networkId) {
          const SmartContractObj = new web3.eth.Contract(
            // Lottery.abi,
            // NetworkData.address
            SM.abi,
            SM.address
           
          );
          dispatch(
            connectSuccess({
              account: accounts[0],
              balance:balance,
              smartContract: SmartContractObj,
              web3: web3,
            })
          );
          // Add listeners start
          window.ethereum.on("accountsChanged", async (accounts,balance) => {
            // console.log("aaa",balance)
        
            balance = Web3.utils.fromWei(await window.ethereum.request(
              {method: 'eth_getBalance',
               params: [accounts[0], 'latest']
             }), 'ether')
   
            dispatch(updateAccount(accounts[0], balance ));
          });
          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });




          // Add listeners end
        } else {
          dispatch(connectFailed("Change network to Polygon."));
        }
      } catch (err) {
        dispatch(connectFailed("Something went wrong."));
      }
    } else {
      dispatch(connectFailed("Install Metamask."));
    }
  };
};


export const updateAccount = (account,balance) => {
  return async (dispatch) => {
    dispatch(updateAccountRequest({ account: account }));
    // console.log("accounts", account)
    dispatch(updateBalanceRequest({ balance : balance }));
    console.log("balance", balance)
    dispatch(fetchData(account));
  };
};
