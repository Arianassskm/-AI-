import { useState } from 'react';
import { Camera, Scan, X, Loader2 } from 'lucide-react';
import { CameraCapture } from './camera/CameraCapture';
import { BarcodeScanner } from './scanner/BarcodeScanner';
import { useOCR } from '../hooks/useOCR';

interface ImageCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResult: (text: string[]) => void;
}

export function ImageCaptureModal({ isOpen, onClose, onResult }: ImageCaptureModalProps) {
  const [mode, setMode] = useState<'camera' | 'scanner' | null>(null);
  const { loading, error, recognizeImage } = useOCR();

  if (!isOpen) return null;

  const handleImageCapture = async (imageData: string) => {
    const results = await recognizeImage(imageData);
    if (results) {
      onResult(results);
    }
  };

  const handleBarcodeScan = async (result: string) => {
    onResult([result]);
  };

  const renderContent = () => {
    if (mode === 'camera') {
      return (
        <CameraCapture
          onCapture={handleImageCapture}
          onClose={() => setMode(null)}
        />
      );
    }

    if (mode === 'scanner') {
      return (
        <BarcodeScanner
          onScan={handleBarcodeScan}
          onClose={() => setMode(null)}
        />
      );
    }

    return (
      <div className="p-6 space-y-4">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800">选择识别方式</h3>
          <p className="text-sm text-gray-500 mt-1">请选择您想要使用的识别方式</p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg mb-4">
            {error}
          </div>
        )}

        <button
          onClick={() => setMode('camera')}
          disabled={loading}
          className="w-full p-4 bg-blue-50 rounded-xl flex items-center gap-4 hover:bg-blue-100 transition-colors disabled:opacity-50"
        >
          <div className="p-3 bg-blue-100 rounded-lg">
            <Camera className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-left flex-1">
            <h4 className="font-medium text-gray-800">拍照识别</h4>
            <p className="text-sm text-gray-600">使用相机拍照识别药品信息</p>
          </div>
        </button>

        <button
          onClick={() => setMode('scanner')}
          disabled={loading}
          className="w-full p-4 bg-purple-50 rounded-xl flex items-center gap-4 hover:bg-purple-100 transition-colors disabled:opacity-50"
        >
          <div className="p-3 bg-purple-100 rounded-lg">
            <Scan className="w-6 h-6 text-purple-600" />
          </div>
          <div className="text-left flex-1">
            <h4 className="font-medium text-gray-800">扫码识别</h4>
            <p className="text-sm text-gray-600">扫描药品包装上的条形码</p>
          </div>
        </button>

        {loading && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
            <div className="flex items-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
              <span className="text-gray-600">识别中...</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-xl w-[90%] max-w-md overflow-hidden shadow-xl">
        {!mode && (
          <div className="flex justify-between items-center p-4 border-b">
            <div className="w-8" /> {/* Spacer */}
            <h2 className="text-lg font-semibold text-gray-800">识别药品信息</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        )}
        {renderContent()}
      </div>
    </div>
  );
}