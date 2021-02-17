import { useEffect, useContext } from 'react'
import ClipboardJS from 'clipboard'
import PropTypes from 'prop-types';
import styles from './wallet.module.css'
import Button from '../../atoms/button'
import Text from '../../atoms/text'
import * as stringHelper from '../../../helpers/string'
import * as numberHelper from '../../../helpers/number'
import CustomerContext from '../../../contexts/customer.context'

const Wallet = () => {
  const customer = useContext(CustomerContext);

  useEffect(() => {
    new ClipboardJS('.copier');
  }, []);

  if (!customer.wallet.address) {
    return <Button onClick={() => customer.login()}>Connect Wallet</Button>;
  }

  return (
    <div className={styles.wallet}>
      <Text color="white" className={styles.balance}>{numberHelper.toFix(customer.wallet.shadows)} DOWS</Text>
      <Text color="white" className={styles.balance}>{numberHelper.toFix(customer.wallet.balance)} ETH</Text>
      <Text color="red" className={styles.address}>{stringHelper.shorter(customer.wallet.address)}</Text>
      <img className="copier" data-clipboard-target="#address" src="/images/copy.svg" />
      <div id="address" className={styles.addressFull}>
        {customer.wallet.address}
      </div>
    </div>
  )
};

Wallet.propTypes = {
  showTitle: PropTypes.bool
};

export default Wallet;
