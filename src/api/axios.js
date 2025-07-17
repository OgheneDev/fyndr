// lib/axiosInstance.js
import axios from "axios";
import { useAuthStore } from "@/store/authStore";
import { useUserStore } from "@/store/userStore";

const axiosInstance = axios.create({
  baseURL: "https://rheel-compare.onrender.com/api/",
  timeout: 1000000000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attach Token from useAuthStore
axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    console.log("Attaching Token:", token); // Debugging

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default axiosInstance;