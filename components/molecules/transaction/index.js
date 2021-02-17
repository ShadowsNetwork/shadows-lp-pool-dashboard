import cx from 'classnames';
import styles from './transaction.module.css'
import Modal from '../../molecules/modal'
import Text from '../../atoms/text';
import Loader from '../loader';

function Transaction({tx}) {
  return (
    <Modal>
      <Text className={cx(styles.title, 'white')} color="white">View Transaction</Text>
      <a
        className={cx('button button-secondary button-secondary-red-filled', styles.button)}
        href={`https://ropsten.etherscan.io/tx/${tx}`}
        target="_blank">
        <img src="/images/waiting_w.svg" className={styles.buttonIcon} />
        <Text className={styles.transaction} color="red">View Transaction</Text>
      </a>
    </Modal>
  )
}

export default Transaction;
