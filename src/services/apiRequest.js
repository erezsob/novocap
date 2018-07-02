// @flow
import { isOffline } from './../util/network';
import { LOCAL_STORAGE_JWT_TOKEN_KEY } from './../constants';

function handleServerResponse(response: Object) {
  if (response.ok) {
    const headers = response.headers;
    const JWT_TOKEN = headers.get('Authorization');
    localStorage.setItem(LOCAL_STORAGE_JWT_TOKEN_KEY, JWT_TOKEN);
    return response;
  } else {
    return Promise.reject(response);
  }
}

export default function apiRequest(
  endpoint: string,
  options: Object = { method: 'GET', body: undefined },
  mockdata: Object = {}
): Promise<any> {
  if (isOffline) {
    return Promise.resolve(mockdata);
  }
  const token: string = localStorage.getItem(LOCAL_STORAGE_JWT_TOKEN_KEY) || '';
  const { method, body } = options;
  return fetch(endpoint, {
    method,
    headers: {
      authorization: token,
      accept: 'application/json',
      'content-type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(handleServerResponse);
}
