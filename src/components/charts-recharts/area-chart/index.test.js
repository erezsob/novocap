import React from 'react';
import { shallow } from 'enzyme';
import { AreaChart, ResponsiveContainer, Tooltip, Area, YAxis } from 'recharts';
import CustomAreaChart from './index';
import ChartTitle from '../../chart-title';
import { AXIS } from './../../../constants';

const data = {
  type: 'yearly',
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

describe('<CustomAreaChart />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<CustomAreaChart data={data} />);
  });

  test('renders a <ChartTitle />', () => {
    expect(wrapper.find(ChartTitle)).toHaveLength(1);
  });

  test('renders a <AreaChart /> inside a <ResponsiveContainer />', () => {
    expect(
      wrapper
        .find(ResponsiveContainer)
        .childAt(0)
        .name()
    ).toBe('AreaChart');
  });

  test('renders <AreaChart />', () => {
    expect(wrapper.find(AreaChart)).toHaveLength(1);
  });

  test('renders a <YAxis /> component', () => {
    expect(wrapper.find(YAxis)).toHaveLength(1);
    expect(wrapper.find(YAxis).prop('dataKey')).toBe(AXIS.Y);
  });

  test('renders a <Tooltip /> component', () => {
    expect(wrapper.find(Tooltip)).toHaveLength(1);
  });

  test('renders <Area /> with the right props', () => {
    expect(wrapper.find(Area).prop('dataKey')).toBe(AXIS.Y);
  });
});
