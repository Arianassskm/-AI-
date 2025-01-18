import { defHttp, Response } from "@/utils/request";
import { Medicine } from "@/services/medicineService";

// 服药时间枚举
export enum MedicineTiming {
  BEFORE_MEAL = "BEFORE_MEAL", // 饭前服用
  AFTER_MEAL = "AFTER_MEAL", // 饭后服用
  WITH_MEAL = "WITH_MEAL", // 随餐服用
  EMPTY_STOMACH = "EMPTY_STOMACH", // 空腹服用
}

// 药品明细
export interface MedicinePlanDetail {
  id: number;
  medicineId: number;
  medicine: Medicine;
  dosage: number; // 单次用量
  frequency: string; // 每日服用频次
  timing: MedicineTiming;
  createdAt: string;
  updatedAt: string;
}

// 用药计划
export interface MedicinePlan {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  userId: number;
  status: string;
  details: MedicinePlanDetail[];
  createdAt: string;
  updatedAt: string;
}

// 创建用药计划的输入
export interface CreateMedicinePlanInput {
  name: string;
  startDate: string;
  endDate: string;
  userId: number;
  details: {
    medicineId: number;
    dosage: number;
    frequency: string;
    timing: MedicineTiming;
  }[];
}

// 更新用药计划的输入
export interface UpdateMedicinePlanInput
  extends Partial<CreateMedicinePlanInput> {
  id: number;
}

const API_BASE_URL = "medicationPlans";
export const medicinePlanService = {
  // 创建用药计划
  async createPlan(data: CreateMedicinePlanInput): Promise<Response> {
    try {
      const response = await defHttp.post<MedicinePlan>(
        `${API_BASE_URL}/createPlan`,
        data
      );
      return response;
    } catch (error) {
      return {
        success: false,
        message: "创建用药计划失败",
      };
    }
  },

  // 获取用户的所有用药计划
  async getUserPlans(userId: number): Promise<Response<MedicinePlan[]>> {
    try {
      const response = await defHttp.get<MedicinePlan[]>(
        `${API_BASE_URL}/getUserPlans/${userId}`
      );
      return response;
    } catch (error) {
      return {
        success: false,
        message: "获取用药计划失败",
      };
    }
  },

  // 获取单个用药计划详情
  async getPlanById(
    id: number,
    userId: number
  ): Promise<Response<MedicinePlan>> {
    try {
      const response = await defHttp.get<MedicinePlan>(
        `${API_BASE_URL}/${id}`,
        {
          params: { userId },
        }
      );
      return response.data;
    } catch (error) {
      return {
        success: false,
        message: "获取单个用药计划详情失败",
      };
    }
  },

  // 更新用药计划
  async updatePlan(data: UpdateMedicinePlanInput): Promise<Response> {
    try {
      const response = await defHttp.put<MedicinePlan>(
        `${API_BASE_URL}/${data.id}`,
        data
      );
      return response.data;
    } catch (error) {
      return {
        success: false,
        message: "更新用药计划失败",
      };
    }
  },

  // 删除用药计划
  async deletePlan(id: number, userId: number): Promise<void> {
    try {
      const response = await defHttp.delete(`${API_BASE_URL}/${id}`, {
        params: { userId },
      });
    } catch (error) {}
  },
};

// 添加进度计算函数
export const calculateProgress = (plan: MedicinePlan): number => {
  const now = new Date().getTime();
  const start = new Date(plan.startDate).getTime();
  const end = new Date(plan.endDate).getTime();

  // 如果计划已完成，返回 100%
  if (plan.status === "completed") {
    return 100;
  }

  // 如果计划已取消，返回当前进度
  if (plan.status === "cancelled") {
    return Math.min(
      100,
      Math.max(0, Math.floor(((now - start) / (end - start)) * 100))
    );
  }

  // 如果还未开始，返回 0
  if (now < start) {
    return 0;
  }

  // 如果已经结束，返回 100
  if (now > end) {
    return 100;
  }

  // 计算当前进度
  const progress = Math.floor(((now - start) / (end - start)) * 100);

  // 确保进度在 0-100 之间
  return Math.min(100, Math.max(0, progress));
};
