import { Activity, Heart, AlertCircle } from 'lucide-react';
import { Card } from '../ui/Card';

interface ProfileStatsProps {
  stats: {
    yearlyUsage: number;
    averageSteps: number;
    riskScore: number;
  };
}

export function ProfileStats({ stats }: ProfileStatsProps) {
  const { yearlyUsage, averageSteps, riskScore } = stats;

  const statItems = [
    {
      icon: Activity,
      label: '年度用药时间',
      value: `${yearlyUsage}%`,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Heart,
      label: '日均步数',
      value: averageSteps.toLocaleString(),
      color: 'text-rose-600',
      bgColor: 'bg-rose-50'
    },
    {
      icon: AlertCircle,
      label: '健康风险评分',
      value: riskScore,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50'
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {statItems.map(({ icon: Icon, label, value, color, bgColor }) => (
        <Card key={label} gradient hover className="p-3">
          <div className={`${bgColor} w-8 h-8 rounded-lg flex items-center justify-center mb-2`}>
            <Icon className={`w-5 h-5 ${color}`} />
          </div>
          <div className="space-y-1">
            <div className="font-medium text-gray-800">{value}</div>
            <div className="text-xs text-gray-500">{label}</div>
          </div>
        </Card>
      ))}
    </div>
  );
}