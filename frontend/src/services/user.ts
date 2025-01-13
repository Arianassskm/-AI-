import type { User, UserHealth } from "../types/user";

export interface UserServiceError {
  message: string;
}

export interface UserResponse<T> {
  data: T | null;
  error: UserServiceError | null;
}

export const userService = {
  /**
   * 获取用户信息
   */
  async getUserProfile(userId: string): Promise<UserResponse<User>> {
    try {
      // const { data, error } = await supabase
      //   .from('users')
      //   .select(`
      //     *,
      //     health_records (*)
      //   `)
      //   .eq('id', userId)
      //   .single();
      // if (error) {
      //   return { data: null, error: { message: error.message } };
      // }
      // return { data: data as User, error: null };
    } catch (err) {
      return {
        data: null,
        error: {
          message: err instanceof Error ? err.message : "获取用户信息失败",
        },
      };
    }
  },

  /**
   * 更新用户基本信息
   */
  async updateUserProfile(
    userId: string,
    profile: Partial<User>
  ): Promise<UserResponse<User>> {
    try {
      //   const { data, error } = await supabase
      //     .from("users")
      //     .update(profile)
      //     .eq("id", userId)
      //     .select()
      //     .single();
      //   if (error) {
      //     return { data: null, error: { message: error.message } };
      //   }
      //   return { data: data as User, error: null };
    } catch (err) {
      return {
        data: null,
        error: {
          message: err instanceof Error ? err.message : "更新用户信息失败",
        },
      };
    }
  },

  /**
   * 获取用户健康记录
   */
  async getHealthRecord(userId: string): Promise<UserResponse<UserHealth>> {
    try {
      // const { data, error } = await supabase
      //   .from("health_records")
      //   .select("*")
      //   .eq("user_id", userId)
      //   .single();
      // if (error) {
      //   return { data: null, error: { message: error.message } };
      // }
      // return { data: data as UserHealth, error: null };
    } catch (err) {
      return {
        data: null,
        error: {
          message: err instanceof Error ? err.message : "获取健康记录失败",
        },
      };
    }
  },

  /**
   * 更新用户健康记录
   */
  async updateHealthRecord(
    userId: string,
    healthData: Partial<UserHealth>
  ): Promise<UserResponse<UserHealth>> {
    try {
      // const { data, error } = await supabase
      //   .from("health_records")
      //   .upsert({
      //     user_id: userId,
      //     ...healthData,
      //   })
      //   .select()
      //   .single();
      // if (error) {
      //   return { data: null, error: { message: error.message } };
      // }
      // return { data: data as UserHealth, error: null };
    } catch (err) {
      return {
        data: null,
        error: {
          message: err instanceof Error ? err.message : "更新健康记录失败",
        },
      };
    }
  },

  /**
   * 获取用户健康趋势数据
   */
  async getHealthTrends(userId: string): Promise<
    UserResponse<{
      yearlyUsage: number;
      averageSteps: number;
      riskScore: number;
    }>
  > {
    try {
      // 获取用药计划统计
      // const { data: planData, error: planError } = await supabase
      //   .from("medication_plans")
      //   .select("start_date, end_date")
      //   .eq("user_id", userId)
      //   .eq("status", "active");
      // if (planError) {
      //   throw planError;
      // }
      // // 计算年度用药时间占比
      // const now = new Date();
      // const yearStart = new Date(now.getFullYear(), 0, 1);
      // const yearEnd = new Date(now.getFullYear(), 11, 31);
      // const totalDays =
      //   (yearEnd.getTime() - yearStart.getTime()) / (1000 * 60 * 60 * 24);
      // let medicationDays = 0;
      // planData.forEach((plan) => {
      //   const start = new Date(plan.start_date);
      //   const end = new Date(plan.end_date);
      //   if (start <= yearEnd && end >= yearStart) {
      //     const effectiveStart = start < yearStart ? yearStart : start;
      //     const effectiveEnd = end > yearEnd ? yearEnd : end;
      //     medicationDays +=
      //       (effectiveEnd.getTime() - effectiveStart.getTime()) /
      //       (1000 * 60 * 60 * 24);
      //   }
      // });
      // const yearlyUsage = Math.round((medicationDays / totalDays) * 100);
      // // 模拟数据 - 实际项目中需要从相应的数据表获取
      // const averageSteps = 8500;
      // const riskScore = 25;
      // return {
      //   data: {
      //     yearlyUsage,
      //     averageSteps,
      //     riskScore,
      //   },
      //   error: null,
      // };
    } catch (err) {
      return {
        data: null,
        error: {
          message: err instanceof Error ? err.message : "获取健康趋势数据失败",
        },
      };
    }
  },
};
