// @flow
import React from 'react';
import Transition from 'react-transition-group/Transition';
import classnames from 'classnames/bind';
import SuccessIcon from 'material-ui-icons/CheckCircle';
import WarningIcon from 'material-ui-icons/InfoOutline';
import ErrorIcon from 'material-ui-icons/ReportProblem';
import CloseIcon from 'material-ui-icons/Clear';
import styles from './styles.css';
import { NOTIFICATION } from './../../constants';

import type { Notification as NotificationType } from './../../common/types';

type Props = {
  notification: NotificationType,
  hideNotification: Function
};

const cx = classnames.bind(styles);

export default function Notification({
  notification,
  hideNotification
}: Props) {
  const { isActive, message, type } = notification;
  const renderIcon = () => {
    switch (type) {
      case NOTIFICATION.SUCCESS: {
        return <SuccessIcon className={styles.icon} />;
      }
      case NOTIFICATION.WARNING: {
        return <WarningIcon className={styles.icon} />;
      }
      case NOTIFICATION.ERROR: {
        return <ErrorIcon className={styles.icon} />;
      }
      default: {
        return null;
      }
    }
  };

  return (
    <Transition in={isActive} timeout={300}>
      {status => {
        const classes = cx({
          container: true,
          success: type === NOTIFICATION.SUCCESS,
          error: type === NOTIFICATION.ERROR,
          warning: type === NOTIFICATION.WARNING,
          entering: status === 'entering',
          entered: status === 'entered',
          exiting: status === 'exiting',
          exited: status === 'exited'
        });

        return isActive ? (
          <div className={classes}>
            {renderIcon()}
            <span className={styles.message}>{message}</span>
            <CloseIcon
              className={styles.closeIcon}
              onClick={hideNotification}
            />
          </div>
        ) : null;
      }}
    </Transition>
  );
}
