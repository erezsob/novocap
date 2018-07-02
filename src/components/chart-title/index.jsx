// @flow
import React from 'react';
import styles from './styles.css';

type Props = {
  label: string
};

export default function ChartTitle({ label }: Props) {
  return <div className={styles.label}>{label}</div>;
}
