// @flow
import React from 'react';
import { RadialChart } from 'react-vis';
import { generateData } from '../../util/progress-bar';
import styles from './styles.css';

type Props = {
  percent: number
};

function CircleProgressBar({ percent }: Props) {
  return (
    <div>
      <RadialChart
        width={150}
        height={150}
        innerRadius={60}
        radius={70}
        getAngle={d => d.theta}
        className={styles.chart}
        animation
        colorType="literal"
        data={generateData(percent, styles)}
      />
      <b className={styles.percent}>{`${percent}%`}</b>
    </div>
  );
}

export default CircleProgressBar;
