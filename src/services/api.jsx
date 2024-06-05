import axios from 'axios';

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVU0VSX1NOIjoxLCJpYXQiOjE3MTc2MDY4ODEsImV4cCI6MTcxNzYwODY4MX0.0CVPKvU4C1aPf6g5Y7rXZ1ClSnSIci7FaPi4vGCu9cI`;

export const instance = axios.create({
  baseURL: `http://218.232.137.30:20080/api/`,
  timeout: 10000,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
