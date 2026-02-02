import axios, { AxiosError } from 'axios';
import { useAuthStore } from '../features/auth/auth.store';

const http = axios.create();

function isJsonApiError(err) {
  if ((!err) instanceof AxiosError) {
    return false;
  }

  return !!err.response.data.jsonapi;
}

export async function request(
  url,
  { method, query, body, headers } = {
    method: 'get',
    query: {},
    body: {},
    headers: {},
  },
) {
  try {
    const res = await http({
      url,
      method,
      params: query,
      data: body,
      headers: {
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        ...headers,
      },
    });

    return [res.data, null];
  } catch (err) {
    const status = err instanceof AxiosError ? err.response.status : null;

    const error = {
      status,
      jsonapi: isJsonApiError(err),
      response: err.response,
    };

    return [null, error];
  }
}

export function useRequest() {
  const authStore = useAuthStore();

  function httpRequest(
    url,
    { method, body, query } = { method: 'get', body: {}, query: {} },
  ) {
    return request(url, {
      method,
      body,
      query,
      headers: {
        ...(!authStore.loggedIn
          ? {}
          : { Authorization: `Bearer ${authStore.accessToken}` }),
      },
    });
  }

  return { request: httpRequest };
}
