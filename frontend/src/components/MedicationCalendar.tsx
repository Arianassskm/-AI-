interface CalendarDay {
  date: number;
  completion: number; // 0-100
}

interface MedicationCalendarProps {
  month: string;
  days: CalendarDay[];
}

export function MedicationCalendar({ month, days }: MedicationCalendarProps) {
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
  
  return (
    <div className="bg-white rounded-lg p-4">
      <h3 className="text-lg font-medium text-gray-800 mb-4">{month}</h3>
      
      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-2">
        {weekDays.map(day => (
          <div key={day} className="text-center text-sm text-gray-500">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <div
            key={index}
            className="aspect-square relative rounded-md overflow-hidden"
          >
            <div 
              className="absolute inset-0 bg-purple-500 opacity-20"
              style={{ 
                opacity: day.completion ? (day.completion / 100) * 0.8 : 0.1
              }}
            />
            <span className="absolute inset-0 flex items-center justify-center text-sm text-gray-700">
              {day.date || ''}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}