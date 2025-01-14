import type { AxiosRequestConfig } from "axios";

export interface RequestOptions {
  // 是否携带 token
  withToken?: boolean;
  // 其他自定义选项...
  retryCount?: number;
}

export interface CreateAxiosOptions extends AxiosRequestConfig {
  requestOptions?: RequestOptions;
}

export interface RequestConfig extends AxiosRequestConfig {
  requestOptions?: RequestOptions;
}

export interface Response<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  accessToken?: string;
  refreshToken?: string;
}
