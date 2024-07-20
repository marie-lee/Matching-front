import axios from 'axios';

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVU0VSX1NOIjoxLCJpYXQiOjE3MTc2ODI3OTMsImV4cCI6MTcxNzY4NDU5M30.f2P8m5--CWY0KEkc5yAYfw3cL3fGutyvAJrssWqSUjk`;

export const instance = axios.create({
  baseURL: `http://218.232.137.30:20080/api/`,
  timeout: 10000,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
