// @flow
import React from 'react';
import styles from './styles.css';

type Props = {
  title: string
};

export default function SectionTitle({ title }: Props) {
  return <div className={styles.title}>{title}</div>;
}
