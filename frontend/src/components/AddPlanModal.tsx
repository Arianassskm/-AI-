import { Camera, Search, X } from 'lucide-react';
import { useState } from 'react';
import { ImageUploadModal } from './ImageUploadModal';

interface AddPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddPlanModal({ isOpen, onClose }: AddPlanModalProps) {
  if (!isOpen) return null;

  const [showImageUpload, setShowImageUpload] = useState(false);

  const handlePhotoRecognition = () => {
    setShowImageUpload(true);
  };

  const handleOCRResult = (results: string[]) => {
    // 处理OCR识别结果
    if (results.length > 0) {
      // 这里可以添加处方信息的解析逻辑
      console.log('识别到的处方信息:', results);
      alert('处方识别成功！');
    }
  };

  const handleMedicineSelection = () => {
    alert('药品选择功能开发中...');
  };

  const options = [
    {
      icon: Camera,
      title: '拍照识别处方',
      description: '通过拍照快速识别处方信息',
      onClick: handlePhotoRecognition,
      color: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      icon: Search,
      title: '从药箱选择药品',
      description: '从已有药品中选择创建计划',
      onClick: handleMedicineSelection,
      color: 'bg-blue-50',
      iconColor: 'text-blue-600'
    }
  ];

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="bg-white rounded-xl w-[90%] max-w-md overflow-hidden shadow-xl"
        style={{
          animation: 'modalIn 0.3s ease-out'
        }}
      >
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">创建用药计划</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
              <Camera className="w-8 h-8 text-purple-600" />
            </div>
          </div>

          <div className="space-y-4">
            {options.map((option) => (
              <button
                key={option.title}
                onClick={option.onClick}
                className={`w-full ${option.color} p-4 rounded-xl flex items-start gap-4 transition-all duration-300 hover:shadow-md active:scale-[0.98]`}
              >
                <div className={`${option.iconColor} p-2 bg-white rounded-lg`}>
                  <option.icon className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-gray-800 mb-1">{option.title}</h3>
                  <p className="text-sm text-gray-600">{option.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <ImageUploadModal
          isOpen={showImageUpload}
          onClose={() => setShowImageUpload(false)}
          onResult={handleOCRResult}
        />
      </div>
    </div>
  );
}