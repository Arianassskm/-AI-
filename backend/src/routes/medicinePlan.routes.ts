import { Router } from "express";
import { MedicinePlanController } from "../controllers/medicinePlan.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();
const medicinePlanController = new MedicinePlanController();

// 所有路由都需要认证
router.use(authMiddleware);

router.post("/createPlan", medicinePlanController.createPlan);
router.get("/getUserPlans/:id", medicinePlanController.getUserPlans);
router.put("/:id", medicinePlanController.updatePlan);
router.delete("/:id", medicinePlanController.deletePlan);

export { router as medicinePlanRouter };
