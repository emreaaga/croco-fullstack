"use client";

import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api",
  withCredentials: true,
});

function clearAuthCookies() {
  document.cookie = "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; SameSite=Lax";
  document.cookie = "refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; SameSite=Lax";
}

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const status = error.response?.status;

    if (status === 401) {
      try {
        const refresh = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, { withCredentials: true });

        if (refresh.status === 200) {
          return api(error.config);
        }
      } catch {
        clearAuthCookies();
        window.location.replace("/auth/login");
      }
    }

    return Promise.reject(error);
  },
);
