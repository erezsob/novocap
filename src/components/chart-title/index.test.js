import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import ChartTitle from './index';

describe('<ChartTitle />', () => {
  test('renders correctly', () => {
    const tree = renderer.create(<ChartTitle label="test" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders with a given label', () => {
    const wrapper = shallow(<ChartTitle label="AwesomeLabel" />);
    expect(wrapper.text()).toBe('AwesomeLabel');
  });
});
