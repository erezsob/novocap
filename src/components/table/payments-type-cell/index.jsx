// @flow
import React from 'react';
import styles from './styles.css';

import type { PaymentTypes } from './../../../common/types';

type Props = {
  paymentTypes: PaymentTypes
};

export default function PaymentTypesCell({ paymentTypes }: Props) {
  return (
    <span>
      {paymentTypes.map((payment, idx) => (
        <span key={idx} className={styles.item}>
          {payment.name}
        </span>
      ))}
    </span>
  );
}
