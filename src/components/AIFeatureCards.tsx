import { useState } from 'react';
import { Pill, Activity, Clock, Heart, Stethoscope, FileText } from 'lucide-react';
import { MedicationCabinetAssessment } from './MedicationCabinetAssessment';
import { ChronicDiseaseAssistant } from './ChronicDiseaseAssistant';
import { MedicationInteractionModal } from './MedicationInteractionModal';
import { MedicationGuideModal } from './MedicationGuideModal';

const features = [
  {
    id: 'cabinet',
    icon: Pill,
    title: '药箱评估',
    description: '定制专属家庭药箱',
    color: 'bg-blue-500',
    gradient: 'from-blue-50 to-blue-100/50'
  },
  {
    id: 'chronic',
    icon: Heart,
    title: '慢病助手',
    description: '智能管理慢性病',
    color: 'bg-rose-500',
    gradient: 'from-rose-50 to-rose-100/50'
  },
  {
    id: 'interaction',
    icon: Activity,
    title: '用药评估',
    description: '药物相互作用分析',
    color: 'bg-amber-500',
    gradient: 'from-amber-50 to-amber-100/50'
  },
  {
    id: 'guide',
    icon: FileText,
    title: '用药指导',
    description: '专业用药指导',
    color: 'bg-emerald-500',
    gradient: 'from-emerald-50 to-emerald-100/50'
  }
];

export function AIFeatureCards() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showAssessment, setShowAssessment] = useState(false);
  const [showChronicAssistant, setShowChronicAssistant] = useState(false);
  const [showInteractionModal, setShowInteractionModal] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);

  const handleCardClick = (id: string) => {
    setSelectedId(id);
    if (id === 'cabinet') {
      setShowAssessment(true);
    } else if (id === 'chronic') {
      setShowChronicAssistant(true);
    } else if (id === 'interaction') {
      setShowInteractionModal(true);
    } else if (id === 'guide') {
      setShowGuideModal(true);
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        {features.map(({ id, icon: Icon, title, description, color, gradient }) => (
          <button
            key={id}
            onClick={() => handleCardClick(id)}
            className="relative overflow-hidden rounded-xl p-4 text-left transition-all duration-300 hover:shadow-lg active:scale-[0.98]"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
            <div className="relative">
              <div className={`w-10 h-10 rounded-xl ${color} bg-opacity-10 flex items-center justify-center mb-3`}>
                <Icon className={`w-5 h-5 ${color.replace('bg-', 'text-')}`} />
              </div>
              <h3 className="text-base font-medium text-gray-800 mb-1">{title}</h3>
              <p className="text-sm text-gray-500">{description}</p>
            </div>
          </button>
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