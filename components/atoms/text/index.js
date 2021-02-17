import { useEffect, useState } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './text.module.css'

const Text = ({className, color, props, children}) => {
  return (
    <span className={cx(className)} style={{color: `var(--${color})` || 'inherit'}} {...props}>
      {children}
    </span>
  )
};

Text.propTypes = {
};

export default Text;
