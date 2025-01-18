import { useState } from "react";
import { Pill, Activity, Heart, FileText } from "lucide-react";
import { AIFeatureCard } from "./AIFeatureCard";
import { MedicationCabinetAssessment } from "../MedicationCabinetAssessment";
import { ChronicDiseaseAssistant } from "../ChronicDiseaseAssistant";
import { MedicationInteractionModal } from "../MedicationInteractionModal";
import { MedicationGuideModal } from "../MedicationGuideModal";

const features = [
  {
    id: "cabinet",
    icon: Pill,
    title: "药箱定制",
    description: "定制专属家庭药箱",
    color: "text-primary-600",
    bgColor: "bg-surface-50",
    gradient: "from-surface-50 to-surface-100",
  },
  {
    id: "chronic",
    icon: Heart,
    title: "慢病助手",
    description: "智能管理慢性病",
    color: "text-primary-600",
    bgColor: "bg-surface-50",
    gradient: "from-surface-50 to-surface-100",
  },
  {
    id: "interaction",
    icon: Activity,
    title: "用药评估",
    description: "药物相互作用分析",
    color: "text-primary-600",
    bgColor: "bg-surface-50",
    gradient: "from-surface-50 to-surface-100",
  },
  {
    id: "guide",
    icon: FileText,
    title: "用药指导",
    description: "专业用药指导",
    color: "text-primary-600",
    bgColor: "bg-surface-50",
    gradient: "from-surface-50 to-surface-100",
  },
];

export function AIFeatureGrid() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showAssessment, setShowAssessment] = useState(false);
  const [showChronicAssistant, setShowChronicAssistant] = useState(false);
  const [showInteractionModal, setShowInteractionModal] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);

  const handleCardClick = (id: string) => {
    setSelectedId(id);
    switch (id) {
      case "cabinet":
        setShowAssessment(true);
        break;
      case "chronic":
        setShowChronicAssistant(true);
        break;
      case "interaction":
        setShowInteractionModal(true);
        break;
      case "guide":
        setShowGuideModal(true);
        break;
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        {features.map((feature) => (
          <AIFeatureCard
            key={feature.id}
            {...feature}
            onClick={() => handleCardClick(feature.id)}
          />
        ))}
      </div>

      <MedicationCabinetAssessment
        isOpen={showAssessment}
        onClose={() => setShowAssessment(false)}
      />

      <ChronicDiseaseAssistant
        isOpen={showChronicAssistant}
        onClose={() => setShowChronicAssistant(false)}
      />

      <MedicationInteractionModal
        isOpen={showInteractionModal}
        onClose={() => setShowInteractionModal(false)}
      />

      <MedicationGuideModal
        isOpen={showGuideModal}
        onClose={() => setShowGuideModal(false)}
      />
    </>
  );
}
