import { Plus, Minus, Clock } from 'lucide-react';

interface TimePickerProps {
  times: string[];
  onChange: (times: string[]) => void;
  maxTimes?: number;
}

export function TimePicker({ times, onChange, maxTimes = 5 }: TimePickerProps) {
  const addTime = () => {
    if (times.length >= maxTimes) return;
    onChange([...times, '09:00']);
  };

  const removeTime = (index: number) => {
    onChange(times.filter((_, i) => i !== index));
  };

  const updateTime = (index: number, value: string) => {
    onChange(times.map((time, i) => i === index ? value : time));
  };

  return (
    <div className="space-y-3">
      {times.map((time, index) => (
        <div key={index} className="flex items-center gap-2">
          <div className="flex-1 relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="time"
              value={time}
              onChange={(e) => updateTime(index, e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {times.length > 1 && (
            <button
              type="button"
              onClick={() => removeTime(index)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
            >
              <Minus className="w-4 h-4" />
            </button>
          )}
        </div>
      ))}

      {times.length < maxTimes && (
        <button
          type="button"
          onClick={addTime}
          className="w-full py-2 border-2 border-dashed border-gray-200 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          添加时间
        </button>
      )}
    </div>
  );
}