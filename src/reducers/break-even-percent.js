import { SET_BREAK_EVEN } from '../common/ActionTypes';

const initialState = 0;

export default function breakEvenPercent(state = initialState, action) {
  switch (action.type) {
    case SET_BREAK_EVEN: {
      return action.percent;
    }
    default: {
      return state;
    }
  }
}
