import { useState } from "react";
import { GuideTypeSelector } from "./GuideTypeSelector";
import { UserContextForm } from "./UserContextForm";
import type {
  GuideType,
  MedicationInfo,
  UserContext,
  MedicationGuide,
} from "../../types/medicationGuide";
import { useAI } from "../../hooks/useAI";
import LoadingOverlay from "../loading/LoadingOverlay";

export function MedicationGuideFlow() {
  const [selectedMedication, setSelectedMedication] =
    useState<MedicationInfo | null>(null);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const { generateMedicationGuide } = useAI();
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectType = (type: GuideType) => {
    // 这里应该从实际数据中获取药品信息
    setSelectedMedication({
      id: "1",
      name: "示例药品",
      type,
      usageMethod: "示例用法",
      frequency: "每日一次",
    });
  };

  const handleSubmitContext = async (context: UserContext) => {
    if (!selectedMedication) return;

    setIsLoading(true);
    try {
      const result = await generateMedicationGuide(
        selectedMedication.name,
        context?.experience ?? "",
        context?.preferences?.detailLevel ?? ""
      );
      setAnalysisResult(result);
    } catch (error) {
      console.error("Failed to generate guide:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!selectedMedication) {
    return <GuideTypeSelector onSelect={handleSelectType} />;
  }

  if (!analysisResult) {
    return (
      <div className="space-y-4">
        <h3 className="font-medium text-gray-800">
          为{selectedMedication.name}生成个性化指引
        </h3>
        <UserContextForm onSubmit={handleSubmitContext} />
        <LoadingOverlay isLoading={isLoading} />
      </div>
    );
  }

  return (
    <div className="p-4 bg-blue-50 rounded-xl max-h-96 overflow-auto">
      <p className="text-sm text-gray-600 whitespace-pre-line">
        {analysisResult}
      </p>
    </div>
  );
}
