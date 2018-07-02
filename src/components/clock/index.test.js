import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Clock from './';

jest.mock('./../../util/time', () => ({
  time: jest.fn().mockReturnValue('12:34:32'),
  date: jest.fn().mockReturnValue('Wed, 12/05/2030')
}));

describe('<Clock />', () => {
  test('renders with the right css classes', () => {
    const wrapper = shallow(<Clock />);
    expect(wrapper.find('.container')).toHaveLength(1);
    expect(wrapper.find('.time')).toHaveLength(1);
    expect(wrapper.find('.date')).toHaveLength(1);
  });

  test('renders properly', () => {
    const tree = renderer.create(<Clock />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
