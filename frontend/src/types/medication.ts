export interface MedicationReminder {
  id: string;
  time: string;
  medication: string;
  dosage: number;
  type: "reminder" | "expiration" | "low_stock";
  expirationDate?: string;
  isCompleted?: boolean;
  remainingQuantity?: number;
  totalQuantity?: number;
  currentDay?: number;
  totalDays?: number;
  todayDose?: number;
  totalDosePerDay?: number;
  totalPacks?: number;
  pillsPerPack?: number;
  currentPack?: number;
  currentPill?: number;
  dosageUnit?: string;
  packUnit?: string;
}

export interface CheckInRecord {
  id: string;
  reminderId: string;
  completedAt: string;
}
