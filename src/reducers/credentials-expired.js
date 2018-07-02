import { CREDENTIALS_EXPIRED } from '../common/ActionTypes';

const initialState = false;

export default function credentialsExpired(state = initialState, action) {
  switch (action.type) {
    case CREDENTIALS_EXPIRED: {
      return action.value;
    }
    default: {
      return state;
    }
  }
}
