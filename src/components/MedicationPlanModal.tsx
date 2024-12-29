import { X } from 'lucide-react';
import { MedicineCard } from './MedicineCard';

interface Medicine {
  name: string;
  progress: number;
  color: string;
  imageUrl: string;
  dosage: string;
  frequency: string;
  duration: string;
}

interface MedicationPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: {
    name: string;
    userName: string;
    startDate: string;
    endDate: string;
    medicines: Medicine[];
  };
}

export function MedicationPlanModal({ isOpen, onClose, plan }: MedicationPlanModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="bg-white/90 backdrop-blur-md rounded-2xl w-[90%] max-w-lg max-h-[90vh] overflow-y-auto transform transition-all"
        style={{
          animation: 'modalIn 0.3s ease-out'
        }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md p-4 border-b border-gray-200/50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{plan.name}</h2>
              <p className="text-sm text-gray-500 mt-1">患者：{plan.userName}</p>
            </div>
            <button 
              onClick={onClose} 
              className="p-2 rounded-full hover:bg-gray-100/80 transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Date Range */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">用药时间</h3>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>开始：{plan.startDate}</span>
              <span>结束：{plan.endDate}</span>
            </div>
          </div>

          {/* Medicines */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">用药清单</h3>
            <div className="space-y-4">
              {plan.medicines.map((medicine, index) => (
                <div 
                  key={medicine.name} 
                  className="bg-gray-50/80 backdrop-blur-sm rounded-xl p-4 transform transition-all duration-300 hover:shadow-md"
                  style={{
                    animation: `slideIn 0.3s ease-out ${index * 0.1}s`
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={medicine.imageUrl} 
                        alt={medicine.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-800 mb-2">{medicine.name}</h4>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${medicine.color}`}
                            style={{ width: `${medicine.progress}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600">{medicine.progress}%</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <p className="text-gray-500">用量</p>
                          <p className="font-medium text-gray-700">{medicine.dosage}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">频次</p>
                          <p className="font-medium text-gray-700">{medicine.frequency}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">疗程</p>
                          <p className="font-medium text-gray-700">{medicine.duration}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}