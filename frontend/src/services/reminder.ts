export interface MedicationReminder {
  id: string;
  planMedicationId: string;
  reminderTime: string;
  daysOfWeek: number[];
  isEnabled: boolean;
  notificationType: "app" | "email" | "both";
}

export interface ReminderLog {
  id: string;
  reminderId: string;
  scheduledAt: string;
  status: "pending" | "sent" | "acknowledged" | "missed";
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
    reminder: Omit<MedicationReminder, "id">
  ): Promise<{ data: MedicationReminder | null; error: ReminderError | null }> {
    try {
    } catch (err) {
      return {
        data: null,
        error: { message: err instanceof Error ? err.message : "创建提醒失败" },
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
    } catch (err) {
      return {
        data: [],
        error: {
          message: err instanceof Error ? err.message : "获取提醒列表失败",
        },
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
    } catch (err) {
      return {
        error: {
          message: err instanceof Error ? err.message : "更新提醒状态失败",
        },
      };
    }
  },

  /**
   * 记录提醒日志
   */
  async logReminder(
    reminderId: string,
    status: ReminderLog["status"]
  ): Promise<{ error: ReminderError | null }> {
    try {
    } catch (err) {
      return {
        error: {
          message: err instanceof Error ? err.message : "记录提醒日志失败",
        },
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
        .from("reminder_logs")
        .select("*")
        .eq("reminder_id", reminderId)
        .order("scheduled_at", { ascending: false })
        .limit(limit);

      if (error) throw error;

      return {
        data: data.map((log) => ({
          id: log.id,
          reminderId: log.reminder_id,
          scheduledAt: log.scheduled_at,
          status: log.status,
          responseAt: log.response_at,
        })),
        error: null,
      };
    } catch (err) {
      return {
        data: [],
        error: {
          message: err instanceof Error ? err.message : "获取提醒日志失败",
        },
      };
    }
  },
};
