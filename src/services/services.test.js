import fetchMock from 'fetch-mock';
import {
  loginService,
  revenueService,
  venuesService,
  invoiceService
} from './services';
import {
  LOGIN_ENDPOINT,
  VENUES_ENDPOINT,
  REVENUE_ENDPOINT,
  INVOICE_ENDPOINT
} from './../common/endpoints';

const optionsGetRequest = {
  body: undefined,
  headers: {
    accept: 'application/json',
    'content-type': 'application/json'
  },
  method: 'GET'
};

describe('service/revenue-api', () => {
  beforeEach(() => {
    fetchMock.restore();
  });

  describe('Services', () => {
    test('loginService()', done => {
      fetchMock.mock(LOGIN_ENDPOINT, {});
      loginService({ username: 'foo', password: 'bar' }).then(() => {
        expect(fetchMock.called(LOGIN_ENDPOINT, 'post')).toBeTruthy();
        expect(fetchMock.lastOptions(LOGIN_ENDPOINT, 'post')).toMatchObject({
          body: JSON.stringify({ username: 'foo', password: 'bar' }),
          headers: {
            accept: 'application/json',
            'content-type': 'application/json'
          },
          method: 'POST'
        });
        done();
      });
    });

    test('venueService()', done => {
      fetchMock.mock(VENUES_ENDPOINT, {});
      venuesService().then(() => {
        expect(fetchMock.called(VENUES_ENDPOINT, 'get')).toBeTruthy();
        expect(fetchMock.lastOptions(VENUES_ENDPOINT, 'get')).toMatchObject(
          optionsGetRequest
        );
        done();
      });
    });

    test('revenueService()', done => {
      const queryParameters = 'foo=1&bar=2';
      const endpoint = `end:${REVENUE_ENDPOINT}?${queryParameters}`;

      fetchMock.mock(endpoint, {});
      revenueService('venueId', queryParameters).then(() => {
        expect(fetchMock.called(endpoint, 'get')).toBeTruthy();
        expect(fetchMock.lastOptions(endpoint, 'get')).toMatchObject(
          optionsGetRequest
        );
        done();
      });
    });

    test('invoiceService()', done => {
      const queryParameters = 'page=1&size=99';
      const endpoint = `end:${INVOICE_ENDPOINT}?${queryParameters}`;

      fetchMock.mock(endpoint, {});
      invoiceService('venueId', queryParameters).then(() => {
        expect(fetchMock.called(endpoint, 'get')).toBeTruthy();
        expect(fetchMock.lastOptions(endpoint, 'get')).toMatchObject(
          optionsGetRequest
        );
        done();
      });
    });
  });
});
