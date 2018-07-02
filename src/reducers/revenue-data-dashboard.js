import { FETCH_REVENUE_DASHBOARD_SUCCESS } from '../common/ActionTypes';

const initialState = { food: [], drinks: [], other: [] };

export default function revenueDataDashboard(state = initialState, action) {
  switch (action.type) {
    case FETCH_REVENUE_DASHBOARD_SUCCESS: {
      return action.revenue;
    }

    default: {
      return state;
    }
  }
}
