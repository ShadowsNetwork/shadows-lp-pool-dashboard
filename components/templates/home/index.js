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
import Refresh from '../../molecules/refresh'

export default function Home() {
  const customer = useContext(CustomerContext);
  const [informations, setInformations] = useState({});
  const [tx, setTx] = useState('');
  const [disable, setDisable] = useState('');
  const [onRefresh, setOnRefresh] = useState(false);

  const refresh = async () => {
    setOnRefresh(true);
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
    const startBlock = await customer.contracts.farm.methods.startBlock().call({from: address});
    const endBlock = await customer.contracts.farm.methods.endBlock().call({from: address});

    const totalLockedInt = parseInt(Web3.utils.fromWei(totalLocked, 'ether'));

    setOnRefresh(false);
    setInformations({
      totalLocked: numberHelper.toFix(Web3.utils.fromWei(totalLocked, 'ether')),
      paidOut: numberHelper.toFix(Web3.utils.fromWei(paidOut, 'ether')),
      totalEarned: numberHelper.toFix(Web3.utils.fromWei(userInfo.rewardDebt, 'ether')),
      perShare: totalLockedInt > 0 && _rewardPerBlock > 0 ? numberHelper.toFix(_rewardPerBlock / totalLockedInt, 6) : 'TBD',
      lpBalance: numberHelper.toFix(Web3.utils.fromWei(lpBalance, 'ether')),
      deposited: numberHelper.toFix(Web3.utils.fromWei(deposited, 'ether')),
      pending: numberHelper.toFix(Web3.utils.fromWei(pending, 'ether')),
      startBlock, 
      endBlock, 
      rewardPerBlock: _rewardPerBlock
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
    try {
      const {address} = customer.wallet;
  
      setDisable('lock');
      const lpBalance = await customer.contracts.lpErc20Token.methods.balanceOf(address).call({from: address});
      await customer.contracts.lpErc20Token.methods
        .approve(constants.farmAddress, lpBalance)
        .send({ from: address })
        .on('transactionHash', (hash) => {
          setTx(hash);
        });
  
      await customer.contracts.farm.methods
        .deposit(0, lpBalance)
        .send({ from: address })
        .on('transactionHash', (hash) => {
          setTx(hash);
        });
  
      setTx('');
    } catch(err) {
      console.log(err)
    }

    //setDisable('');
  }

  const unlock = async () => {
    const {address} = customer.wallet;
    const userInfo = await customer.contracts.farm.methods.userInfo(0, address).call({from: address});
    
    setDisable('unlock');

    try {
      await customer.contracts.farm.methods
        .withdraw(0, userInfo.amount)
        .send({ from: address })
        .on('transactionHash', (hash) => {
          setTx(hash);
        });

      setTx('');
      refresh();
    } catch (err) {  
    }

    //setDisable('');
  }

  const claim = async () => {
    const {address} = customer.wallet;

    setDisable('claim');

    try {
      await customer.contracts.farm.methods
        .withdraw(0, 0)
        .send({ from: address })
        .on('transactionHash', (hash) => {
          setTx(hash);
        })


      setTx('');
      refresh();
    } catch (error) {
      
    }
   
    //setDisable('');
  }

  return (
    <>
      <Header />
      {onRefresh && (
        <Refresh onClose={()=>{}} />
      )}
      {tx && (
        <Transaction tx={tx} onClose={() => setTx('')} />
      )}
      <div style={{padding: '80px 0'}}>
        <InformationList
          seperate
          data={[
            {
              slug: "tllt",
              title: 'Total Locked LP Tokens',
              info: 'The total amount of Uniswap ETH/DOWS pair LP tokens staked in the contracts.',
              value: informations.totalLocked,
            },
            {
              slug: "tde",
              title: 'Total DOWS Claimed',
              info: 'The total amount of DOWS minted through the liquidity provider program.',
              value: informations.paidOut,
            },
            {
              slug: "dl",
              title: 'LP / DOWS',
              info: 'Amount of DOWS tokens earned per block per LP token locked.',
              value: `1  =  ${informations.perShare || '--'}`,
            },
            {
              slug: "sb",
              title: 'Start Block #',
              info: 'Starting block number of the liquidity provider program.',
              value: informations.startBlock,
            },
            {
              slug: "en",
              title: 'End Block #',
              info: 'Ending block number of the liquidity provider program.',
              value: informations.endBlock,
            },
            {
              slug: "rpb",
              title: 'Reward per Block',
              info: 'Amount of DOWS that become available as rewards per each Ethereum block.',
              value: informations.rewardPerBlock ? `${informations.rewardPerBlock} DOWS` : '',
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
              info: 'The amount of LP tokens you have available to lock in the program.',
              value: informations.lpBalance,
              disable: disable === 'lock' || informations.lpBalance === '0.00',
              onButtonClick: lock,
              buttonTitle: 'Lock LP Tokens'
            },
            {
              slug: "llt",
              title: 'Locked LP Tokens',
              info: 'The amount of LP tokens you already have locked in the program.',
              value: informations.deposited,
              disable: disable === 'unlock' || informations.deposited === '0.00',
              onButtonClick: unlock,
              buttonTitle: 'Unlock LP Tokens'
            },
            {
              slug: "cd",
              title: 'Claimable DOWS',
              info: 'The amount of DOWS you are able to claim and mint.',
              value: numberHelper.toFix(informations.pending),
              disable: disable === 'claim' || informations.pending === '0.00',
              onButtonClick: claim,
              buttonTitle: 'Claim DOWS'
            },
          ]}
        />
      </div>
    </>
  )
}
