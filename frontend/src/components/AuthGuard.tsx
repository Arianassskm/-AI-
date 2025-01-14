import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getValue } from "@/hooks/useLocalStorage";

// 白名单路由
const whiteList = ["/login", "/register", "/forgot-password"];

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    const token = getValue("accessToken");

    // 如果在白名单中，直接放行
    if (whiteList.includes(currentPath)) {
      // 如果已登录且访问登录页，重定向到首页
      if (token && currentPath === "/login") {
        navigate("/");
      }
      return;
    }

    // 非白名单页面，检查是否有token
    if (!token) {
      navigate("/login", {
        replace: true,
        state: { from: currentPath },
      });
    }
  }, [currentPath, navigate]);

  return <>{children}</>;
}
