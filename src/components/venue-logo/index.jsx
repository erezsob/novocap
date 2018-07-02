// @flow
import React from 'react';
import styles from './styles.css';
import logo from './../../img/ob_icon.svg';

type Props = {
  venueName: string
};

function VenueLogo({ venueName }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={logo} height="60" />
      </div>
      <div className={styles.name}>{venueName}</div>
    </div>
  );
}

export default VenueLogo;
