import { SET_REVENUE_DASHBOARD } from '../common/ActionTypes';

const initialState = {
  food: 0,
  drinks: 0,
  other: 0
};

export default function revenueDashboard(state = initialState, action) {
  switch (action.type) {
    case SET_REVENUE_DASHBOARD: {
      return action.revenue;
    }
    default: {
      return state;
    }
  }
}
