import { useState } from 'react';
import { X, Calendar, Clock, AlertCircle, Plus } from 'lucide-react';
import { cn } from '../../utils/cn';

interface Medicine {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  imageUrl: string;
}

interface PrescriptionConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (medicines: Medicine[]) => void;
  prescriptionData: {
    medicines: Medicine[];
    hospitalName?: string;
    doctorName?: string;
    diagnosisDate?: string;
  };
}

export function PrescriptionConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  prescriptionData
}: PrescriptionConfirmModalProps) {
  const [medicines, setMedicines] = useState(prescriptionData.medicines);
  const [selectedTimes, setSelectedTimes] = useState<string[]>(['08:00', '20:00']);

  if (!isOpen) return null;

  const handleAddTime = () => {
    const input = document.createElement('input');
    input.type = 'time';
    input.onchange = (e) => {
      const time = (e.target as HTMLInputElement).value;
      if (time) {
        setSelectedTimes(prev => [...prev, time].sort());
      }
    };
    input.click();
  };

  const handleRemoveTime = (time: string) => {
    setSelectedTimes(prev => prev.filter(t => t !== time));
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/90 backdrop-blur-md rounded-xl w-[90%] max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md p-4 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">确认处方信息</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          
          {/* Hospital Info */}
          {(prescriptionData.hospitalName || prescriptionData.doctorName) && (
            <div className="mt-2 p-3 bg-blue-50 rounded-lg">
              {prescriptionData.hospitalName && (
                <p className="text-sm text-blue-700">{prescriptionData.hospitalName}</p>
              )}
              {prescriptionData.doctorName && (
                <p className="text-sm text-blue-600 mt-1">主治医师：{prescriptionData.doctorName}</p>
              )}
              {prescriptionData.diagnosisDate && (
                <p className="text-sm text-blue-500 mt-1">就诊日期：{prescriptionData.diagnosisDate}</p>
              )}
            </div>
          )}
        </div>

        <div className="p-4 space-y-6">
          {/* Time Selection */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Clock className="w-4 h-4" />
              服药时间
            </label>
            <div className="flex flex-wrap gap-2">
              {selectedTimes.map(time => (
                <div
                  key={time}
                  className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm flex items-center gap-2"
                >
                  {time}
                  <button
                    onClick={() => handleRemoveTime(time)}
                    className="w-4 h-4 rounded-full bg-blue-100 hover:bg-blue-200 flex items-center justify-center"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              <button
                onClick={handleAddTime}
                className="px-3 py-1.5 border-2 border-dashed border-gray-300 hover:border-blue-500 text-gray-500 hover:text-blue-500 rounded-full text-sm flex items-center gap-1 transition-colors"
              >
                <Plus className="w-4 h-4" />
                添加时间
              </button>
            </div>
          </div>

          {/* Medicines */}
          <div className="space-y-4">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <AlertCircle className="w-4 h-4" />
              药品清单
            </label>
            {medicines.map((medicine, index) => (
              <div
                key={medicine.id}
                className={cn(
                  "p-4 rounded-xl transition-all duration-300",
                  "bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-sm",
                  "hover:shadow-md hover:-translate-y-0.5"
                )}
              >
                <div className="flex gap-4">
                  <img
                    src={medicine.imageUrl}
                    alt={medicine.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-800 mb-2">{medicine.name}</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-gray-500">用量</p>
                        <p className="font-medium text-gray-800">{medicine.dosage}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">频次</p>
                        <p className="font-medium text-gray-800">{medicine.frequency}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">疗程</p>
                        <p className="font-medium text-gray-800">{medicine.duration}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <button
            onClick={() => onConfirm(medicines)}
            className={cn(
              "w-full py-3 rounded-xl font-medium text-white",
              "bg-gradient-to-r from-blue-500 to-blue-600",
              "hover:from-blue-600 hover:to-blue-700",
              "transition-all duration-300 transform hover:-translate-y-0.5",
              "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            )}
          >
            确认创建用药计划
          </button>
        </div>
      </div>
    </div>
  );
}