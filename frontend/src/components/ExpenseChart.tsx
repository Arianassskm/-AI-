interface ExpenseData {
  day: string;
  amount: number;
}

interface ExpenseChartProps {
  data: ExpenseData[];
}

export function ExpenseChart({ data }: ExpenseChartProps) {
  const maxAmount = Math.max(...data.map(d => d.amount));
  
  return (
    <div className="relative h-64">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-50 to-transparent" />
      
      {/* Chart */}
      <div className="relative h-full flex items-end justify-between px-4">
        {data.map(({ day, amount }) => (
          <div key={day} className="flex flex-col items-center">
            <div className="h-40 flex items-end mb-2">
              {amount > 0 && (
                <>
                  <div 
                    className="w-2 bg-purple-500 rounded-t"
                    style={{ 
                      height: `${(amount / maxAmount) * 100}%`,
                      minHeight: '4px'
                    }} 
                  />
                  <span className="absolute -top-6 text-sm font-medium text-gray-700">
                    £{amount}
                  </span>
                </>
              )}
            </div>
            <span className="text-sm text-gray-600">{day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}