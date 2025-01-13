import { format } from '../../utils/dateTime';

interface TimeRangeSelectorProps {
  selectedDate: Date;
  onChange: (date: Date) => void;
}

export function TimeRangeSelector({ selectedDate, onChange }: TimeRangeSelectorProps) {
  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  return (
    <button 
      onClick={() => onChange(new Date())}
      className="px-3 py-1 text-sm font-medium rounded-full hover:bg-gray-100"
    >
      {isToday(selectedDate) ? '今天' : format(selectedDate, 'MM月DD日')}
    </button>
  );
}