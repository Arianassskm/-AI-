import { supabase } from '../lib/supabase';
import type { NewPlanData } from '../components/plans/CreatePlanModal';
import type { Medicine, MedicationPlan } from '../types/medicationPlan';

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
  ): Promise<{ data: MedicationPlan | null; error: MedicationPlanError | null }> {
    try {
      // 1. 创建计划基本信息
      const { data: plan, error: planError } = await supabase
        .from('medication_plans')
        .insert({
          user_id: userId,
          name: planData.name,
          start_date: planData.startDate,
          end_date: planData.endDate,
          status: 'active'
        })
        .select()
        .single();

      if (planError) throw planError;

      // 2. 添加计划药品
      const planMedicines = planData.medicines.map(medicine => ({
        plan_id: plan.id,
        medication_id: medicine.id,
        dosage: medicine.dosage,
        frequency: medicine.frequency,
        duration: medicine.duration
      }));

      const { error: medsError } = await supabase
        .from('plan_medications')
        .insert(planMedicines);

      if (medsError) throw medsError;

      // 3. 返回完整的计划信息
      return {
        data: {
          id: plan.id,
          name: plan.name,
          startDate: plan.start_date,
          endDate: plan.end_date,
          status: 'active',
          progress: 0,
          medicines: planData.medicines
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
   * 获取用户的所有用药计划
   */
  async getUserPlans(
    userId: string,
    filters?: {
      status?: ('active' | 'completed')[];
      startDate?: string;
      endDate?: string;
    }
  ): Promise<{ data: MedicationPlan[]; error: MedicationPlanError | null }> {
    try {
      let query = supabase
        .from('medication_plans')
        .select(`
          *,
          plan_medications (
            *,
            medication:medications (*)
          )
        `)
        .eq('user_id', userId);

      // 应用过滤条件
      if (filters?.status && filters.status.length > 0) {
        query = query.in('status', filters.status);
      }
      if (filters?.startDate) {
        query = query.gte('start_date', filters.startDate);
      }
      if (filters?.endDate) {
        query = query.lte('end_date', filters.endDate);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;

      // 转换数据格式
      return {
        data: data.map(plan => ({
          id: plan.id,
          name: plan.name,
          startDate: plan.start_date,
          endDate: plan.end_date,
          status: plan.status,
          progress: calculateProgress(plan),
          medicines: plan.plan_medications.map((pm: any) => ({
            name: pm.medication.name,
            dosage: pm.dosage,
            frequency: pm.frequency,
            duration: pm.duration,
            imageUrl: pm.medication.image_url
          }))
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
   * 更新计划状态
   */
  async updatePlanStatus(
    planId: string,
    status: 'active' | 'completed' | 'cancelled'
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
  },

  /**
   * 获取计划详情
   */
  async getPlanDetails(
    planId: string
  ): Promise<{ data: MedicationPlan | null; error: MedicationPlanError | null }> {
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
        .eq('id', planId)
        .single();

      if (error) throw error;

      return {
        data: {
          id: data.id,
          name: data.name,
          startDate: data.start_date,
          endDate: data.end_date,
          status: data.status,
          progress: calculateProgress(data),
          medicines: data.plan_medications.map((pm: any) => ({
            name: pm.medication.name,
            dosage: pm.dosage,
            frequency: pm.frequency,
            duration: pm.duration,
            imageUrl: pm.medication.image_url
          }))
        },
        error: null
      };
    } catch (err) {
      return {
        data: null,
        error: { message: err instanceof Error ? err.message : '获取计划详情失败' }
      };
    }
  }
};

// 计算计划完成进度
function calculateProgress(plan: any): number {
  if (!plan.plan_medications?.length) return 0;

  const now = new Date();
  const startDate = new Date(plan.start_date);
  const endDate = new Date(plan.end_date);
  const totalDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
  const elapsedDays = (now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);

  if (elapsedDays <= 0) return 0;
  if (elapsedDays >= totalDays) return 100;

  return Math.round((elapsedDays / totalDays) * 100);
}