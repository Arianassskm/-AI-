import { supabase } from '../lib/supabase';

export interface MedicationReminder {
  id: string;
  planMedicationId: string;
  reminderTime: string;
  daysOfWeek: number[];
  isEnabled: boolean;
  notificationType: 'app' | 'email' | 'both';
}

export interface ReminderLog {
  id: string;
  reminderId: string;
  scheduledAt: string;
  status: 'pending' | 'sent' | 'acknowledged' | 'missed';
  responseAt?: string;
}

export interface ReminderError {
  message: string;
}

export const reminderService = {
  /**
   * 创建用药提醒
   */
  async createReminder(
    userId: string,
    reminder: Omit<MedicationReminder, 'id'>
  ): Promise<{ data: MedicationReminder | null; error: ReminderError | null }> {
    try {
      const { data, error } = await supabase
        .from('medication_reminders')
        .insert([{
          user_id: userId,
          plan_medication_id: reminder.planMedicationId,
          reminder_time: reminder.reminderTime,
          days_of_week: reminder.daysOfWeek,
          is_enabled: reminder.isEnabled,
          notification_type: reminder.notificationType
        }])
        .select()
        .single();

      if (error) throw error;

      return {
        data: data ? {
          id: data.id,
          planMedicationId: data.plan_medication_id,
          reminderTime: data.reminder_time,
          daysOfWeek: data.days_of_week,
          isEnabled: data.is_enabled,
          notificationType: data.notification_type
        } : null,
        error: null
      };
    } catch (err) {
      return {
        data: null,
        error: { message: err instanceof Error ? err.message : '创建提醒失败' }
      };
    }
  },

  /**
   * 获取用户的所有提醒
   */
  async getUserReminders(userId: string): Promise<{
    data: MedicationReminder[];
    error: ReminderError | null;
  }> {
    try {
      const { data, error } = await supabase
        .from('medication_reminders')
        .select('*')
        .eq('user_id', userId)
        .order('reminder_time');

      if (error) throw error;

      return {
        data: data.map(item => ({
          id: item.id,
          planMedicationId: item.plan_medication_id,
          reminderTime: item.reminder_time,
          daysOfWeek: item.days_of_week,
          isEnabled: item.is_enabled,
          notificationType: item.notification_type
        })),
        error: null
      };
    } catch (err) {
      return {
        data: [],
        error: { message: err instanceof Error ? err.message : '获取提醒列表失败' }
      };
    }
  },

  /**
   * 更新提醒状态
   */
  async updateReminderStatus(
    reminderId: string,
    isEnabled: boolean
  ): Promise<{ error: ReminderError | null }> {
    try {
      const { error } = await supabase
        .from('medication_reminders')
        .update({ is_enabled: isEnabled })
        .eq('id', reminderId);

      if (error) throw error;

      return { error: null };
    } catch (err) {
      return {
        error: { message: err instanceof Error ? err.message : '更新提醒状态失败' }
      };
    }
  },

  /**
   * 记录提醒日志
   */
  async logReminder(
    reminderId: string,
    status: ReminderLog['status']
  ): Promise<{ error: ReminderError | null }> {
    try {
      const { error } = await supabase
        .from('reminder_logs')
        .insert([{
          reminder_id: reminderId,
          scheduled_at: new Date().toISOString(),
          status,
          response_at: status === 'acknowledged' ? new Date().toISOString() : null
        }]);

      if (error) throw error;

      return { error: null };
    } catch (err) {
      return {
        error: { message: err instanceof Error ? err.message : '记录提醒日志失败' }
      };
    }
  },

  /**
   * 获取提醒日志
   */
  async getReminderLogs(
    reminderId: string,
    limit = 10
  ): Promise<{ data: ReminderLog[]; error: ReminderError | null }> {
    try {
      const { data, error } = await supabase
        .from('reminder_logs')
        .select('*')
        .eq('reminder_id', reminderId)
        .order('scheduled_at', { ascending: false })
        .limit(limit);

      if (error) throw error;

      return {
        data: data.map(log => ({
          id: log.id,
          reminderId: log.reminder_id,
          scheduledAt: log.scheduled_at,
          status: log.status,
          responseAt: log.response_at
        })),
        error: null
      };
    } catch (err) {
      return {
        data: [],
        error: { message: err instanceof Error ? err.message : '获取提醒日志失败' }
      };
    }
  }
};