import { Camera, Scan, Type, X } from 'lucide-react';
import { useState } from 'react';
import { ImageUploadModal } from './ImageUploadModal';
import { MultiImageUpload } from './MultiImageUpload';

interface AddMedicineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddMedicineModal({ isOpen, onClose }: AddMedicineModalProps) {
  if (!isOpen) return null;

  const [showScanner, setShowScanner] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [medicineInfo, setMedicineInfo] = useState({
    name: '',
    nameEn: '',
    description: '',
    images: [] as Array<{ url: string; text: string[] }>
  });

  const handleBarcodeScan = () => {
    setShowScanner(true);
    alert('正在打开扫描器...\n此功能需要调用设备相机权限');
  };

  const handleImageUpload = () => {
    setShowImageUpload(true);
  };

  const handleNameInput = () => {
    setShowInput(true);
  };

  const handleImagesProcessed = (images: Array<{ url: string; text: string[] }>) => {
    setMedicineInfo(prev => {
      // 从OCR结果中提取药品信息
      const newInfo = { ...prev, images };
      if (images.length > 0 && images[0].text.length > 0) {
        // 假设第一张图片的第一行文字是药品名称
        newInfo.name = newInfo.name || images[0].text[0];
      }
      return newInfo;
    });
  };

  const handleSubmit = () => {
    if (!medicineInfo.name.trim()) {
      alert('请输入药品名称');
      return;
    }
    
    // TODO: 提交药品信息到数据库
    console.log('提交药品信息:', medicineInfo);
    onClose();
  };

  const actions = [
    {
      icon: Scan,
      label: '扫描条形码',
      onClick: handleBarcodeScan,
    },
    {
      icon: Camera,
      label: '扫描/上传图片',
      onClick: handleImageUpload,
    },
    {
      icon: Type,
      label: '输入药品名称',
      onClick: handleNameInput,
    },
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
          animation: 'modalIn 0.3s ease-out',
        }}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">添加药品</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-4">
          {showInput || medicineInfo.images.length > 0 ? (
            <div className="space-y-4">
              {medicineInfo.images.length > 0 && (
                <MultiImageUpload
                  onImagesProcessed={handleImagesProcessed}
                  maxImages={4}
                />
              )}
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    药品名称
                  </label>
                  <input
                    type="text"
                    value={medicineInfo.name}
                    onChange={(e) => setMedicineInfo(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="请输入药品名称"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    英文名称 (选填)
                  </label>
                  <input
                    type="text"
                    value={medicineInfo.nameEn}
                    onChange={(e) => setMedicineInfo(prev => ({ ...prev, nameEn: e.target.value }))}
                    placeholder="请输入药品英文名称"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    药品说明
                  </label>
                  <textarea
                    value={medicineInfo.description}
                    onChange={(e) => setMedicineInfo(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="请输入药品说明"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                确认添加
              </button>
            </div>
          ) : (
            <div className="grid gap-6">
              {actions.map(({ icon: Icon, label, onClick }) => (
                <button
                  key={label}
                  onClick={onClick}
                  className="flex flex-col items-center justify-center p-6 rounded-xl bg-purple-50 hover:bg-purple-100 transition-all duration-300 group"
                >
                  <Icon className="w-8 h-8 text-purple-600 mb-3 group-hover:scale-110 transition-transform" />
                  <span className="text-gray-700 font-medium">{label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <ImageUploadModal
          isOpen={showImageUpload}
          onClose={() => setShowImageUpload(false)}
          onResult={(results) => {
            if (results.length > 0) {
              setMedicineInfo(prev => ({
                ...prev,
                name: results[0] // 使用第一个识别结果作为药品名称
              }));
              setShowInput(true);
            }
          }}
        />
      </div>
    </div>
  );
}