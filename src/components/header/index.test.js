import React from 'react';
import { shallow } from 'enzyme';
import Header from './';
import Clock from './../clock';
import { MyOBButton } from '../index';

describe('<Header />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Header />);
  });

  it('renders', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('has a <Clock /> component', () => {
    expect(wrapper.dive().find(Clock)).toHaveLength(1);
  });

  it('has a <MyOBBUtton /> component', () => {
    expect(wrapper.dive().find(MyOBButton)).toHaveLength(1);
  });
});
