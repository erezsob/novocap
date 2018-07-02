import React from 'react';
import { shallow } from 'enzyme';
import VenueLogo from './';
import styles from './styles.css';

describe('<VenueLogo />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<VenueLogo venueName="Lazy Corner" />);
  });

  it('renders', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('renders the venue name passed as prop', () => {
    expect(wrapper.find(`.${styles.name}`).text()).toBe('Lazy Corner');
  });

  it('renders with the right css class', () => {
    expect(wrapper.find(`.${styles.container}`)).toHaveLength(1);
  });
});
