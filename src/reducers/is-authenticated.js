import { IS_AUTHENTICATED } from '../common/ActionTypes';

const initialState = false;

export default function isAuthenticated(state = initialState, action) {
  switch (action.type) {
    case IS_AUTHENTICATED: {
      return action.loggedIn;
    }
    default: {
      return state;
    }
  }
}
