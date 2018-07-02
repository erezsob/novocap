// @flow
import queryString from 'query-string';
import * as types from '../../common/ActionTypes';
import {
  calculateRevenueAllFamilyGroups,
  flattenRevenue
} from './../../util/revenue';
import { handleServerRequestError } from './../app';
import { calculateBreakEven } from './../break_even';
import { revenueService } from '../../services/services';
import { getVenueFromStorage } from './../../util/venue';

import type {
  State,
  Dispatch,
  Revenues,
  FetchRevenueParams,
  SessionVenue,
  RevenueParams
} from './../../common/types';

export function fetchRevenueSuccess(actionType: string, revenue: Revenues) {
  return (dispatch: Dispatch) => {
    dispatch({ type: types.LOADING, loading: false });
    dispatch({
      type: actionType,
      revenue: flattenRevenue(revenue)
    });
  };
}

export function fetchRevenue(
  paramsObj: FetchRevenueParams = {},
  timeFrame: string,
  successActionType: string,
  setRevenueParams: RevenueParams
) {
  return (dispatch: Dispatch) => {
    dispatch({ type: types.FETCHING_REVENUE });
    dispatch({ type: types.LOADING, loading: true });
    const stringParameters = queryString.stringify(paramsObj);
    const venue: SessionVenue = getVenueFromStorage();

    return revenueService(venue.id, stringParameters, timeFrame)
      .then(response => response.json())
      .then(revenues => {
        dispatch(fetchRevenueSuccess(successActionType, revenues));
        dispatch(setRevenue(setRevenueParams));
      })
      .catch(response => dispatch(handleServerRequestError(response)));
  };
}

export function fetchRevenueDashboard(paramsObj: FetchRevenueParams) {
  return (dispatch: Dispatch, getState: State) => {
    const { timeFrameDashboard } = getState();
    const setRevenueParams = {
      setRevenueActionType: types.SET_REVENUE_DASHBOARD,
      revenueType: 'revenueDataDashboard'
    };
    return dispatch(
      fetchRevenue(
        paramsObj,
        timeFrameDashboard,
        types.FETCH_REVENUE_DASHBOARD_SUCCESS,
        setRevenueParams
      )
    );
  };
}

export function fetchRevenueBreakEven(paramsObj: FetchRevenueParams) {
  return (dispatch: Dispatch, getState: State) => {
    const { timeFrameBreakEven } = getState();
    const setRevenueParams = {
      setRevenueActionType: types.SET_REVENUE_BREAK_EVEN,
      revenueType: 'revenueDataBreakEven',
      action: calculateBreakEven
    };
    return dispatch(
      fetchRevenue(
        paramsObj,
        timeFrameBreakEven,
        types.FETCH_REVENUE_BREAK_EVEN_SUCCESS,
        setRevenueParams
      )
    );
  };
}

export function setRevenue({
  setRevenueActionType,
  revenueType,
  action
}: RevenueParams) {
  return (dispatch: Dispatch, getState: State) => {
    const revenue = calculateRevenueAllFamilyGroups(getState()[revenueType]);
    dispatch({ type: setRevenueActionType, revenue });
    action && dispatch(action());
  };
}
