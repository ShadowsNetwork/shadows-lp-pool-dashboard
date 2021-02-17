import {useEffect, useState} from 'react';
import Web3 from 'web3';
import ERC20ABI from '../services/erc20abi.json'
import FARMABI from '../services/farm.json'
import constants from '../services/constants';

const useCustomer = () => {
  const [wallet, changeWallet] = useState({});
  const [contracts, changeContracts] = useState({});
  let web3;
  let lpErc20Token;
  let erc20Token;
  let farm;

  const setWeb3 = () => {
    web3 = new Web3(window.ethereum);
    erc20Token = new web3.eth.Contract(ERC20ABI, constants.tokenAddress);
    lpErc20Token = new web3.eth.Contract(ERC20ABI, constants.lpAddress);
    farm = new web3.eth.Contract(FARMABI, constants.farmAddress);

    changeContracts({
      web3,
      lpErc20Token,
      erc20Token,
      farm,
    })
  };

  const login = async () => {
    await window.ethereum.enable();
    setWeb3();
    const address = web3.givenProvider.selectedAddress;
    setWallet(address)
  }

  const setWallet = async (address) => {
    const data = {address}
    let balance,
        shadowsBalance,
        balanceEther,
        shadowsEther;

    if (web3 && web3.eth && typeof address === 'string') {
      balance = await web3.eth.getBalance(address);
      shadowsBalance = await erc20Token.methods.balanceOf(address).call();
      balanceEther = web3.utils.fromWei(balance, 'ether');
      shadowsEther = await web3.utils.fromWei(shadowsBalance, 'ether');

      data.balance = balanceEther;
      data.shadows = shadowsEther;
    }

    if (wallet.address !== data.address || wallet.balance !== data.ether) {
      localStorage['shadows:wallet'] = JSON.stringify(data);
      changeWallet(data);
    }
  }

  useEffect(() => {
    
    if (window.ethereum) {
      setWeb3();
    }
    
    if (localStorage['shadows:wallet']) {
      const wallet = JSON.parse(localStorage['shadows:wallet'])
      setWallet(wallet.address);
    }
  }, []);

  useEffect(() => {
    let interval;

    interval = setInterval(async () => {
      if (!contracts.web3) return;
      
      const address = contracts.web3.givenProvider.selectedAddress;

      if (address) {
        setWallet(address)
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    }
  }, [wallet.address]);

  return {
    login,
    contracts,
    wallet,
    setWallet,
  };
};

export default useCustomer;
