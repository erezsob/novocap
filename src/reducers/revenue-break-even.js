import { SET_REVENUE_BREAK_EVEN } from '../common/ActionTypes';

const initialState = {
  food: 0,
  drinks: 0,
  other: 0
};

export default function revenueBreakEven(state = initialState, action) {
  switch (action.type) {
    case SET_REVENUE_BREAK_EVEN: {
      return action.revenue;
    }
    default: {
      return state;
    }
  }
}
