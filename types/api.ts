import type { AxiosError } from "axios";

export class ApiError extends Error {
  status: number;
  originalError: unknown;

  constructor(message: string, status: number, originalError?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.originalError = originalError;
  }
}

export type ApiResponse<T> =
  | { data: T; error: null }
  | { data: null; error: ApiError };

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}
