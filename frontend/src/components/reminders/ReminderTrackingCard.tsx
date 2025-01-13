import { Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { cn } from '../../utils/cn';

interface ReminderTrackingCardProps {
  medication: {
    name: string;
    imageUrl: string;
    dosageUnit: string;
  };
  tracking: {
    currentDay: number;
    totalDays: number;
    todayDose: number;
    totalDosePerDay: number;
    currentPack: number;
    totalPacks: number;
    currentPill: number;
    pillsPerPack: number;
    nextDoseTime: string;
    specialInstruction?: string;
  };
  onComplete: () => void;
}

export function ReminderTrackingCard({
  medication,
  tracking,
  onComplete
}: ReminderTrackingCardProps) {
  const getSpecialInstructionText = (instruction?: string) => {
    switch (instruction) {
      case 'before_meals': return '请在饭前30分钟服用';
      case 'after_meals': return '请在饭后30分钟服用';
      case 'empty_stomach': return '请空腹服用';
      case 'with_water': return '请多饮温水';
      default: return null;
    }
  };

  const instructionText = getSpecialInstructionText(tracking.specialInstruction);

  return (
    <Card gradient hover className="relative overflow-hidden">
      {/* Progress Indicator */}
      <div 
        className="absolute top-0 left-0 h-1 bg-blue-500 transition-all duration-300"
        style={{ 
          width: `${(tracking.currentDay / tracking.totalDays) * 100}%` 
        }}
      />

      <div className="flex items-start gap-4">
        <img
          src={medication.imageUrl}
          alt={medication.name}
          className="w-16 h-16 rounded-lg object-cover"
        />
        
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-medium text-gray-800">{medication.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="default" size="sm">
                  第 {tracking.currentDay}/{tracking.totalDays} 天
                </Badge>
                <Badge variant="success" size="sm">
                  今日 {tracking.todayDose}/{tracking.totalDosePerDay} 次
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-gray-500 text-sm">
                <Clock className="w-4 h-4" />
                {tracking.nextDoseTime}
              </div>
            </div>
          </div>

          {/* Detailed Progress */}
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <p className="text-sm text-gray-500">当前服用</p>
              <p className="font-medium text-gray-800">
                第 {tracking.currentPack} 板 第 {tracking.currentPill} {medication.dosageUnit}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">总量</p>
              <p className="font-medium text-gray-800">
                共 {tracking.totalPacks} 板，每板 {tracking.pillsPerPack} {medication.dosageUnit}
              </p>
            </div>
          </div>

          {/* Special Instructions */}
          {instructionText && (
            <div className="flex items-center gap-2 text-amber-600 bg-amber-50 rounded-lg px-3 py-2 text-sm mb-3">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <p>{instructionText}</p>
            </div>
          )}

          {/* Action Button */}
          <button
            onClick={onComplete}
            className={cn(
              "w-full py-2 rounded-lg font-medium transition-all duration-300",
              "bg-gradient-to-r from-blue-500 to-blue-600 text-white",
              "hover:from-blue-600 hover:to-blue-700",
              "flex items-center justify-center gap-2"
            )}
          >
            <CheckCircle2 className="w-4 h-4" />
            完成本次服药
          </button>
        </div>
      </div>
    </Card>
  );
}