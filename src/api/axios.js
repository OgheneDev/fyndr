import axios from "axios";
import { useAuthStore } from "@/store/authStore";
import { useUserStore } from "@/store/userStore";

const axiosInstance = axios.create({
  baseURL: "https://rheel-compare.onrender.com/api",
  timeout: 1000000000,
  headers: {
    "Content-Type": "application/json", 
  },
});

// helper: sync read from persisted zustand key
function getTokenFromLocalStorage() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("auth-storage");
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    // zustand persist may wrap state under `state` or store root
    return parsed?.state?.token ?? parsed?.token ?? null;
  } catch (e) {
    return null;
  }
}

// Request Interceptor: Attach Token from useAuthStore or fallback to storage
axiosInstance.interceptors.request.use(
  (config) => {
    // prefer in-memory token (rehydated), fallback to localStorage if not present
    let token = useAuthStore.getState().token;
    if (!token) {
      token = getTokenFromLocalStorage();
    }
    // Debugging (remove in production)
    console.debug("Attaching Token:", !!token);

    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle 401 Unauthorized (be defensive)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if (status === 401 && typeof window !== "undefined") {
      // double-check there's a persisted token before forcing logout/redirect
      const persistedToken = useAuthStore.getState().token ?? getTokenFromLocalStorage();
      if (persistedToken) {
        useAuthStore.getState().logout();
        useUserStore.getState().setUserType(null);
        useUserStore.getState().setUserData(null);
        useUserStore.getState().setProfile(null);
        // only redirect if not already on login
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
      } else {
        // no token found — don't force redirect (could be unauth endpoint)
        console.debug("401 received but no token persisted; skipping forced logout.");
      }
    }
    return Promise.reject(error);
  }
);


export default axiosInstance;