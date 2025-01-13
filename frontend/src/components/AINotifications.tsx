import { Bell } from 'lucide-react';

const notifications = [
  "您的感冒用药计划已完成 80%",
  "阿莫西林将在 3 天后到期",
  "建议更新家庭药箱库存",
];

export function AINotifications() {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 mb-6 mx-4 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <Bell className="w-5 h-5 text-purple-600" />
        <h3 className="font-medium text-purple-900">AI 智能提醒</h3>
      </div>
      <div className="space-y-2">
        {notifications.map((notification, index) => (
          <div 
            key={index}
            className="text-sm text-purple-700 bg-purple-50 p-3 rounded-xl shadow-sm"
          >
            {notification}
          </div>
        ))}
      </div>
    </div>
  );
}