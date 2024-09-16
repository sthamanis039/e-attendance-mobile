import axios from 'axios';
import {getFromStorage} from '../libs/storage';
import queryGenerator from '../utils/queryGenerator';

const BASE_URL = 'https://hajiri.ibis.com.np/api/v1';
// const BASE_URL = 'http://192.168.18.88:8002/api/v1';

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
        error.response.status
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

export function loginStaff(credentials) {
  return axiosInstance.post('/login', credentials);
}

export function getMe() {
  return axiosInstance.get('/user/me');
}

export function sendDeviceId(data) {
  return axiosInstance.post('/mobile', data);
}

export function getMyActivity(query = null, transform = null) {
  return ({pageParam}) =>
    axiosInstance
      .get(
        `/report/attendance/me${
          queryGenerator({
            ...query,
            page: pageParam ? pageParam + 1 : query?.page,
          }) || ''
        }`,
      )
      .then(res => (transform ? transform(res) : res))
      .catch(err => {
        throw err;
      });
}
export function getActivityById(id, query = null, transform = null) {
  return ({pageParam}) =>
    axiosInstance
      .get(
        `/report/attendance/${id}/individual${
          queryGenerator({
            ...query,
            page: pageParam ? pageParam + 1 : query?.page,
          }) || ''
        }`,
      )
      .then(res => (transform ? transform(res) : res))
      .catch(err => {
        throw err;
      });
}

// profile/student?class=id

export function getStudents(query = null, transform = null) {
  return ({pageParam}) =>
    axiosInstance
      .get(
        `/profile/student${
          queryGenerator({
            ...query,
            page: pageParam ? pageParam + 1 : query?.page,
          }) || ''
        }`,
      )
      .then(res => (transform ? transform(res) : res))
      .catch(err => {
        throw err;
      });
}

export default axiosInstance;
