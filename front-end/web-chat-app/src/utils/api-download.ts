/* eslint-disable prefer-promise-reject-errors */
import axios from 'axios';

import { API_URL } from './config';
import Helper from './Helper';

const downloadService = axios.create({
  baseURL: API_URL,
  timeout: 30000,
});

downloadService.interceptors.request.use(
  (config) => {
    const authToken: any = Helper.getAuthToken();
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
      config.responseType = 'arraybuffer';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

downloadService.interceptors.response.use(
  (response) => {
    const enc = new TextDecoder('utf-8');
    const arr = new Uint8Array(response.data);
    const decFile = enc.decode(arr);

    const a = document.createElement('a');

    const url = `${Helper.renderFile(decFile)}`;

    document.body.appendChild(a);
    a.href = url;
    console.log('response.headers', response.headers);

    console.log(
      'content-disposition',
      response.headers['content-disposition']?.split('filename=')?.[1] || '',
    );
    a.download = response.headers['content-disposition']?.split('filename=')?.[1] || '';
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    return response.data;
  },

  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  },
);
export { downloadService };
