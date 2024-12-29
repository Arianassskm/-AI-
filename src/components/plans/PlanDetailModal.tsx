import { X, Calendar, Clock, AlertCircle, CheckCircle2, Pill } from 'lucide-react';
import type { MedicationPlan } from '../../types/medicationPlan';

interface PlanDetailModalProps {
  plan: MedicationPlan | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PlanDetailModal({ plan, isOpen, onClose }: PlanDetailModalProps) {
  if (!isOpen || !plan) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/90 backdrop-blur-md rounded-xl w-[90%] max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{plan.name}</h2>
              <div className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                plan.status === 'active'
                  ? 'bg-blue-50 text-blue-600'
                  : 'bg-emerald-50 text-emerald-600'
              }`}>
                {plan.status === 'active' ? '进行中' : '已完成'}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6">
          {/* Time Info */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-500" />
              <div>
                <div className="text-sm text-gray-500">开始时间</div>
                <div className="font-medium text-gray-800">{plan.startDate}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-500" />
              <div>
                <div className="text-sm text-gray-500">结束时间</div>
                <div className="font-medium text-gray-800">{plan.endDate}</div>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-gray-700">完成进度</div>
              <div className="text-lg font-semibold text-blue-600">{plan.progress}%</div>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${plan.progress}%` }}
              />
            </div>
          </div>

          {/* Medicines */}
          <div>
            <h3 className="text-base font-medium text-gray-800 mb-3">用药清单</h3>
            <div className="space-y-4">
              {plan.medicines.map((medicine, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-4 flex items-start gap-4"
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={medicine.imageUrl}
                      alt={medicine.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800 mb-2">{medicine.name}</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <div className="text-gray-500">用量</div>
                        <div className="font-medium text-gray-800">{medicine.dosage}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">频次</div>
                        <div className="font-medium text-gray-800">{medicine.frequency}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">疗程</div>
                        <div className="font-medium text-gray-800">{medicine.duration}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Status Info */}
          <div className="bg-emerald-50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-emerald-600">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-medium">按计划进行中</span>
            </div>
            <p className="mt-1 text-sm text-emerald-600">
              您的用药计划执行情况良好，请继续保持
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}