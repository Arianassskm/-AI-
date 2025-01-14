import { defHttp, Response } from "@/utils/request";

export interface Medication {
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
  createdAt: string;
  updatedAt: string;
}

export interface CreateMedicationDto {
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
}

const API_BASE_URL = "/medicines";

export const medicationService = {
  /**
   * 获取所有药品
   */
  async getAllMedications(): Promise<Response<Medication[]>> {
    try {
      const response = await defHttp.get(`${API_BASE_URL}/findAll`);
      return response;
    } catch (err) {
      return {
        success: false,
        message: err instanceof Error ? err.message : "获取药品列表失败",
      };
    }
  },

  /**
   * 创建新药品
   */
  async createMedication(
    medication: CreateMedicationDto
  ): Promise<Response<Medication>> {
    try {
      const response = await defHttp.post(`${API_BASE_URL}/create`, medication);
      return response;
    } catch (err) {
      return {
        success: false,
        message: err instanceof Error ? err.message : "创建药品失败",
      };
    }
  },

  /**
   * 更新药品信息
   */
  async updateMedication(
    id: number,
    updates: Partial<CreateMedicationDto>
  ): Promise<Response> {
    try {
      return await defHttp.put(`${API_BASE_URL}/update/${id}`, updates);
    } catch (err) {
      return {
        success: false,
        error: {
          message: err instanceof Error ? err.message : "更新药品信息失败",
        },
      };
    }
  },

  /**
   * 删除药品
   */
  async deleteMedication(id: number): Promise<Response> {
    try {
      const response = await fetch(`${API_BASE_URL}/delete/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("删除药品失败");

      return { error: null };
    } catch (err) {
      return {
        error: {
          message: err instanceof Error ? err.message : "删除药品失败",
        },
      };
    }
  },
};
