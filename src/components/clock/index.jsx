// @flow
import React, { Component } from 'react';
import { time, date } from './../../util/time';
import styles from './styles.css';

type Props = {};

class Clock extends Component<Props> {
  timer: IntervalID;

  componentDidMount() {
    const clock =
      document && document.getElementsByClassName(`${styles.time}`)[0];
    this.timer = setInterval(() => (clock.innerHTML = time()), 20 * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const currentDate = date();
    return (
      <div className={styles.container}>
        <div className={styles.time}>{time()}</div>
        <div className={styles.date}>{currentDate}</div>
      </div>
    );
  }
}

export default Clock;
