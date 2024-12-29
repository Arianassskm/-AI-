import { GuideType } from '../types/medicationGuide';
import { 
  Syringe, Droplet, Wind, CloudFog, Pill, Eye, 
  Ear, Spray, Activity, Heart, Stethoscope, 
  Timer, Cpu, PulseIcon
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface GuideTypeInfo {
  type: GuideType;
  icon: LucideIcon;
  title: string;
  description: string;
  category: string;
}

export const GUIDE_TYPES: GuideTypeInfo[] = [
  // 注射类
  {
    type: 'insulin_injection',
    icon: Syringe,
    title: '胰岛素注射',
    description: '胰岛素笔/针筒注射指导',
    category: '注射用药'
  },
  {
    type: 'subcutaneous',
    icon: Syringe,
    title: '皮下注射',
    description: '皮下注射药物使用指导',
    category: '注射用药'
  },
  // ... 其他注射类型

  // 吸入类
  {
    type: 'inhaler_mdi',
    icon: Wind,
    title: '定量吸入器',
    description: '哮喘/慢阻肺定量吸入器使用',
    category: '吸入用药'
  },
  // ... 其他吸入类型

  // 雾化类
  {
    type: 'nebulizer_compressor',
    icon: CloudFog,
    title: '压缩式雾化器',
    description: '压缩式雾化器使用指导',
    category: '雾化治疗'
  },
  // ... 其他雾化类型

  // 给药途径
  {
    type: 'oral_liquid',
    icon: Droplet,
    title: '口服液体',
    description: '口服液体药物使用指导',
    category: '口服用药'
  },
  // ... 其他给药途径

  // 医疗器械
  {
    type: 'glucose_monitor',
    icon: Activity,
    title: '血糖监测',
    description: '血糖仪使用和监测指导',
    category: '医疗器械'
  }
  // ... 其他医疗器械
];

export const GUIDE_CATEGORIES = [
  '注射用药',
  '吸入用药',
  '雾化治疗',
  '口服用药',
  '外用制剂',
  '医疗器械'
];