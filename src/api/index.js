import axios from 'axios';
import {getFromStorage} from '../libs/storage';

// const BASE_URL="https://hajiri.ibis.com.np/api/v1"
const BASE_URL = 'http://192.168.18.88:8002/api/v1';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.response.use(
  response => {
    console.info(
      `NETWORK RESPONSE: ${response.config.method.toUpperCase()}: ${
        response.config.url
      }\n`,
      response.data,
    );
    return response;
  },
  error => {
    console.error(
      `NETWORK ERROR ${
        error.response.config.status
      }: ${error.response.config.method.toUpperCase()}: ${
        error.response.config.url
      }\n`,
      error.response.data,
    );
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.request.use(
  async config => {
    const user = await getFromStorage('user');
    if (user) {
      config.headers.Authorization = `Bearer ${user.access}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export function login(credentials) {
  return axiosInstance.post('/login/student', credentials);
}

export function getMe() {
  return axiosInstance.get('/user/me');
}

export function sendDeviceId(data) {
  return axiosInstance.post('/mobile', data);
}

export function getMyActivity(query = null) {
  return () => axiosInstance.get(`/report/attendance/me${query || ''}`);
}

export default axiosInstance;