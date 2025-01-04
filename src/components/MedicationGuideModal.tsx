import { X } from 'lucide-react';
import { MedicationGuideFlow } from './guide/MedicationGuideFlow';

interface MedicationGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MedicationGuideModal({ isOpen, onClose }: MedicationGuideModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white rounded-xl w-[90%] max-w-lg max-h-[90vh] overflow-y-auto shadow-lg">
        <div className="sticky top-0 z-10 bg-white border-b border-gray-100 p-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">用药指引</h2>
            <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
                <X className="w-5 h-5 text-gray-500" />
            </button>
        </div>

        <div className="p-4">
            <MedicationGuideFlow />
        </div>
    </div>
</div>
  );
}