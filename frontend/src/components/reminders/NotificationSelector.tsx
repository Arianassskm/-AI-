import { Bell, Mail } from 'lucide-react';

interface NotificationSelectorProps {
  value: 'app' | 'email' | 'both';
  onChange: (value: 'app' | 'email' | 'both') => void;
}

export function NotificationSelector({ value, onChange }: NotificationSelectorProps) {
  return (
    <div className="flex gap-3">
      <button
        type="button"
        onClick={() => onChange('app')}
        className={`flex-1 p-3 rounded-lg border-2 transition-colors ${
          value === 'app'
            ? 'border-blue-500 bg-blue-50 text-blue-600'
            : 'border-gray-200 hover:border-blue-200'
        }`}
      >
        <Bell className="w-5 h-5 mx-auto mb-2" />
        <div className="text-sm font-medium">应用内提醒</div>
      </button>

      <button
        type="button"
        onClick={() => onChange('email')}
        className={`flex-1 p-3 rounded-lg border-2 transition-colors ${
          value === 'email'
            ? 'border-blue-500 bg-blue-50 text-blue-600'
            : 'border-gray-200 hover:border-blue-200'
        }`}
      >
        <Mail className="w-5 h-5 mx-auto mb-2" />
        <div className="text-sm font-medium">邮件提醒</div>
      </button>

      <button
        type="button"
        onClick={() => onChange('both')}
        className={`flex-1 p-3 rounded-lg border-2 transition-colors ${
          value === 'both'
            ? 'border-blue-500 bg-blue-50 text-blue-600'
            : 'border-gray-200 hover:border-blue-200'
        }`}
      >
        <div className="relative w-5 h-5 mx-auto mb-2">
          <Bell className="w-4 h-4 absolute -left-1" />
          <Mail className="w-4 h-4 absolute -right-1" />
        </div>
        <div className="text-sm font-medium">双重提醒</div>
      </button>
    </div>
  );
}