// @flow
import venues from '../../mockdata/venues.json';
import invoices from './../../mockdata/invoices.json';
import apiRequest from './apiRequest';
import getRevenueMockData from '../util/get-revenue-mockdata';
import {
  LOGIN_ENDPOINT,
  VENUES_ENDPOINT,
  REVENUE_ENDPOINT,
  INVOICE_ENDPOINT
} from './../common/endpoints';

export const loginService = (body: Object) =>
  apiRequest(LOGIN_ENDPOINT, { method: 'POST', body });

export const venuesService = () =>
  apiRequest(VENUES_ENDPOINT, undefined, venues);

export const revenueService = (
  venueId: string,
  queryParameters: string,
  timeFrame: string
) =>
  apiRequest(
    `${VENUES_ENDPOINT}/${venueId}/${REVENUE_ENDPOINT}?${queryParameters}`,
    undefined,
    getRevenueMockData(timeFrame)
  );

export const invoiceService = (
  venueId?: string = '',
  queryParameters: string
) =>
  apiRequest(
    `${VENUES_ENDPOINT}/${venueId}/${INVOICE_ENDPOINT}?${queryParameters}`,
    undefined,
    invoices
  );
