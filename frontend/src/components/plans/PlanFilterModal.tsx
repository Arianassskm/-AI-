import { X } from 'lucide-react';

export interface FilterOptions {
  status: ('active' | 'completed')[];
  dateRange: 'all' | 'week' | 'month' | 'custom';
  startDate?: string;
  endDate?: string;
}

interface PlanFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFilter: (filters: FilterOptions) => void;
  currentFilters: FilterOptions;
}

export function PlanFilterModal({
  isOpen,
  onClose,
  onFilter,
  currentFilters
}: PlanFilterModalProps) {
  if (!isOpen) return null;

  const dateRanges = [
    { value: 'all', label: '全部时间' },
    { value: 'week', label: '最近一周' },
    { value: 'month', label: '最近一月' },
    { value: 'custom', label: '自定义' }
  ] as const;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 在实际应用中，这里应该收集表单数据
    onFilter(currentFilters);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end justify-center z-50 px-4 pb-4">
      <div className="bg-white rounded-xl w-full max-w-md overflow-hidden animate-slideUp">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">筛选条件</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-6">
          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              计划状态
            </label>
            <div className="flex gap-2">
              {['active', 'completed'].map((status) => (
                <label
                  key={status}
                  className="flex-1 flex items-center gap-2 p-3 bg-gray-50 rounded-lg cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={currentFilters.status.includes(status as 'active' | 'completed')}
                    className="rounded text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    {status === 'active' ? '进行中' : '已完成'}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Date Range Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              时间范围
            </label>
            <div className="grid grid-cols-2 gap-2">
              {dateRanges.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    // Update date range in actual application
                  }}
                  className={`py-2 px-4 rounded-lg text-sm transition-colors ${
                    currentFilters.dateRange === value
                      ? 'bg-blue-50 text-blue-600'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {currentFilters.dateRange === 'custom' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  开始日期
                </label>
                <input
                  type="date"
                  value={currentFilters.startDate}
                  className="w-full px-3 py-2 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  结束日期
                </label>
                <input
                  type="date"
                  value={currentFilters.endDate}
                  className="w-full px-3 py-2 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50"
            >
              取消
            </button>
            <button
              type="submit"
              className="flex-1 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              应用筛选
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}