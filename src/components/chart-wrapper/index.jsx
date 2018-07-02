// @flow
import * as React from 'react';
import styles from './styles.css';

type Props = {
  children?: React.Node
};

export default function ChartWrapper({ children }: Props) {
  return <div className={styles.container}>{children}</div>;
}
