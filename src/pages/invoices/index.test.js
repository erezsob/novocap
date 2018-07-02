import React from 'react';
import { shallow } from 'enzyme';
import { InvoicesGrid } from './../../containers';
import { ItemsPerPage, Paginator } from './../../components';
import { Invoices } from './';
import invoices from './../../../mockdata/invoices.json';
import styles from './styles.css';

describe('<Invoices />', () => {
  const initialLocation = { search: '?page=1&size=2' };
  let wrapper;
  let spyComponentDidMount;
  let spyComponentWillReceiveProps;
  let spyComponentDidUpdate;
  let spyUpdateInvoicesResult;

  beforeEach(() => {
    spyComponentDidMount = jest.spyOn(Invoices.prototype, 'componentDidMount');
    spyComponentWillReceiveProps = jest.spyOn(
      Invoices.prototype,
      'componentWillReceiveProps'
    );
    spyComponentDidUpdate = jest.spyOn(
      Invoices.prototype,
      'componentDidUpdate'
    );
    spyUpdateInvoicesResult = jest.fn();

    wrapper = shallow(
      <Invoices
        invoices={invoices}
        updateInvoicesResult={spyUpdateInvoicesResult}
        location={initialLocation}
      />
    );
  });

  afterEach(() => {
    spyComponentDidMount.mockClear();
    spyComponentWillReceiveProps.mockClear();
    spyUpdateInvoicesResult.mockClear();
    spyComponentDidUpdate.mockClear();
  });

  it('renders a stateful component', () => {
    expect(wrapper).toHaveLength(1);
  });

  describe('Lifecycle methods', () => {
    test('componentDidMount()', () => {
      expect(spyComponentDidMount).toHaveBeenCalledTimes(1);
      expect(spyUpdateInvoicesResult).toBeCalledWith(initialLocation);
    });

    test('componentWillReceiveProps()', () => {
      const newLocation = { search: '?page=666&size=1000' };
      expect(spyComponentWillReceiveProps).toHaveBeenCalledTimes(0);
      wrapper.setProps({ location: newLocation });
      wrapper.update();
      expect(spyComponentWillReceiveProps).toHaveBeenCalledTimes(1);
      expect(spyUpdateInvoicesResult).toBeCalledWith(newLocation);
    });

    test('componentDidUpdate()', () => {
      const newLocation = { search: '?page=777&size=999' };
      expect(spyComponentDidUpdate).toHaveBeenCalledTimes(0);
      wrapper.setProps({ location: newLocation });
      wrapper.update();
      expect(spyComponentDidUpdate).toHaveBeenCalledTimes(1);
    });
  });

  it('renders <InvoicesGrid />', () => {
    expect(wrapper.find(InvoicesGrid)).toHaveLength(1);
  });

  describe('controls at the top', () => {
    const selector = `.${styles.controlsTop}`;

    it('renders with the right class', () => {
      expect(wrapper.find(selector)).toHaveLength(1);
    });

    it('renders one <Paginator />', () => {
      const controls = wrapper.find(selector);
      expect(controls.children()).toHaveLength(1);
      expect(controls.childAt(0).type()).toBe(Paginator);
    });
  });

  describe('controls at the bottom', () => {
    const selector = `.${styles.controls}`;

    it('renders with the right class', () => {
      expect(wrapper.find(`.${styles.controls}`)).toHaveLength(1);
    });

    it('renders one <ItemsPerPage /> and one <Paginator /> in that order', () => {
      const controls = wrapper.find(selector);
      expect(controls.children()).toHaveLength(2);
      expect(controls.childAt(0).type()).toBe(ItemsPerPage);
      expect(controls.childAt(1).type()).toBe(Paginator);
    });
  });
});
