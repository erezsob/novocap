import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import VenueItem from './';
import styles from './styles.css';

describe('<VenueItem />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<VenueItem />);
  });

  it('renders properly', () => {
    const tree = renderer.create(<VenueItem />);
    expect(tree.toJSON()).toMatchSnapshot();
    expect(wrapper).toHaveLength(1);
  });

  it('renders the `label` and `value` passed as props', () => {
    wrapper.setProps({ label: 'foo', value: 'bar' });
    expect(wrapper.find(`.${styles.label}`).text()).toBe('foo');
    expect(wrapper.find(`.${styles.field}`).text()).toBe('bar');
  });
});
