import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  toggleSidebar,
  hideSidebar,
  handleResize,
  showNotification,
  hideNotification
} from './';
import * as actionTypes from './../../common/ActionTypes';
import { NOTIFICATION } from './../../constants';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Test UI Actions', () => {
  test('toggleSidebar() --> toggles sidebar ', () => {
    const initialState = { isSidebarOpen: false };
    const store = mockStore(initialState);
    store.dispatch(toggleSidebar());
    const actions = store.getActions();
    const expectedPayload = {
      type: actionTypes.TOGGLE_SIDEBAR,
      open: true
    };
    expect(actions[0]).toEqual(expectedPayload);
  });

  test('hideSidebar() --> sets the sidebar visibility to false', () => {
    const store = mockStore();
    store.dispatch(hideSidebar());
    const actions = store.getActions();
    const expectedPayload = {
      type: actionTypes.HIDE_SIDEBAR
    };
    expect(actions[0]).toEqual(expectedPayload);
  });

  describe('handleResize()', () => {
    test('hides responsive sidebar if width >= 960px', () => {
      const store = mockStore(true);
      store.dispatch(handleResize(961));
      const actions = store.getActions();
      const expectedPayload = {
        type: actionTypes.HIDE_SIDEBAR
      };
      expect(actions[1]).toEqual(expectedPayload);
    });

    test('does not hide responsive sidebar if width < 960px', () => {
      const store = mockStore(true);
      store.dispatch(handleResize(959));
      const actions = store.getActions();
      expect(actions[1]).toBeUndefined();
    });
  });

  describe('Notifications', () => {
    test('showNotification()', () => {
      const store = mockStore({
        notification: {
          isActive: false,
          message: '',
          type: ''
        }
      });
      const message = 'ERROR! ERROR! ERROR! ERROR!';
      const type = NOTIFICATION.ERROR;
      store.dispatch(showNotification(message, type));
      const actions = store.getActions();
      const expectedPayload = {
        type: actionTypes.TOGGLE_NOTFICATION,
        notification: {
          isActive: true,
          message,
          type
        }
      };
      expect(actions[0]).toEqual(expectedPayload);
    });

    test('hideNotification()', () => {
      const store = mockStore({
        notification: {
          isActive: false,
          message: '',
          type: ''
        }
      });
      store.dispatch(hideNotification());
      const actions = store.getActions();
      const expectedPayload = {
        type: actionTypes.TOGGLE_NOTFICATION,
        notification: {
          isActive: false
        }
      };
      expect(actions[0]).toEqual(expectedPayload);
    });
  });
});
