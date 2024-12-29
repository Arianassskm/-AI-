import { Plus, Filter, SortAsc } from 'lucide-react';

interface PlanActionsProps {
  onCreatePlan: () => void;
  onSort: () => void;
  onFilter: () => void;
}

export function PlanActions({ onCreatePlan, onSort, onFilter }: PlanActionsProps) {
  return (
    <div className="flex gap-2 mb-4">
      <button
        onClick={onCreatePlan}
        className="flex-1 py-2 px-4 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" />
        新建计划
      </button>
      
      <button
        onClick={onSort}
        className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
      >
        <SortAsc className="w-5 h-5" />
      </button>
      
      <button
        onClick={onFilter}
        className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
      >
        <Filter className="w-5 h-5" />
      </button>
    </div>
  );
}