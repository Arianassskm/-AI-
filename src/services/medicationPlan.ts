import { supabase } from '../lib/supabase';

export interface MedicationPlan {
  id: string;
  userId: string;
  name: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'cancelled';
  frequencyType: 'daily' | 'weekly' | 'monthly';
  frequencyValue: number;
  dosageUnit?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PlanMedication {
  id: string;
  planId: string;
  medicationId: string;
  dosageAmount: number;
  timeOfDay: string[];
  daysOfWeek?: number[];
}

export interface MedicationPlanError {
  message: string;
}

export const medicationPlanService = {
  /**
   * 创建用药计划
   */
  async createPlan(
    userId: string,
    plan: Omit<MedicationPlan, 'id' | 'userId' | 'createdAt' | 'updatedAt'>,
    medications: Omit<PlanMedication, 'id' | 'planId'>[]
  ): Promise<{ data: MedicationPlan | null; error: MedicationPlanError | null }> {
    try {
      // 开始数据库事务
      const { data: planData, error: planError } = await supabase
        .from('medication_plans')
        .insert([{
          user_id: userId,
          name: plan.name,
          start_date: plan.startDate,
          end_date: plan.endDate,
          status: plan.status,
          frequency_type: plan.frequencyType,
          frequency_value: plan.frequencyValue,
          dosage_unit: plan.dosageUnit,
          notes: plan.notes
        }])
        .select()
        .single();

      if (planError) throw planError;

      // 添加计划药品
      const planMedications = medications.map(med => ({
        plan_id: planData.id,
        medication_id: med.medicationId,
        dosage_amount: med.dosageAmount,
        time_of_day: med.timeOfDay,
        days_of_week: med.daysOfWeek
      }));

      const { error: medsError } = await supabase
        .from('plan_medications')
        .insert(planMedications);

      if (medsError) throw medsError;

      return {
        data: {
          id: planData.id,
          userId: planData.user_id,
          name: planData.name,
          startDate: planData.start_date,
          endDate: planData.end_date,
          status: planData.status,
          frequencyType: planData.frequency_type,
          frequencyValue: planData.frequency_value,
          dosageUnit: planData.dosage_unit,
          notes: planData.notes,
          createdAt: planData.created_at,
          updatedAt: planData.updated_at
        },
        error: null
      };
    } catch (err) {
      return {
        data: null,
        error: { message: err instanceof Error ? err.message : '创建用药计划失败' }
      };
    }
  },

  /**
   * 获取用户的用药计划列表
   */
  async getUserPlans(userId: string): Promise<{
    data: MedicationPlan[];
    error: MedicationPlanError | null;
  }> {
    try {
      const { data, error } = await supabase
        .from('medication_plans')
        .select(`
          *,
          plan_medications (
            *,
            medication:medications (*)
          )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return {
        data: data.map(plan => ({
          id: plan.id,
          userId: plan.user_id,
          name: plan.name,
          startDate: plan.start_date,
          endDate: plan.end_date,
          status: plan.status,
          frequencyType: plan.frequency_type,
          frequencyValue: plan.frequency_value,
          dosageUnit: plan.dosage_unit,
          notes: plan.notes,
          createdAt: plan.created_at,
          updatedAt: plan.updated_at
        })),
        error: null
      };
    } catch (err) {
      return {
        data: [],
        error: { message: err instanceof Error ? err.message : '获取用药计划失败' }
      };
    }
  },

  /**
   * 更新用药计划状态
   */
  async updatePlanStatus(
    planId: string,
    status: MedicationPlan['status']
  ): Promise<{ error: MedicationPlanError | null }> {
    try {
      const { error } = await supabase
        .from('medication_plans')
        .update({ status })
        .eq('id', planId);

      if (error) throw error;

      return { error: null };
    } catch (err) {
      return {
        error: { message: err instanceof Error ? err.message : '更新计划状态失败' }
      };
    }
  }
};