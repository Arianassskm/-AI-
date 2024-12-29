import { supabase } from '../lib/supabase';
import type { ReminderSettings } from '../components/reminders/ReminderSettingsModal';

export interface ReminderError {
  message: string;
}

export const reminderService = {
  /**
   * 创建或更新提醒设置
   */
  async saveReminderSettings(
    userId: string,
    settings: ReminderSettings
  ): Promise<{ error: ReminderError | null }> {
    try {
      const { error } = await supabase
        .from('medication_reminders')
        .upsert({
          user_id: userId,
          medication_id: settings.medicationId,
          reminder_times: settings.times,
          days_of_week: settings.daysOfWeek,
          notification_type: settings.notificationType,
          is_enabled: settings.enabled
        });

      if (error) throw error;

      return { error: null };
    } catch (err) {
      return {
        error: { message: err instanceof Error ? err.message : '保存提醒设置失败' }
      };
    }
  },

  /**
   * 获取提醒设置
   */
  async getReminderSettings(
    userId: string,
    medicationId: string
  ): Promise<{
    data: ReminderSettings | null;
    error: ReminderError | null;
  }> {
    try {
      const { data, error } = await supabase
        .from('medication_reminders')
        .select('*')
        .eq('user_id', userId)
        .eq('medication_id', medicationId)
        .single();

      if (error) throw error;

      if (!data) return { data: null, error: null };

      return {
        data: {
          medicationId: data.medication_id,
          times: data.reminder_times,
          daysOfWeek: data.days_of_week,
          notificationType: data.notification_type,
          enabled: data.is_enabled
        },
        error: null
      };
    } catch (err) {
      return {
        data: null,
        error: { message: err instanceof Error ? err.message : '获取提醒设置失败' }
      };
    }
  }
};