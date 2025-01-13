export interface HealthTrend {
  date: string;
  bloodPressureSystolic: number;
  bloodPressureDiastolic: number;
  bloodSugar: number;
  heartRate: number;
}

export interface HealthTrendsData {
  yearlyUsage: number;
  averageSteps: number;
  riskScore: number;
  trends: HealthTrend[];
}

export interface HealthTrendsError {
  message: string;
}

export interface HealthTrendsResponse {
  data: HealthTrendsData | null;
  error: HealthTrendsError | null;
}

export const healthTrendsService = {
  /**
   * 获取用户的健康趋势数据
   */
  async getHealthTrends(userId: string): Promise<HealthTrendsResponse> {
    try {
      // 1. 获取步数数据
      const { data: stepData, error: stepError } = await supabase
        .from("step_records")
        .select("steps")
        .eq("user_id", userId)
        .gte(
          "date",
          new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
        )
        .order("date", { ascending: false });

      if (stepError) {
        throw stepError;
      }

      // 计算平均步数
      const averageSteps =
        stepData.length > 0
          ? Math.round(
              stepData.reduce((sum, record) => sum + record.steps, 0) /
                stepData.length
            )
          : 0;

      // 2. 获取用药计划数据
      const { data: planData, error: planError } = await supabase
        .from("medication_plans")
        .select("start_date, end_date")
        .eq("user_id", userId)
        .eq("status", "active");

      if (planError) {
        throw planError;
      }

      // 计算年度用药时间占比
      const now = new Date();
      const yearStart = new Date(now.getFullYear(), 0, 1);
      const yearEnd = new Date(now.getFullYear(), 11, 31);
      const totalDays =
        (yearEnd.getTime() - yearStart.getTime()) / (1000 * 60 * 60 * 24);

      let medicationDays = 0;
      planData.forEach((plan) => {
        const start = new Date(plan.start_date);
        const end = new Date(plan.end_date);
        if (start <= yearEnd && end >= yearStart) {
          const effectiveStart = start < yearStart ? yearStart : start;
          const effectiveEnd = end > yearEnd ? yearEnd : end;
          medicationDays +=
            (effectiveEnd.getTime() - effectiveStart.getTime()) /
            (1000 * 60 * 60 * 24);
        }
      });

      const yearlyUsage = Math.round((medicationDays / totalDays) * 100);

      // 3. 获取健康趋势数据
      const { data: trendsData, error: trendsError } = await supabase
        .from("health_trends")
        .select("*")
        .eq("user_id", userId)
        .order("date", { ascending: false })
        .limit(7);

      if (trendsError) {
        throw trendsError;
      }

      const trends = trendsData.map((trend) => ({
        date: trend.date,
        bloodPressureSystolic: trend.blood_pressure_systolic,
        bloodPressureDiastolic: trend.blood_pressure_diastolic,
        bloodSugar: trend.blood_sugar,
        heartRate: trend.heart_rate,
      }));

      // 4. 计算健康风险分数
      const riskScore = await calculateRiskScore(userId, trends);

      return {
        data: {
          yearlyUsage,
          averageSteps,
          riskScore,
          trends,
        },
        error: null,
      };
    } catch (err) {
      return {
        data: null,
        error: {
          message: err instanceof Error ? err.message : "获取健康趋势数据失败",
        },
      };
    }
  },

  /**
   * 添加健康趋势记录
   */
  async addHealthTrend(
    userId: string,
    trend: Omit<HealthTrend, "date">
  ): Promise<{ error: HealthTrendsError | null }> {
    try {
    } catch (err) {
      return {
        error: {
          message: err instanceof Error ? err.message : "添加健康趋势记录失败",
        },
      };
    }
  },
};

/**
 * 计算用户的健康风险分数
 * 基于多个因素：年龄、用药情况、运动量、血压、血糖等
 */
async function calculateRiskScore(
  userId: string,
  trends: HealthTrend[]
): Promise<number> {
  try {
    // 获取用户健康记录
    const { data: healthRecord } = await supabase
      .from("health_records")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (!healthRecord) {
      return 25; // 默认风险分数
    }

    let score = 25; // 基础分数

    // 根据年龄调整分数
    const age = healthRecord.age || 30;
    if (age > 60) score += 15;
    else if (age > 40) score += 10;

    // 根据BMI调整分数
    if (healthRecord.height && healthRecord.weight) {
      const bmi = healthRecord.weight / Math.pow(healthRecord.height / 100, 2);
      if (bmi > 30 || bmi < 18.5) score += 10;
    }

    // 根据过敏史调整分数
    if (healthRecord.allergies && healthRecord.allergies.length > 0) {
      score += 5 * healthRecord.allergies.length;
    }

    // 根据最近的健康趋势调整分数
    if (trends.length > 0) {
      const latestTrend = trends[0];

      // 血压评估
      if (
        latestTrend.bloodPressureSystolic > 140 ||
        latestTrend.bloodPressureDiastolic > 90
      ) {
        score += 10;
      }

      // 血糖评估
      if (latestTrend.bloodSugar > 7) {
        score += 10;
      }

      // 心率评估
      if (latestTrend.heartRate > 100 || latestTrend.heartRate < 60) {
        score += 5;
      }
    }

    return Math.min(score, 100); // 确保分数不超过100
  } catch (error) {
    console.error("计算风险分数失败:", error);
    return 25; // 发生错误时返回默认分数
  }
}
