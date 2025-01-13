import { useState, useEffect } from 'react';
import { TimelineItem } from './TimelineItem';
import { TimeRangeSelector } from './TimeRangeSelector';
import { medicationReminderService } from '../../services/medicationReminder';
import type { MedicationReminder } from '../../types/medication';

export function MedicationTimeline() {
  const [reminders, setReminders] = useState<MedicationReminder[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const loadReminders = async (date: Date, pageNum: number) => {
    try {
      setLoading(true);
      const data = await medicationReminderService.getReminders(date, pageNum);
      if (pageNum === 0) {
        setReminders(data);
      } else {
        setReminders(prev => [...prev, ...data]);
      }
      setHasMore(data.length > 0);
    } catch (error) {
      console.error('Failed to load reminders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(0);
    loadReminders(selectedDate, 0);
  }, [selectedDate]);

  const handleComplete = async (reminderId: string) => {
    setReminders(prev => prev.map(reminder => 
      reminder.id === reminderId
        ? { ...reminder, isCompleted: true }
        : reminder
    ));
  };

  const handleCancel = async (reminderId: string) => {
    setReminders(prev => prev.map(reminder => 
      reminder.id === reminderId
        ? { ...reminder, isCompleted: false }
        : reminder
    ));
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight * 1.5 && !loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadReminders(selectedDate, nextPage);
    }
  };

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-medium text-gray-800">用药提醒</h2>
        <TimeRangeSelector 
          selectedDate={selectedDate}
          onChange={setSelectedDate}
        />
      </div>
      
      <div 
        className="relative max-h-[60vh] overflow-y-auto"
        onScroll={handleScroll}
      >
        <div className="space-y-2">
          {reminders.map((reminder, index) => (
            <TimelineItem
              key={reminder.id}
              reminder={reminder}
              isFirst={index === 0}
              isLast={index === reminders.length - 1}
              onComplete={handleComplete}
              onCancel={handleCancel}
            />
          ))}
        </div>

        {loading && (
          <div className="py-4 text-center text-gray-500 text-sm">
            加载中...
          </div>
        )}
      </div>
    </div>
  );
}