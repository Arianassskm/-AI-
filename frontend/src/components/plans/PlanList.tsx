import { useEffect, useState } from "react";
import { PlanCard } from "./PlanCard";
import { PlanDetailModal } from "./PlanDetailModal";
import type { MedicationPlan } from "../../types/medicationPlan";
import { useLocalStorageListener } from "../../hooks/useLocalStorage";

interface PlanListProps {
  filter: "all" | "active" | "completed";
  searchQuery: string;
}

export function PlanList({ filter, searchQuery }: PlanListProps) {
  const [selectedPlan, setSelectedPlan] = useState<MedicationPlan | null>(null);
  const [plans] = useLocalStorageListener<MedicationPlan[]>("plans", []);

  const filteredPlans = plans.filter((plan) => {
    if (filter === "active" && plan.status !== "active") return false;
    if (filter === "completed" && plan.status !== "completed") return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        plan.name.toLowerCase().includes(query) ||
        plan.medicines.some((med) => med.name.toLowerCase().includes(query))
      );
    }
    return true;
  });

  return (
    <div className="space-y-4">
      {filteredPlans.map((plan) => (
        <PlanCard
          key={plan.id}
          plan={plan}
          onClick={() => setSelectedPlan(plan)}
        />
      ))}

      {filteredPlans.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">暂无符合条件的用药计划</p>
        </div>
      )}

      <PlanDetailModal
        plan={selectedPlan}
        isOpen={!!selectedPlan}
        onClose={() => setSelectedPlan(null)}
      />
    </div>
  );
}
