import axios from 'axios';
import Cookies from 'js-cookie';

import { COOKIES } from './cookie.service';

export default class Request {
  constructor(token) {
    this.baseConfigs = {
      baseURL: this._getBaseUrl(),
      timeout: 10000,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token || Cookies.get(COOKIES.authToken)}`
      }
    };
  }

  _getBaseUrl() {
    if (process.env.NEXT_PUBLIC_HEROKU_PR_NUMBER) {
      return `https://greencare-api-pr-${process.env.NEXT_PUBLIC_HEROKU_PR_NUMBER}.herokuapp.com`;
    }

    return process.env.NEXT_PUBLIC_API_SERVER;
  }

  async delete(url) {
    return axios.delete(url, this.baseConfigs);
  }

  async get(url) {
    const { data } = await axios.get(url, this.baseConfigs).catch(({ response }) => response);

    return data;
  }

  async post(url, body = {}) {
    return axios.post(url, body, this.baseConfigs);
  }

  async patch(url, body = {}) {
    return axios.patch(url, body, this.baseConfigs);
  }

  async put(url, body = {}) {
    return axios.put(url, body, this.baseConfigs);
  }
}
