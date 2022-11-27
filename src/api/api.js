import axios from "axios";

const baseURL = 'http://api-curso.test/api';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.authorization = 'Bearer '+token;
    }
    return config;
  }
);

export const setAuthToken = (token) => {
  if(token){
    api.defaults.headers.authorization = 'Bearer'+token;
    localStorage.setItem('token', token);
  } else {
    delete api.defaults.headers.common['x-auth-token'];
    localStorage.removeItem('token');
  }
}

export default api;