import { API_BASE_URL, API_PASSWORD, API_USER } from '@env';
import axios from 'axios';
import { encode } from 'base-64';

const encodedCredentials = encode(`${API_USER}:${API_PASSWORD}`);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'text/plain',
    Authorization: `Basic ${encodedCredentials}`,
  },
});

export default api;
