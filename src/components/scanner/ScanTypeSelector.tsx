import { Pill, FileText, X } from 'lucide-react';

interface ScanTypeSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (type: 'medicine' | 'prescription') => void;
}

export function ScanTypeSelector({ isOpen, onClose, onSelect }: ScanTypeSelectorProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-[90%] max-w-md overflow-hidden shadow-xl">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">选择扫描类型</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <button
            onClick={() => onSelect('medicine')}
            className="w-full p-4 bg-blue-50 rounded-xl flex items-center gap-4 hover:bg-blue-100 transition-colors"
          >
            <div className="p-3 bg-blue-100 rounded-lg">
              <Pill className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-left">
              <h3 className="font-medium text-gray-800 mb-1">扫描药品</h3>
              <p className="text-sm text-gray-600">添加药品到药箱并创建用药计划</p>
            </div>
          </button>

          <button
            onClick={() => onSelect('prescription')}
            className="w-full p-4 bg-purple-50 rounded-xl flex items-center gap-4 hover:bg-purple-100 transition-colors"
          >
            <div className="p-3 bg-purple-100 rounded-lg">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-left">
              <h3 className="font-medium text-gray-800 mb-1">扫描处方</h3>
              <p className="text-sm text-gray-600">快速录入处方信息并创建用药计划</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}