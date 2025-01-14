import { Router } from "express";
import { MedicineController } from "../controllers/medicine.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();
const medicineController = new MedicineController();

// 所有路由都需要认证
router.use(authMiddleware);

router.post("/create", medicineController.create);
router.get("/findAll", medicineController.findAll);
router.get("/findById/:id", medicineController.findById);
router.put("/update/:id", medicineController.update);
router.delete("/delete/:id", medicineController.delete);

export default router;
