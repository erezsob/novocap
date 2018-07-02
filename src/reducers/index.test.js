import * as actions from './../common/ActionTypes';
import { RANGES } from './../constants';
import isSidebarOpen from './is-sidebar-open';
import revenueDataDashboard from './revenue-data-dashboard';
import revenueDataBreakEven from './revenue-data-break-even';
import timeFrameDashboard from './time-frame-dashboard';
import timeFrameBreakEven from './time-frame-break-even';
import revenueDashboard from './revenue-dashboard';
import revenueBreakEven from './revenue-break-even';
import breakEvenPercent from './break-even-percent';
import monthlyCosts from './monthly-costs';
import costsPerTimeFrame from './costs-per-time-frame';
import modal from './modal';
import loading from './loading';
import error from './error';
import venues from './venues';
import invoices from './invoices';
import isAuthenticated from './is-authenticated';
import wrongCredentials from './wrong-credentials';
import credentialsExpired from './credentials-expired';
import notification from './notification';

describe('Test Reducers', () => {
  test('Reducer for is-sidebar-open', () => {
    const state = false;
    const newState = isSidebarOpen(state, {
      type: actions.TOGGLE_SIDEBAR,
      open: true
    });
    expect(newState).toEqual(true);
  });

  test('Reducer for revenue-data-dashboard', () => {
    const state = {};
    const revenue = { type: 'dummy', drinks: [], food: [] };
    const newState = revenueDataDashboard(state, {
      type: actions.FETCH_REVENUE_DASHBOARD_SUCCESS,
      revenue
    });
    expect(newState).toEqual(revenue);
  });

  test('Reducer for revenue-data-break-even', () => {
    const state = {};
    const revenue = { type: 'dummy', drinks: [], food: [] };
    const newState = revenueDataBreakEven(state, {
      type: actions.FETCH_REVENUE_BREAK_EVEN_SUCCESS,
      revenue
    });
    expect(newState).toEqual(revenue);
  });

  test('Reducer for set-time-frame-dashboard', () => {
    const state = RANGES.MONTHLY;
    const newState = timeFrameDashboard(state, {
      type: actions.SET_TIME_FRAME_DASHBOARD,
      timeFrame: RANGES.WEEKLY
    });
    expect(newState).toEqual(RANGES.WEEKLY);
  });

  test('Reducer for set-time-frame-break-even', () => {
    const state = RANGES.MONTHLY;
    const newState = timeFrameBreakEven(state, {
      type: actions.SET_TIME_FRAME_BREAK_EVEN,
      timeFrame: RANGES.WEEKLY
    });
    expect(newState).toEqual(RANGES.WEEKLY);
  });

  test('Reducer for revenue-dashboard', () => {
    const state = 0;
    const newState = revenueDashboard(state, {
      type: actions.SET_REVENUE_DASHBOARD,
      revenue: 1750
    });
    expect(newState).toEqual(1750);
  });

  test('Reducer for revenue-break-even', () => {
    const state = 0;
    const newState = revenueBreakEven(state, {
      type: actions.SET_REVENUE_BREAK_EVEN,
      revenue: 3220
    });
    expect(newState).toEqual(3220);
  });

  test('Reducer for break-even-percent', () => {
    const state = 0;
    const newState = breakEvenPercent(state, {
      type: actions.SET_BREAK_EVEN,
      percent: 55
    });
    expect(newState).toEqual(55);
  });

  test('Reducer for monthly-costs', () => {
    const state = 0;
    const newState = monthlyCosts(state, {
      type: actions.SET_MONTHLY_COSTS,
      costs: 666
    });
    expect(newState).toEqual(666);
  });

  test('Reducer for costs-per-time-frame', () => {
    const state = 0;
    const newState = costsPerTimeFrame(state, {
      type: actions.SET_COSTS_PER_TIME_FRAME,
      costs: 375
    });
    expect(newState).toEqual(375);
  });

  describe('Reducer for modal', () => {
    const initialState = {
      open: false,
      modalConfig: {
        title: '',
        content: '',
        label: ''
      }
    };

    test('SHOW_MODAL', () => {
      const passedState = {
        modalConfig: {
          modalContentType: 'COSTS_MODAL',
          title: 'BREAK EVEN',
          content:
            'Please enter your monthly costs to keep track of your point break even',
          label: 'Monthly costs'
        },
        open: true
      };
      const newState = modal(initialState, {
        type: actions.SHOW_MODAL,
        ...passedState
      });
      expect(newState).toEqual(passedState);
    });

    test('HIDE_MODAL', () => {
      const state = { text: 'TESTING' };
      const newState = modal(state, {
        type: actions.HIDE_MODAL
      });
      expect(newState).toEqual({
        modalConfig: {
          modalContentType: '',
          content: '',
          label: '',
          title: ''
        },
        open: false
      });
    });
  });

  test('Reducer for loading', () => {
    const state = false;
    const newState = loading(state, {
      type: actions.LOADING,
      loading: true
    });
    expect(newState).toEqual(true);
  });

  test('Reducer for error', () => {
    const state = false;
    const newState = error(state, {
      type: actions.ERRORED,
      error: true
    });
    expect(newState).toEqual(true);
  });

  test('Reducer for venue', () => {
    const state = { name: 'Lazy Corner' };
    const newState = venues(state, {
      type: actions.FETCH_VENUES_SUCCESS,
      venues: { name: 'asdf' }
    });
    expect(newState).toEqual({ name: 'asdf' });
  });

  test('Reducer for invoices', () => {
    const state = {
      page: undefined,
      size: undefined,
      elements: [{ uuid: '', invoiceNumber: '' }]
    };
    const payload = {
      page: 1,
      size: 10,
      elements: [{ uuid: 'asdf-12345-qwerty', invoiceNumber: '145' }]
    };
    const newState = invoices(state, {
      type: actions.FETCH_INVOICES_SUCCESS,
      invoices: payload
    });
    expect(newState).toEqual(payload);
  });

  test('Reducer for is-authenticated', () => {
    const state = false;
    const newState = isAuthenticated(state, {
      type: actions.IS_AUTHENTICATED,
      loggedIn: true
    });
    expect(newState).toEqual(true);
  });

  test('Reducer for wrong-credentials', () => {
    const state = false;
    const newState = wrongCredentials(state, {
      type: actions.WRONG_CREDENTIALS,
      value: true
    });
    expect(newState).toEqual(true);
  });

  test('Reducer for credentials-expired', () => {
    const state = false;
    const newState = credentialsExpired(state, {
      type: actions.CREDENTIALS_EXPIRED,
      value: true
    });
    expect(newState).toEqual(true);
  });

  test('Reducer for notification', () => {
    const state = {
      isActive: false,
      message: '',
      type: ''
    };
    const payload = {
      isActive: true,
      message: 'foobar',
      type: 'TYPE'
    };
    const newState = notification(state, {
      type: actions.TOGGLE_NOTFICATION,
      notification: payload
    });
    expect(newState).toEqual(payload);
  });
});
