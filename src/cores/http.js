import axios, { AxiosError } from 'axios';

const http = axios.create();

export async function request(url, { method, body } = { method: 'get', body }) {
  try {
    const res = await http({
      url,
      method,
      data: body,
      headers: {
        Accept: 'application/vnd.api+json',
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
