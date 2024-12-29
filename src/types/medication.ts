export interface MedicationReminder {
  id: string;
  time: string;
  medication: string;
  dosage: string;
  type: 'reminder' | 'expiration' | 'low_stock';
  expirationDate?: string;
  isCompleted?: boolean;
  remainingQuantity?: number;
  totalQuantity?: number;
}

export interface CheckInRecord {
  id: string;
  reminderId: string;
  completedAt: string;
}