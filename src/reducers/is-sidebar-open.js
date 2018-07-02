import { TOGGLE_SIDEBAR, HIDE_SIDEBAR } from '../common/ActionTypes';

const initialState = false;

export default function isSidebarOpen(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SIDEBAR: {
      return action.open;
    }
    case HIDE_SIDEBAR: {
      return false;
    }
    default: {
      return state;
    }
  }
}
