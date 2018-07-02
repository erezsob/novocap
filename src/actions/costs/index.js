// @flow
import * as types from '../../common/ActionTypes';
import { calculateCostsPerTimeFrame } from './../../util/costs';
import { LOCAL_STORAGE_COSTS_KEY } from './../../constants';
import { calculateBreakEven } from '../break_even';
import { hideModal } from '../modal';

import type { Dispatch, State } from './../../common/types';

export function saveCostsFromModal({ costs }: { costs: number }) {
  return (dispatch: Dispatch) => {
    dispatch(hideModal());
    dispatch(saveCostsToLocalStorage(costs));
    dispatch(setCostsPerTimeFrame());
    dispatch(calculateBreakEven());
  };
}

export function saveCostsToLocalStorage(newCosts: number) {
  return (dispatch: Dispatch) => {
    const costs = parseInt(newCosts);
    if (costs) {
      window.localStorage.setItem(LOCAL_STORAGE_COSTS_KEY, costs);
      dispatch(setMonthlyCosts(costs));
    }
  };
}

export function getCostsFromLocalStorage() {
  return (dispatch: Dispatch) => {
    const costs = window.localStorage.getItem(LOCAL_STORAGE_COSTS_KEY) || 0;
    const costsNumber = parseInt(costs);
    dispatch(setMonthlyCosts(costsNumber));
  };
}

export function setMonthlyCosts(costs: number) {
  return (dispatch: Dispatch) => {
    dispatch({ type: types.SET_MONTHLY_COSTS, costs });
  };
}

export function setCostsPerTimeFrame() {
  return (dispatch: Dispatch, getState: State) => {
    const { monthlyCosts, timeFrameBreakEven } = getState();
    const costs =
      Math.round(
        calculateCostsPerTimeFrame(monthlyCosts, timeFrameBreakEven)
      ) || 0;
    dispatch({ type: types.SET_COSTS_PER_TIME_FRAME, costs });
  };
}
