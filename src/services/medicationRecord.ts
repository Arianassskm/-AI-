import { supabase } from '../lib/supabase';

export interface MedicationRecord {
  id: string;
  userId: string;
  planMedicationId: string;
  takenAt: string;
  status: 'completed' | 'missed' | 'delayed';
  notes?: string;
}

export interface MedicationRecordError {
  message: string;
}

export const medicationRecordService = {
  /**
   * 创建用药记录
   */
  async createRecord(
    userId: string,
    record: Omit<MedicationRecord, 'id' | 'userId'>
  ): Promise<{ data: MedicationRecord | null; error: MedicationRecordError | null }> {
    try {
      const { data, error } = await supabase
        .from('medication_records')
        .insert([{
          user_id: userId,
          plan_medication_id: record.planMedicationId,
          taken_at: record.takenAt,
          status: record.status,
          notes: record.notes
        }])
        .select()
        .single();

      if (error) throw error;

      return {
        data: data ? {
          id: data.id,
          userId: data.user_id,
          planMedicationId: data.plan_medication_id,
          takenAt: data.taken_at,
          status: data.status,
          notes: data.notes
        } : null,
        error: null
      };
    } catch (err) {
      return {
        data: null,
        error: { message: err instanceof Error ? err.message : '创建用药记录失败' }
      };
    }
  },

  /**
   * 获取用药计划的记录列表
   */
  async getPlanRecords(planId: string): Promise<{
    data: MedicationRecord[];
    error: MedicationRecordError | null;
  }> {
    try {
      const { data, error } = await supabase
        .from('medication_records')
        .select(`
          *,
          plan_medication:plan_medications (
            medication:medications (*)
          )
        `)
        .eq('plan_medication_id', planId)
        .order('taken_at', { ascending: false });

      if (error) throw error;

      return {
        data: data.map(record => ({
          id: record.id,
          userId: record.user_id,
          planMedicationId: record.plan_medication_id,
          takenAt: record.taken_at,
          status: record.status,
          notes: record.notes
        })),
        error: null
      };
    } catch (err) {
      return {
        data: [],
        error: { message: err instanceof Error ? err.message : '获取用药记录失败' }
      };
    }
  },

  /**
   * 获取用药完成率统计
   */
  async getCompletionStats(planId: string): Promise<{
    data: {
      total: number;
      completed: number;
      missed: number;
      delayed: number;
      completionRate: number;
    };
    error: MedicationRecordError | null;
  }> {
    try {
      const { data, error } = await supabase
        .from('medication_records')
        .select('status')
        .eq('plan_medication_id', planId);

      if (error) throw error;

      const total = data.length;
      const completed = data.filter(r => r.status === 'completed').length;
      const missed = data.filter(r => r.status === 'missed').length;
      const delayed = data.filter(r => r.status === 'delayed').length;

      return {
        data: {
          total,
          completed,
          missed,
          delayed,
          completionRate: total > 0 ? (completed / total) * 100 : 0
        },
        error: null
      };
    } catch (err) {
      return {
        data: {
          total: 0,
          completed: 0,
          missed: 0,
          delayed: 0,
          completionRate: 0
        },
        error: { message: err instanceof Error ? err.message : '获取完成率统计失败' }
      };
    }
  }
};