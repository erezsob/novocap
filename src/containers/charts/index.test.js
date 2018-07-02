import React from 'react';
import { mount } from 'enzyme';
import { Charts } from './';
import {
  VerticalBarSeries,
  RadialChart
} from '../../components/charts-react-vis';
import { StackedAreaChart, AreaChart } from '../../components/charts-recharts';
import { flattenRevenue } from './../../util/revenue';
import mockdata from '../../../mockdata/revenue_daily.json';

describe('<Charts />', () => {
  const flattenedData = flattenRevenue(mockdata);
  const wrapper = mount(<Charts data={flattenedData} />);

  test('renders with a given label', () => {
    expect(wrapper).toHaveLength(1);
  });

  test('has a <VerticalBarSeries /> component', () => {
    expect(wrapper.find(VerticalBarSeries)).toHaveLength(1);
  });

  test('has a <RadialChart /> component', () => {
    expect(wrapper.find(RadialChart)).toHaveLength(1);
  });

  test('has an <AreaChart /> component', () => {
    expect(wrapper.find(AreaChart)).toHaveLength(1);
  });

  test('has an <StackedAreaChart /> component', () => {
    expect(wrapper.find(StackedAreaChart)).toHaveLength(1);
  });
});
