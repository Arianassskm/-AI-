import { Clock, AlertCircle } from 'lucide-react';
import type { Medicine } from '../../types/medicationPlan';

interface DosageSchedulerProps {
  medicines: Medicine[];
  onMedicinesChange: (medicines: Medicine[]) => void;
}

export function DosageScheduler({
  medicines,
  onMedicinesChange
}: DosageSchedulerProps) {
  const updateMedicine = (index: number, updates: Partial<Medicine>) => {
    onMedicinesChange(
      medicines.map((medicine, i) =>
        i === index ? { ...medicine, ...updates } : medicine
      )
    );
  };

  return (
    <div className="space-y-6">
      {medicines.map((medicine, index) => (
        <div key={medicine.name} className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={medicine.imageUrl}
                alt={medicine.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <h3 className="font-medium text-gray-800">{medicine.name}</h3>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                单次用量
              </label>
              <input
                type="text"
                value={medicine.dosage}
                onChange={(e) => updateMedicine(index, { dosage: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                服用频次
              </label>
              <select
                value={medicine.frequency}
                onChange={(e) => updateMedicine(index, { frequency: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="每日1次">每日1次</option>
                <option value="每日2次">每日2次</option>
                <option value="每日3次">每日3次</option>
                <option value="每日4次">每日4次</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              服药时间
            </label>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <select
                className="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="meals">饭后服用</option>
                <option value="before_meals">饭前服用</option>
                <option value="with_meals">随餐服用</option>
                <option value="empty_stomach">空腹服用</option>
              </select>
            </div>
          </div>

          <div className="bg-amber-50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-amber-600">
              <AlertCircle className="w-4 h-4" />
              <p className="text-sm">请遵医嘱服用，若出现不适请及时就医</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}