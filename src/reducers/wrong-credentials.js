import { WRONG_CREDENTIALS } from '../common/ActionTypes';

const initialState = false;

export default function wrongCredentials(state = initialState, action) {
  switch (action.type) {
    case WRONG_CREDENTIALS: {
      return action.value;
    }
    default: {
      return state;
    }
  }
}
