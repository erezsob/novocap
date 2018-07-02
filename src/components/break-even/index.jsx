// @flow
import React, { Component } from 'react';
import Card from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import InfoOutline from 'material-ui-icons/InfoOutline';
import { withStyles } from 'material-ui/styles';
import { BREAK_EVEN_RANGES_TITLES } from '../../constants';
import { getCurrentTimeFrame } from '../../util/time';
import { CircleProgressBar } from '../../components';
import styles from './styles.css';
import jss from './styles';

type Props = {
  classes: {
    card: string,
    iconButton: string
  },
  monthlyCosts: number,
  showModal: Function,
  breakEvenPercent: number,
  timeFrameBreakEven: string,
  fetchRevenueBreakEven: Function
};

const modalSetupObject = {
  modalContentType: 'COSTS_FORM',
  title: 'BREAK EVEN',
  content:
    'Please enter your monthly costs to keep track of your point of break even:',
  label: 'Monthly costs'
};

class BreakEven extends Component<Props> {
  props: Props;

  componentDidMount() {
    const { fetchRevenueBreakEven, timeFrameBreakEven } = this.props;

    fetchRevenueBreakEven({
      ...getCurrentTimeFrame(timeFrameBreakEven),
      periodType: timeFrameBreakEven
    });
  }

  render() {
    const {
      classes: { card, iconButton },
      monthlyCosts,
      showModal,
      breakEvenPercent,
      timeFrameBreakEven
    } = this.props;
    return (
      <Card className={card} onClick={() => showModal(modalSetupObject)}>
        <div className={styles.container}>
          <div className={styles.title}>
            <div>Break Even</div>
            <div className={styles.date}>
              {BREAK_EVEN_RANGES_TITLES[timeFrameBreakEven]}
            </div>
          </div>
          <IconButton aria-label="Info icon" className={iconButton}>
            <InfoOutline />
          </IconButton>
        </div>
        <div className={styles.barContainer}>
          {monthlyCosts ? (
            <CircleProgressBar percent={breakEvenPercent} />
          ) : (
            <div className={styles.addCosts}>Please add costs</div>
          )}
        </div>
      </Card>
    );
  }
}

export default withStyles(jss)(BreakEven);
