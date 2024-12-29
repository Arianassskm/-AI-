import { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '../ui/Button';
import { GuideTypeSelector } from './GuideTypeSelector';
import { UserContextForm } from './UserContextForm';
import { GuideStepViewer } from './GuideStepViewer';
import { aiGuideService } from '../../services/aiGuideService';
import type { 
  GuideType, 
  MedicationInfo,
  UserContext, 
  MedicationGuide 
} from '../../types/medicationGuide';

export function MedicationGuideFlow() {
  const [selectedMedication, setSelectedMedication] = useState<MedicationInfo | null>(null);
  const [guide, setGuide] = useState<MedicationGuide | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSelectType = (type: GuideType) => {
    // 这里应该从实际数据中获取药品信息
    setSelectedMedication({
      id: '1',
      name: '示例药品',
      type,
      usageMethod: '示例用法',
      frequency: '每日一次'
    });
  };

  const handleSubmitContext = async (context: UserContext) => {
    if (!selectedMedication) return;
    
    setLoading(true);
    try {
      const generatedGuide = await aiGuideService.generateGuide(
        selectedMedication,
        context
      );
      setGuide(generatedGuide);
      setCurrentStepIndex(0);
    } catch (error) {
      console.error('Failed to generate guide:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (guide && currentStepIndex < guide.steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    } else {
      setGuide(null);
      setSelectedMedication(null);
    }
  };

  if (!selectedMedication) {
    return <GuideTypeSelector onSelect={handleSelectType} />;
  }

  if (!guide) {
    return (
      <div className="space-y-4">
        <h3 className="font-medium text-gray-800">
          为{selectedMedication.name}生成个性化指引
        </h3>
        <UserContextForm onSubmit={handleSubmitContext} />
      </div>
    );
  }

  const currentStep = guide.steps[currentStepIndex];
  const isLastStep = currentStepIndex === guide.steps.length - 1;

  return (
    <div className="space-y-6">
      <GuideStepViewer
        step={currentStep}
        currentStep={currentStepIndex + 1}
        totalSteps={guide.steps.length}
      />

      <div className="flex gap-3">
        <Button variant="outline" onClick={handleBack} className="flex-1">
          <ChevronLeft className="w-4 h-4 mr-1" />
          {currentStepIndex === 0 ? '返回' : '上一步'}
        </Button>
        {!isLastStep && (
          <Button onClick={handleNext} className="flex-1">
            下一步
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        )}
      </div>
    </div>
  );
}