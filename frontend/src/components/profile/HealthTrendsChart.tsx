import { Line } from 'lucide-react';
import type { HealthTrend } from '../../services/healthTrends';

interface HealthTrendsChartProps {
  trends: HealthTrend[];
}

export function HealthTrendsChart({ trends }: HealthTrendsChartProps) {
  // 格式化日期
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  // 获取数据范围
  const getBounds = (values: number[]) => {
    const min = Math.min(...values);
    const max = Math.max(...values);
    const padding = (max - min) * 0.1;
    return {
      min: Math.max(0, min - padding),
      max: max + padding
    };
  };

  // 血压数据范围
  const bpBounds = getBounds([
    ...trends.map(t => t.bloodPressureSystolic),
    ...trends.map(t => t.bloodPressureDiastolic)
  ]);

  // 血糖数据范围
  const bsBounds = getBounds(trends.map(t => t.bloodSugar));

  // 心率数据范围
  const hrBounds = getBounds(trends.map(t => t.heartRate));

  return (
    <div className="space-y-6">
      {/* 血压趋势 */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="text-sm font-medium text-gray-800 mb-4">血压趋势</h3>
        <div className="h-40 relative">
          <div className="absolute inset-0">
            {trends.map((trend, index) => {
              const x = (index / (trends.length - 1)) * 100;
              const ySystolic = ((trend.bloodPressureSystolic - bpBounds.min) / (bpBounds.max - bpBounds.min)) * 100;
              const yDiastolic = ((trend.bloodPressureDiastolic - bpBounds.min) / (bpBounds.max - bpBounds.min)) * 100;
              
              return (
                <div key={trend.date} className="absolute" style={{ left: `${x}%`, bottom: 0 }}>
                  <div 
                    className="absolute w-2 h-2 bg-red-500 rounded-full -translate-x-1"
                    style={{ bottom: `${ySystolic}%` }}
                  />
                  <div 
                    className="absolute w-2 h-2 bg-blue-500 rounded-full -translate-x-1"
                    style={{ bottom: `${yDiastolic}%` }}
                  />
                  <div className="absolute -bottom-6 text-xs text-gray-500 -translate-x-1/2">
                    {formatDate(trend.date)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex justify-center gap-4 mt-8">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <span className="text-sm text-gray-600">收缩压</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full" />
            <span className="text-sm text-gray-600">舒张压</span>
          </div>
        </div>
      </div>

      {/* 血糖趋势 */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="text-sm font-medium text-gray-800 mb-4">血糖趋势</h3>
        <div className="h-40 relative">
          <div className="absolute inset-0">
            {trends.map((trend, index) => {
              const x = (index / (trends.length - 1)) * 100;
              const y = ((trend.bloodSugar - bsBounds.min) / (bsBounds.max - bsBounds.min)) * 100;
              
              return (
                <div key={trend.date} className="absolute" style={{ left: `${x}%`, bottom: 0 }}>
                  <div 
                    className="absolute w-2 h-2 bg-purple-500 rounded-full -translate-x-1"
                    style={{ bottom: `${y}%` }}
                  />
                  <div className="absolute -bottom-6 text-xs text-gray-500 -translate-x-1/2">
                    {formatDate(trend.date)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 心率趋势 */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="text-sm font-medium text-gray-800 mb-4">心率趋势</h3>
        <div className="h-40 relative">
          <div className="absolute inset-0">
            {trends.map((trend, index) => {
              const x = (index / (trends.length - 1)) * 100;
              const y = ((trend.heartRate - hrBounds.min) / (hrBounds.max - hrBounds.min)) * 100;
              
              return (
                <div key={trend.date} className="absolute" style={{ left: `${x}%`, bottom: 0 }}>
                  <div 
                    className="absolute w-2 h-2 bg-green-500 rounded-full -translate-x-1"
                    style={{ bottom: `${y}%` }}
                  />
                  <div className="absolute -bottom-6 text-xs text-gray-500 -translate-x-1/2">
                    {formatDate(trend.date)}
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