import { useState } from "react";
import {
  sendAIRequest,
  generateMedicationPrompt,
  generateInteractionPrompt,
  generateDiseasePrompt,
  generatePillboxPrompt,
} from "../utils/aiUtils";

export function useAI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeMedicationInteraction = async (
    medicationOne: string,
    medicationTwo: string
  ): Promise<string | null> => {
    setLoading(true);
    setError(null);

    try {
      const prompt = generateInteractionPrompt(medicationOne, medicationTwo);
      const response = await sendAIRequest(prompt);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : "分析失败，请稍后重试");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const generateMedicationGuide = async (
    medication: string,
    experience: string,
    levelOfTheGuidelines: string
  ): Promise<string | null> => {
    setLoading(true);
    setError(null);

    try {
      const prompt = generateMedicationPrompt(
        medication,
        experience,
        levelOfTheGuidelines
      );
      const response = await sendAIRequest(prompt);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : "生成指引失败，请稍后重试");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const chronicDiseaseFollowup = async (
    diseaseType: string,
    medicines: string,
    medicalHistory: string,
    physicalCondition: string
  ) => {
    try {
      const prompt = generateDiseasePrompt(
        diseaseType,
        medicines,
        medicalHistory,
        physicalCondition
      );
      const response = await sendAIRequest(prompt);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : "生成失败，请稍后重试");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const pillboxSssessments = async (
    familyMember: string,
    budget: string,
    space: string,
    condition: string
  ) => {
    try {
      const prompt = generatePillboxPrompt(
        familyMember,
        budget,
        space,
        condition
      );
      const response = await sendAIRequest(prompt);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : "生成失败，请稍后重试");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    analyzeMedicationInteraction,
    generateMedicationGuide,
    chronicDiseaseFollowup,
    pillboxSssessments,
  };
}
