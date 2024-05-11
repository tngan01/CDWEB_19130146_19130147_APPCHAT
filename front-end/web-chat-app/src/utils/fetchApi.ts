/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Helper from './Helper';
import { API_URL } from './config';

const authToken: any = Helper.getAuthToken();
const headers = {
  'Content-Type': 'text/plain',
  ...(authToken && { Authorization: `Bearer ${Helper.getAuthToken()}` }),
};
const fetchApi = (url) => {
    return fetch(`http://localhost:8080/${url}`, {
      // method: 'GET',
      headers,
      // body,
    }).then((response) => response.json());
  };

  // put: (url, body) => {
  //   return fetch(`http://localhost:8080/chatapp.api'/${url}`, {
  //     method: 'put',
  //     headers,
  //     body,
  //   }).then((response) => response.json());
  // },


export default fetchApi;
