import React from 'react';
import { shallow } from 'enzyme';
import {
  FlexibleXYPlot,
  VerticalBarSeries,
  DiscreteColorLegend,
  Hint
} from 'react-vis';
import CustomVerticalBarSeries from './';
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

describe('<CustomVerticalBarSeries />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<CustomVerticalBarSeries data={data} />);
  });

  test('renders a <ChartTitle />', () => {
    expect(wrapper.find(ChartTitle)).toHaveLength(1);
  });

  test('renders a <FlexibleXYPlot /> with the right properties', () => {
    expect(wrapper.find(FlexibleXYPlot)).toHaveLength(1);
    expect(wrapper.find(FlexibleXYPlot).props().stackBy).toBe('y');
    expect(wrapper.find(FlexibleXYPlot).props().xType).toBe('ordinal');
  });

  test('renders 3 <VerticalBarSeries />', () => {
    expect(wrapper.find(VerticalBarSeries)).toHaveLength(3);
  });

  test('renders a <DiscreteColorLegend /> component', () => {
    expect(wrapper.find(DiscreteColorLegend)).toHaveLength(1);
  });

  test('renders a <Hint /> on mouse over', () => {
    wrapper.find(FlexibleXYPlot).simulate('mouseenter');
    wrapper.setState({ hintValue: { title: 'titleTest', value: { x: 200 } } });
    expect(wrapper.find(Hint)).toHaveLength(1);
  });
});
