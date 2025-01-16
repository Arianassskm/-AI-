import { X } from "lucide-react";

interface AssessmentOfPillboxesProps {
  isOpen: boolean;
  result: string;
  onClose: () => void;
}

export function AssessmentOfPillboxes({
  isOpen,
  result,
  onClose,
}: AssessmentOfPillboxesProps) {
  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-[90%] max-w-md overflow-hidden shadow-xl">
        {/* Header */}
        <div className="relative h-32 bg-gradient-to-r from-blue-500 to-blue-600 p-6">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-sm text-white"
          >
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-2xl font-bold text-white mt-8">药箱提升</h2>
        </div>

        <div className="p-4 bg-blue-50 rounded-xl max-h-96 overflow-auto">
          <p className="text-sm text-gray-600 whitespace-pre-line">{result}</p>
        </div>
      </div>
    </div>
  );
}
