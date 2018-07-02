// @flow
import React from 'react';
import styles from './styles.css';

type Props = {
  label: string,
  value: string
};

export default function venueItem({ label, value }: Props) {
  return (
    <div className={styles.box}>
      <div className={styles.label}>{label}</div>
      <div className={styles.field}>{value}</div>
    </div>
  );
}
