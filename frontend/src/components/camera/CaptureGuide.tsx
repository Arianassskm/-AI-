import { Camera } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface CaptureStep {
  id: number;
  title: string;
  description: string;
  example?: string;
}

interface CaptureGuideProps {
  currentStep: number;
  totalPhotos: number;
  step: CaptureStep;
}

export function CaptureGuide({ currentStep, totalPhotos, step }: CaptureGuideProps) {
  return (
    <div className="absolute inset-x-4 top-20">
      <div className={cn(
        "p-4 rounded-xl",
        "bg-black/40 backdrop-blur-sm",
        "border border-white/10",
        "animate-fade-in"
      )}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium flex items-center gap-2 text-white">
            <Camera className="w-5 h-5" />
            拍摄提示 ({currentStep}/{totalPhotos})
          </h3>
          <span className="text-sm text-white/80">{step.title}</span>
        </div>
        
        <p className="text-sm text-white/90 mb-3">{step.description}</p>
        
        {step.example && (
          <div className="relative h-24 overflow-hidden rounded-lg">
            <img
              src={step.example}
              alt={`${step.title}示例`}
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <span className="absolute bottom-2 left-2 text-xs text-white/90">
              示例图片
            </span>
          </div>
        )}
      </div>
    </div>
  );
}