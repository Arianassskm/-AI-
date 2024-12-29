import { X, PillIcon, Coffee, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useAI } from '../hooks/useAI';

interface MedicationInteractionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MedicationInteractionModal({ isOpen, onClose }: MedicationInteractionModalProps) {
  const [interactionType, setInteractionType] = useState<'drug' | 'food' | null>(null);
  const [medicationOne, setMedicationOne] = useState('');
  const [medicationTwo, setMedicationTwo] = useState('');
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  
  const { analyzeMedicationInteraction, loading, error } = useAI();

  if (!isOpen) return null;

  const handleAnalyze = async () => {
    if (!medicationOne || !medicationTwo) {
      alert('请输入需要分析的药品名称');
      return;
    }

    const result = await analyzeMedicationInteraction(medicationOne, medicationTwo);
    if (result) {
      setAnalysisResult(result);
    }
  };

  const renderContent = () => {
    if (!interactionType) {
      return (
        <div className="p-4 space-y-4">
          <button
            onClick={() => setInteractionType('drug')}
            className="w-full p-4 bg-amber-50 rounded-xl flex items-center gap-4 hover:bg-amber-100 transition-colors"
          >
            <div className="p-3 bg-amber-100 rounded-lg">
              <PillIcon className="w-6 h-6 text-amber-600" />
            </div>
            <div className="text-left">
              <h3 className="font-medium text-gray-800 mb-1">药物相互作用</h3>
              <p className="text-sm text-gray-600">检查多种药物之间是否存在相互作用</p>
            </div>
          </button>

          <button
            onClick={() => setInteractionType('food')}
            className="w-full p-4 bg-green-50 rounded-xl flex items-center gap-4 hover:bg-green-100 transition-colors"
          >
            <div className="p-3 bg-green-100 rounded-lg">
              <Coffee className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-left">
              <h3 className="font-medium text-gray-800 mb-1">药物与食物相互作用</h3>
              <p className="text-sm text-gray-600">了解药物与食物之间的相互影响</p>
            </div>
          </button>
        </div>
      );
    }

    return (
      <div className="p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {interactionType === 'drug' ? '药品1名称' : '药品名称'}
          </label>
          <input
            type="text"
            value={medicationOne}
            onChange={(e) => setMedicationOne(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="请输入药品名称"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {interactionType === 'drug' ? '药品2名称' : '食物名称'}
          </label>
          <input
            type="text"
            value={medicationTwo}
            onChange={(e) => setMedicationTwo(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={interactionType === 'drug' ? '请输入药品名称' : '请输入食物名称'}
          />
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg">
            {error}
          </div>
        )}

        {analysisResult && (
          <div className="p-4 bg-blue-50 rounded-xl">
            <h4 className="font-medium text-gray-800 mb-2">分析结果</h4>
            <p className="text-sm text-gray-600 whitespace-pre-line">{analysisResult}</p>
          </div>
        )}

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              分析中...
            </>
          ) : (
            '开始分析'
          )}
        </button>
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
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-2">
            {interactionType && (
              <button
                onClick={() => {
                  setInteractionType(null);
                  setAnalysisResult(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            )}
            <h2 className="text-lg font-semibold text-gray-800">
              {interactionType ? (
                interactionType === 'drug' ? '药物相互作用分析' : '药物与食物相互作用分析'
              ) : '选择分析类型'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {renderContent()}
      </div>
    </div>
  );
}