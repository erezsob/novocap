// @flow
import React from 'react';
import styles from './styles.css';

type Props = {
  hideSidebar: Function
};

function Tint({ hideSidebar }: Props) {
  return <div className={styles.tint} onClick={hideSidebar} />;
}

export default Tint;
