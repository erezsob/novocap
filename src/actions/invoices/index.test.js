import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import queryString from 'query-string';
import { fetchInvoices, fetchInvoicesSuccess, updateInvoicesResult } from './';
import * as actionTypes from './../../common/ActionTypes';
import { INVOICE_ENDPOINT } from './../../common/endpoints';
import invoices from './../../../mockdata/invoices.json';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Test Invoice Actions', () => {
  describe('fetchInvoices()', () => {
    beforeEach(() => {
      fetchMock.restore();
    });

    test('unsuccessful request ', done => {
      fetchMock.mock('*', { status: 500 });
      const store = mockStore();
      store.dispatch(fetchInvoices()).then(() => {
        const actions = store.getActions();
        expect(actions).toContainEqual({
          type: actionTypes.ERRORED,
          error: true
        });
        done();
      });
    });

    test('successful request', done => {
      const store = mockStore();
      const paramsObj = { page: 3, size: 30 };

      fetchMock.mock(
        `end:${INVOICE_ENDPOINT}?${queryString.stringify(paramsObj)}`,
        invoices
      );

      store.dispatch(fetchInvoices(paramsObj)).then(() => {
        const actions = store.getActions();

        expect(actions[0]).toEqual({
          type: actionTypes.FETCHING_INVOICES
        });
        expect(actions[1]).toEqual({
          type: actionTypes.LOADING,
          loading: true
        });
        expect(actions[2]).toEqual({
          type: actionTypes.LOADING,
          loading: false
        });
        expect(fetchMock.called()).toBeTruthy();
        done();
      });
    });
  });

  test('fetchInvoicesSuccess()', () => {
    const store = mockStore({});
    store.dispatch(fetchInvoicesSuccess(invoices));
    const actions = store.getActions();
    const expectedPayload = {
      type: actionTypes.FETCH_INVOICES_SUCCESS,
      invoices
    };
    expect(actions[0]).toEqual({ type: actionTypes.LOADING, loading: false });
    expect(actions[1]).toEqual(expectedPayload);
  });

  test('updateInvoicesResult()', done => {
    const params = 'page=3&size=5';
    const store = mockStore();
    const endpoint = `end:${INVOICE_ENDPOINT}?${params}`;

    fetchMock.restore();
    fetchMock.mock(endpoint, {});

    store.dispatch(updateInvoicesResult({ search: `?${params}` }));
    const actions = store.getActions();

    expect(fetchMock.called(endpoint, 'get')).toBeTruthy();
    expect(actions[0]).toEqual({ type: actionTypes.FETCHING_INVOICES });
    expect(actions[1]).toEqual({
      type: actionTypes.LOADING,
      loading: true
    });

    done();
  });
});
