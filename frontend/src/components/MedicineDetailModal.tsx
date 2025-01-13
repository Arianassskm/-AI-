import { X } from 'lucide-react';

interface MedicineDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  medicine: {
    name: string;
    progress: number;
    color: string;
    imageUrl: string;
  };
}

export function MedicineDetailModal({ isOpen, onClose, medicine }: MedicineDetailModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="bg-white/90 backdrop-blur-md rounded-2xl w-[90%] max-w-md overflow-hidden shadow-xl transform transition-all"
        style={{
          animation: 'modalIn 0.3s ease-out'
        }}
      >
        <div className="relative">
          <img
            src={medicine.imageUrl}
            alt={medicine.name}
            className="w-full h-64 object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/30 backdrop-blur-sm transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <h2 className="text-xl font-bold text-white mb-2">{medicine.name}</h2>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-white/30 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${medicine.color}`}
                  style={{ width: `${medicine.progress}%` }}
                />
              </div>
              <span className="text-sm text-white">{medicine.progress}%</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-sm text-gray-500 mb-1">剩余数量</p>
              <p className="text-lg font-semibold text-gray-800">12片</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-sm text-gray-500 mb-1">有效期至</p>
              <p className="text-lg font-semibold text-gray-800">2024-12-31</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">存储条件</h3>
              <p className="text-gray-600">密封，避光，常温保存</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">注意事项</h3>
              <p className="text-gray-600">请遵医嘱服用，儿童请在成人监护下服用</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}