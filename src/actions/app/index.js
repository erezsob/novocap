// @flow
import { fetchRevenueDashboard } from '../revenue';
import { getCostsFromLocalStorage, setCostsPerTimeFrame } from './../costs';
import { logout } from './../authentication';
import { showNotification } from './../ui';
import log from './../../logger';
import { REVENUE_FILTERS, NOTIFICATION } from './../../constants';
import * as types from '../../common/ActionTypes';

import type { Dispatch, State } from './../../common/types';

export function initDashboard() {
  return (dispatch: Dispatch, getState: State) => {
    const timeFrame = getState().timeFrameDashboard;
    dispatch({ type: types.INIT_DASHBOARD });
    dispatch(getCostsFromLocalStorage());
    dispatch(setCostsPerTimeFrame());
    dispatch(
      fetchRevenueDashboard({
        ...REVENUE_FILTERS[timeFrame],
        periodType: timeFrame
      })
    );
  };
}

export function setTimeFrameDashboard(timeFrame: string) {
  return (dispatch: Dispatch) => {
    dispatch({ type: types.SET_TIME_FRAME_DASHBOARD, timeFrame });
    dispatch(
      fetchRevenueDashboard({
        ...REVENUE_FILTERS[timeFrame],
        periodType: timeFrame
      })
    );
    dispatch(setCostsPerTimeFrame());
  };
}

export function handleServerRequestError(response: Object) {
  return (dispatch: Dispatch) => {
    const { status } = response;
    log('Oooops something went wrong!');
    dispatch({ type: types.LOADING, loading: false });
    dispatch({ type: types.ERRORED, error: true });

    if (status === 400 || status === 401 || status === 403) {
      dispatch({ type: types.CREDENTIALS_EXPIRED, value: true });
      dispatch(logout());
      dispatch(
        showNotification(
          'Session expired! Please login...',
          NOTIFICATION.WARNING
        )
      );
    }
  };
}
