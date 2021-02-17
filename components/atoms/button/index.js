import { useEffect, useState } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './button.module.css'
import Text from '../text'

const Button = ({className, children, ...props}) => {
  return (
    <button className={cx(styles.button, className)} {...props}>
      <Text>
        {children}
      </Text>
    </button>
  )
};

Button.propTypes = {
};

export default Button;
