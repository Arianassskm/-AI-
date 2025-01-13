import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const router = Router();
const userController = new UserController();

router.get("/", userController.getUsers);
router.post("/", userController.createUser);

export { router as userRouter };
