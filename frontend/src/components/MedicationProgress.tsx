import { MoreHorizontal, Pencil, ChevronLeft, ChevronRight } from 'lucide-react';
import { ScheduleDay } from '../data/scheduleData';
import { useNavigate } from 'react-router-dom';

interface MedicationProgressProps {
  doctorName: string;
  doctorTitle: string;
  doctorAvatar: string;
  progress: number;
  daysLeft: number;
  schedule: ScheduleDay[];
}

export function MedicationProgress({
  doctorName,
  doctorTitle,
  doctorAvatar,
  progress,
  daysLeft,
  schedule
}: MedicationProgressProps) {
  const navigate = useNavigate();
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.toLocaleString('zh-CN', { month: 'long' });
  const currentDay = currentDate.getDate();

  // Find the index of today's date to center it
  const todayIndex = schedule.findIndex(day => day.date === currentDay);
  const startIndex = Math.max(0, todayIndex - 3);
  const visibleSchedule = schedule.slice(startIndex, startIndex + 7);

  return (
    <div className="bg-gradient-to-br from-teal-50/80 via-blue-50/80 to-purple-50/80 backdrop-blur-sm rounded-xl p-4 mb-6 shadow-sm">
      {/* Previous content remains the same until the schedule section */}
      
      <div 
        onClick={() => navigate('/medication-stats')}
        className="cursor-pointer hover:opacity-90 transition-opacity"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-gray-800">用药记录</h3>
          <div className="flex items-center gap-2">
            <ChevronLeft className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">{currentYear}年{currentMonth}</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        </div>
        
        <div className="overflow-x-auto -mx-4 px-4 pb-2 scrollbar-hide">
          <div className="flex justify-center gap-4">
            {visibleSchedule.map(({ date, day, isCompleted }) => {
              const isToday = date === currentDay;
              return (
                <div key={date} className="flex flex-col items-center">
                  <div className="text-xs text-gray-600 mb-2">{day}</div>
                  <div 
                    className={`
                      relative min-w-[2.5rem] h-12 rounded-full flex items-center justify-center
                      ${isToday ? 'bg-green-500 text-white' : isCompleted ? 'bg-gray-100' : 'bg-gray-50'}
                      ${isToday ? 'shadow-sm' : ''}
                    `}
                  >
                    <span className="text-sm font-medium">{date}</span>
                    {isCompleted && !isToday && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                        <div className="flex gap-0.5">
                          <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                          <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}