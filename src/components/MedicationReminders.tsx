import { Clock, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

interface Reminder {
  type: 'medicine' | 'procedure' | 'expiring';
  name: string;
  description: string;
  time: string;
  icon: string;
}

const reminders: Reminder[] = [
  {
    type: 'medicine',
    name: '阿莫西林',
    description: '1粒 • 饭后服用',
    time: '08:00',
    icon: '💊'
  },
  {
    type: 'medicine',
    name: '布洛芬',
    description: '2粒 • 饭前服用',
    time: '09:00',
    icon: '💊'
  },
  {
    type: 'expiring',
    name: '阿莫西林',
    description: '将在3天后过期',
    time: '09:30',
    icon: '⚠️'
  },
  {
    type: 'medicine',
    name: '抗组胺药',
    description: '1粒 • 随餐服用',
    time: '10:00',
    icon: '💊'
  }
];

type TimeFilter = 'all' | 'morning' | 'afternoon' | 'evening';

export function MedicationReminders() {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('morning');

  const filters: { value: TimeFilter; label: string }[] = [
    { value: 'all', label: '全天' },
    { value: 'morning', label: '上午' },
    { value: 'afternoon', label: '下午' },
    { value: 'evening', label: '晚上' }
  ];

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-sm mb-20">
      {/* Time Filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide">
        {filters.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setTimeFilter(value)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              timeFilter === value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Timeline Header */}
      <h3 className="font-medium text-gray-800 mb-4">今日用药提醒</h3>

      {/* Reminders List with Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-[19px] top-2 bottom-2 w-[2px] bg-gray-200" />

        {/* Reminders */}
        <div className="space-y-6">
          {reminders.map((reminder, index) => (
            <div key={`${reminder.name}-${index}`} className="relative flex items-start gap-4">
              {/* Timeline Dot */}
              <div className="relative">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 relative ${
                  reminder.type === 'expiring' ? 'bg-amber-50' : 'bg-blue-50'
                }`}>
                  <span className="text-lg">{reminder.icon}</span>
                </div>
                {/* Time */}
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs text-gray-500 whitespace-nowrap">
                  {reminder.time}
                </div>
              </div>

              {/* Content */}
              <div className={`flex-1 rounded-xl p-4 shadow-sm ${
                reminder.type === 'expiring' ? 'bg-amber-50' : 'bg-white'
              }`}>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">{reminder.name}</h3>
                    <p className={`text-sm ${
                      reminder.type === 'expiring' ? 'text-amber-600' : 'text-gray-500'
                    }`}>{reminder.description}</p>
                  </div>
                  <div className={`flex items-center gap-1 ${
                    reminder.type === 'expiring' ? 'text-amber-600' : 'text-blue-600'
                  }`}>
                    {reminder.type === 'expiring' ? (
                      <AlertTriangle className="w-4 h-4" />
                    ) : (
                      <Clock className="w-4 h-4" />
                    )}
                    <span className="text-sm font-medium">{reminder.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}