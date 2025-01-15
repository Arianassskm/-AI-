import { Request, Response } from "express";
import { MedicineService } from "../services/medicine.service";

const medicineService = new MedicineService();

export class MedicineController {
  async create(req: Request, res: Response) {
    try {
      // 检查图片大小
      if (req.body.image && req.body.image.length > 4 * 1024 * 1024) {
        // 4MB
        return res.status(413).json({
          success: false,
          message: "图片大小超过限制",
        });
      }

      const userId = req.body.userId;
      if (!userId) {
        return res.status(401).json({ success: false, message: "未授权" });
      }

      const medicine = await medicineService.create(req.body);
      return res.status(200).json({ success: true, message: "创建成功" });
    } catch (error) {
      if (error.type === "entity.too.large") {
        return res.status(413).json({
          success: false,
          message: "请求数据过大",
        });
      }
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "服务器内部错误," + error.message });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      console.log("查找用户药品", userId);
      if (!userId) {
        return res.status(401).json({ success: false, message: "未授权" });
      }

      const medicines = await medicineService.findAll(userId);
      return res.status(200).json({ success: true, data: medicines });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "服务器内部错误:" + error.message });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ success: false, message: "未授权" });
      }

      const medicine = await medicineService.findById(
        userId,
        Number(req.params.id)
      );
      if (!medicine) {
        return res.status(404).json({ success: false, message: "药品未找到" });
      }
      return res.json({ success: true, data: medicine });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "服务器内部错误" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ success: false, message: "未授权" });
      }

      await medicineService.update(userId, {
        id: Number(req.params.id),
        ...req.body,
      });

      return res.status(200).json({ success: true, message: "更新成功" });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "服务器内部错误" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ success: false, message: "未授权" });
      }

      await medicineService.delete(userId, Number(req.params.id));
      return res.status(200).json({ success: true, message: "删除成功" });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "服务器内部错误" });
    }
  }
}
