import { useState } from 'react';
import { X, Camera, Scan, AlertCircle, Check } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ScanResult {
  type: 'medicine' | 'prescription';
  data: {
    name?: string;
    dosage?: string;
    manufacturer?: string;
    expirationDate?: string;
    batchNumber?: string;
    approvalNumber?: string;
    usage?: string;
  };
  confidence: number;
  rawText: string[];
}

interface MedicineScanResultProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: ScanResult['data']) => void;
  onRetry: () => void;
  result: ScanResult;
}

export function MedicineScanResult({
  isOpen,
  onClose,
  onConfirm,
  onRetry,
  result
}: MedicineScanResultProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(result.data);

  if (!isOpen) return null;

  const isConfident = result.confidence >= 0.8;

  const handleConfirm = () => {
    onConfirm(editedData);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/90 backdrop-blur-md rounded-xl w-[90%] max-w-md">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Scan className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-semibold text-gray-800">识别结果</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-4">
          {/* Confidence Score */}
          <div className={cn(
            "mb-4 p-3 rounded-lg flex items-center gap-2",
            isConfident ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"
          )}>
            {isConfident ? (
              <Check className="w-5 h-5 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
            )}
            <p className="text-sm">
              {isConfident 
                ? "识别结果可信度较高" 
                : "识别结果可信度较低，请仔细核对"
              }
            </p>
          </div>

          {/* Result Fields */}
          <div className="space-y-4">
            {Object.entries(editedData).map(([key, value]) => (
              <div key={key} className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  {getFieldLabel(key)}
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => setEditedData(prev => ({
                      ...prev,
                      [key]: e.target.value
                    }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-800">
                    {value || '未识别'}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={onRetry}
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <Camera className="w-4 h-4" />
              重新扫描
            </button>
            {isEditing ? (
              <button
                onClick={handleConfirm}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                确认修改
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                修改信息
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function getFieldLabel(key: string): string {
  const labels: Record<string, string> = {
    name: '药品名称',
    dosage: '规格',
    manufacturer: '生产厂家',
    expirationDate: '有效期',
    batchNumber: '批号',
    approvalNumber: '批准文号',
    usage: '用法用量'
  };
  return labels[key] || key;
}