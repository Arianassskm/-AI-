import type { NewPlanData } from "../components/plans/CreatePlanModal";
import type { Medicine, MedicationPlan } from "../types/medicationPlan";

export interface MedicationPlanError {
  message: string;
}

export const medicationPlanService = {
  /**
   * 创建新的用药计划
   */
  async createPlan(
    userId: string,
    planData: NewPlanData
  ): Promise<{
    data: MedicationPlan | null;
    error: MedicationPlanError | null;
  }> {
    try {
    } catch (err) {
      return {
        data: null,
        error: {
          message: err instanceof Error ? err.message : "创建用药计划失败",
        },
      };
    }
  },

  /**
   * 获取用户的所有用药计划
   */
  async getUserPlans(
    userId: string,
    filters?: {
      status?: ("active" | "completed")[];
      startDate?: string;
      endDate?: string;
    }
  ): Promise<{ data: MedicationPlan[]; error: MedicationPlanError | null }> {
    try {
    } catch (err) {
      return {
        data: [],
        error: {
          message: err instanceof Error ? err.message : "获取用药计划失败",
        },
      };
    }
  },

  /**
   * 更新计划状态
   */
  async updatePlanStatus(
    planId: string,
    status: "active" | "completed" | "cancelled"
  ): Promise<{ error: MedicationPlanError | null }> {
    try {
    } catch (err) {
      return {
        error: {
          message: err instanceof Error ? err.message : "更新计划状态失败",
        },
      };
    }
  },

  /**
   * 获取计划详情
   */
  async getPlanDetails(planId: string): Promise<{
    data: MedicationPlan | null;
    error: MedicationPlanError | null;
  }> {
    try {
    } catch (err) {
      return {
        data: null,
        error: {
          message: err instanceof Error ? err.message : "获取计划详情失败",
        },
      };
    }
  },
};

// 计算计划完成进度
function calculateProgress(plan: any): number {
  if (!plan.plan_medications?.length) return 0;

  const now = new Date();
  const startDate = new Date(plan.start_date);
  const endDate = new Date(plan.end_date);
  const totalDays =
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
  const elapsedDays =
    (now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);

  if (elapsedDays <= 0) return 0;
  if (elapsedDays >= totalDays) return 100;

  return Math.round((elapsedDays / totalDays) * 100);
}
