// @flow
import * as React from 'react';
import classnames from 'classnames/bind';
import styles from './styles.css';

type Props = {
  icon: React.Element<any>,
  text: string,
  action: Function,
  bigger?: boolean
};

const cx = classnames.bind(styles);

function MyOBButton({ icon, text, action, bigger = false }: Props) {
  const classes = cx({ button: true, bigger });
  return (
    <button className={classes} onClick={action}>
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.text}>{text}</span>
    </button>
  );
}

export default MyOBButton;
