import { FileText, Bell, Calendar, Settings } from 'lucide-react';

const actions = [
  { icon: FileText, label: '健康档案', path: '/health-records' },
  { icon: Bell, label: '用药提醒', path: '/medication-reminders' },
  { icon: Calendar, label: '就医记录', path: '/medical-records' },
  { icon: Settings, label: '设置', path: '/settings' }
];

export function ProfileActions() {
  return (
    <div className="card p-4">
      <h2 className="text-base font-medium text-gray-800 mb-4">快捷操作</h2>
      <div className="grid grid-cols-4 gap-4">
        {actions.map(({ icon: Icon, label, path }) => (
          <button
            key={label}
            className="flex flex-col items-center gap-2 group"
          >
            <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-primary-50 transition-colors">
              <Icon className="w-5 h-5 text-gray-600 group-hover:text-primary-600" />
            </div>
            <span className="text-xs text-gray-600">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}