import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import queryString from 'query-string';
import {
  initDashboard,
  setTimeFrameDashboard,
  handleServerRequestError
} from './';
import { REVENUE_ENDPOINT } from './../../common/endpoints';
import { RANGES, REVENUE_FILTERS } from './../../constants';
import * as actionTypes from './../../common/ActionTypes';
import { revenue, revenueData } from './../../../mockdata/mock-store';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Test App Actions', () => {
  const initialState = {
    revenueDataDashboard: revenueData,
    revenueDataBreakEven: revenueData,
    revenueDashboard: revenue,
    revenueBreakEven: revenue
  };
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
    fetchMock.restore();
  });

  test('initDashboard() ', () => {
    fetchMock.mock(`end:${REVENUE_ENDPOINT}?`, {});
    store.dispatch(initDashboard());
    const actions = store.getActions();

    expect(actions[0]).toEqual({ type: actionTypes.INIT_DASHBOARD });
    expect(actions[1]).toEqual({
      type: actionTypes.SET_MONTHLY_COSTS,
      costs: 0
    });
    expect(actions[2]).toEqual({
      type: actionTypes.SET_COSTS_PER_TIME_FRAME,
      costs: 0
    });
    expect(actions[3]).toEqual({ type: actionTypes.FETCHING_REVENUE });
    expect(actions[4]).toEqual({
      type: actionTypes.LOADING,
      loading: true
    });
  });

  test('handleServerRequestError()', () => {
    const store = mockStore();
    store.dispatch(handleServerRequestError({ status: 401 }));
    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: actionTypes.LOADING, loading: false });
    expect(actions[1]).toEqual({ type: actionTypes.ERRORED, error: true });
    expect(actions[2]).toEqual({
      type: actionTypes.CREDENTIALS_EXPIRED,
      value: true
    });
    expect(actions[3]).toEqual({
      type: actionTypes.IS_AUTHENTICATED,
      loggedIn: false
    });
    expect(actions[4]).toEqual({
      type: actionTypes.TOGGLE_NOTFICATION,
      notification: {
        isActive: true,
        message: 'Session expired! Please login...',
        type: 'WARNING'
      }
    });
  });

  test('setTimeFrameDashboard() ', () => {
    const stringParams = queryString.stringify({
      periodType: RANGES.MONTHLY,
      ...REVENUE_FILTERS[RANGES.MONTHLY]
    });
    fetchMock.mock(`end:${REVENUE_ENDPOINT}?${stringParams}`, {});
    store.dispatch(setTimeFrameDashboard(RANGES.MONTHLY));
    const actions = store.getActions();
    const expectedPayload = {
      type: actionTypes.SET_TIME_FRAME_DASHBOARD,
      timeFrame: RANGES.MONTHLY
    };

    expect(actions[0]).toEqual(expectedPayload);
    expect(actions[1]).toEqual({
      type: actionTypes.FETCHING_REVENUE
    });
    expect(actions[2]).toEqual({ type: actionTypes.LOADING, loading: true });
    expect(actions[3]).toEqual({
      type: actionTypes.SET_COSTS_PER_TIME_FRAME,
      costs: 0
    });
  });
});
