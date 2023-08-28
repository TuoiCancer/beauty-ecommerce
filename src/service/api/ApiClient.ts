import { AxiosRequestConfig } from 'axios';

// eslint-disable-next-line import/no-named-as-default
import configApi from './client';

export class ApiService {
  config: AxiosRequestConfig = {};

  private controller = new AbortController();

  static createInstance(): ApiService {
    const activeInstance = new ApiService();

    activeInstance.controller = new AbortController();

    return activeInstance;
  }

  cancelRequest() {
    this.controller.abort();
  }

  login = configApi({
    path: 'v1/auth/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  logout = configApi({
    path: 'v1/auth/logout',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  signup = configApi({
    path: 'v1/auth/signup',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
