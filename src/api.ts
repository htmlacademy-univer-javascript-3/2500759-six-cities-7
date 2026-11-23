import axios from 'axios';
import type { AxiosError } from 'axios';

export const api = axios.create({
  baseURL: 'https://14.design.htmlacademy.pro/six-cities',
  timeout: 5000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['X-Token'] = token;
    }
    return config;
  }
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);
