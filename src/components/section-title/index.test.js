import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Title from './index';

describe('<Title />', () => {
  test('renders correctly', () => {
    const tree = renderer.create(<Title title="test" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders with a given title', () => {
    const wrapper = shallow(<Title title="AwesomeTitle" />);
    expect(wrapper.text()).toBe('AwesomeTitle');
  });
});
