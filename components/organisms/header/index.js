import cx from 'classnames';
import { useEffect } from 'react';
import styles from './modal.module.css'
import Logo from '../../molecules/logo'
import Wallet from '../../molecules/wallet'

export default function Header({onClose, children}) {
  return (
    <div className={styles.container}>
      <Logo />
      <Wallet />
    </div>
  )
}
