import { Award, Calendar, CheckCircle2 } from 'lucide-react';
import { Card } from '../ui/Card';

interface StatsOverviewProps {
  stats: {
    bestStreak: number;
    completedDoses: number;
    totalDoses: number;
    completionRate: string;
  };
}

export function StatsOverview({ stats }: StatsOverviewProps) {
  const { bestStreak, completedDoses, totalDoses, completionRate } = stats;

  const overviewItems = [
    {
      icon: Award,
      label: '最佳连续天数',
      value: `${bestStreak}天`,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50'
    },
    {
      icon: Calendar,
      label: '完成剂量',
      value: `${completedDoses}/${totalDoses}`,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: CheckCircle2,
      label: '完成率',
      value: `${completionRate}%`,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      {overviewItems.map(({ icon: Icon, label, value, color, bgColor }) => (
        <Card key={label} gradient hover>
          <div className="p-4 space-y-2">
            <div className={`${bgColor} w-10 h-10 rounded-xl flex items-center justify-center`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <div>
              <div className="text-xl font-semibold text-gray-800">{value}</div>
              <div className="text-sm text-gray-500">{label}</div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}