import type { User } from "../types/user";
import axios from "axios";
import { defHttp } from "@/utils/request";

export interface AuthError {
  message: string;
}

export interface AuthResponse {
  user: User | null;
  error: AuthError | null;
}

export const authService = {
  /**
   * 用户注册
   */
  signUp(email: string, password: string): Promise<AuthResponse> {
    return new Promise<AuthResponse>((resolve, reject) => {
      defHttp
        .post("/backend-api/users", { email: email, password: password })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject({
            user: null,
            error: { message: err instanceof Error ? err.message : "注册失败" },
          });
        });
    });
  },

  /**
   * 用户登录
   */
  signIn(email: string, password: string): Promise<AuthResponse> {
    return new Promise<AuthResponse>((resolve, reject) => {
      defHttp
        .get("/backend-api/users", {
          params: { email: email, password: password },
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject({
            user: null,
            error: { message: err instanceof Error ? err.message : "登录失败" },
          });
        });
    });
  },

  /**
   * 用户登出
   */
  async signOut(): Promise<{ error: AuthError | null }> {
    try {
    } catch (err) {
      return {
        error: { message: err instanceof Error ? err.message : "登出失败" },
      };
    }
  },

  /**
   * 获取当前用户
   */
  async getCurrentUser(): Promise<AuthResponse> {
    try {
    } catch (err) {
      return {
        user: null,
        error: {
          message: err instanceof Error ? err.message : "获取用户信息失败",
        },
      };
    }
  },

  /**
   * 监听认证状态变化
   */
  onAuthStateChange(callback: (user: User | null) => void) {
    return {};
  },
};
