import { X, Check } from 'lucide-react';
import { Card } from '../ui/Card';

export type SortOption = 'startDate' | 'endDate' | 'name' | 'progress';

interface PlanSortModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSort: (option: SortOption) => void;
  currentSort: SortOption;
}

export function PlanSortModal({
  isOpen,
  onClose,
  onSort,
  currentSort
}: PlanSortModalProps) {
  if (!isOpen) return null;

  const sortOptions: Array<{
    value: SortOption;
    label: string;
    description: string;
  }> = [
    {
      value: 'startDate',
      label: '开始时间',
      description: '按计划开始时间排序'
    },
    {
      value: 'endDate',
      label: '结束时间',
      description: '按计划结束时间排序'
    },
    {
      value: 'name',
      label: '计划名称',
      description: '按计划名称字母排序'
    },
    {
      value: 'progress',
      label: '完成进度',
      description: '按计划完成进度排序'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-[90%] max-w-md">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">排序方式</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-4 space-y-3">
          {sortOptions.map(({ value, label, description }) => (
            <Card
              key={value}
              gradient={currentSort === value}
              hover
              className="cursor-pointer"
              onClick={() => {
                onSort(value);
                onClose();
              }}
            >
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-800 mb-1">{label}</h3>
                  <p className="text-sm text-gray-500">{description}</p>
                </div>
                {currentSort === value && (
                  <Check className="w-5 h-5 text-blue-500" />
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}