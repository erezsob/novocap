import { ERRORED } from '../common/ActionTypes';

const initialState = false;

export default function error(state = initialState, action) {
  switch (action.type) {
    case ERRORED: {
      return action.error;
    }
    default: {
      return state;
    }
  }
}
