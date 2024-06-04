import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://218.232.137.30:20080/api/',
  timeout: 1000,
  headers: { access_token: '???' },
});
