// @flow
import React from 'react';
import { RadialChart } from 'react-vis';
import ChartTitle from '../../chart-title';
import ChartContainer from '../../chart-wrapper';
import { SERIES_CONFIG, CHART_HEIGHT } from '../../../constants';
import { formatCurrency } from '../../../util/format';
import { calculateRevenueAllFamilyGroups } from '../../../util/revenue';
import styles from './styles.css';

import type { Revenues } from '../../../common/types';

type Props = {
  data: Revenues
};

function CustomRadialChart({ data }: Props) {
  const { food, drinks, other } = calculateRevenueAllFamilyGroups(data);
  const total = food + drinks + other;
  return (
    <div>
      <ChartTitle label="Sales" />
      <ChartContainer>
        <RadialChart
          width={CHART_HEIGHT}
          height={CHART_HEIGHT}
          innerRadius={110}
          radius={120}
          getAngle={d => d.theta}
          className={styles.chart}
          showLabels
          animation
          colorType="literal"
          data={[
            { theta: food, label: 'Food', color: SERIES_CONFIG.food.color },
            {
              theta: drinks,
              label: 'Drinks',
              color: SERIES_CONFIG.drinks.color
            },
            { theta: other, label: 'Other', color: SERIES_CONFIG.other.color }
          ]}
        />
        <div className={styles.total}>{formatCurrency(total)}</div>
      </ChartContainer>
    </div>
  );
}

export default CustomRadialChart;
