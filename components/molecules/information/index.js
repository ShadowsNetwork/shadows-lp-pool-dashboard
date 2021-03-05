import { useEffect, useState } from 'react';
import cx from 'classnames';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';
import styles from './information.module.css'
import Text from '../../atoms/text';
import Button from '../../atoms/button';

const Information = ({slug, title, value, info, buttonTitle, onButtonClick, disable, seperate}) => {
  return (
    <div className={cx(styles.information, seperate && styles.seperate)}>
      <div className={styles.title}>
        <Text color="red">{title}</Text>
        {info && (
          <>
            <a data-tip data-for={`tooltip-${slug}`}>
              <img src="/images/info-icon.svg" />
            </a>
            <ReactTooltip id={`tooltip-${slug}`} effect="solid" type="light">
              {info}
            </ReactTooltip>
          </>
        )}
      </div>
      <div className={styles.value}>
        <Text color="white">{value || '--'}</Text>
      </div>
      {buttonTitle && (
        <Button className={styles.button} onClick={onButtonClick} disabled={disable}>
          {buttonTitle}
        </Button>
      )}
    </div>
  );
};

Information.propTypes = {
  showTitle: PropTypes.bool
};

export default Information;
