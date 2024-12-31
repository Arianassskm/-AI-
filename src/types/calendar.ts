export interface DayData {
  date: string; // YYYY-MM-DD format
  isActive: boolean;
}

export interface WeekData {
  days: DayData[];
}

export interface CalendarData {
  weeks: WeekData[];
  totalDays: number;
  activeDays: number;
}
