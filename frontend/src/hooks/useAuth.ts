import { useState, useEffect } from 'react';
import { authService } from '../services/auth';
import type { User } from '../types/user';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 检查初始认证状态
    authService.getCurrentUser().then(({ user }) => {
      setUser(user);
      setLoading(false);
    });

    // 监听认证状态变化
    const { subscription } = authService.onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    const { error } = await authService.signOut();
    if (!error) {
      setUser(null);
    }
  };

  return {
    user,
    loading,
    signOut
  };
}