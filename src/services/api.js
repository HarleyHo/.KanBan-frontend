import axios from "axios";

axios.interceptors.request.use(
  (config) => {
    if (!config.url.startsWith("/auth/")) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = token;
      } else {
        alert("Please Login");
        return Promise.reject("Please Login");
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const instance = axios.create({
  baseURL: 'http://localhost:8080/',
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 10000,
});

export default instance;
