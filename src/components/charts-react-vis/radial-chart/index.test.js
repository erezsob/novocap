import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { RadialChart } from 'react-vis';
import CustomRadialChart from './index';
import ChartTitle from '../../chart-title';

const data = {
  drinks: [
    {
      x: '1',
      y: 100
    }
  ],
  food: [
    {
      x: '1',
      y: 1200
    }
  ],
  other: [
    {
      x: '1',
      y: 300
    }
  ]
};

describe('<CustomRadialChart />', () => {
  const wrapper = shallow(<CustomRadialChart data={data} />);

  test('renders properly', () => {
    const tree = renderer.create(<CustomRadialChart data={data} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders a <ChartTitle />', () => {
    expect(wrapper.find(ChartTitle)).toHaveLength(1);
  });

  test('renders a <RadialChart /> with the right properties', () => {
    expect(wrapper.find(RadialChart)).toHaveLength(1);
    expect(wrapper.find(RadialChart).props().showLabels).toBeTruthy();
    expect(wrapper.find(RadialChart).props().animation).toBeTruthy();
  });
});
