// @flow
import queryString from 'query-string';
import * as types from '../../common/ActionTypes';
import { invoiceService } from '../../services/services';
import { handleServerRequestError } from './../app';
import { getVenueFromStorage } from './../../util/venue';

import type { Location } from 'react-router-dom';
import type {
  Invoices,
  Dispatch,
  FetchInvoicesParams,
  SessionVenue
} from './../../common/types';

export function fetchInvoicesSuccess(invoices: Invoices) {
  return (dispatch: Dispatch) => {
    dispatch({ type: types.LOADING, loading: false });
    dispatch({
      type: types.FETCH_INVOICES_SUCCESS,
      invoices
    });
  };
}

export function fetchInvoices(paramsObj: FetchInvoicesParams = {}) {
  return (dispatch: Dispatch) => {
    dispatch({ type: types.FETCHING_INVOICES });
    dispatch({ type: types.LOADING, loading: true });

    const venue: SessionVenue = getVenueFromStorage();

    const stringParameters = queryString.stringify(paramsObj);
    return invoiceService(venue.id, stringParameters)
      .then(response => response.json())
      .then(invoices => dispatch(fetchInvoicesSuccess(invoices)))
      .catch(response => dispatch(handleServerRequestError(response)));
  };
}

export function updateInvoicesResult(location: Location) {
  const queryParams = queryString.parse(location.search);
  const { page, size } = queryParams;
  return (dispatch: Dispatch) => {
    dispatch(fetchInvoices({ page, size }));
  };
}
