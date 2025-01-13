import type {
  GuideType,
  MedicationInfo,
  UserContext,
  MedicationGuide,
} from "../types/medicationGuide";

// Fallback guide data moved to a separate file for better organization
import { FALLBACK_GUIDES } from "../data/fallbackGuides";

export const aiGuideService = {
  async generatePersonalizedGuide(
    medication: MedicationInfo,
    userContext: UserContext,
    baseSteps: any
  ): Promise<MedicationGuide> {
    const response = await fetch("/api/guides/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ medication, userContext, baseSteps }),
    });

    if (!response.ok) {
      throw new Error("AI service failed");
    }

    return response.json();
  },

  async saveGuide(
    medicationId: string,
    guide: MedicationGuide,
    userContext: UserContext
  ): Promise<void> {
    try {
    } catch (error) {
      console.error("Failed to save generated guide:", error);
    }
  },

  createFallbackGuide(
    medication: MedicationInfo,
    userContext: UserContext
  ): MedicationGuide {
    return {
      type: medication.type,
      medicationId: medication.id,
      ...FALLBACK_GUIDES[medication.type],
      userContext,
    } as MedicationGuide;
  },
};
