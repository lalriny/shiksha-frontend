import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/* ===============================
   REQUEST INTERCEPTOR
================================ */
api.interceptors.request.use(
  (config) => {
    const access = localStorage.getItem("access");

    if (access) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${access}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ===============================
   RESPONSE INTERCEPTOR
================================ */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 🔒 Handle expired access token
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refresh = localStorage.getItem("refresh");
      if (!refresh) {
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        const refreshResponse = await axios.post(
          `${import.meta.env.VITE_API_URL}/token/refresh/`,
          { refresh }
        );

        const newAccess = refreshResponse.data.access;

        localStorage.setItem("access", newAccess);

        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
