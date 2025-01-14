import { X } from "lucide-react";
import { Medication } from "@/services/medication";

interface MedicineDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  medicine: Medication;
}

export function MedicineDetailModal({
  isOpen,
  onClose,
  medicine,
}: MedicineDetailModalProps) {
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
          animation: "modalIn 0.3s ease-out",
        }}
      >
        <div className="relative">
          <img
            src={medicine.image}
            alt={medicine.name}
            className="w-full h-64 object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/30 backdrop-blur-sm transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-sm text-gray-500 mb-1">剩余数量</p>
              <p className="text-lg font-semibold text-gray-800">
                {medicine.currentQuantity}
                {medicine.unit}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-sm text-gray-500 mb-1">有效期至</p>
              <p className="text-lg font-semibold text-gray-800">
                {medicine.expiryDate}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                存储条件
              </h3>
              <p className="text-gray-600">密封，避光，常温保存</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                注意事项
              </h3>
              <p className="text-gray-600">
                请遵医嘱服用，儿童请在成人监护下服用
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
