import { supabase } from '../lib/supabase';
import type { User } from '../types/user';

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
  async signUp(email: string, password: string): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        return { user: null, error: { message: error.message } };
      }

      if (!data?.user) {
        return { user: null, error: { message: '注册失败' } };
      }

      // 创建用户档案
      const { error: profileError } = await supabase
        .from('users')
        .insert([
          {
            id: data.user.id,
            email: data.user.email,
            name: email.split('@')[0], // 默认用户名
          },
        ]);

      if (profileError) {
        return { user: null, error: { message: profileError.message } };
      }

      return { user: data.user as unknown as User, error: null };
    } catch (err) {
      return { 
        user: null, 
        error: { message: err instanceof Error ? err.message : '注册失败' } 
      };
    }
  },

  /**
   * 用户登录
   */
  async signIn(email: string, password: string): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { user: null, error: { message: error.message } };
      }

      return { user: data.user as unknown as User, error: null };
    } catch (err) {
      return { 
        user: null, 
        error: { message: err instanceof Error ? err.message : '登录失败' } 
      };
    }
  },

  /**
   * 用户登出
   */
  async signOut(): Promise<{ error: AuthError | null }> {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        return { error: { message: error.message } };
      }
      return { error: null };
    } catch (err) {
      return { 
        error: { message: err instanceof Error ? err.message : '登出失败' } 
      };
    }
  },

  /**
   * 获取当前用户
   */
  async getCurrentUser(): Promise<AuthResponse> {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error) {
        return { user: null, error: { message: error.message } };
      }

      if (!user) {
        return { user: null, error: null };
      }

      return { user: user as unknown as User, error: null };
    } catch (err) {
      return { 
        user: null, 
        error: { message: err instanceof Error ? err.message : '获取用户信息失败' } 
      };
    }
  },

  /**
   * 监听认证状态变化
   */
  onAuthStateChange(callback: (user: User | null) => void) {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      callback(session?.user as unknown as User || null);
    });
    return data;
  }
};