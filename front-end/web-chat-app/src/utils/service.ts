/* eslint-disable prefer-promise-reject-errors */
import axios from 'axios';

import { API_URL } from './config';
import Helper from './Helper';

const service = axios.create({
  baseURL: 'http://localhost:8080/chatapp.api',
  timeout: 90000,
});

function refreshToken() {
  return service.post(`http://localhost:8080/chatapp.api/v1/authentication/refresh`, {
    refreshToken: `Bearer ${Helper.getAuthrefreshToken()}`,
  });
}

service.interceptors.request.use(
  (config) => {
    const authToken: any = Helper.getAuthToken();
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    
    return config;
  },
  (error) => {
    console.log(error);
    
    return Promise.reject(error);
  },
);

service.interceptors.response.use(
  (response) => {        
    return response;
  },

  async (error) => {
    console.log('error - ', error);
    const { code } = error.response.data;
    if (code === 400) {
      return refreshToken().then((rs) => {
        const { accessToken } = rs.data;
        Helper.storeAuthToken(accessToken);
        const config = error.config;
        config.baseURL = 'http://localhost:8080/chatapp.api';
        return service(config);
      });
    }
    return Promise.reject(error.response.data);
  },
);
export default service;
