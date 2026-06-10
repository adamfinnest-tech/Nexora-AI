import axios from 'axios';

export let baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
// Ensure the base URL ends with /api
if (baseURL && !baseURL.endsWith('/api') && baseURL !== 'http://localhost:5000/api') {
  baseURL = `${baseURL.replace(/\/$/, '')}/api`;
}

const api = axios.create({
  baseURL,
});

// Add a request interceptor to add the auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
