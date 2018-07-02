// @flow
import React from 'react';
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ComposedChart,
  Line
} from 'recharts';
import { ChartTitle, ChartWrapper } from './../../';
import { formatCurrency, formatDate } from '../../../util/format';
import {
  CHART_HEIGHT,
  SERIES_CONFIG,
  AXIS,
  SUPER_CATEGORIES
} from '../../../constants';

import type { Revenues } from '../../../common/types';

type Props = {
  data: Revenues,
  timeFrame: string
};
function Recharts({ data, timeFrame }: Props) {
  const { DRINKS, FOOD, OTHER } = SUPER_CATEGORIES;
  const series = [
    { name: DRINKS, data: data.drinks },
    { name: OTHER, data: data.other },
    { name: FOOD, data: data.food }
  ];
  return (
    <div>
      <ChartTitle label="Revenue/Family Group" />
      <ChartWrapper>
        <ResponsiveContainer height={CHART_HEIGHT}>
          <ComposedChart>
            <Legend verticalAlign="top" height={36} />
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey={AXIS.X}
              allowDuplicatedCategory={false}
              tickFormatter={v => formatDate(v, timeFrame)}
            />
            <YAxis
              dataKey={AXIS.Y}
              tickFormatter={v => formatCurrency(v, false)}
            />
            <Tooltip
              formatter={v => formatCurrency(v, false)}
              labelFormatter={v => formatDate(v, timeFrame)}
            />
            {series.map(s => (
              <Line
                type="monotone"
                dataKey={AXIS.Y}
                data={s.data}
                name={s.name}
                key={s.name}
                stroke={SERIES_CONFIG[s.name].color}
                stackId="1"
              />
            ))}
          </ComposedChart>
        </ResponsiveContainer>
      </ChartWrapper>
    </div>
  );
}

export default Recharts;
