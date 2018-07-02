import React, { Component } from 'react';
import {
  FlexibleXYPlot,
  VerticalBarSeries,
  VerticalGridLines,
  HorizontalGridLines,
  DiscreteColorLegend,
  Hint,
  YAxis,
  XAxis
} from 'react-vis';
import ChartTitle from '../../chart-title';
import ChartContainer from '../../chart-wrapper';
import CustomHint from '../hint/index';
import styles from './styles.css';
import { formatCurrency, formatDate } from '../../../util/format';
import { SERIES_CONFIG, CHART_HEIGHT } from '../../../constants';
import formatData from './../util';

import type { Revenues } from '../../../common/types';

type Props = {
  data: Revenues,
  timeFrameDashboard: string
};

type State = {
  hintValue: {
    title: string,
    value: number
  },
  isMouseOver: boolean
};

/* FIXME it this chart is buggy at the moment */
export default class VerticalBar extends Component {
  props: Props;
  state: State;

  state = {
    hintValue: null,
    isMouseOver: false
  };

  rememberValue = hintValue => {
    this.setState({ hintValue });
  };

  forgetValue = () => {
    this.setState({ hintValue: null });
  };

  renderBarSeries = (data, { id, title, color }) => (
    <VerticalBarSeries
      onValueMouseOver={value => this.rememberValue({ title, value })}
      onValueMouseOut={this.forgetValue}
      animation
      data={data[id]}
      color={color}
    />
  );

  renderHint = ({ title, value }) => (
    <Hint value={value}>
      <CustomHint title={title} value={value} />
    </Hint>
  );

  renderLegend = ({ food, drinks, other }) => (
    <DiscreteColorLegend
      className={styles.legend}
      orientation="horizontal"
      items={[
        {
          title: food.title,
          color: food.color
        },
        {
          title: drinks.title,
          color: drinks.color
        },
        {
          title: other.title,
          color: other.color
        }
      ]}
    />
  );

  render() {
    const { hintValue, isMouseOver } = this.state;
    const { food, drinks, other } = SERIES_CONFIG;
    const { data, timeFrameDashboard } = this.props;
    // FIXME Maybe a promise?
    const formattedData = formatData(data);

    return (
      <div>
        <ChartTitle label="Revenue" />
        <ChartContainer>
          <FlexibleXYPlot
            height={CHART_HEIGHT}
            xType="ordinal"
            stackBy="y"
            className={styles.chart}
            onMouseEnter={() => this.setState({ isMouseOver: true })}
            onMouseLeave={() => this.setState({ isMouseOver: false })}
          >
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis
              tickLabelAngle={-70}
              tickFormat={v => formatDate(v, timeFrameDashboard)}
            />
            <YAxis tickFormat={v => formatCurrency(v, false)} />
            {this.renderBarSeries(formattedData, food)}
            {this.renderBarSeries(formattedData, drinks)}
            {this.renderBarSeries(formattedData, other)}

            {isMouseOver && hintValue && this.renderHint(hintValue)}
          </FlexibleXYPlot>
          {this.renderLegend(SERIES_CONFIG)}
        </ChartContainer>
      </div>
    );
  }
}
