import type { GuideType, MedicationGuide } from '../components/guide/MedicationGuideTypes';

const GUIDE_DATA: Record<GuideType, MedicationGuide> = {
  injection: {
    type: 'injection',
    title: '胰岛素注射指南',
    description: '正确使用胰岛素注射笔的完整指南',
    steps: [
      {
        id: '1',
        title: '准备注射',
        description: '清洗双手，检查胰岛素，准备注射笔',
        imageUrl: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=800'
      },
      {
        id: '2',
        title: '选择注射部位',
        description: '选择腹部、大腿或上臂等推荐部位，注意轮换注射位置',
        imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800'
      },
      {
        id: '3',
        title: '执行注射',
        description: '正确持握注射笔，垂直刺入皮肤，完成注射',
        imageUrl: 'https://images.unsplash.com/photo-1583324113626-70df0f4deaab?w=800'
      }
    ]
  },
  inhaler: {
    type: 'inhaler',
    title: '哮喘喷雾器使用指南',
    description: '正确使用哮喘喷雾器的步骤说明',
    steps: [
      {
        id: '1',
        title: '准备喷雾器',
        description: '摇晃喷雾器，取下保护盖',
        imageUrl: 'https://images.unsplash.com/photo-1584015314445-225a93427c2b?w=800'
      },
      {
        id: '2',
        title: '正确吸入',
        description: '深呼气后含住吸嘴，同时按压喷雾器并缓慢吸气',
        imageUrl: 'https://images.unsplash.com/photo-1584015314445-225a93427c2b?w=800'
      }
    ]
  },
  nebulizer: {
    type: 'nebulizer',
    title: '雾化器使用指南',
    description: '安全有效使用雾化器的详细步骤',
    steps: [
      {
        id: '1',
        title: '准备设备',
        description: '清洁雾化器，加入药液',
        imageUrl: 'https://images.unsplash.com/photo-1584015314445-225a93427c2b?w=800'
      },
      {
        id: '2',
        title: '进行雾化',
        description: '正确佩戴面罩，开始雾化治疗',
        imageUrl: 'https://images.unsplash.com/photo-1584015314445-225a93427c2b?w=800'
      }
    ]
  },
  suction: {
    type: 'suction',
    title: '吸痰器使用指南',
    description: '正确使用和维护吸痰器的指南',
    steps: [
      {
        id: '1',
        title: '设备准备',
        description: '检查设备完整性，连接导管',
        imageUrl: 'https://images.unsplash.com/photo-1584015314445-225a93427c2b?w=800'
      },
      {
        id: '2',
        title: '执行吸痰',
        description: '调节负压，进行吸痰操作',
        imageUrl: 'https://images.unsplash.com/photo-1584015314445-225a93427c2b?w=800'
      }
    ]
  }
};

export const medicationGuideService = {
  getGuideByType(type: GuideType): MedicationGuide {
    return GUIDE_DATA[type];
  }
};