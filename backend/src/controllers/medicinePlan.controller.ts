import { Request, Response } from "express";
import { MedicinePlanService } from "../services/medicinePlan.service";
import { MedicineService } from "../services/medicine.service";

const medicinePlanService = new MedicinePlanService();
const medicineService = new MedicineService();

export class MedicinePlanController {
  // 创建用药计划
  createPlan = async (req: Request, res: Response) => {
    try {
      const plan = await medicinePlanService.createPlan(req.body);
      return res
        .status(200)
        .json({ success: true, message: "创建用药计划成功", data: plan });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "创建用药计划失败" });
    }
  };

  getUserPlans = async (req: Request, res: Response) => {
    try {
      console.log("获取", req.params);
      const plans = await medicinePlanService.getUserPlans(
        Number(req.params.id)
      );

      for (const plan of plans) {
        for (const planDetail of plan.details) {
          const medicine = await medicineService.findById(
            plan.userId,
            planDetail.medicineId
          );
          planDetail.medicine = medicine;
        }
      }
      return res
        .status(200)
        .json({ success: true, message: "获取用药计划成功", data: plans });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "获取用药计划失败" });
    }
  };

  updatePlan = async (req: Request, res: Response) => {
    try {
      const plan = await medicinePlanService.updatePlan(
        Number(req.params.id),
        Number(req.body.userId),
        req.body
      );
      return res
        .status(200)
        .json({ success: true, message: "更新用药计划成功" });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "更新用药计划失败" });
    }
  };

  deletePlan = async (req: Request, res: Response) => {
    try {
      await medicinePlanService.deletePlan(
        Number(req.params.id),
        Number(req.params.userId)
      );
      return res
        .status(200)
        .json({ success: true, message: "删除用药计划成功" });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "删除用药计划失败" });
    }
  };
}
