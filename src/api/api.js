import axios from "axios";

const baseURL = 'http://api-curso.test/api';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if(err.response && err.response.data.msg === 'Token is not valid'){
      console.log('Debe volver a loguearse');
    }
    return Promise.reject(err);
  }
)

export const setAuthToken = (token) => {
  if(token){
    api.defaults.headers.common['Authorization'] = 'Bearer'+token;
    localStorage.setItem('token', token);
  } else {
    delete api.defaults.headers.common['x-auth-token'];
    localStorage.removeItem('token');
  }
}

export default api;