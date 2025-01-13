import { X, Plus } from 'lucide-react';
import { useState } from 'react';
import { HealthTrendsChart } from './HealthTrendsChart';
import type { HealthTrend } from '../../services/healthTrends';

interface HealthTrendsModalProps {
  isOpen: boolean;
  onClose: () => void;
  trends: HealthTrend[];
  onAddRecord: () => void;
}

export function HealthTrendsModal({ 
  isOpen, 
  onClose, 
  trends,
  onAddRecord 
}: HealthTrendsModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-xl w-[90%] max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">健康趋势详情</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <button
            onClick={onAddRecord}
            className="w-full mb-6 p-4 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 text-gray-500 hover:text-blue-600 hover:border-blue-300 transition-colors"
          >
            <Plus className="w-6 h-6" />
            <span>添加今日记录</span>
          </button>

          <HealthTrendsChart trends={trends} />
        </div>
      </div>
    </div>
  );
}