import type { User } from "../types/user";
import { defHttp, Response } from "@/utils/request";

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
  async signUp(email: string, password: string): Promise<Response<User>> {
    try {
      const response = await defHttp.post(
        "/users/register",
        {
          email: email,
          password: password,
        },
        {
          requestOptions: {
            withToken: false,
          },
        }
      );

      return response;
    } catch (err) {
      return {
        success: false,
        message: err instanceof Error ? err.message : "注册失败",
      };
    }
  },

  /**
   * 用户登录
   */
  async signIn(email: string, password: string): Promise<Response> {
    try {
      const response = await defHttp.post(
        "/users/login",
        {
          email: email,
          password: password,
        },
        {
          requestOptions: {
            withToken: false,
          },
        }
      );

      return response;
    } catch (err) {
      return {
        success: false,
        message: err instanceof Error ? err.message : "登录失败",
      };
    }
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
