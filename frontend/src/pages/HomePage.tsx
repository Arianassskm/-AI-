import { useEffect } from "react";
import { PlanProgress } from "../components/home/PlanProgress";
import { WeeklyPlanCard } from "../components/home/WeeklyPlanCard";
import { MedicationTimeline } from "../components/home/MedicationTimeline";
import { useLocalStorageListener } from "@/hooks/useLocalStorage";

const weeklyData = [
  { day: "日", slots: [false, false, false, false] },
  { day: "一", slots: [true, true, false, true] },
  { day: "二", slots: [true, true, false, false] },
  { day: "三", slots: [true, true, true, false] },
  { day: "四", slots: [false, false, false, false] },
  { day: "五", slots: [true, false, true, false] },
  { day: "六", slots: [true, true, false, true] },
];

export function HomePage() {
  const [isShowTab, setIsShowTab] = useLocalStorageListener("isShowTab", true);

  useEffect(() => {
    setIsShowTab(true);
  }, []);

  const calculateWeekProgress = () => {
    const totalSlots = weeklyData.reduce(
      (sum, day) => sum + day.slots.length,
      0
    );
    const completedSlots = weeklyData.reduce(
      (sum, day) => sum + day.slots.filter((slot) => slot).length,
      0
    );
    return Math.round((completedSlots / totalSlots) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 via-blue-100 to-purple-100">
      <div className="max-w-md mx-auto">
        <div className="h-screen overflow-y-auto pb-24">
          <div className="px-4 pt-safe-top space-y-4">
            <PlanProgress
              doctorName="Doctor Richard"
              title="您病毒性感冒计划已完成"
              progress={67}
              daysUsed={2}
              daysLeft={3}
            />

            <WeeklyPlanCard
              weekProgress={calculateWeekProgress()}
              days={weeklyData}
            />

            <MedicationTimeline />
          </div>
        </div>
      </div>
    </div>
  );
}
