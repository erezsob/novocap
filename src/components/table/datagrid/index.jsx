// @flow
import * as React from 'react';
import ReactTable from 'react-table';
import '../../../../node_modules/react-table/react-table.css';
import './styles.css';

import type {
  ReactTableColumns,
  InvoicesElements
} from './../../../common/types';

type Props = {
  size: number,
  columns: ReactTableColumns,
  data: InvoicesElements
};

export default function Datagrid({ columns, data, size }: Props) {
  return (
    <ReactTable
      data={data}
      columns={columns}
      showPagination={false}
      resizable={false}
      minRows={2}
      pageSize={size}
      sortable={false}
      className="-striped"
    />
  );
}
