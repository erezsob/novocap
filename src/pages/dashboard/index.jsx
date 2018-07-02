// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import { Charts } from '../../containers';
import { initDashboard, setTimeFrameDashboard } from './../../actions/app';
import { Section, TimeFrameControls } from './../../components';
import { ConnectedBreakEven } from './../../connected-components';
import log from './../../logger';

type Props = {
  initDashboard: Function,
  setTimeFrameDashboard: Function,
  selected: string
};

type State = {
  hasError: boolean
};

export class Dashboard extends Component<Props, State> {
  props: Props;
  state: State;

  state = {
    hasError: false
  };

  componentDidMount() {
    this.props.initDashboard();
  }

  componentDidCatch(error: string, info: string) {
    this.setState({ hasError: true });
    log(`An error ocurred rendering Dashboard! error: ${error}, info: ${info}`);
  }

  handleChange = (e: SyntheticEvent<HTMLInputElement>, selected: string) => {
    const { setTimeFrameDashboard } = this.props;
    setTimeFrameDashboard(selected);
  };

  render() {
    const { selected } = this.props;
    const { hasError } = this.state;

    return !hasError ? (
      <div>
        <TimeFrameControls
          selected={selected}
          handleChange={this.handleChange}
        />
        <Section title="Overview">
          <Grid item xs={12} sm={4}>
            <ConnectedBreakEven />
          </Grid>
        </Section>
        <Charts />
      </div>
    ) : (
      <h1>Something went wrong!</h1>
    );
  }
}

const mapStateToProps = state => ({
  selected: state.timeFrameDashboard
});

const mapDispatchToProps = {
  initDashboard,
  setTimeFrameDashboard
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
