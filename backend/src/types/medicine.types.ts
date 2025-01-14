export interface CreateMedicineDto {
  name: string;
  nameEn?: string;
  manufacturer: string;
  specification: string;
  approvalNumber: string;
  batchNumber: string;
  expiryDate: string;
  unit: string;
  totalQuantity: number;
  currentQuantity: number;
  storageCondition: string;
  packageInfo: string;
  description?: string;
  image?: string;
  userId: number;
}

export interface UpdateMedicineDto extends Partial<CreateMedicineDto> {
  id: number;
}

export interface MedicineResponse {
  id: number;
  name: string;
  nameEn?: string;
  manufacturer: string;
  specification: string;
  approvalNumber: string;
  batchNumber: string;
  expiryDate: string;
  unit: string;
  totalQuantity: number;
  currentQuantity: number;
  storageCondition: string;
  packageInfo: string;
  description?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}
