import { useState } from 'react';
import { MedicationPlanModal } from './MedicationPlanModal';

interface PlanCardProps {
  name: string;
  progress: number;
  userName: string;
  startDate: string;
  endDate: string;
  medicines: Array<{
    name: string;
    progress: number;
    color: string;
    imageUrl: string;
    dosage: string;
    frequency: string;
    duration: string;
  }>;
}

export function PlanCard({ name, progress, userName, startDate, endDate, medicines }: PlanCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div 
        className="card p-3 cursor-pointer hover:shadow-md transition-all duration-300 active:scale-[0.98]"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="h-full flex flex-col">
          <div className="mb-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500">{userName}</span>
              <span className="text-[10px] text-primary-600 font-medium">处方</span>
            </div>
            <h3 className="text-sm font-medium text-gray-800 mb-1">{name}</h3>
            <p className="text-[10px] text-gray-500">
              {startDate} - {endDate}
            </p>
          </div>
          
          <div className="mt-3">
            <div className="flex items-center gap-1.5 mb-1">
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-xs text-gray-600 flex-shrink-0 w-7">{progress}%</span>
            </div>
            <div className="flex -space-x-2">
              {medicines.map((medicine, index) => (
                <div 
                  key={medicine.name}
                  className="w-5 h-5 rounded-full overflow-hidden ring-2 ring-white"
                >
                  <img 
                    src={medicine.imageUrl} 
                    alt={medicine.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <MedicationPlanModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        plan={{
          name,
          userName,
          startDate,
          endDate,
          medicines
        }}
      />
    </>
  );
}