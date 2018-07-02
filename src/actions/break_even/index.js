// @flow
import * as types from '../../common/ActionTypes';

import type { Dispatch, State } from './../../common/types';

export function calculateBreakEven() {
  return (dispatch: Dispatch, getState: State) => {
    dispatch({ type: types.CALCULATE_BREAK_EVEN });
    const {
      costsPerTimeFrame,
      revenueBreakEven: { food, drinks, other }
    } = getState();
    const totalRevenue: number = food + drinks + other;
    const percent: number = costsPerTimeFrame
      ? Math.round(totalRevenue / costsPerTimeFrame * 100)
      : 0;
    dispatch({
      type: types.SET_BREAK_EVEN,
      percent
    });
  };
}
