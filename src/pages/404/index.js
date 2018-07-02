// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.css';
import logo from './../../img/ob_logo.svg';
import { ROOT } from './../../routes';

export default function NotFoundPage() {
  return (
    <div className={styles.container}>
      <div className={styles.textBox}>
        <Link to={ROOT}>
          <img src={logo} />
        </Link>
        <h1 className={styles.bigText}>404</h1>
        <h3>Oooops we didn't find the page you are looking for!</h3>
      </div>
    </div>
  );
}
