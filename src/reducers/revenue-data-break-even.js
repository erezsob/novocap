import { FETCH_REVENUE_BREAK_EVEN_SUCCESS } from '../common/ActionTypes';

const initialState = { food: [], drinks: [], other: [] };

export default function revenueDataBreakEven(state = initialState, action) {
  switch (action.type) {
    case FETCH_REVENUE_BREAK_EVEN_SUCCESS: {
      return action.revenue;
    }

    default: {
      return state;
    }
  }
}
