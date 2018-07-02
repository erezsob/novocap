import { SET_TIME_FRAME_DASHBOARD } from '../common/ActionTypes';
import { RANGES } from '../constants';

const initialState = RANGES.MONTHLY;

export default function timeFrameDashboard(state = initialState, action) {
  switch (action.type) {
    case SET_TIME_FRAME_DASHBOARD: {
      return action.timeFrame;
    }

    default: {
      return state;
    }
  }
}
