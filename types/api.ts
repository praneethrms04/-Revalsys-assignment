export interface ApiError {
  message: string;
  status: number;
}

export type ApiResponse<T> =
  | { data: T; error: null }
  | { data: null; error: ApiError };
