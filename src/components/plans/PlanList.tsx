import { useState } from 'react';
import { PlanCard } from './PlanCard';
import { PlanDetailModal } from './PlanDetailModal';
import type { MedicationPlan } from '../../types/medicationPlan';

interface PlanListProps {
  filter: 'all' | 'active' | 'completed';
  searchQuery: string;
}

export function PlanList({ filter, searchQuery }: PlanListProps) {
  const [selectedPlan, setSelectedPlan] = useState<MedicationPlan | null>(null);

  // Mock data - 实际项目中应该从 API 获取
  const plans: MedicationPlan[] = [
    {
      id: '1',
      name: '感冒治疗',
      startDate: '2024-01-15',
      endDate: '2024-01-22',
      status: 'active',
      progress: 75,
      medicines: [
        {
          name: '布洛芬',
          dosage: '400mg',
          frequency: '每日2次',
          duration: '7天',
          imageUrl: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=500&h=500&fit=crop'
        }
      ]
    },
    {
      id: '2',
      name: '高血压调理',
      startDate: '2024-01-01',
      endDate: '2024-01-31',
      status: 'active',
      progress: 85,
      medicines: [
        {
          name: '缬沙坦',
          dosage: '80mg',
          frequency: '每日1次',
          duration: '30天',
          imageUrl: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=500&h=500&fit=crop'
        }
      ]
    }
  ];

  const filteredPlans = plans.filter(plan => {
    if (filter === 'active' && plan.status !== 'active') return false;
    if (filter === 'completed' && plan.status !== 'completed') return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        plan.name.toLowerCase().includes(query) ||
        plan.medicines.some(med => med.name.toLowerCase().includes(query))
      );
    }
    return true;
  });

  return (
    <div className="space-y-4">
      {filteredPlans.map(plan => (
        <PlanCard
          key={plan.id}
          plan={plan}
          onClick={() => setSelectedPlan(plan)}
        />
      ))}

      {filteredPlans.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">暂无符合条件的用药计划</p>
        </div>
      )}

      <PlanDetailModal
        plan={selectedPlan}
        isOpen={!!selectedPlan}
        onClose={() => setSelectedPlan(null)}
      />
    </div>
  );
}