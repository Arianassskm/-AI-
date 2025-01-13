import dotenv from "dotenv";

// 加载环境变量
dotenv.config();

export const config = {
  port: process.env.PORT || 3012,
  nodeEnv: process.env.NODE_ENV || "development",
  database: {
    url: process.env.DATABASE_URL,
  },
  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  },
};
