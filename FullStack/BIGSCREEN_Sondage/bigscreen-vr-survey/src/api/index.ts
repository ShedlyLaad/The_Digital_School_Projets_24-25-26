import axios from 'axios';

// Public axios instance (no auth)
export const publicAxios = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Admin axios instance (adds auth token)
export const adminAxios = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token for admin requests
adminAxios.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('bigscreen_admin_token');
    if (token && token !== 'undefined' && token.trim() !== '') {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      if (config.headers) delete config.headers.Authorization;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle auth errors
adminAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      sessionStorage.removeItem('bigscreen_admin_token');
      delete adminAxios.defaults.headers.common['Authorization'];
      // Redirect to admin login page
      if (typeof window !== 'undefined') {
        window.location.href = '/administration';
      }
    }
    return Promise.reject(error);
  }
);
