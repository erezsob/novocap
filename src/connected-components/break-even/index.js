// @flow
import React from 'react';
import { connect } from 'react-redux';
import { showModal } from '../../actions/modal';
import { saveCostsFromModal } from '../../actions/costs';
import { fetchRevenueBreakEven } from '../../actions/revenue';
import BreakEven from '../../components/break-even';

const mapDispatchToProps = {
  showModal,
  saveCostsFromModal,
  fetchRevenueBreakEven
};

const mapStateToProps = state => ({
  timeFrameBreakEven: state.timeFrameBreakEven,
  breakEvenPercent: state.breakEvenPercent,
  monthlyCosts: state.monthlyCosts
});

const withRedux = connect(mapStateToProps, mapDispatchToProps);

export default withRedux(BreakEven);
