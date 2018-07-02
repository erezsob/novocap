// @flow
import React from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import {
  VerticalBarSeries,
  RadialChart
} from '../../components/charts-react-vis';
import { StackedAreaChart, AreaChart } from '../../components/charts-recharts';
import { Section } from '../../components';
import jss from './styles';

import type { Revenues } from './../../common/types';

type Props = {
  classes: {
    paper: string
  },
  timeFrame: string,
  data: Revenues
};

function Container({ classes: { paper }, data, timeFrame }: Props) {
  return (
    <Section title="Insights">
      <Grid item xs={12} md={6}>
        <Paper className={paper}>
          <AreaChart data={data} timeFrame={timeFrame} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper className={paper}>
          <StackedAreaChart data={data} timeFrame={timeFrame} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper className={paper}>
          <VerticalBarSeries data={data} timeFrame={timeFrame} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper className={paper}>
          <RadialChart data={data} />
        </Paper>
      </Grid>
    </Section>
  );
}

const mapStateToProps = state => ({
  data: state.revenueDataDashboard,
  timeFrame: state.timeFrameDashboard
});

export const Charts = withStyles(jss)(Container);

export default connect(mapStateToProps)(Charts);
