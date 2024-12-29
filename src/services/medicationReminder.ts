import type { MedicationReminder } from '../types/medication';
import { format } from '../utils/dateTime';

// Generate a unique ID for each reminder
function generateReminderId(date: Date, index: number, page: number): string {
  const dateStr = format(date, 'YYYYMMDD');
  const timeStr = String(page * 100 + index).padStart(3, '0');
  return `${dateStr}-${timeStr}`;
}

// Mock data generator for demo purposes
function generateMockReminders(date: Date, page: number = 0): MedicationReminder[] {
  // First page reminders
  if (page === 0) {
    return [
      {
        id: generateReminderId(date, 1, page),
        time: '08:00',
        medication: '阿莫西林',
        dosage: '2片',
        type: 'reminder',
        isCompleted: false
      },
      {
        id: generateReminderId(date, 2, page),
        time: '12:00',
        medication: '布洛芬',
        dosage: '1片',
        type: 'reminder',
        isCompleted: false
      }
    ];
  }

  // Additional reminders for subsequent pages
  return [
    {
      id: generateReminderId(date, 1, page),
      time: '14:00',
      medication: '维生素 C',
      dosage: '100ml',
      type: 'low_stock',
      remainingQuantity: 50,
      totalQuantity: 500
    },
    {
      id: generateReminderId(date, 2, page),
      time: '16:00',
      medication: '感冒药',
      dosage: '1包',
      type: 'expiration',
      expirationDate: '2024-02-01'
    }
  ];
}

export const medicationReminderService = {
  async getReminders(date: Date, page: number = 0): Promise<MedicationReminder[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return generateMockReminders(date, page);
  }
};