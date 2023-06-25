import axios from "axios";
import constant from ".";

import { toast } from 'react-toastify'

const instance = axios.create({
  baseURL: constant.apiURL,
});

const requestInterceptor = instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

const responseInterceptor = instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401 || error.response.status === 403) {
      toast.error(error)
      return Promise.reject(error);
    } else {
      return Promise.reject(error?.response);
    }
  }
);

axios.interceptors.request.eject(requestInterceptor);
axios.interceptors.response.eject(responseInterceptor);

export default instance;
