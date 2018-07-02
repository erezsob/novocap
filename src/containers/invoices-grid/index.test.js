import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import invoices from './../../../mockdata/invoices.json';
import InvoicesGrid from './';
import { Datagrid, TimeCell } from '../../components';

describe('<InvoicesGrid />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<InvoicesGrid invoices={invoices} />);
  });

  it('renders', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('renders properly', () => {
    const tree = renderer.create(<InvoicesGrid invoices={invoices} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders <Datagrid /> component', () => {
    expect(wrapper.find(Datagrid)).toHaveLength(1);
  });

  it('renders <TimeCell /> component', () => {
    wrapper = mount(<InvoicesGrid invoices={invoices} />);
    expect(wrapper.find(TimeCell)).toHaveLength(invoices.elements.length);
  });
});
