import { useState } from 'react';
import { MultiPhotoCapture } from '../camera/MultiPhotoCapture';
import { CaptureStep } from '../camera/CaptureGuide';

const SCAN_STEPS: CaptureStep[] = [
  {
    id: 1,
    title: '处方正面',
    description: '请拍摄处方单正面，确保医嘱内容清晰可见',
    example: 'https://images.unsplash.com/photo-1583912267550-d6c2f5e2d8f5?w=300&h=300&fit=crop'
  },
  {
    id: 2,
    title: '医师签名',
    description: '拍摄医师签名和医院盖章部分',
    example: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop'
  },
  {
    id: 3,
    title: '其他说明',
    description: '拍摄其他重要说明或注意事项',
    example: 'https://images.unsplash.com/photo-1576671081837-49000212a370?w=300&h=300&fit=crop'
  }
];

interface PrescriptionScanGuideProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (images: string[]) => void;
}

export function PrescriptionScanGuide({ isOpen, onClose, onComplete }: PrescriptionScanGuideProps) {
  const [currentStep, setCurrentStep] = useState(1);

  if (!isOpen) return null;

  return (
    <MultiPhotoCapture
      onCapture={onComplete}
      onClose={onClose}
      maxPhotos={3}
      captureSteps={SCAN_STEPS}
      currentStep={currentStep}
      onStepChange={setCurrentStep}
    />
  );
}