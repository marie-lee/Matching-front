import axios from 'axios';

export const API_BASE_URL = 'http://218.232.137.30:20080/api';

export const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60 * 1000,
});
