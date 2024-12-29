import { Clock } from 'lucide-react';
import { MedicineCard } from '../MedicineCard';
import { medicationPlans } from '../../data/sampleData';

interface ActiveMedicationCardProps {
  userId: string;
}

export function ActiveMedicationCard({ userId }: ActiveMedicationCardProps) {
  const userPlans = medicationPlans.filter(plan => plan.userName === userId);
  
  if (userPlans.length === 0) return null;

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="flex items-center gap-2 text-gray-800 font-medium mb-3">
        <Clock className="w-5 h-5 text-purple-500" />
        当前用药计划
      </h3>

      <div className="space-y-4">
        {userPlans.map(plan => (
          <div 
            key={plan.name}
            className="bg-white rounded-lg p-4 shadow-sm"
          >
            <div className="mb-3">
              <h4 className="font-medium text-gray-800">{plan.name}</h4>
              <p className="text-sm text-gray-500">
                {plan.startDate} - {plan.endDate}
              </p>
            </div>
            <div className="flex overflow-x-auto gap-4 pb-2 -mx-2 px-2 scrollbar-hide">
              {plan.medicines.map(medicine => (
                <MedicineCard
                  key={medicine.name}
                  {...medicine}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}