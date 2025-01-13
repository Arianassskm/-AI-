import { MoreHorizontal, User } from 'lucide-react';

interface PlanProgressProps {
  doctorName: string;
  title: string;
  progress: number;
  daysUsed: number;
  daysLeft: number;
}

export function PlanProgress({ 
  doctorName, 
  title, 
  progress, 
  daysUsed, 
  daysLeft 
}: PlanProgressProps) {
  return (
    <div className="card">
      <div className="relative z-10 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-500 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-gray-800">{doctorName}</h2>
              <span className="text-xs text-emerald-600">本人</span>
            </div>
          </div>
          <button className="p-1.5 hover:bg-white/20 rounded-full transition-colors">
            <MoreHorizontal className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">{title}</span>
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">{progress}%</span>
          </div>

          <div className="space-y-2">
            <div className="h-2 bg-emerald-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex justify-between text-xs">
              <span className="text-gray-500">
                已用药：<span className="text-gray-800">{daysUsed}天</span>
              </span>
              <div className="flex items-center gap-1 text-gray-500">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600"></span>
                剩余：<span className="text-emerald-600">{daysLeft}天</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}