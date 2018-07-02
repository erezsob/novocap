// @flow
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import isSidebarOpen from './is-sidebar-open';
import revenueDashboard from './revenue-dashboard';
import revenueBreakEven from './revenue-break-even';
import monthlyCosts from './monthly-costs';
import costsPerTimeFrame from './costs-per-time-frame';
import breakEvenPercent from './break-even-percent';
import revenueDataDashboard from './revenue-data-dashboard';
import revenueDataBreakEven from './revenue-data-break-even';
import timeFrameDashboard from './time-frame-dashboard';
import timeFrameBreakEven from './time-frame-break-even';
import modal from './modal';
import error from './error';
import loading from './loading';
import venues from './venues';
import invoices from './invoices';
import isAuthenticated from './is-authenticated';
import wrongCredentials from './wrong-credentials';
import credentialsExpired from './credentials-expired';
import notification from './notification';

const reducers = {
  form: formReducer,
  isSidebarOpen,
  revenueDashboard,
  revenueBreakEven,
  monthlyCosts,
  costsPerTimeFrame,
  breakEvenPercent,
  revenueDataDashboard,
  revenueDataBreakEven,
  timeFrameDashboard,
  timeFrameBreakEven,
  modal,
  error,
  loading,
  venues,
  invoices,
  isAuthenticated,
  wrongCredentials,
  credentialsExpired,
  notification
};

export type Reducers = typeof reducers;

export default combineReducers(reducers);
