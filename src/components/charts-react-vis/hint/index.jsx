// @flow
import React from 'react';
import { formatCurrency } from '../../../util/format';
import styles from './styles.css';

type Props = {
  title: string,
  value: {
    x: string,
    y: number
  }
};

export default function CustomHint({ title, value }: Props) {
  return (
    <div className={styles.hint}>
      <small className={styles.small}>{title}</small>
      <div className={styles.value}>{formatCurrency(value.y)}</div>
    </div>
  );
}
