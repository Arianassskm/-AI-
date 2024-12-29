import { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import type { Medicine } from '../../types/medicationPlan';

interface MedicineSelectorProps {
  selectedMedicines: Medicine[];
  onMedicinesChange: (medicines: Medicine[]) => void;
}

export function MedicineSelector({
  selectedMedicines,
  onMedicinesChange
}: MedicineSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - 实际项目中应该从 API 获取
  const availableMedicines: Medicine[] = [
    {
      name: '布洛芬',
      dosage: '400mg',
      frequency: '每日2次',
      duration: '7天',
      imageUrl: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=500&h=500&fit=crop'
    },
    {
      name: '阿莫西林',
      dosage: '500mg',
      frequency: '每日3次',
      duration: '5天',
      imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&h=500&fit=crop'
    }
  ];

  const filteredMedicines = availableMedicines.filter(medicine =>
    medicine.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleMedicine = (medicine: Medicine) => {
    const isSelected = selectedMedicines.some(m => m.name === medicine.name);
    if (isSelected) {
      onMedicinesChange(selectedMedicines.filter(m => m.name !== medicine.name));
    } else {
      onMedicinesChange([...selectedMedicines, medicine]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="搜索药品..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      </div>

      <div className="space-y-3">
        {filteredMedicines.map((medicine) => {
          const isSelected = selectedMedicines.some(m => m.name === medicine.name);
          return (
            <div
              key={medicine.name}
              onClick={() => toggleMedicine(medicine)}
              className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-all ${
                isSelected
                  ? 'bg-blue-50 border-2 border-blue-500'
                  : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
              }`}
            >
              <img
                src={medicine.imageUrl}
                alt={medicine.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-medium text-gray-800">{medicine.name}</h3>
                <p className="text-sm text-gray-500">{medicine.dosage}</p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 ${
                isSelected
                  ? 'border-blue-500 bg-blue-500'
                  : 'border-gray-300'
              }`} />
            </div>
          );
        })}
      </div>

      <button
        type="button"
        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors flex items-center justify-center gap-2"
      >
        <Plus className="w-5 h-5" />
        添加其他药品
      </button>
    </div>
  );
}