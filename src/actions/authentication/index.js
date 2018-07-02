// @flow
import * as types from '../../common/ActionTypes';
import {
  LOCAL_STORAGE_JWT_TOKEN_KEY,
  LOCAL_STORAGE_VENUE_KEY,
  NOTIFICATION
} from './../../constants';
import { loginService } from './../../services/services';
import { fetchVenues } from './../venues';
import { showNotification, hideNotification } from './../ui';

import type { Dispatch, Credentials } from './../../common/types';

export function login(credentials: Credentials) {
  return (dispatch: Dispatch) => {
    dispatch(cleanErrorMessages());
    return loginService(credentials)
      .then(() => dispatch(fetchVenues()))
      .then(() => dispatch(allowAccess()))
      .catch(() => dispatch(denyAccess()));
  };
}

export function logout() {
  localStorage.removeItem(LOCAL_STORAGE_JWT_TOKEN_KEY);
  localStorage.removeItem(LOCAL_STORAGE_VENUE_KEY);
  return (dispatch: Dispatch) => {
    dispatch({ type: types.IS_AUTHENTICATED, loggedIn: false });
  };
}

export function cleanErrorMessages() {
  return (dispatch: Dispatch) => {
    dispatch({ type: types.WRONG_CREDENTIALS, value: false });
    dispatch({ type: types.CREDENTIALS_EXPIRED, value: false });
    dispatch(hideNotification());
  };
}

export function allowAccess() {
  return (dispatch: Dispatch) => {
    dispatch({ type: types.IS_AUTHENTICATED, loggedIn: true });
  };
}

export function denyAccess() {
  return (dispatch: Dispatch) => {
    dispatch({ type: types.WRONG_CREDENTIALS, value: true });
    dispatch(showNotification('Wrong credentials!', NOTIFICATION.ERROR));
  };
}

export function checkIfLoggedIn() {
  const token = localStorage.getItem(LOCAL_STORAGE_JWT_TOKEN_KEY);
  return (dispatch: Dispatch) => {
    dispatch({ type: types.IS_AUTHENTICATED, loggedIn: !!token });
  };
}
