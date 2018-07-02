import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { RadialChart } from 'react-vis';
import CircleProgressBar from './index';
import styles from './styles.css';

describe('<CircleProgressBar />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<CircleProgressBar percent={15} />);
  });

  it('renders', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('renders properly', () => {
    const tree = renderer.create(<CircleProgressBar percent={15} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a <RadialChart /> with the right properties', () => {
    expect(wrapper.find(RadialChart)).toHaveLength(1);
    expect(wrapper.find(RadialChart).props().animation).toBeTruthy();
  });

  it('renders with the right css classes', () => {
    wrapper = mount(<CircleProgressBar percent={15} />);
    expect(wrapper.find(`.${styles.percent}`)).toHaveLength(1);
    expect(wrapper.find(`.${styles.successBar}`)).toHaveLength(2);
    expect(wrapper.find(`.${styles.progressBar}`)).toHaveLength(2);
    expect(wrapper.find(`.${styles.staticBar}`)).toHaveLength(2);
  });
});
