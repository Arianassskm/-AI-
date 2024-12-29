import { supabase } from '../utils/supabase';
import type { MedicationReminder, CheckInRecord } from '../models/medicationModel';

export class MedicationService {
  async getReminders(userId: string): Promise<MedicationReminder[]> {
    const { data, error } = await supabase
      .from('medication_reminders')
      .select('*')
      .eq('user_id', userId)
      .order('time');

    if (error) throw error;
    return data;
  }

  async checkInReminder(userId: string, reminderId: string): Promise<CheckInRecord> {
    const checkIn: CheckInRecord = {
      id: crypto.randomUUID(),
      userId,
      reminderId,
      completedAt: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('check_in_records')
      .insert([checkIn])
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}