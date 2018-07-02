// @flow
import * as types from '../../common/ActionTypes';

import type { Dispatch, ModalConfig } from './../../common/types';

export function showModal(modalConfig: ModalConfig) {
  return (dispatch: Dispatch) => {
    dispatch({
      type: types.SHOW_MODAL,
      open: true,
      modalConfig
    });
  };
}

export function hideModal() {
  return (dispatch: Dispatch) => {
    dispatch({
      type: types.HIDE_MODAL,
      open: false
    });
  };
}
