import axios from "axios";
import * as SecureStore from 'expo-secure-store';
const axiosClient = axios.create({
  baseURL: 'https://learning-api.daominhtu.com/api/',
  paramsSerializer: {
    serialize: (params) => {
      return new URLSearchParams(params).toString();
    },
  },
});

axiosClient.interceptors.request.use(async (config) => {
  let token = await SecureStore.getItemAsync('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  // config.headers.Authorization = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vc2hhcmUuZGFvbWluaHR1LmNvbS9hcGkvdXNlcnMvYXV0aC9sb2dpbi9mYWNlYm9vay9jYWxsYmFjayIsImlhdCI6MTY4NjcyNzk0NiwiZXhwIjoxNjg3MDg3OTQ2LCJuYmYiOjE2ODY3Mjc5NDYsImp0aSI6IjlDNHk0ajNMMUxFQjIyS0QiLCJzdWIiOiIyIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.jEKionOM4BKhZ7zIO_s4-ERWH5Dcw4u7vKrbtgUTJf0`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // if (error.response.status && error.response.status === 401) {
    //   window.localStorage.removeItem("accessToken");
    // }
    throw error;
  }
);
export const sendGet = (url, params) => axiosClient.get(url, { params });
export const sendPost = (url, params, queryParams) =>
  axiosClient.post(url, params, { params: queryParams });
export const sendPut = (url, params) => axiosClient.put(url, params);
export const sendPatch = (url, params) => axiosClient.patch(url, params);
export const sendDelete = (url, params) => axiosClient.delete(url, params);
export default axiosClient;
