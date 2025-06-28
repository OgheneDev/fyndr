import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://rheel-compare.onrender.com/api/", // API base URL
    timeout: 1000000000, // 1 hour timeout
    headers: {
        "Content-Type": "application/json",
    },
});

// Request Interceptor: Attach Token to Every Request
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken"); // Check both storages

        console.log("Attaching Token:", token); // Debugging

        if (token) {
            config.headers.Authorization = token; // No "Bearer"
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance