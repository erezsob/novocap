// @flow
import React from 'react';
import {
  ResponsiveContainer,
  CartesianGrid,
  YAxis,
  XAxis,
  Tooltip,
  AreaChart,
  Area
} from 'recharts';
import ChartTitle from '../../chart-title/index';
import ChartContainer from '../../chart-wrapper';
import { CHART_HEIGHT, AXIS } from '../../../constants';
import { formatCurrency, formatDate } from '../../../util/format';

import type { Revenues } from '../../../common/types';

type Props = {
  data: Revenues,
  costsPerTimeFrame: number,
  timeFrame: string
};

function CustomAreaChart({ data: { drinks, food, other }, timeFrame }: Props) {
  const flattenedData = drinks.map((r, i) => ({
    date: r.date,
    revenue: drinks[i].revenue + food[i].revenue + other[i].revenue
  }));
  const currencyFormatter = v => formatCurrency(v, false);
  return (
    <div>
      <ChartTitle label="Total Revenue" />
      <ChartContainer>
        <ResponsiveContainer height={CHART_HEIGHT}>
          <AreaChart data={flattenedData}>
            <defs>
              <linearGradient id="colorFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis dataKey={AXIS.Y} tickFormatter={currencyFormatter} />
            <XAxis
              dataKey={AXIS.X}
              tickFormatter={v => formatDate(v, timeFrame)}
            />
            <Tooltip
              formatter={currencyFormatter}
              labelFormatter={v => formatDate(v, timeFrame)}
            />
            <Area
              animationDuration={500}
              animationEasing="ease-in-out"
              type="monotone"
              dataKey={AXIS.Y}
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}

export default CustomAreaChart;
