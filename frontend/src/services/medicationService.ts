import { api } from '../utils/api';
import type { MedicationReminder, CheckInRecord } from '../types/medication';

export const medicationService = {
  async getReminders(): Promise<MedicationReminder[]> {
    const response = await api.get('/medication/reminders');
    return response.data;
  },

  async checkInReminder(reminderId: string): Promise<CheckInRecord> {
    const response = await api.post(`/medication/reminders/${reminderId}/check-in`);
    return response.data;
  }
};