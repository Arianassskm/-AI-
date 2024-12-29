import type { GuideType, MedicationGuide } from '../types/medicationGuide';

export const FALLBACK_GUIDES: Record<GuideType, Partial<MedicationGuide>> = {
  nebulizer_compressor: {
    title: '压缩式雾化器使用指南',
    steps: [
      {
        id: '1',
        title: '准备设备',
        description: '1. 清洁双手\n2. 检查设备完整性\n3. 连接导管和面罩\n4. 加入正确剂量的药液',
        imageUrl: 'https://images.unsplash.com/photo-1584015314445-225a93427c2b?w=800'
      },
      {
        id: '2',
        title: '使用前检查',
        description: '1. 确保电源连接正确\n2. 检查药液量\n3. 调整面罩位置\n4. 设置合适的雾化时间',
        imageUrl: 'https://images.unsplash.com/photo-1584015314445-225a93427c2b?w=800'
      },
      {
        id: '3',
        title: '开始雾化',
        description: '1. 保持正确坐姿\n2. 开启设备\n3. 正常呼吸\n4. 注意观察药液雾化情况',
        imageUrl: 'https://images.unsplash.com/photo-1584015314445-225a93427c2b?w=800'
      }
    ]
  },
  // Add more fallback guides for other types...
};