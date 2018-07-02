import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import ReactTable from 'react-table';
import invoices from '../../../../mockdata/invoices.json';
import Datagrid from './index';

describe('<Datagrid />', () => {
  let wrapper;
  let table;
  const columns = [
    {
      Header: 'Invoice Number',
      accessor: 'invoiceNumber'
    },
    {
      id: 'table',
      Header: 'Table',
      accessor: 'table.name'
    },
    {
      id: 'user',
      Header: 'User',
      accessor: 'user.name'
    }
  ];

  beforeEach(() => {
    wrapper = mount(<Datagrid data={invoices.elements} columns={columns} />);
    table = wrapper.find(ReactTable);
  });

  it('renders', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('renders properly', () => {
    const tree = renderer
      .create(<Datagrid data={invoices.elements} columns={columns} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a table with 3 columns', () => {
    expect(table).toHaveLength(1);
    expect(table.find('.rt-thead .rt-tr').children()).toHaveLength(3);
  });

  it('renders as many rows as elements in the invoices array', () => {
    expect(table.find('.rt-tbody').children()).toHaveLength(invoices.size);
  });

  it('shows a message when there is no data to display in the table', () => {
    wrapper = mount(<Datagrid data={[]} columns={columns} />);
    expect(wrapper.find('.rt-noData')).toHaveLength(1);
    expect(wrapper.find('.rt-noData').text()).toBe('No rows found');
  });
});
