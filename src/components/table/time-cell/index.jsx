// @flow
import React from 'react';
import moment from 'moment';
import styles from './styles.css';

type Props = {
  date: string
};

export default function TimeCell({ date }: Props) {
  return (
    <span>
      <span className={styles.dateMonth}>
        {moment.parseZone(date).format('DD. MMM')}
      </span>
      <span className={styles.dateHours}>
        {moment.parseZone(date).format('HH:mm')}h
      </span>
    </span>
  );
}
