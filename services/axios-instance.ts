import axios from "axios";
import { API } from "@/lib/constants";
import { ApiError } from "@/types";

export const apiClient = axios.create({
  baseURL: API.baseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 0;
      const message =
        error.response?.data && typeof error.response.data === "object" && "message" in error.response.data
          ? String(error.response.data.message)
          : error.message;
      return Promise.reject(new ApiError(message, status, error));
    }

    if (error instanceof Error) {
      return Promise.reject(new ApiError(error.message, 0, error));
    }

    return Promise.reject(new ApiError("An unexpected error occurred", 0, error));
  }
);
