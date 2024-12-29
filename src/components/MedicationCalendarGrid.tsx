import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { users } from '../data/users';

interface CalendarDay {
  date: number;
  completion: number;
}

interface MedicationCalendarGridProps {
  year: number;
  data: {
    [month: string]: CalendarDay[];
  };
}

export function MedicationCalendarGrid({ year, data }: MedicationCalendarGridProps) {
  const [timeRange, setTimeRange] = useState<'day' | 'month' | 'year'>('day');
  const [currentUser] = useState(users[0]); // Default to first user
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      {/* Summary */}
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">{currentUser.name}</h3>
            <p className="text-gray-600 text-sm">正在进行中的用药计划"病毒性感冒"</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-12 h-12 rounded-full object-cover mb-2"
            />
            <button className="flex items-center gap-1 px-2 py-1 bg-white rounded-full shadow-sm text-xs text-gray-600 hover:bg-gray-50 transition-colors">
              <span>切换用户</span>
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-3xl font-bold text-gray-800">3</div>
            <div className="text-sm text-gray-600">个用药计划</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-800">70%</div>
            <div className="text-sm text-gray-600">每日服药完成度</div>
          </div>
        </div>
      </div>

      {/* Time Range Navigation */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex bg-gray-100 rounded-lg p-1">
          {[
            { key: 'day', label: '天' },
            { key: 'month', label: '月' },
            { key: 'year', label: '年' }
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTimeRange(key as 'day' | 'month' | 'year')}
              className={`px-4 py-1 rounded-md text-sm font-medium transition-colors ${
                timeRange === key
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <ChevronLeft className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
          <span className="text-sm font-medium text-gray-800">1月</span>
          <ChevronRight className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
        </div>
      </div>

      {/* Calendar Grid */}
      <div>
        <div className="grid grid-cols-7 gap-1">
          {/* Weekday headers */}
          {weekDays.map(day => (
            <div key={day} className="text-xs text-gray-500 text-center py-1">
              {day}
            </div>
          ))}
          
          {/* Calendar days */}
          {Array.from({ length: 31 }, (_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-sm flex items-center justify-center text-xs ${
                Math.random() > 0.5 ? 'bg-purple-100' : 'bg-gray-100'
              }`}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}