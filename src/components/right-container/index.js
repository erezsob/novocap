// @flow
import * as React from 'react';
import styles from './styles.css';
import { WIDGETS_CONTAINER_ID } from './../../constants';

type Props = {
  children: React.Node
};
function RightContainer({ children }: Props) {
  return (
    <div id={WIDGETS_CONTAINER_ID} className={styles.widgetsContainer}>
      {children}
    </div>
  );
}

export default RightContainer;
