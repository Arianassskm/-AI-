import type { ReminderSettings } from "../components/reminders/ReminderSettingsModal";

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
    } catch (err) {
      return {
        error: {
          message: err instanceof Error ? err.message : "保存提醒设置失败",
        },
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
    } catch (err) {
      return {
        data: null,
        error: {
          message: err instanceof Error ? err.message : "获取提醒设置失败",
        },
      };
    }
  },
};
