interface WeekdaySelectorProps {
  selected: number[];
  onChange: (days: number[]) => void;
}

const weekdays = [
  { value: 0, label: '日' },
  { value: 1, label: '一' },
  { value: 2, label: '二' },
  { value: 3, label: '三' },
  { value: 4, label: '四' },
  { value: 5, label: '五' },
  { value: 6, label: '六' }
];

export function WeekdaySelector({ selected, onChange }: WeekdaySelectorProps) {
  const toggleDay = (day: number) => {
    if (selected.includes(day)) {
      onChange(selected.filter(d => d !== day));
    } else {
      onChange([...selected, day].sort());
    }
  };

  return (
    <div className="flex gap-2">
      {weekdays.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          onClick={() => toggleDay(value)}
          className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
            selected.includes(value)
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}