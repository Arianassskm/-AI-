import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/env";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
      };
    }
  }
}

// 白名单路由配置
const whiteList = [
  // 用户相关
  { path: "/login", method: "POST" },
  { path: "/register", method: "POST" },
  { path: "/refreshToken", method: "POST" },
  // 健康检查
  { path: "/health", method: "GET" },
  // 其他公开接口...
];

/**
 * 检查是否是白名单路由
 */
const isWhiteListRoute = (req: Request): boolean => {
  const path = req.path;
  const method = req.method;

  return whiteList.some(
    (route) =>
      (route.path === path || path.match(new RegExp(`^${route.path}`))) &&
      (route.method === method || route.method === "ALL")
  );
};

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 检查是否是白名单路由
    console.log("路由", req.path, req.method);
    if (isWhiteListRoute(req)) {
      return next();
    }

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "未提供认证令牌" });
    }

    const decoded = jwt.verify(token, config.jwtSecret) as {
      id: number;
      email: string;
      type?: string;
    };

    // 确保不是刷新令牌
    if (decoded.type === "refresh") {
      return res.status(401).json({ message: "无效的令牌类型" });
    }

    req.user = {
      id: decoded.id,
      email: decoded.email,
    };

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "令牌已过期" });
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "无效的认证令牌" });
    }
    return res.status(401).json({ message: "认证失败" });
  }
};
