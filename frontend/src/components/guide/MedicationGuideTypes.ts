export type GuideType = 'injection' | 'inhaler' | 'nebulizer' | 'suction';

export interface GuideStep {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  videoUrl?: string;
}

export interface MedicationGuide {
  type: GuideType;
  title: string;
  description: string;
  steps: GuideStep[];
}

export const GUIDE_TYPES: Record<GuideType, string> = {
  injection: '注射类药物',
  inhaler: '吸入类药物',
  nebulizer: '雾化类药物',
  suction: '吸痰类设备'
};