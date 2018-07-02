// @flow
import { TOGGLE_NOTFICATION } from '../common/ActionTypes';

import type { Action } from './../common/ActionFlowTypes';
import type { Notification } from './../common/types';

const initialState: Notification = {
  isActive: false,
  type: undefined,
  message: ''
};

export default function notification(
  state: Notification = initialState,
  action: Action
) {
  switch (action.type) {
    case TOGGLE_NOTFICATION: {
      return { ...action.notification };
    }
    default: {
      return state;
    }
  }
}
