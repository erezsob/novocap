import { SET_MONTHLY_COSTS } from '../common/ActionTypes';

const initialState = 0;

export default function monthlyCosts(state = initialState, action) {
  switch (action.type) {
    case SET_MONTHLY_COSTS: {
      return action.costs;
    }
    default: {
      return state;
    }
  }
}
