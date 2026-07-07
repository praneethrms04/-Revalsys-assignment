import axios from "axios";
import { API } from "@/lib/constants";

export const apiClient = axios.create({
  baseURL: API.baseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 0;
      const message =
        error.response?.data?.message ??
        error.message ??
        "An unexpected error occurred";

      return Promise.reject({ message, status });
    }

    return Promise.reject({ message: "An unexpected error occurred", status: 0 });
  }
);
