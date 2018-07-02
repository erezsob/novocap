import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import 'jest-localstorage-mock';
import { fetchVenues, fetchVenuesSuccess } from './';
import * as actionTypes from './../../common/ActionTypes';
import venue from '../../../mockdata/venues.json';
import { VENUES_ENDPOINT } from './../../common/endpoints';
import { LOCAL_STORAGE_VENUE_KEY } from './../../constants';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Test Venue Actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore();
  });

  describe('fetchVenue() --> fetches data from the API', () => {
    beforeEach(() => {
      fetchMock.restore();
    });

    test('unsuccessful request ', done => {
      fetchMock.mock('*', 500);

      store.dispatch(fetchVenues()).then(() => {
        const actions = store.getActions();

        expect(actions).toContainEqual({
          type: actionTypes.ERRORED,
          error: true
        });
        done();
      });
    });

    test('successful request', done => {
      fetchMock.mock(VENUES_ENDPOINT, [venue]);

      store.dispatch(fetchVenues()).then(() => {
        const actions = store.getActions();

        expect(fetchMock.called()).toBeTruthy();
        expect(actions[0]).toEqual({
          type: actionTypes.LOADING,
          loading: true
        });
        expect(actions[1]).toEqual({
          type: actionTypes.LOADING,
          loading: false
        });
        expect(actions[2]).toEqual({
          type: actionTypes.FETCH_VENUES_SUCCESS,
          venues: [venue]
        });
        expect(localStorage.setItem).toHaveBeenLastCalledWith(
          LOCAL_STORAGE_VENUE_KEY,
          JSON.stringify({
            id: venue.uuid,
            name: venue.name,
            currencyType: venue.currencyType
          })
        );
        done();
      });
    });
  });

  test('fetchVenueSuccess()', () => {
    store.dispatch(fetchVenuesSuccess([venue]));
    const actions = store.getActions();
    const expectedPayload = {
      type: actionTypes.FETCH_VENUES_SUCCESS,
      venues: [venue]
    };
    expect(actions[0]).toEqual({ type: actionTypes.LOADING, loading: false });
    expect(actions[1]).toEqual(expectedPayload);
  });
});
