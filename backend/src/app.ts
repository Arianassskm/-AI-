import express from "express";
import cors from "cors";
import { config } from "./config/env";
import { PrismaClient } from "@prisma/client";
import { healthRouter } from "./routes/health.routes";
import { userRouter } from "./routes/user.routes";

const prisma = new PrismaClient();
const app = express();

app.use(cors({ origin: config.cors.origin }));
app.use(express.json());

// 路由
app.use("/health", healthRouter);
app.use("/api/users", userRouter);

// 健康检查接口
app.get("/health", (req, res) => {
  console.log(res);
  res.json({
    status: "ok",
    timestamp: new Date(),
    port: config.port,
    environment: config.nodeEnv,
  });
});

export { app, prisma };
