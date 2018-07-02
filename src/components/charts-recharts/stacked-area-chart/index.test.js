import React from 'react';
import { shallow } from 'enzyme';
import {
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  Line,
  YAxis
} from 'recharts';
import CustomStackedAreaChart from './index';
import ChartTitle from '../../chart-title';
import { AXIS } from './../../../constants';

const data = {
  drinks: [
    {
      date: '1',
      revenue: 100
    }
  ],
  food: [
    {
      date: '1',
      revenue: 1200
    }
  ],
  other: [
    {
      date: '1',
      revenue: 300
    }
  ]
};

describe('<CustomStackedAreaChart />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<CustomStackedAreaChart data={data} />);
  });

  test('renders a <ChartTitle />', () => {
    expect(wrapper.find(ChartTitle)).toHaveLength(1);
  });

  test('renders a <ComposedChart /> inside a <ResponsiveContainer />', () => {
    expect(
      wrapper
        .find(ResponsiveContainer)
        .childAt(0)
        .name()
    ).toBe('ComposedChart');
  });

  test('renders a <YAxis /> component', () => {
    expect(wrapper.find(YAxis)).toHaveLength(1);
    expect(wrapper.find(YAxis).prop('dataKey')).toBe(AXIS.Y);
  });

  test('renders a <Tooltip /> component', () => {
    expect(wrapper.find(Tooltip)).toHaveLength(1);
  });

  test('renders 3 <Line /> components', () => {
    expect(wrapper.find(Line)).toHaveLength(3);
  });
});
