import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import 'jest-localstorage-mock';
import * as actionTypes from './../../common/ActionTypes';
import {
  login,
  logout,
  denyAccess,
  allowAccess,
  checkIfLoggedIn,
  cleanErrorMessages
} from './';
import { STAGING_PREFIX } from './../../common/endpoints';
import {
  LOCAL_STORAGE_JWT_TOKEN_KEY as TOKEN_KEY,
  LOCAL_STORAGE_VENUE_KEY as VENUE_KEY
} from './../../constants';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore();

describe('actions/authentication', () => {
  beforeEach(() => {
    fetchMock.restore();
  });

  describe('login()', () => {
    it('clears previous error messages', done => {
      fetchMock.mock(`begin:${STAGING_PREFIX}`, {});

      store.dispatch(login()).then(() => {
        const actions = store.getActions();
        expect(actions).toContainEqual({
          type: actionTypes.WRONG_CREDENTIALS,
          value: false
        });
        expect(actions).toContainEqual({
          type: actionTypes.CREDENTIALS_EXPIRED,
          value: false
        });
        done();
      });
    });

    test('SUCCESSFUL request', done => {
      fetchMock.mock(`begin:${STAGING_PREFIX}`, {});
      store.dispatch(login({})).then(() => {
        const actions = store.getActions();
        expect(actions).toContainEqual({
          type: actionTypes.IS_AUTHENTICATED,
          loggedIn: true
        });
        done();
      });
    });

    test('UNSUCCESSFUL request', done => {
      fetchMock.mock(`begin:${STAGING_PREFIX}`, { status: 401 });
      store.dispatch(login({})).then(() => {
        const actions = store.getActions();
        expect(actions).toContainEqual({
          type: actionTypes.WRONG_CREDENTIALS,
          value: true
        });
        expect(actions).toContainEqual({
          type: actionTypes.TOGGLE_NOTFICATION,
          notification: {
            isActive: true,
            type: 'ERROR',
            message: 'Wrong credentials!'
          }
        });
        done();
      });
    });
  });

  test('logout()', () => {
    store.dispatch(logout());
    const actions = store.getActions();
    expect(localStorage.removeItem).toHaveBeenCalledWith(TOKEN_KEY);
    expect(localStorage.removeItem).toHaveBeenCalledWith(VENUE_KEY);
    expect(actions).toContainEqual({
      type: actionTypes.WRONG_CREDENTIALS,
      value: false
    });
    expect(actions).toContainEqual({
      type: actionTypes.IS_AUTHENTICATED,
      loggedIn: false
    });
  });

  test('allowAccess()', () => {
    store.dispatch(allowAccess());
    const actions = store.getActions();

    expect(actions).toContainEqual({
      type: actionTypes.IS_AUTHENTICATED,
      loggedIn: true
    });
  });

  test('denyAccess()', () => {
    store.dispatch(denyAccess());
    const actions = store.getActions();

    expect(actions).toContainEqual({
      type: actionTypes.WRONG_CREDENTIALS,
      value: true
    });
  });

  test('cleanErrorMessages()', () => {
    store.dispatch(cleanErrorMessages());
    const actions = store.getActions();

    expect(actions).toContainEqual({
      type: actionTypes.WRONG_CREDENTIALS,
      value: false
    });
    expect(actions).toContainEqual({
      type: actionTypes.CREDENTIALS_EXPIRED,
      value: false
    });
  });

  describe('checkIfLoggedIn()', () => {
    it('checks the localStorage for the token', () => {
      expect(localStorage.getItem).toHaveBeenLastCalledWith(TOKEN_KEY);
    });

    test('Logged in', done => {
      fetchMock.mock(`begin:${STAGING_PREFIX}`, {});
      store.dispatch(login()).then(() => {
        store.dispatch(checkIfLoggedIn());
        const actions = store.getActions();

        expect(actions).toContainEqual({
          type: actionTypes.IS_AUTHENTICATED,
          loggedIn: true
        });
        done();
      });
    });

    test('NOT Logged in', () => {
      store.dispatch(checkIfLoggedIn());
      const actions = store.getActions();

      expect(actions).toContainEqual({
        type: actionTypes.IS_AUTHENTICATED,
        loggedIn: false
      });
    });
  });
});
