import $axios from "axios";
import { env } from "./env";

export const axios = $axios.create({
  baseURL: env.API_URL,
});

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers["x-api-key"] = env.API_KEY;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized errors here
    }
    return Promise.reject(error);
  }
);

export default axios;
