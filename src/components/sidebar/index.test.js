import React from 'react';
import { shallow } from 'enzyme';
import { VenueLogo } from '../../components';
import SidebarItem from './sidebar-item';
import Sidebar from './';
import styles from './styles.css';

describe('<Sidebar />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Sidebar fetchVenue={jest.fn()} />).dive();
  });

  it('renders', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('renders with the right css class', () => {
    expect(wrapper.hasClass(`${styles.sidebar}`)).toBeTruthy();
  });

  it('renders with the css class `active` if `isResponsiveSidebarOpen` prop is truthy', () => {
    wrapper.setProps({ isResponsiveSidebarOpen: true });
    expect(wrapper.hasClass(`${styles.active}`)).toBeTruthy();
  });

  it('renders <VenueLogo />', () => {
    expect(wrapper.find(VenueLogo)).toHaveLength(1);
  });

  it('renders <SidebarItem /> ', () => {
    expect(wrapper.find(SidebarItem)).toHaveLength(3);
  });
});
