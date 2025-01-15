import express from "express";
import cors from "cors";
import { config } from "./config/env";
import userRouter from "./routes/user.routes";
import medicineRoutes from "./routes/medicine.routes";
import { healthRouter } from "./routes/health.routes";
import { medicinePlanRouter } from "./routes/medicinePlan.routes";
import { prisma } from "./config/database";

const app = express();

app.use(cors({ origin: config.cors.origin }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// 路由
app.use("/api/users", userRouter);
app.use("/api/medicines", medicineRoutes);
app.use("/api/health", healthRouter);
app.use("/api/medicationPlans", medicinePlanRouter);

// 确保在应用退出时关闭数据库连接
process.on("beforeExit", async () => {
  await prisma.$disconnect();
});

export { app };
