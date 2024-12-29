import { Calendar, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

export function PlanStats() {
  const stats = [
    {
      icon: Calendar,
      label: '进行中计划',
      value: '3',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      icon: CheckCircle2,
      label: '已完成计划',
      value: '12',
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-50'
    },
    {
      icon: Clock,
      label: '平均执行天数',
      value: '14',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50'
    },
    {
      icon: AlertTriangle,
      label: '需要关注',
      value: '2',
      color: 'text-amber-500',
      bgColor: 'bg-amber-50'
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-3 my-4">
      {stats.map(({ icon: Icon, label, value, color, bgColor }) => (
        <div key={label} className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className={`${bgColor} p-2 rounded-lg`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <div>
              <div className="text-lg font-semibold text-gray-800">{value}</div>
              <div className="text-sm text-gray-500">{label}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}