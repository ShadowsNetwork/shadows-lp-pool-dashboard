import cx from 'classnames';
import styles from './transaction.module.css'
import Modal from '../../molecules/modal'
import Text from '../../atoms/text';

function Transaction({tx, onClose}) {
  return (
    <Modal onClose={onClose}>
      <Text className={cx(styles.title, 'white')} color="white">Transaction in Progress</Text>
      <a
        className={cx('button button-secondary button-secondary-red-filled', styles.button)}
        href={`https://etherscan.io/tx/${tx}`}
        target="_blank">
        <img src="/images/waiting_w.svg" className={cx(styles.buttonIcon, styles.rotating)} />
        <Text className={styles.transaction} color="red">View Transaction</Text>
      </a>
    </Modal>
  )
}

export default Transaction;
