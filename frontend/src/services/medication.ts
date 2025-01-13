export interface Medication {
  id: string;
  name: string;
  nameEn?: string;
  description?: string;
  storageCondition?: string;
  category: string;
  imageUrl?: string;
}

export interface MedicationCabinetItem extends Medication {
  quantity: number;
  expiryDate: string;
}

export interface MedicationError {
  message: string;
}

export const medicationService = {
  /**
   * 获取用户的药箱内容
   */
  async getMedicationCabinet(userId: string): Promise<{
    data: MedicationCabinetItem[];
    error: MedicationError | null;
  }> {
    try {
      const { data, error } = await supabase
        .from("medication_cabinet")
        .select(
          `
          *,
          medication:medications (*)
        `
        )
        .eq("user_id", userId);

      if (error) throw error;

      return {
        data: data.map((item) => ({
          id: item.medication.id,
          name: item.medication.name,
          nameEn: item.medication.name_en,
          description: item.medication.description,
          storageCondition: item.medication.storage_condition,
          category: item.medication.category,
          imageUrl: item.medication.image_url,
          quantity: item.quantity,
          expiryDate: item.expiry_date,
        })),
        error: null,
      };
    } catch (err) {
      return {
        data: [],
        error: {
          message: err instanceof Error ? err.message : "获取药箱内容失败",
        },
      };
    }
  },

  /**
   * 添加药品到药箱
   */
  async addToMedicationCabinet(
    userId: string,
    medicationId: string,
    quantity: number,
    expiryDate: string
  ): Promise<{ error: MedicationError | null }> {
    try {
    } catch (err) {
      return {
        error: { message: err instanceof Error ? err.message : "添加药品失败" },
      };
    }
  },

  /**
   * 更新药箱中的药品信息
   */
  async updateMedicationCabinet(
    userId: string,
    medicationId: string,
    updates: {
      quantity?: number;
      expiryDate?: string;
    }
  ): Promise<{ error: MedicationError | null }> {
    try {
      const { error } = await supabase
        .from("medication_cabinet")
        .update({
          quantity: updates.quantity,
          expiry_date: updates.expiryDate,
        })
        .eq("user_id", userId)
        .eq("medication_id", medicationId);

      if (error) throw error;

      return { error: null };
    } catch (err) {
      return {
        error: {
          message: err instanceof Error ? err.message : "更新药品信息失败",
        },
      };
    }
  },

  /**
   * 从药箱中移除药品
   */
  async removeFromMedicationCabinet(
    userId: string,
    medicationId: string
  ): Promise<{ error: MedicationError | null }> {
    try {
      const { error } = await supabase
        .from("medication_cabinet")
        .delete()
        .eq("user_id", userId)
        .eq("medication_id", medicationId);

      if (error) throw error;

      return { error: null };
    } catch (err) {
      return {
        error: { message: err instanceof Error ? err.message : "移除药品失败" },
      };
    }
  },

  /**
   * 搜索药品
   */
  async searchMedications(query: string): Promise<{
    data: Medication[];
    error: MedicationError | null;
  }> {
    try {
      const { data, error } = await supabase
        .from("medications")
        .select("*")
        .or(`name.ilike.%${query}%,name_en.ilike.%${query}%`)
        .limit(10);

      if (error) throw error;

      return {
        data: data.map((item) => ({
          id: item.id,
          name: item.name,
          nameEn: item.name_en,
          description: item.description,
          storageCondition: item.storage_condition,
          category: item.category,
          imageUrl: item.image_url,
        })),
        error: null,
      };
    } catch (err) {
      return {
        data: [],
        error: { message: err instanceof Error ? err.message : "搜索药品失败" },
      };
    }
  },
};
