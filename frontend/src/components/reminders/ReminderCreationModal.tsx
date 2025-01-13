import { useState } from 'react';
import { X, Clock, Calendar, AlertCircle, Package, Plus } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { cn } from '../../utils/cn';

interface ReminderCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: ReminderData) => void;
  medication: {
    id: string;
    name: string;
    totalQuantity: number;
    currentQuantity: number;
    dosageUnit: string;
    imageUrl: string;
  };
}

export interface ReminderData {
  medicationId: string;
  times: string[];
  daysOfWeek: number[];
  dosagePerTime: number;
  specialInstructions?: string;
  notificationType: 'app' | 'email' | 'both';
}

export function ReminderCreationModal({
  isOpen,
  onClose,
  onConfirm,
  medication
}: ReminderCreationModalProps) {
  const [data, setData] = useState<ReminderData>({
    medicationId: medication.id,
    times: ['08:00', '20:00'],
    daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
    dosagePerTime: 1,
    notificationType: 'app'
  });

  if (!isOpen) return null;

  const handleAddTime = () => {
    const input = document.createElement('input');
    input.type = 'time';
    input.onchange = (e) => {
      const time = (e.target as HTMLInputElement).value;
      if (time) {
        setData(prev => ({
          ...prev,
          times: [...prev.times, time].sort()
        }));
      }
    };
    input.click();
  };

  const handleRemoveTime = (time: string) => {
    setData(prev => ({
      ...prev,
      times: prev.times.filter(t => t !== time)
    }));
  };

  const toggleDay = (day: number) => {
    setData(prev => ({
      ...prev,
      daysOfWeek: prev.daysOfWeek.includes(day)
        ? prev.daysOfWeek.filter(d => d !== day)
        : [...prev.daysOfWeek, day].sort()
    }));
  };

  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

  // 计算总用量和预计使用天数
  const dailyDosage = data.times.length * data.dosagePerTime;
  const totalDays = Math.floor(medication.currentQuantity / dailyDosage);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/90 backdrop-blur-md rounded-xl w-[90%] max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md p-4 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">设置用药提醒</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Medication Info */}
          <Card gradient>
            <div className="flex items-start gap-4">
              <img
                src={medication.imageUrl}
                alt={medication.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-medium text-gray-800 mb-2">{medication.name}</h3>
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-sm text-gray-500">剩余数量</p>
                    <p className="font-medium text-gray-800">
                      {medication.currentQuantity} {medication.dosageUnit}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">可用天数</p>
                    <p className="font-medium text-gray-800">{totalDays} 天</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Time Selection */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Clock className="w-4 h-4" />
              服药时间
            </label>
            <div className="flex flex-wrap gap-2">
              {data.times.map(time => (
                <div
                  key={time}
                  className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm flex items-center gap-2"
                >
                  {time}
                  <button
                    onClick={() => handleRemoveTime(time)}
                    className="w-4 h-4 rounded-full bg-blue-100 hover:bg-blue-200 flex items-center justify-center"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              <button
                onClick={handleAddTime}
                className="px-3 py-1.5 border-2 border-dashed border-gray-300 hover:border-blue-500 text-gray-500 hover:text-blue-500 rounded-full text-sm flex items-center gap-1 transition-colors"
              >
                <Plus className="w-4 h-4" />
                添加时间
              </button>
            </div>
          </div>

          {/* Week Days */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Calendar className="w-4 h-4" />
              重复
            </label>
            <div className="flex gap-2">
              {weekDays.map((day, index) => (
                <button
                  key={day}
                  onClick={() => toggleDay(index)}
                  className={cn(
                    "w-8 h-8 rounded-full text-sm font-medium transition-colors",
                    data.daysOfWeek.includes(index)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  )}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Dosage Per Time */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Package className="w-4 h-4" />
              每次用量
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                value={data.dosagePerTime}
                onChange={(e) => setData(prev => ({
                  ...prev,
                  dosagePerTime: Number(e.target.value)
                }))}
                className="w-20 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-gray-600">{medication.dosageUnit}</span>
            </div>
          </div>

          {/* Usage Tips */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <AlertCircle className="w-4 h-4" />
              服用说明
            </label>
            <select
              value={data.specialInstructions}
              onChange={(e) => setData(prev => ({
                ...prev,
                specialInstructions: e.target.value
              }))}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">无特殊要求</option>
              <option value="before_meals">饭前服用</option>
              <option value="after_meals">饭后服用</option>
              <option value="empty_stomach">空腹服用</option>
              <option value="with_water">多饮温水</option>
            </select>
          </div>

          {/* Usage Progress Preview */}
          <Card className="bg-amber-50">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-amber-900 mb-1">用药进度提示</h4>
                <p className="text-sm text-amber-700">
                  每天将提醒您服用 {data.times.length} 次，每次 {data.dosagePerTime} {medication.dosageUnit}
                </p>
                <p className="text-sm text-amber-700 mt-1">
                  按当前剩余量计算，大约可以使用 {totalDays} 天
                </p>
              </div>
            </div>
          </Card>

          <Button
            onClick={() => onConfirm(data)}
            size="lg"
            className="w-full"
          >
            确认创建提醒
          </Button>
        </div>
      </div>
    </div>
  );
}