import { medicationPlans } from '../data/sampleData';
import { Check } from 'lucide-react';

interface MedicationHistorySelectorProps {
  selectedPlans: string[];
  onTogglePlan: (planName: string) => void;
}

export function MedicationHistorySelector({ 
  selectedPlans, 
  onTogglePlan 
}: MedicationHistorySelectorProps) {
  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-gray-700 mb-2">选择已完成的用药计划：</h4>
      <div className="space-y-3">
        {medicationPlans.map((plan) => (
          <div
            key={plan.name}
            onClick={() => onTogglePlan(plan.name)}
            className={`p-4 rounded-xl cursor-pointer transition-all ${
              selectedPlans.includes(plan.name)
                ? 'bg-green-50 border-2 border-green-500'
                : 'bg-gray-50 border-2 border-transparent'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={plan.medicines[0].imageUrl}
                  alt={plan.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-medium text-gray-800">{plan.name}</h3>
                  <p className="text-sm text-gray-500">
                    {plan.startDate} - {plan.endDate}
                  </p>
                </div>
              </div>
              {selectedPlans.includes(plan.name) && (
                <Check className="w-5 h-5 text-green-500" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}