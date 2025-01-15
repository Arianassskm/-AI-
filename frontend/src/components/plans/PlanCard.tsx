import { Calendar, Clock, CheckCircle2 } from "lucide-react";
import {
  MedicinePlan,
  calculateProgress,
} from "@/services/medicinePlanService";

interface PlanCardProps {
  plan: MedicinePlan;
  onClick: () => void;
}

export function PlanCard({ plan, onClick }: PlanCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
    >
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

      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>{plan.startDate}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{plan.endDate}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${calculateProgress(plan)}%` }}
          />
        </div>
        <span className="text-sm font-medium text-gray-600">
          {calculateProgress(plan)}%
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex -space-x-2">
          {plan.details.map((detail) => (
            <div
              key={detail.id}
              className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-white"
            >
              <img
                src={detail.medicine.image}
                alt={detail.medicine.name}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1 text-sm text-emerald-600">
          <CheckCircle2 className="w-4 h-4" />
          <span>按计划进行</span>
        </div>
      </div>
    </div>
  );
}
