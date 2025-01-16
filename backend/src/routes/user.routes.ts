import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();
const userController = new UserController();

// 公开路由
router.post("/login", userController.login);
router.post("/refreshToken", userController.refreshToken);
router.post("/register", userController.register);

// 需要认证的路由
router.use(authMiddleware);
router.get("/getUser", userController.getUser);
router.post("/updateScore", userController.updateScore);

export default router;
