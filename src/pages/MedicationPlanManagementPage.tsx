import { useState } from "react";
import { PlanManagementHeader } from "../components/plans/PlanManagementHeader";
import { PlanList } from "../components/plans/PlanList";
import { PlanFilters } from "../components/plans/PlanFilters";
import { PlanStats } from "../components/plans/PlanStats";
import { PlanActions } from "../components/plans/PlanActions";
import {
  PlanSortModal,
  type SortOption,
} from "../components/plans/PlanSortModal";
import {
  PlanFilterModal,
  type FilterOptions,
} from "../components/plans/PlanFilterModal";
import { CreatePlanModal } from "../components/plans/CreatePlanModal";
import type { NewPlanData } from "../components/plans/CreatePlanModal";
import { useLocalStorageListener } from "../hooks/useLocalStorage";
import type { MedicationPlan } from "../types/medicationPlan";

export function MedicationPlanManagementPage() {
  const [activeFilter, setActiveFilter] = useState<
    "all" | "active" | "completed"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSortModal, setShowSortModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [sortOption, setSortOption] = useState<SortOption>("startDate");
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    status: ["active", "completed"],
    dateRange: "all",
  });
  const [showCreatePlan, setShowCreatePlan] = useState<boolean>(false);
  const [plans, setPlans] = useLocalStorageListener<MedicationPlan[]>(
    "plans",
    []
  );

  const hanleOpenCreatePlan = () => {
    setShowCreatePlan(true);
  };

  const handleCreatePlan = async (planData: NewPlanData) => {
    try {
      const date = new Date();
      // 组装对象
      const plan = {
        id:
          "" +
          date.getFullYear() +
          date.getMonth() +
          date.getDay() +
          date.getHours() +
          date.getMinutes() +
          date.getSeconds(),
        name: planData.name,
        startDate: planData.startDate,
        endDate: planData.endDate,
        status: "active",
        progress: 0,
        medicines: planData.medicines,
      };

      setPlans([plan, ...plans]);
      setShowCreatePlan(false);
    } catch (error) {
      console.error("Failed to create plan:", error);
    }
  };

  const handleSort = (option: SortOption) => {
    setSortOption(option);
    // TODO: Apply sorting
  };

  const handleFilter = (filters: FilterOptions) => {
    setFilterOptions(filters);
    // TODO: Apply filters
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <PlanManagementHeader />

      <div className="max-w-2xl mx-auto px-4 pb-24">
        <PlanStats />

        <PlanActions
          onCreatePlan={hanleOpenCreatePlan}
          onSort={() => setShowSortModal(true)}
          onFilter={() => setShowFilterModal(true)}
        />

        <PlanFilters
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <PlanList
          filter={activeFilter}
          searchQuery={searchQuery}
          sortOption={sortOption}
          filterOptions={filterOptions}
        />

        <PlanSortModal
          isOpen={showSortModal}
          onClose={() => setShowSortModal(false)}
          onSort={handleSort}
          currentSort={sortOption}
        />

        <PlanFilterModal
          isOpen={showFilterModal}
          onClose={() => setShowFilterModal(false)}
          onFilter={handleFilter}
          currentFilters={filterOptions}
        />

        <CreatePlanModal
          isOpen={showCreatePlan}
          onClose={() => setShowCreatePlan(false)}
          onSubmit={handleCreatePlan}
        />
      </div>
    </div>
  );
}
