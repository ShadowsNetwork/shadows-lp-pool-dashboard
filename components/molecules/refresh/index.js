import cx from 'classnames';
import styles from './refresh.module.css'
import Modal from '../../molecules/modal'
import Text from '../../atoms/text';

function Refresh({onClose}) {
  return (
    <Modal onClose={onClose}>
      <a
      className={cx('button button-secondary button-secondary-red-filled', styles.button)}
      href="javascript:;">
        <img src="/images/waiting_w.svg" className={cx(styles.buttonIcon, styles.rotating)} />
        <Text className={styles.refresh} color="red">Loading block information...</Text>
      </a>
    </Modal>
  )
}

export default Refresh;
