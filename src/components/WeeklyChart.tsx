interface WeeklyData {
  day: string;
  completion: number;
}

interface WeeklyChartProps {
  data: WeeklyData[];
}

export function WeeklyChart({ data }: WeeklyChartProps) {
  const maxCompletion = 100;
  
  return (
    <div className="bg-white rounded-lg p-4">
      <div className="h-64 flex items-end justify-between">
        {data.map(({ day, completion }) => (
          <div key={day} className="flex flex-col items-center flex-1">
            <div className="w-full px-1">
              <div 
                className="w-full bg-purple-500 rounded-t-md transition-all duration-300"
                style={{ 
                  height: `${(completion / maxCompletion) * 200}px`,
                  opacity: completion ? 0.8 : 0.2
                }}
              />
            </div>
            <span className="mt-2 text-sm text-gray-600">周{day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}