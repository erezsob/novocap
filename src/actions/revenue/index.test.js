import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import queryString from 'query-string';
import 'jest-localstorage-mock';
import {
  setRevenue,
  fetchRevenueDashboard,
  fetchRevenueBreakEven,
  fetchRevenue,
  fetchRevenueSuccess
} from './';
import { flattenRevenue } from './../../util/revenue';
import * as actionTypes from './../../common/ActionTypes';
import {
  revenue,
  revenueData,
  revenueDataRaw
} from './../../../mockdata/mock-store';
import { REVENUE_ENDPOINT } from './../../common/endpoints';
import { LOCAL_STORAGE_VENUE_KEY } from './../../constants';
import revenuesFromApi from '../../../mockdata/revenue_monthly.json';
import { calculateBreakEven } from '../break_even';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Test Revenue Actions', () => {
  const revenueDataBreakEven = revenueData;
  const revenueDataDashboard = revenueData;
  const revenueBreakEven = revenue;
  const revenueDashboard = revenue;

  beforeEach(() => {
    fetchMock.restore();
  });
  test('setRevenue()', () => {
    const store = mockStore({ revenueDataBreakEven, revenueBreakEven });
    const setRevenueParams = {
      setRevenueActionType: actionTypes.SET_REVENUE_BREAK_EVEN,
      revenueType: 'revenueDataBreakEven',
      action: calculateBreakEven
    };
    store.dispatch(setRevenue(setRevenueParams));
    const actions = store.getActions();
    const expectedPayload = {
      type: actionTypes.SET_REVENUE_BREAK_EVEN,
      revenue
    };
    expect(actions[0]).toEqual(expectedPayload);
  });

  describe('fetchRevenue() --> fetches data from the API', () => {
    test('unsuccessful request ', done => {
      fetchMock.mock('*', { status: 500 });
      const store = mockStore();
      store.dispatch(fetchRevenue()).then(() => {
        const actions = store.getActions();
        expect(actions).toContainEqual({
          type: actionTypes.ERRORED,
          error: true
        });
        done();
      });
    });

    test('successful request', done => {
      const store = mockStore(revenueData);
      const paramsObj = { foo: '1', bar: '2' };
      const timeFrame = 'monthly';

      fetchMock.mock(
        `end:${REVENUE_ENDPOINT}?${queryString.stringify(paramsObj)}`,
        revenueDataRaw
      );

      store
        .dispatch(
          fetchRevenue(paramsObj, timeFrame, actionTypes.SET_REVENUE_BREAK_EVEN)
        )
        .then(() => {
          const actions = store.getActions();

          expect(actions[0]).toEqual({
            type: actionTypes.FETCHING_REVENUE
          });
          expect(actions[1]).toEqual({
            type: actionTypes.LOADING,
            loading: true
          });
          expect(localStorage.getItem).toHaveBeenCalledWith(
            LOCAL_STORAGE_VENUE_KEY
          );
          done();
        });
    });
  });

  test('fetchRevenueDashboard()', done => {
    const initialState = {
      costsPerTimeFrame: 13000,
      timeFrameDashboard: 'monthly',
      revenueDataDashboard,
      revenueDashboard
    };
    const store = mockStore(initialState);
    const paramsObj = { foo: '1', bar: '2' };

    fetchMock.mock(
      `end:${REVENUE_ENDPOINT}?${queryString.stringify(paramsObj)}`,
      revenueDataRaw
    );

    store.dispatch(fetchRevenueDashboard(paramsObj)).then(() => {
      const actions = store.getActions();

      expect(actions[2]).toEqual({
        type: actionTypes.LOADING,
        loading: false
      });
      expect(actions[3]).toEqual({
        type: actionTypes.FETCH_REVENUE_DASHBOARD_SUCCESS,
        revenue: revenueDataDashboard
      });
      expect(actions[4]).toEqual({
        type: actionTypes.SET_REVENUE_DASHBOARD,
        revenue
      });
      expect(fetchMock.called()).toBeTruthy();
      done();
    });
  });

  test('fetchRevenueBreakEven()', done => {
    const initialState = {
      revenueDataBreakEven,
      costsPerTimeFrame: 13000,
      timeFrameBreakEven: 'monthly',
      revenueBreakEven: revenue
    };
    const store = mockStore(initialState);
    const paramsObj = { foo: '1', bar: '2' };

    fetchMock.mock(
      `end:${REVENUE_ENDPOINT}?${queryString.stringify(paramsObj)}`,
      revenueDataRaw
    );

    store.dispatch(fetchRevenueBreakEven(paramsObj)).then(() => {
      const actions = store.getActions();

      expect(actions[2]).toEqual({
        type: actionTypes.LOADING,
        loading: false
      });
      expect(actions[3]).toEqual({
        type: actionTypes.FETCH_REVENUE_BREAK_EVEN_SUCCESS,
        revenue: revenueDataBreakEven
      });
      expect(actions[4]).toEqual({
        type: actionTypes.SET_REVENUE_BREAK_EVEN,
        revenue
      });
      expect(fetchMock.called()).toBeTruthy();

      done();
    });
  });

  test('fetchRevenueSuccess()', () => {
    const flattenedRevenuesFromApi = flattenRevenue(revenuesFromApi);
    const store = mockStore({
      revenue,
      revenueDataDashboard: flattenedRevenuesFromApi
    });
    store.dispatch(
      fetchRevenueSuccess(
        actionTypes.FETCH_REVENUE_DASHBOARD_SUCCESS,
        revenuesFromApi
      )
    );
    const actions = store.getActions();
    const expectedPayload = {
      type: actionTypes.FETCH_REVENUE_DASHBOARD_SUCCESS,
      revenue: flattenedRevenuesFromApi
    };
    expect(actions[0]).toEqual({ type: actionTypes.LOADING, loading: false });
    expect(actions[1]).toEqual(expectedPayload);
  });
});
