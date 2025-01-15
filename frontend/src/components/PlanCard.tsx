import { useState } from "react";
import { PlanDetailModal } from "./plans/PlanDetailModal";
import {
  MedicinePlan,
  calculateProgress,
} from "@/services/medicinePlanService";

interface PlanCardProps {
  plan: MedicinePlan;
}

export function PlanCard({ plan }: PlanCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className="card p-3 cursor-pointer hover:shadow-md transition-all duration-300 active:scale-[0.98]"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="h-full flex flex-col">
          <div className="mb-auto">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-800">{plan.name}</h3>
              <div
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  plan.status === "active"
                    ? "bg-blue-50 text-blue-600"
                    : "bg-emerald-50 text-emerald-600"
                }`}
              >
                {plan.status === "active" ? "进行中" : "已完成"}
              </div>
            </div>
            <p className="text-[10px] text-gray-500">
              {plan.startDate} - {plan.endDate}
            </p>
          </div>

          <div className="mt-3">
            <div className="flex items-center gap-1.5 mb-1">
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-300"
                  style={{ width: `${calculateProgress(plan)}%` }}
                />
              </div>
              <span className="text-xs text-gray-600 flex-shrink-0 w-7">
                {calculateProgress(plan)}%
              </span>
            </div>
            <div className="flex -space-x-2">
              {plan.details.map((detail) => (
                <div
                  key={detail.id}
                  className="w-5 h-5 rounded-full overflow-hidden ring-2 ring-white"
                >
                  <img
                    src={detail.medicine.image}
                    alt={detail.medicine.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <PlanDetailModal
        plan={plan}
        isOpen={!!isModalOpen}
        onClose={() => setIsModalOpen(!isModalOpen)}
      />
    </>
  );
}
