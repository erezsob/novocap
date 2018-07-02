// @flow
import React from 'react';
import { Datagrid, TimeCell, PaymentTypesCell } from '../../components';
import { formatCurrency } from '../../util/format';

import type { Invoices } from './../../common/types';

type Props = {
  invoices: Invoices
};

export default function InvoicesGrid({ invoices }: Props) {
  const CELL_DEFAULT_MIN_WIDTH = 70;
  const columns = [
    {
      id: 'createdAt',
      Header: 'Date',
      accessor: d => d.createdAt && <TimeCell date={d.createdAt} />
    },
    {
      Header: 'Invoice Number',
      accessor: 'invoiceNumber',
      minWidth: CELL_DEFAULT_MIN_WIDTH
    },
    {
      id: 'totalAmount',
      Header: 'Amount',
      accessor: d => `${formatCurrency(d.netAmount + d.taxAmount)}`,
      minWidth: CELL_DEFAULT_MIN_WIDTH
    },
    {
      id: 'table',
      Header: 'Table',
      accessor: 'table.name',
      minWidth: CELL_DEFAULT_MIN_WIDTH
    },
    {
      id: 'user',
      Header: 'User',
      accessor: 'user.name',
      minWidth: CELL_DEFAULT_MIN_WIDTH
    },
    {
      id: 'paymentType',
      Header: 'Payment Type',
      accessor: d =>
        d.paymentTypes[0] && <PaymentTypesCell paymentTypes={d.paymentTypes} />,
      minWidth: CELL_DEFAULT_MIN_WIDTH
    }
  ];
  return (
    <div>
      <Datagrid
        data={invoices.elements}
        columns={columns}
        size={invoices.size}
      />
    </div>
  );
}
