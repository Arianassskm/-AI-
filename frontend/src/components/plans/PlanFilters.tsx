import { Search } from 'lucide-react';

interface PlanFiltersProps {
  activeFilter: 'all' | 'active' | 'completed';
  onFilterChange: (filter: 'all' | 'active' | 'completed') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function PlanFilters({
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange
}: PlanFiltersProps) {
  const filters = [
    { id: 'all', label: '全部' },
    { id: 'active', label: '进行中' },
    { id: 'completed', label: '已完成' }
  ] as const;

  return (
    <div className="space-y-4 mb-6">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="搜索用药计划..."
          className="w-full h-12 pl-12 pr-4 bg-white/70 backdrop-blur-sm rounded-xl border-0 shadow-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
        {filters.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => onFilterChange(id)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeFilter === id
                ? 'bg-blue-500 text-white'
                : 'bg-white/70 backdrop-blur-sm text-gray-600 hover:bg-gray-100'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}