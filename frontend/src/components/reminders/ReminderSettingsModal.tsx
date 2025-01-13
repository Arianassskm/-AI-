import { useState } from 'react';
import { X, Bell, Calendar, Clock, Repeat } from 'lucide-react';
import { TimePicker } from './TimePicker';
import { WeekdaySelector } from './WeekdaySelector';
import { NotificationSelector } from './NotificationSelector';

interface ReminderSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (settings: ReminderSettings) => Promise<void>;
  initialSettings?: Partial<ReminderSettings>;
}

export interface ReminderSettings {
  medicationId: string;
  times: string[];
  daysOfWeek: number[];
  notificationType: 'app' | 'email' | 'both';
  enabled: boolean;
}

export function ReminderSettingsModal({
  isOpen,
  onClose,
  onSave,
  initialSettings
}: ReminderSettingsModalProps) {
  const [settings, setSettings] = useState<ReminderSettings>({
    medicationId: initialSettings?.medicationId || '',
    times: initialSettings?.times || ['09:00'],
    daysOfWeek: initialSettings?.daysOfWeek || [1, 2, 3, 4, 5, 6, 0],
    notificationType: initialSettings?.notificationType || 'app',
    enabled: initialSettings?.enabled ?? true
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(settings);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-[90%] max-w-md shadow-xl">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-semibold text-gray-800">提醒设置</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-6">
          {/* Time Settings */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Clock className="w-4 h-4" />
              提醒时间
            </label>
            <TimePicker
              times={settings.times}
              onChange={(times) => setSettings(prev => ({ ...prev, times }))}
            />
          </div>

          {/* Weekday Settings */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Calendar className="w-4 h-4" />
              重复
            </label>
            <WeekdaySelector
              selected={settings.daysOfWeek}
              onChange={(days) => setSettings(prev => ({ ...prev, daysOfWeek: days }))}
            />
          </div>

          {/* Notification Settings */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Bell className="w-4 h-4" />
              通知方式
            </label>
            <NotificationSelector
              value={settings.notificationType}
              onChange={(type) => setSettings(prev => ({ ...prev, notificationType: type }))}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
          >
            保存设置
          </button>
        </form>
      </div>
    </div>
  );
}