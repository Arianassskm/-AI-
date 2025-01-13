import { useState } from 'react';
import { MultiPhotoCapture } from '../camera/MultiPhotoCapture';
import { CaptureStep } from '../camera/CaptureGuide';

const SCAN_STEPS: CaptureStep[] = [
  {
    id: 1,
    title: '药品正面',
    description: '请拍摄药品包装正面，确保品牌和名称清晰可见',
    example: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop'
  },
  {
    id: 2,
    title: '成分用法用量',
    description: '拍摄成分说明和用法用量部分，用于创建用药计划',
    example: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=300&h=300&fit=crop'
  },
  {
    id: 3,
    title: '规格包装',
    description: '拍摄药品规格和包装信息，用于追踪药品消耗',
    example: 'https://images.unsplash.com/photo-1576671081837-49000212a370?w=300&h=300&fit=crop'
  }
];

interface MedicineScanGuideProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (images: string[]) => void;
}

export function MedicineScanGuide({ isOpen, onClose, onComplete }: MedicineScanGuideProps) {
  const [currentStep, setCurrentStep] = useState(1);

  if (!isOpen) return null;

  const handlePhotosCapture = (images: string[]) => {
    onComplete(images);
  };

  return (
    <MultiPhotoCapture
      onCapture={handlePhotosCapture}
      onClose={onClose}
      maxPhotos={3}
      captureSteps={SCAN_STEPS}
      currentStep={currentStep}
      onStepChange={setCurrentStep}
    />
  );
}