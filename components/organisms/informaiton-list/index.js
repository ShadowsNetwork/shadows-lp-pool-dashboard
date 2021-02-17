import { useEffect, useState } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './information-list.module.css'
import Information from "../../molecules/information"
import Title from "../../molecules/title"

const InformationList = ({data, title, ...props}) => {
  return (
    <>
      {title && (
        <div className={styles.title}>
          <Title>{title}</Title>
        </div>
      )}
      <div className={styles.container}>
        {data.map((info) => {
          return <Information {...info} {...props} />
        })}
      </div>
    </>
  )
};

InformationList.propTypes = {};

InformationList.defaultProps = {
  data:[]
};

export default InformationList;
