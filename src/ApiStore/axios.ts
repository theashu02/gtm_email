import axios, { type AxiosInstance, type AxiosError, type InternalAxiosRequestConfig } from "axios";

function getUserToken(): string | null {
  return localStorage.getItem("token");
}

const apiClient: AxiosInstance = axios.create({
  // baseURL: "https://gtmvantage.com/api/gtm-plan",
  baseURL: "http://localhost:5000/api/gtm-plan",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getUserToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default apiClient;
