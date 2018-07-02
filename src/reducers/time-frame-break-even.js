import { SET_TIME_FRAME_BREAK_EVEN } from '../common/ActionTypes';
import { RANGES } from '../constants';

const initialState = RANGES.MONTHLY;

export default function timeFrameBreakEven(state = initialState, action) {
  switch (action.type) {
    case SET_TIME_FRAME_BREAK_EVEN: {
      return action.timeFrame;
    }
    default: {
      return state;
    }
  }
}
