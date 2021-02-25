import cx from 'classnames';
import { useEffect } from 'react';
import styles from './modal.module.css'

export default function Modal({onClose, children}) {
  const handleClickOverlay = (e) => {
    if (!e.target.closest('#modal-content')) {
      if (onClose) {
        onClose();
      }
    }
  };

  return (
    <div className={styles.container} onClick={handleClickOverlay}>
      <div id="modal-content" className={styles.content}>
        {children}
      </div>
    </div>
  )
}
