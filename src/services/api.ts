import { API_BASE_URL, API_PASSWORD, API_USER } from '@env';
import axios from 'axios';
import { encode } from 'base-64';

const token = encode(`${API_USER}:${API_PASSWORD}`);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'text/plain',
    Authorization: `Basic ${token}`,
  },
});

export default api;
