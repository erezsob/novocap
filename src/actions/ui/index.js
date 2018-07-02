// @flow
import * as types from '../../common/ActionTypes';

import type { Dispatch, State, NotificationType } from './../../common/types';

export function toggleSidebar() {
  return (dispatch: Dispatch, getState: State) => {
    dispatch({
      type: types.TOGGLE_SIDEBAR,
      open: !getState().isSidebarOpen
    });
  };
}

export function hideSidebar() {
  return (dispatch: Dispatch) => {
    dispatch({
      type: types.HIDE_SIDEBAR
    });
  };
}

export function handleResize(windowWidth: number) {
  return (dispatch: Dispatch, getState: State) => {
    dispatch({ type: types.HANDLE_RESIZE });
    if (windowWidth >= 960 && !getState().isResponsiveSidebarOpen) {
      dispatch(hideSidebar());
    }
  };
}

export function showNotification(message: string, type: NotificationType) {
  return (dispatch: Dispatch) => {
    dispatch({
      type: types.TOGGLE_NOTFICATION,
      notification: {
        isActive: true,
        type,
        message
      }
    });
  };
}

export function hideNotification() {
  return (dispatch: Dispatch) => {
    dispatch({
      type: types.TOGGLE_NOTFICATION,
      notification: {
        isActive: false
      }
    });
  };
}
