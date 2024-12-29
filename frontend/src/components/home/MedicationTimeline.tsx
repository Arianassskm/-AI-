import { useState, useEffect } from 'react';
import { AlertCircle, Clock, Check } from 'lucide-react';
import { cn } from '../../utils/cn';
import { medicationService } from '../../services/medicationService';
import type { MedicationReminder } from '../../types/medication';

// ... TimelineItem component remains the same ...

export function MedicationTimeline() {
  const [reminders, setReminders] = useState<MedicationReminder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = async () => {
    try {
      const data = await medicationService.getReminders();
      setReminders(data);
    } catch (err) {
      setError('Failed to load reminders');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async (reminderId: string) => {
    try {
      await medicationService.checkInReminder(reminderId);
      setReminders(prev => prev.map(reminder => 
        reminder.id === reminderId
          ? { ...reminder, isCompleted: true }
          : reminder
      ));
    } catch (err) {
      console.error('Failed to check in reminder:', err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-sm">
      <h2 className="text-base font-medium text-gray-800 mb-4">用药提醒</h2>
      
      <div className="relative">
        <div className="space-y-2">
          {reminders.map((reminder, index) => (
            <TimelineItem
              key={reminder.id}
              reminder={reminder}
              isFirst={index === 0}
              isLast={index === reminders.length - 1}
              onComplete={handleComplete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}