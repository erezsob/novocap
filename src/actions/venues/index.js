// @flow
import * as types from './../../common/ActionTypes';
import { venuesService } from '../../services/services';
import { handleServerRequestError } from './../app';
import { LOCAL_STORAGE_VENUE_KEY } from './../../constants';

import type { Venues, Dispatch, SessionVenue } from './../../common/types';

export function fetchVenuesSuccess(venues: Venues) {
  return (dispatch: Dispatch) => {
    dispatch({ type: types.LOADING, loading: false });
    dispatch({
      type: types.FETCH_VENUES_SUCCESS,
      venues
    });
    const venue: SessionVenue = {
      id: venues[0].uuid,
      name: venues[0].name,
      currencyType: venues[0].currencyType
    };

    localStorage.setItem(LOCAL_STORAGE_VENUE_KEY, JSON.stringify(venue));
  };
}

export function fetchVenues() {
  return (dispatch: Dispatch) => {
    dispatch({ type: types.LOADING, loading: true });

    return venuesService()
      .then(response => response.json())
      .then(venues => dispatch(fetchVenuesSuccess(venues)))
      .catch(response => {
        dispatch(handleServerRequestError(response));
      });
  };
}
