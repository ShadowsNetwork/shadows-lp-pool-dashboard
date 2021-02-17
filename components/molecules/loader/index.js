import { useEffect, useState } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './loader.module.css'

const Loader = ({className, color, props, children}) => {
  return (
    <div className={styles.ldsRoller}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
  )
};

Loader.propTypes = {
};

export default Loader;
