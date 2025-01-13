export interface Medicine {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  imageUrl: string;
}

export interface MedicationPlan {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed';
  progress: number;
  medicines: Medicine[];
}