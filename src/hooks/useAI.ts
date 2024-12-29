import { useState } from 'react';
import { sendAIRequest, generateMedicationPrompt, generateInteractionPrompt } from '../utils/aiUtils';

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
      setError(err instanceof Error ? err.message : '分析失败，请稍后重试');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const generateMedicationGuide = async (
    medication: string,
    condition: string
  ): Promise<string | null> => {
    setLoading(true);
    setError(null);

    try {
      const prompt = generateMedicationPrompt(medication, condition);
      const response = await sendAIRequest(prompt);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : '生成指南失败，请稍后重试');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    analyzeMedicationInteraction,
    generateMedicationGuide
  };
}