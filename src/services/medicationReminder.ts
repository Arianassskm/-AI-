import type { MedicationReminder } from "../types/medication";
import { format } from "../utils/dateTime";

// Generate a unique ID for each reminder
function generateReminderId(date: Date, index: number, page: number): string {
  const dateStr = format(date, "YYYYMMDD");
  const timeStr = String(page * 100 + index).padStart(3, "0");
  return `${dateStr}-${timeStr}`;
}

// Mock data generator for demo purposes
function generateMockReminders(
  date: Date,
  page: number = 0
): MedicationReminder[] {
  // First page reminders
  if (page === 0) {
    return [
      {
        id: generateReminderId(date, 1, page),
        time: "08:00",
        medication: "阿莫西林",
        dosage: 2,
        type: "reminder",
        isCompleted: false,
        currentDay: 1,
        totalDays: 3,
        todayDose: 2,
        totalDosePerDay: 4,
        totalPacks: 3,
        pillsPerPack: 6,
        currentPack: 1,
        currentPill: 4,
        dosageUnit: "片",
        packUnit: "盒",
      },
      {
        id: generateReminderId(date, 2, page),
        time: "12:00",
        medication: "布洛芬",
        dosage: 1,
        type: "reminder",
        isCompleted: false,
        currentDay: 1,
        totalDays: 3,
        todayDose: 2,
        totalDosePerDay: 4,
        totalPacks: 2,
        pillsPerPack: 8,
        currentPack: 1,
        currentPill: 2,
        dosageUnit: "颗",
        packUnit: "盒",
      },
      {
        id: generateReminderId(date, 3, page),
        time: "14:00",
        medication: "头孢",
        dosage: 2,
        type: "reminder",
        isCompleted: false,
        currentDay: 2,
        totalDays: 3,
        todayDose: 1,
        totalDosePerDay: 2,
        totalPacks: 1,
        pillsPerPack: 20,
        currentPack: 1,
        currentPill: 4,
        dosageUnit: "颗",
        packUnit: "盒",
      },
      {
        id: generateReminderId(date, 4, page),
        time: "16:00",
        medication: "999感冒灵",
        dosage: 1,
        type: "reminder",
        isCompleted: false,
        currentDay: 4,
        totalDays: 5,
        todayDose: 3,
        totalDosePerDay: 3,
        totalPacks: 1,
        pillsPerPack: 20,
        currentPack: 1,
        currentPill: 12,
        dosageUnit: "袋",
        packUnit: "盒",
      },
    ];
  }

  // Additional reminders for subsequent pages
  return [
    {
      id: generateReminderId(date, 1, page),
      time: "14:00",
      medication: "维生素 C",
      dosage: 10,
      type: "low_stock",
      remainingQuantity: 50,
      totalQuantity: 500,
      currentDay: 4,
      totalDays: 5,
      todayDose: 3,
      totalDosePerDay: 3,
      totalPacks: 1,
      pillsPerPack: 200,
      currentPack: 1,
      currentPill: 120,
      dosageUnit: "ml",
      packUnit: "瓶",
    },
    {
      id: generateReminderId(date, 2, page),
      time: "16:00",
      medication: "感冒药",
      dosage: 1,
      type: "expiration",
      expirationDate: "2024-02-01",
      currentDay: 4,
      totalDays: 5,
      todayDose: 3,
      totalDosePerDay: 3,
      totalPacks: 1,
      pillsPerPack: 20,
      currentPack: 1,
      currentPill: 12,
      dosageUnit: "袋",
      packUnit: "盒",
    },
  ];
}

export const medicationReminderService = {
  async getReminders(
    date: Date,
    page: number = 0
  ): Promise<MedicationReminder[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return generateMockReminders(date, page);
  },
};
