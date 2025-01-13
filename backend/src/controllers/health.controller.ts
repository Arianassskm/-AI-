import { Request, Response } from "express";
import { config } from "../config/env";
import { prisma } from "../config/database";

export class HealthController {
  // 基础健康检查
  async check(req: Request, res: Response) {
    console.log("健康检查");
    res.json({
      status: "ok",
      timestamp: new Date(),
      service: "backend-api",
    });
  }

  // 详细健康检查
  async detail(req: Request, res: Response) {
    try {
      // 检查数据库连接
      await prisma.$queryRaw`SELECT 1`;

      res.json({
        status: "ok",
        timestamp: new Date(),
        service: "backend-api",
        details: {
          database: "connected",
          port: config.port,
          environment: config.nodeEnv,
          memory: process.memoryUsage(),
          uptime: process.uptime(),
        },
      });
    } catch (error) {
      res.status(503).json({
        status: "error",
        timestamp: new Date(),
        service: "backend-api",
        details: {
          database: "disconnected",
          error: error.message,
        },
      });
    }
  }
}
