import axios from 'axios';

export const API_BASE_URL = 'https://218.232.137.30.nip.io/api';

export const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60 * 1000,
});
