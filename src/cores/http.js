import axios, { AxiosError } from 'axios';
import { useAuthStore } from '../features/auth/auth.store';

const http = axios.create();

export async function request(
  url,
  { method, body, headers } = { method: 'get', body: {}, headers: {} },
) {
  try {
    const res = await http({
      url,
      method,
      data: body,
      headers: {
        Accept: 'application/vnd.api+json',
        ...headers,
      },
    });

    return [res.data, null];
  } catch (err) {
    const status = err instanceof AxiosError ? err.response.status : null;

    const error = {
      status,
    };

    return [null, error];
  }
}

export function useRequest() {
  const authStore = useAuthStore();

  function httpRequest(url, { method, body } = { method: 'get', body: {} }) {
    return request(url, {
      method,
      body,
      headers: {
        ...(!authStore.loggedIn
          ? {}
          : { Authorization: `Bearer ${authStore.accessToken}` }),
      },
    });
  }

  return { request: httpRequest };
}
