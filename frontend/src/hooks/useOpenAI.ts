import { useState } from "react";
import {
  generateMedicationPrompt,
  generateInteractionPrompt,
  generateDiseasePrompt,
  generatePillboxPrompt,
  generateAssessmentOfPillboxesPrompt,
} from "@/utils/aiUtils";

import { defHttp } from "@/utils/request";
import { medicineService, Medicine } from "@/services/medicineService";

const OPENAI_BASE_URL = "/openai/chat";

export function useOpenAI() {
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
      const ret = await defHttp.post(OPENAI_BASE_URL, {
        prompt,
      });
      if (ret.success) {
        return ret.data;
      } else {
        return ret.message;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "分析失败，请稍后重试");
      return "分析失败，请稍后重试";
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

      const ret = await defHttp.post(OPENAI_BASE_URL, {
        prompt,
      });
      if (ret.success) {
        return ret.data;
      } else {
        return ret.message;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "生成指引失败，请稍后重试");
      return "生成指引失败，请稍后重试";
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
      const ret = await defHttp.post(OPENAI_BASE_URL, {
        prompt,
      });
      if (ret.success) {
        return ret.data;
      } else {
        return ret.message;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "生成失败，请稍后重试");
      return "生成失败，请稍后重试";
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
      const ret = await defHttp.post(OPENAI_BASE_URL, {
        prompt,
      });
      if (ret.success) {
        return ret.data;
      } else {
        return ret.message;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "生成失败，请稍后重试");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const assessmentOfPillboxes = async () => {
    try {
      const userMedicineRet = await medicineService.getAllMedicines();
      let medicines: Medicine[] = [];
      if (userMedicineRet.success) {
        medicines = userMedicineRet.data;
      }

      const prompt = generateAssessmentOfPillboxesPrompt(medicines);
      const ret = await defHttp.post(OPENAI_BASE_URL, {
        prompt,
      });
      if (ret.success) {
        return ret.data;
      } else {
        return ret.message;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "生成失败，请稍后重试");
      return "生成失败，请稍后重试";
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
    assessmentOfPillboxes,
  };
}
