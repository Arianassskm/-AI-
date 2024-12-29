import { Video, Image as ImageIcon } from 'lucide-react';
import type { GuideStep } from './MedicationGuideTypes';

interface GuideStepViewerProps {
  step: GuideStep;
  currentStep: number;
  totalSteps: number;
}

export function GuideStepViewer({ step, currentStep, totalSteps }: GuideStepViewerProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm text-gray-500">
        <span>步骤 {currentStep}/{totalSteps}</span>
      </div>

      <h3 className="text-lg font-medium text-gray-800">{step.title}</h3>
      <p className="text-gray-600">{step.description}</p>

      {(step.imageUrl || step.videoUrl) && (
        <div className="mt-4 rounded-xl overflow-hidden bg-gray-50">
          {step.videoUrl ? (
            <div className="aspect-video relative">
              <video
                src={step.videoUrl}
                controls
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Video className="w-12 h-12 text-white" />
              </div>
            </div>
          ) : step.imageUrl ? (
            <div className="aspect-video relative">
              <img
                src={step.imageUrl}
                alt={step.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <ImageIcon className="w-12 h-12 text-white" />
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}