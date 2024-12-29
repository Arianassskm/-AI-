import { Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface WeekDay {
  day: string;
  slots: boolean[];
}

interface WeeklyPlanCardProps {
  weekProgress: number;
  days: WeekDay[];
}

export function WeeklyPlanCard({ weekProgress, days }: WeeklyPlanCardProps) {
  const navigate = useNavigate();

  return (
    <div 
      className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-sm mb-6 cursor-pointer hover:shadow-md transition-all duration-300"
      onClick={() => navigate('/medication-stats')}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-purple-600" />
          <h3 className="font-medium text-gray-800">本周进度</h3>
        </div>
        <span className="text-sm text-purple-600">{weekProgress}%</span>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((day, dayIndex) => (
          <div key={dayIndex} className="space-y-2">
            <div className="text-center text-sm text-gray-500">{day.day}</div>
            <div className="space-y-1">
              {day.slots.map((completed, slotIndex) => (
                <div
                  key={slotIndex}
                  className={`h-2 rounded-full ${
                    completed ? 'bg-purple-500' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}