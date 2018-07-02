import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import ChartWrapper from './index';

describe('<ChartWrapper />', () => {
  test('renders correctly', () => {
    const tree = renderer
      .create(
        <ChartWrapper>
          <dummy-child />
        </ChartWrapper>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders its children', () => {
    const wrapper = shallow(
      <ChartWrapper>
        <dummy />
        <dummy />
      </ChartWrapper>
    );
    expect(wrapper.children()).toHaveLength(2);
  });
});
