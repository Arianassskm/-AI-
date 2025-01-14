import axios, { AxiosInstance } from "axios";
import { CreateAxiosOptions, RequestConfig } from "../types/axios";
import { getValue } from "../hooks/useLocalStorage";

class RequestHttp {
  private instance: AxiosInstance;
  private readonly options: CreateAxiosOptions;

  constructor(options: CreateAxiosOptions) {
    this.options = options;
    this.instance = axios.create(options);
    this.setupInterceptors();
  }

  private setupInterceptors() {
    // 请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        const token = getValue("accessToken");
        const requestOptions = (config as RequestConfig).requestOptions;

        console.log("token: ", token);
        // 根据配置决定是否添加 token
        if (token && requestOptions?.withToken !== false) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response) => {
        return response.data;
      },
      async (error) => {
        const { response } = error;
        if (response?.status === 401) {
          // token 过期，尝试刷新
          const refreshToken = getValue("refreshToken");
          if (refreshToken) {
            try {
              const result = await this.refreshToken(refreshToken);
              localStorage.setItem("accessToken", result.accessToken);
              // 重试原请求
              const config = error.config;
              return this.instance(config);
            } catch (err) {
              // 刷新失败，清除 token 并跳转到登录页
              localStorage.removeItem("accessToken");
              localStorage.removeItem("refreshToken");
              window.location.href = "/login";
              return Promise.reject(error);
            }
          }
        }
        return Promise.reject(error);
      }
    );
  }

  private async refreshToken(refreshToken: string) {
    try {
      const response = await axios.post("/api/users/refreshToken", {
        refreshToken,
      });
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // 封装请求方法
  request<T = any>(config: RequestConfig): Promise<T> {
    return this.instance.request(config);
  }

  get<T = any>(url: string, config?: RequestConfig): Promise<T> {
    return this.instance.get(url, config);
  }

  post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.instance.post(url, data, config);
  }

  put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.instance.put(url, data, config);
  }

  delete<T = any>(url: string, config?: RequestConfig): Promise<T> {
    return this.instance.delete(url, config);
  }
}

// 创建请求实例
export const defHttp = new RequestHttp({
  baseURL: "/backend-api",
  timeout: 10000,
  requestOptions: {
    withToken: true, // 默认携带 token
  },
});
