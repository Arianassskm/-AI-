import { User } from '../types/user';

export const users: User[] = [
  {
    id: '1',
    name: '张三',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    email: 'zhangsan@example.com',
    phone: '138 **** 5678',
    location: '北京市朝阳区',
    role: '自己',
    health: {
      height: 175,
      weight: 68,
      age: 35,
      bloodType: 'A型',
      allergies: ['青霉素', '花粉']
    }
  },
  {
    id: '2',
    name: '见过',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
    email: 'jianguo@example.com',
    phone: '139 **** 1234',
    location: '北京市海淀区',
    role: '爸爸',
    health: {
      height: 172,
      weight: 75,
      age: 65,
      bloodType: 'B型',
      allergies: ['海鲜']
    }
  },
  {
    id: '3',
    name: '囡囡',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
    email: 'nannan@example.com',
    phone: '137 **** 9876',
    location: '北京市朝阳区',
    role: '宝贝',
    health: {
      height: 120,
      weight: 25,
      age: 6,
      bloodType: 'A型',
      allergies: []
    }
  },
  {
    id: '4',
    name: '小七',
    avatar: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop',
    email: 'xiaoqi@example.com',
    phone: '135 **** 4321',
    location: '北京市朝阳区',
    role: '宠物',
    health: {
      height: 30,
      weight: 5,
      age: 3,
      bloodType: '未知',
      allergies: []
    }
  }
];