import { CalendarData, DayData } from "../types/calendar";

export function generateCalendarData(numWeeks: number = 4): CalendarData {
  const today = new Date();
  const days: DayData[] = [];
  let totalDays = numWeeks * 7;

  for (let i = totalDays - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    days.push({
      date: date.toISOString().split("T")[0],
      isActive: Math.random() < 0.3, // Randomly set some days as active for demonstration
    });
  }

  const weeks: WeekData[] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push({ days: days.slice(i, i + 7) });
  }

  const activeDays = days.filter((day) => day.isActive).length;

  return {
    weeks,
    totalDays,
    activeDays,
  };
}

export function calculateProgress(
  activeDays: number,
  totalDays: number
): number {
  return (activeDays / totalDays) * 100;
}
