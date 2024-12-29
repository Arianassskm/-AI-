import { X, ArrowLeft } from 'lucide-react';

interface AIChatHeaderProps {
  onClose: () => void;
  onBack?: () => void;
}

export function AIChatHeader({ onClose, onBack }: AIChatHeaderProps) {
  return (
    <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          {onBack && (
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
          )}
          <div>
            <h2 className="text-lg font-semibold text-gray-800">AI 智能助手</h2>
            <p className="text-sm text-gray-500">您的用药管家</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
}