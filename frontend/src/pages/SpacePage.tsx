import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { PlanCard } from "../components/PlanCard";
import { MedicineCard } from "../components/MedicineCard";
import { medicationPlans } from "../data/sampleData";
import { SpaceHeader } from "../components/SpaceHeader";
import { medicationService, Medication } from "../services/medication";

export function SpacePage() {
  const navigate = useNavigate();
  const [medicines, setMedicines] = useState<Medication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const ret = await medicationService.getAllMedications();
        console.log("用户药品", ret);

        if (ret.success) {
          setMedicines(ret.data);
        } else {
          setError(ret.message);
        }
      } catch (err) {
        setError("获取药品数据失败");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  return (
    <div className="page-container">
      <div className="px-4 pt-safe-top pb-24">
        <SpaceHeader />

        {/* Plans Section */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              用药计划
            </h2>
            <button
              onClick={() => navigate("/medication-plans")}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              管理
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {medicationPlans.map((plan) => (
              <PlanCard key={plan.name} {...plan} />
            ))}
          </div>
        </section>

        {/* Medicine Cabinet Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              家庭药箱
            </h2>
            <button
              onClick={() => navigate("/medication-cabinet")}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              管理
            </button>
          </div>

          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="flex justify-center items-center h-32">
                <p className="text-gray-500">加载中...</p>
              </div>
            ) : error ? (
              <div className="flex justify-center items-center h-32">
                <p className="text-red-500">{error}</p>
              </div>
            ) : medicines.length === 0 ? (
              <div className="flex justify-center items-center h-32">
                <p className="text-gray-500">暂无药品</p>
              </div>
            ) : (
              <div className="flex gap-4 pb-4 -mx-4 px-4 scrollbar-hide">
                {medicines.map((medicine) => (
                  <MedicineCard key={medicine.id} {...medicine} />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
