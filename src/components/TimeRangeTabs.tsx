interface TimeRangeTabsProps {
  activeTab: 'week' | 'month' | 'year';
  onTabChange: (tab: 'week' | 'month' | 'year') => void;
}

export function TimeRangeTabs({ activeTab, onTabChange }: TimeRangeTabsProps) {
  const tabs = [
    { id: 'week', label: '本周' },
    { id: 'month', label: '本月' },
    { id: 'year', label: '年度' },
  ] as const;

  return (
    <div className="flex bg-gray-50 p-1 rounded-lg">
      {tabs.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => onTabChange(id)}
          className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors
            ${activeTab === id 
              ? 'bg-white text-gray-800 shadow-sm' 
              : 'text-gray-600 hover:text-gray-800'
            }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}