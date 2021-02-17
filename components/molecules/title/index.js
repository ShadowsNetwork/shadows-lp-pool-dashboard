import { useEffect, useState } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './title.module.css'

const Text = ({className, color, props, children}) => {
  return (
    <span className={cx(styles.title)} {...props}>
      {children}
    </span>
  )
};

Text.propTypes = {
};

export default Text;
