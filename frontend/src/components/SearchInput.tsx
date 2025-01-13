import { Search } from 'lucide-react';
import { useState } from 'react';
import { AIChatExpanded } from './AIChatExpanded';

export function SearchInput() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="向AI管家咨询..."
          className="w-full h-12 pl-12 pr-4 rounded-xl bg-white shadow-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          onClick={() => setIsExpanded(true)}
          readOnly
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      </div>

      {isExpanded && <AIChatExpanded onClose={() => setIsExpanded(false)} />}
    </>
  );
}