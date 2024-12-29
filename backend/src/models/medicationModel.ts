export interface MedicationReminder {
  id: string;
  userId: string;
  time: string;
  medication: string;
  dosage: string;
  type: 'reminder' | 'expiration';
  expirationDate?: string;
  isCompleted?: boolean;
}

export interface CheckInRecord {
  id: string;
  userId: string;
  reminderId: string;
  completedAt: string;
}