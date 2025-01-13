import { prescriptionPlan } from './prescriptionPlan';

export const medicationPlans = [
  prescriptionPlan,
  {
    name: '慢性病用药',
    progress: 85,
    userName: '见过',
    startDate: '2024-03-01',
    endDate: '2024-03-31',
    medicines: [
      {
        name: '缬沙坦胶囊',
        progress: 85,
        color: 'bg-blue-500',
        imageUrl: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=500&h=500&fit=crop',
        dosage: '80mg',
        frequency: '每日1次',
        duration: '30天'
      },
      {
        name: '二甲双胍片',
        progress: 80,
        color: 'bg-green-500',
        imageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=500&h=500&fit=crop',
        dosage: '0.5g',
        frequency: '每日2次',
        duration: '30天'
      }
    ]
  },
  {
    name: '百日咳治疗',
    progress: 60,
    userName: '囡囡',
    startDate: '2024-03-10',
    endDate: '2024-03-24',
    medicines: [
      {
        name: '京都念慈菴蜜炼川贝枇杷膏',
        progress: 65,
        color: 'bg-amber-500',
        imageUrl: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=500&h=500&fit=crop',
        dosage: '10ml',
        frequency: '每日3次',
        duration: '14天'
      },
      {
        name: '阿莫西林干混悬剂',
        progress: 55,
        color: 'bg-red-500',
        imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&h=500&fit=crop',
        dosage: '0.25g',
        frequency: '每日3次',
        duration: '7天'
      }
    ]
  },
  {
    name: '趾间炎治疗',
    progress: 70,
    userName: '小七',
    startDate: '2024-03-15',
    endDate: '2024-03-28',
    medicines: [
      {
        name: '复方酮康唑软膏',
        progress: 70,
        color: 'bg-purple-500',
        imageUrl: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=500&h=500&fit=crop',
        dosage: '适量',
        frequency: '每日2次',
        duration: '14天'
      }
    ]
  }
];