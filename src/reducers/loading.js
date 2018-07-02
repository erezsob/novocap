import { LOADING } from '../common/ActionTypes';

const initialState = false;

export default function loading(state = initialState, action) {
  switch (action.type) {
    case LOADING: {
      return action.loading;
    }
    default: {
      return state;
    }
  }
}
