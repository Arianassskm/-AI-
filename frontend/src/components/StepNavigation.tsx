import { ArrowLeft, ArrowRight } from 'lucide-react';

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  onComplete: () => void;
}

export function StepNavigation({ 
  currentStep, 
  totalSteps, 
  onNext, 
  onPrev,
  onComplete 
}: StepNavigationProps) {
  return (
    <div className="flex gap-3">
      {currentStep > 1 && (
        <button
          onClick={onPrev}
          className="flex-1 py-3 border border-green-500 text-green-500 rounded-xl font-medium hover:bg-green-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 inline-block mr-2" />
          上一步
        </button>
      )}
      <button
        onClick={currentStep < totalSteps ? onNext : onComplete}
        className="flex-1 py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors"
      >
        {currentStep < totalSteps ? (
          <>
            下一步
            <ArrowRight className="w-5 h-5 inline-block ml-2" />
          </>
        ) : (
          '生成复诊交流内容'
        )}
      </button>
    </div>
  );
}