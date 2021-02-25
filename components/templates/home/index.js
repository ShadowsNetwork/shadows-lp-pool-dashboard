import { useContext, useState, useEffect } from 'react'
import Web3 from 'web3'
import styles from './home.module.css'
import Header from '../../organisms/header'
import Loader from '../../molecules/loader'
import Transaction from '../../molecules/transaction'
import InformationList from '../../organisms/informaiton-list'
import CustomerContext from '../../../contexts/customer.context'
import constants from '../../../services/constants';
import * as numberHelper from '../../../helpers/number';

export default function Home() {
  const customer = useContext(CustomerContext);
  const [informations, setInformations] = useState({});
  const [tx, setTx] = useState('');

  const refresh = async () => {
    const {address} = customer.wallet;

    const totalLocked = await customer.contracts.lpErc20Token.methods.balanceOf(constants.farmAddress).call({from: address});
    const paidOut = await customer.contracts.farm.methods.paidOut().call({from: address});
    const pool = await customer.contracts.farm.methods.poolInfo(0).call({from: address});
    const rewardPerBlock = await customer.contracts.farm.methods.rewardPerBlock().call({from: address});
    const _rewardPerBlock =  parseInt(Web3.utils.fromWei(rewardPerBlock, 'ether'));

    const userInfo = await customer.contracts.farm.methods.userInfo(0, address).call({from: address});
  
    const lpBalance = await customer.contracts.lpErc20Token.methods.balanceOf(address).call({from: address});
    const deposited = await customer.contracts.farm.methods.deposited(0, address).call({from: address});
    const pending = await customer.contracts.farm.methods.pending(0, address).call({from: address});

    const totalLockedInt = parseInt(Web3.utils.fromWei(totalLocked, 'ether'));

    setInformations({
      totalLocked: Web3.utils.fromWei(totalLocked, 'ether'),
      paidOut: numberHelper.toFix(Web3.utils.fromWei(paidOut, 'ether')),
      totalEarned: Web3.utils.fromWei(userInfo.rewardDebt, 'ether'),
      perShare: totalLockedInt > 0 && _rewardPerBlock > 0 ? numberHelper.toFix(_rewardPerBlock / totalLockedInt) : 'TBD',
      lpBalance: Web3.utils.fromWei(lpBalance, 'ether'),
      deposited: Web3.utils.fromWei(deposited, 'ether'),
      pending: Web3.utils.fromWei(pending, 'ether'),
    });
  }

  
  useEffect(() => {
    const {address} = customer.wallet;

    if (address) {
      (async () => {
        refresh();
      })()
    }
  }, [customer.wallet.balance, customer.wallet.shadows, customer.wallet.address])

  const lock = async () => {
    const {address} = customer.wallet;

    const lpBalance = await customer.contracts.lpErc20Token.methods.balanceOf(address).call({from: address});
    customer.contracts.lpErc20Token.methods
      .approve(constants.farmAddress, lpBalance)
      .send({ from: address })
      .on('transactionHash', (hash) => {
        setTx(hash);
      })
      .then(() => {
      }).catch((err) => {
        console.log(err);
      });

    customer.contracts.farm.methods
      .deposit(0, lpBalance)
      .send({ from: address })
      .on('transactionHash', (hash) => {
        setTx(hash);
      })
      .then(() => {
        setTx('');
        refresh();
      }).catch((err) => {
        console.log(err);
      });
  }

  const unlock = async () => {
    const {address} = customer.wallet;
    const userInfo = await customer.contracts.farm.methods.userInfo(0, address).call({from: address});
    
    customer.contracts.farm.methods
      .withdraw(0, userInfo.amount)
      .send({ from: address })
      .on('transactionHash', (hash) => {
        setTx(hash);
      })
      .then(() => {
        setTx('');
        refresh();
      }).catch((err) => {
        console.log(err);
      });;
  }

  const claim = async () => {
    const {address} = customer.wallet;

    customer.contracts.farm.methods
      .withdraw(0, 0)
      .send({ from: address })
      .on('transactionHash', (hash) => {
        setTx(hash);
      })
      .then(() => {
        setTx('');
        refresh();
      }).catch((err) => {
        console.log(err);
      });;
  }

  return (
    <>
      <Header />
      {tx && (
        <Transaction tx={tx} />
      )}
      <div style={{padding: '80px 0'}}>
        <InformationList
          seperate
          data={[
            {
              slug: "tllt",
              title: 'Total Locked LP Tokens',
              info: 'Total Locked LP Tokens',
              value: informations.totalLocked,
            },
            {
              slug: "tde",
              title: 'Total DOWS Earned',
              info: 'Total DOWS Earned',
              value: informations.paidOut,
            },
            {
              slug: "dl",
              title: 'DOWS / LP',
              info: 'DOWS / LP',
              value: `1  =  ${informations.perShare || '--'}`,
            },
          ]}
        />
      </div>
      <div style={{padding: '60px 0 90px 0', background: 'url(/images/bg.png) no-repeat center top'}}>
        <InformationList 
          title="User-specific stats"
          data={[
            {
              slug: "lttl",
              title: 'LP tokens to lock',
              info: 'LP tokens to lock',
              value: informations.lpBalance,
              onButtonClick: lock,
              buttonTitle: 'Lock LP Tokens'
            },
            {
              slug: "llt",
              title: 'Locked LP Tokens',
              info: 'Locked LP Tokens',
              value: informations.deposited,
              onButtonClick: unlock,
              buttonTitle: 'Unlock LP Tokens'
            },
            {
              slug: "cd",
              title: 'Claimable DOWS',
              info: 'Claimable DOWS',
              value: numberHelper.toFix(informations.pending),
              onButtonClick: claim,
              buttonTitle: 'Claim DOWS'
            },
          ]}
        />
      </div>
    </>
  )
}
