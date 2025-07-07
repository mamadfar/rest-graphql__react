import axios from "axios";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

axios.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (err) => {
    console.error("Request error:", err);
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (err) => {
    console.error("Response error:", err);
    return Promise.reject(err);
  }
);

export const axiosInstance = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
};
