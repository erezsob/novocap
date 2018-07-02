import React from 'react';
import { shallow } from 'enzyme';
import SidebarItem from './index';
import styles from './styles.css';

describe('<SidebarItem />', () => {
  const props = { match: { path: '/my-path' } };
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SidebarItem match={props.match} />).dive();
  });

  it('renders with the css class `item`', () => {
    expect(wrapper).toHaveLength(1);
    expect(wrapper.hasClass(`${styles.item}`)).toBeTruthy();
  });

  it('has only one child', () => {
    expect(wrapper.children()).toHaveLength(1);
  });
});
