import axios from 'axios';

/*const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});*/

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// 🔐 attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const setupInterceptors = (logout) => {
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        logout(); // auto logout
        window.location.href = '/';
      }
      return Promise.reject(error);
    }
  );
};

export default api;
