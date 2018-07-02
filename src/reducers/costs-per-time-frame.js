import { SET_COSTS_PER_TIME_FRAME } from '../common/ActionTypes';

const initialState = 0;

export default function costsPerTimeFrame(state = initialState, action) {
  switch (action.type) {
    case SET_COSTS_PER_TIME_FRAME: {
      return action.costs;
    }
    default: {
      return state;
    }
  }
}
