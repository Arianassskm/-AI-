import { ArrowLeft } from 'lucide-react';

interface StatsHeaderProps {
  onBack: () => void;
}

export function StatsHeader({ onBack }: StatsHeaderProps) {
  return (
    <div className="bg-white px-4 py-4 sticky top-0 z-10 shadow-sm mb-6">
      <div className="flex items-center gap-4">
        <button onClick={onBack}>
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-xl font-semibold text-gray-800">用药统计</h1>
      </div>
    </div>
  );
}