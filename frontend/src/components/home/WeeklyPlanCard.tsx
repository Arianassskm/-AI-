"use client";

import { Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { CalendarData } from "../../types/calendar";
import { calculateProgress, generateCalendarData } from "../../utils/calendar";
import { useNavigate } from "react-router-dom";

export function WeeklyPlanCard() {
  const [calendarData, setCalendarData] = useState<CalendarData>(
    generateCalendarData()
  );

  const days = ["日", "一", "二", "三", "四", "五", "六"];

  useEffect(() => {
    const savedData = localStorage.getItem("calendarData");
    if (savedData) {
      setCalendarData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("calendarData", JSON.stringify(calendarData));
  }, [calendarData]);

  const toggleDay = (weekIndex: number, dayIndex: number) => {
    setCalendarData((prevData) => {
      const newData = JSON.parse(JSON.stringify(prevData)) as CalendarData;
      const day = newData.weeks[weekIndex].days[dayIndex];
      day.isActive = !day.isActive;

      newData.activeDays = newData.weeks.reduce((acc, week) => {
        return acc + week.days.filter((day) => day.isActive).length;
      }, 0);

      return newData;
    });
  };

  const progress = calculateProgress(
    calendarData.activeDays,
    calendarData.totalDays
  );

  const navigate = useNavigate();

  return (
    <div className="w-full max-w-md rounded-xl p-6 shadow-lg transition-colors duration-300 bg-[#f7fbff] text-gray-900">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-[#34d399]" />
          <span className="text-sm">本周进度</span>
        </div>
      </div>

      <div className="mb-2">
        <div className="text-2xl font-bold sm:text-1xl">
          {progress.toFixed(2)}
          <div className="mt-1 inline text-xs text-gray-600">
            打卡情况 ({calendarData.activeDays}/{calendarData.totalDays} 天)
          </div>
        </div>
      </div>

      <div className="grid">
        <div className="mb-1 grid grid-cols-7 gap-5 text-center">
          {days.map((day) => (
            <div key={day} className="text-xs text-gray-600">
              {day}
            </div>
          ))}
        </div>

        <div className="grid gap-1">
          {calendarData.weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-cols-7 gap-5">
              {week.days.map((day, dayIndex) => (
                <button
                  key={day.date}
                  onClick={() => {
                    // 打了卡才跳转
                    if (day.isActive) {
                      // toggleDay(weekIndex, dayIndex);
                      navigate("/medication-stats");
                    }
                  }}
                  className={`aspect-square rounded transition-colors duration-200 ${
                    day.isActive
                      ? "bg-[#34d399] bg-opacity-90 hover:bg-[#059669]"
                      : "bg-[#e5e7eb] hover:bg-gray-300"
                  }`}
                  title={day.date}
                >
                  <span className="sr-only">
                    {day.date} - {day.isActive ? "已完成" : "未完成"}
                  </span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
