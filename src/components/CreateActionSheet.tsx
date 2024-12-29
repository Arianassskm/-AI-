import { useState } from 'react';
import { Camera, PenLine, Calendar, Bell, X } from 'lucide-react';
import { cn } from '../utils/cn';
import { ScanTypeSelector } from './scanner/ScanTypeSelector';
import { MedicineScanGuide } from './scanner/MedicineScanGuide';
import { PrescriptionScanGuide } from './scanner/PrescriptionScanGuide';
import { CreatePlanModal } from './plans/CreatePlanModal';
import { useNavigate } from 'react-router-dom';
import type { NewPlanData } from './plans/CreatePlanModal';

interface CreateActionSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateActionSheet({ isOpen, onClose }: CreateActionSheetProps) {
  const [showScanSelector, setShowScanSelector] = useState(false);
  const [showMedicineScan, setShowMedicineScan] = useState(false);
  const [showPrescriptionScan, setShowPrescriptionScan] = useState(false);
  const [showCreatePlan, setShowCreatePlan] = useState(false);
  const navigate = useNavigate();

  const handleScanTypeSelect = (type: 'medicine' | 'prescription') => {
    setShowScanSelector(false);
    if (type === 'medicine') {
      setShowMedicineScan(true);
    } else {
      setShowPrescriptionScan(true);
    }
  };

  const handleScanComplete = (images: string[]) => {
    setShowMedicineScan(false);
    setShowPrescriptionScan(false);
    console.log('Captured images:', images);
    onClose();
  };

  const handleCreatePlan = async (planData: NewPlanData) => {
    try {
      console.log('Creating plan:', planData);
      setShowCreatePlan(false);
      onClose();
    } catch (error) {
      console.error('Failed to create plan:', error);
    }
  };

  const handleSelect = (actionId: string) => {
    if (actionId === 'scan') {
      setShowScanSelector(true);
    } else if (actionId === 'manual') {
      navigate('/manual-entry');
      onClose();
    } else if (actionId === 'plan') {
      setShowCreatePlan(true);
    } else if (actionId === 'reminder') {
      navigate('/reminder');
      onClose();
    }
  };

  if (!isOpen) return null;

  const actions = [
    {
      id: 'scan',
      icon: Camera,
      title: '扫描添加',
      description: '扫描药品或处方快速录入',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      gradient: 'from-blue-50/50 to-blue-100/30'
    },
    {
      id: 'manual',
      icon: PenLine,
      title: '手动录入',
      description: '手动输入药品信息',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      gradient: 'from-purple-50/50 to-purple-100/30'
    },
    {
      id: 'plan',
      icon: Calendar,
      title: '新建计划',
      description: '创建用药计划',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      gradient: 'from-emerald-50/50 to-emerald-100/30'
    },
    {
      id: 'reminder',
      icon: Bell,
      title: '新建提醒',
      description: '设置用药提醒',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      gradient: 'from-amber-50/50 to-amber-100/30'
    }
  ];

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 touch-none"
        onClick={onClose}
      >
        <div
          className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl"
          style={{
            animation: 'modalIn 0.3s ease-out',
            transform: 'translate3d(0, 0, 0)'
          }}
          onClick={e => e.stopPropagation()}
        >
          <div className="relative px-4 pt-6 pb-8">
            {/* Handle */}
            <div className="absolute left-1/2 -top-3 -translate-x-1/2 w-12 h-1.5 bg-gray-300/80 rounded-full" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            {/* Title */}
            <h2 className="text-lg font-semibold text-gray-800 mb-6">新建</h2>

            {/* Actions Grid */}
            <div className="grid grid-cols-2 gap-3">
              {actions.map(({ id, icon: Icon, title, description, color, bgColor, gradient }) => (
                <button
                  key={id}
                  onClick={() => handleSelect(id)}
                  className={cn(
                    "relative overflow-hidden rounded-xl p-4 text-left transition-all duration-300",
                    "hover:shadow-lg active:scale-[0.98]"
                  )}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
                  <div className="relative">
                    <div className={`w-10 h-10 rounded-xl ${bgColor} flex items-center justify-center mb-3`}>
                      <Icon className={`w-5 h-5 ${color}`} />
                    </div>
                    <h3 className="text-base font-medium text-gray-800 mb-1">{title}</h3>
                    <p className="text-sm text-gray-500">{description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ScanTypeSelector
        isOpen={showScanSelector}
        onClose={() => setShowScanSelector(false)}
        onSelect={handleScanTypeSelect}
      />

      <MedicineScanGuide
        isOpen={showMedicineScan}
        onClose={() => setShowMedicineScan(false)}
        onComplete={handleScanComplete}
      />

      <PrescriptionScanGuide
        isOpen={showPrescriptionScan}
        onClose={() => setShowPrescriptionScan(false)}
        onComplete={handleScanComplete}
      />

      <CreatePlanModal
        isOpen={showCreatePlan}
        onClose={() => setShowCreatePlan(false)}
        onSubmit={handleCreatePlan}
      />
    </>
  );
}