import fetchMock from 'fetch-mock';
import 'jest-localstorage-mock';
import apiRequest from './apiRequest';
import * as network from './../util/network';
import { LOCAL_STORAGE_JWT_TOKEN_KEY as TOKEN_KEY } from './../constants';

const optionsGetRequest = {
  body: undefined,
  headers: {
    accept: 'application/json',
    'content-type': 'application/json'
  },
  method: 'GET'
};

describe('apiRequest()', () => {
  beforeEach(() => {
    fetchMock.restore();
  });

  afterEach(() => {
    jest.resetModules();
  });
  const dummyEndpoint = 'http://hello-world.co/dummy/endpoint';

  test('performs an http GET request given the right parameters ', done => {
    const method = 'GET';
    const body = { foo: 'bar' };
    const options = {
      ...optionsGetRequest,
      body: JSON.stringify(body)
    };

    fetchMock.mock(dummyEndpoint, { headers: { Authorization: 'token' } });
    apiRequest(dummyEndpoint, { method, body }).then(() => {
      expect(localStorage.setItem).toHaveBeenLastCalledWith(TOKEN_KEY, 'token');
      expect(localStorage.__STORE__[TOKEN_KEY]).toBe('token');
      expect(fetchMock.called(dummyEndpoint, method)).toBeTruthy();
      expect(fetchMock.lastOptions(dummyEndpoint, method)).toMatchObject(
        options
      );
      done();
    });
  });

  test('throws if response is not OK', done => {
    fetchMock.mock(dummyEndpoint, 401);
    apiRequest(dummyEndpoint)
      .then(x => x)
      .catch(response => {
        expect(response.ok).toBeFalsy();
        done();
      });
  });

  test('return mockdata if isOffline === true', done => {
    // IMPORTANT! make sure this test is the last in this file
    network.isOffline = jest.fn(() => true);

    apiRequest(dummyEndpoint, {}, { foo: 'bar' }).then(result => {
      expect(result).toEqual({
        foo: 'bar'
      });
      done();
    });
  });
});
