interface CancelDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  reminderName: string;
}

export function CancelDialog({ isOpen, onClose, onConfirm, reminderName }: CancelDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/90 backdrop-blur-md rounded-xl w-[80%] max-w-sm p-4">
        <h3 className="text-lg font-medium text-gray-800 mb-2">取消完成记录</h3>
        <p className="text-sm text-gray-600 mb-4">
          您确定要取消"{reminderName}"的完成记录吗？
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50"
          >
            保留记录
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:brightness-110"
          >
            取消记录
          </button>
        </div>
      </div>
    </div>
  );
}