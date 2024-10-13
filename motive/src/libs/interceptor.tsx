// axiosInstance.ts
import axios from "axios";
import enviroment from "./enviroment";

const axiosInstance = axios.create({
  baseURL: enviroment.devApi,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem("token");

    if (token) {
      // If token exists, attach it to the Authorization header
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    if (!token) {
      window.location.href = "/login";
    }

    return config;
  },
  (error) => {
    // Handle the error before sending the request
    return Promise.reject(error);
  }
);

export default axiosInstance;
