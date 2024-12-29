import { Search } from 'lucide-react';

interface AIHeaderProps {
  onSearch: () => void;
}

export function AIHeader({ onSearch }: AIHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">
          我是你的AI智能用药管家
        </h1>
        <p className="text-sm text-gray-500">请叫我康康</p>
      </div>
      <button 
        onClick={onSearch}
        className="w-10 h-10 bg-white/80 backdrop-blur-xl rounded-full flex items-center justify-center shadow-[0_4px_8px_0_rgba(145,158,171,0.12)] hover:shadow-[0_8px_16px_0_rgba(145,158,171,0.20)] transition-all active:scale-95"
      >
        <Search className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  );
}