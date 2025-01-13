import { Search } from 'lucide-react';

interface AISearchInputProps {
  onClick: () => void;
}

export function AISearchInput({ onClick }: AISearchInputProps) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="向我询问关于用药的任何问题..."
        className="w-full h-12 pl-12 pr-4 bg-white/50 backdrop-blur-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)] rounded-xl cursor-pointer transition-all duration-300 hover:shadow-[0_6px_16px_rgba(0,0,0,0.15)] focus:shadow-[0_0_0_2px_rgba(59,130,246,0.5)]"
        onClick={onClick}
        readOnly
      />
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
    </div>
  );
}