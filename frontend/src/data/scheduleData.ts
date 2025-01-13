export interface ScheduleDay {
  date: number;
  day: string;
  isCompleted?: boolean;
  isToday?: boolean;
}

export const scheduleData: ScheduleDay[] = [
  { date: 15, day: '周五' },
  { date: 16, day: '周六' },
  { date: 17, day: '周日' },
  { date: 18, day: '周一' },
  { date: 19, day: '周三', isCompleted: true },
  { date: 20, day: '周四', isCompleted: true },
  { date: 21, day: '周五', isToday: true },
  { date: 22, day: '周六' },
  { date: 23, day: '周日' },
  { date: 24, day: '周一' },
  { date: 25, day: '周二' },
  { date: 26, day: '周三' },
  { date: 27, day: '周四' },
  { date: 28, day: '周五' }
];