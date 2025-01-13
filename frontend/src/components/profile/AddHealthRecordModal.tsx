import { X } from 'lucide-react';
import { useState } from 'react';
import type { HealthTrend } from '../../services/healthTrends';

interface AddHealthRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (record: Omit<HealthTrend, 'date'>) => Promise<void>;
}

export function AddHealthRecordModal({ 
  isOpen, 
  onClose,
  onSubmit
}: AddHealthRecordModalProps) {
  const [record, setRecord] = useState({
    bloodPressureSystolic: '',
    bloodPressureDiastolic: '',
    bloodSugar: '',
    heartRate: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      bloodPressureSystolic: Number(record.bloodPressureSystolic),
      bloodPressureDiastolic: Number(record.bloodPressureDiastolic),
      bloodSugar: Number(record.bloodSugar),
      heartRate: Number(record.heartRate)
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-xl w-[90%] max-w-md">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">添加健康记录</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                收缩压 (mmHg)
              </label>
              <input
                type="number"
                value={record.bloodPressureSystolic}
                onChange={(e) => setRecord(prev => ({ 
                  ...prev, 
                  bloodPressureSystolic: e.target.value 
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                舒张压 (mmHg)
              </label>
              <input
                type="number"
                value={record.bloodPressureDiastolic}
                onChange={(e) => setRecord(prev => ({ 
                  ...prev, 
                  bloodPressureDiastolic: e.target.value 
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              血糖 (mmol/L)
            </label>
            <input
              type="number"
              step="0.1"
              value={record.bloodSugar}
              onChange={(e) => setRecord(prev => ({ 
                ...prev, 
                bloodSugar: e.target.value 
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              心率 (次/分)
            </label>
            <input
              type="number"
              value={record.heartRate}
              onChange={(e) => setRecord(prev => ({ 
                ...prev, 
                heartRate: e.target.value 
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            提交记录
          </button>
        </form>
      </div>
    </div>
  );
}