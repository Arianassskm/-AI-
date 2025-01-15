import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { PlanCard } from "../components/PlanCard";
import { MedicineCard } from "../components/MedicineCard";
import { SpaceHeader } from "../components/SpaceHeader";
import { medicineService, Medicine } from "@/services/medicineService";
import {
  medicinePlanService,
  MedicinePlan,
} from "@/services/medicinePlanService";
import { useToast } from "@/hooks/useToast";
import { getValue } from "@/hooks/useLocalStorage";

export function SpacePage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [medicationPlans, setMedicationPlans] = useState<MedicinePlan[]>([]);
  const [isLoadingPlans, setIsLoadingPlans] = useState(true);
  const [errorPlans, setErrorPlans] = useState<string | null>(null);

  const [isLoadingMedicines, setIsLoadingMedicines] = useState(true);
  const [errorMedicines, setErrorMedicines] = useState<string | null>(null);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        setIsLoadingMedicines(true);
        const ret = await medicineService.getAllMedicines();

        if (ret.success) {
          setMedicines(ret.data);
        } else {
          setErrorMedicines(ret.message);
        }
      } catch (err) {
        setErrorMedicines("获取药品数据失败");
      } finally {
        setIsLoadingMedicines(false);
      }
    };

    const fetchMedicinePlans = async () => {
      try {
        setIsLoadingPlans(true);
        const userInfo = getValue("userInfo");
        if (userInfo === undefined || userInfo.id === undefined) {
          toast("请先登录", "error");
          return;
        }
        const ret = await medicinePlanService.getUserPlans(userInfo.id);
        if (ret.success) {
          setMedicationPlans(ret.data);
        } else {
          setErrorPlans(ret.message);
        }
      } catch (err) {
        setErrorPlans("获取药品数据失败");
      } finally {
        setIsLoadingPlans(false);
      }
    };

    fetchMedicines();
    fetchMedicinePlans();
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
            {isLoadingPlans ? (
              <div className="flex justify-center items-center h-32">
                <p className="text-gray-500">加载中...</p>
              </div>
            ) : errorPlans ? (
              <div className="flex justify-center items-center h-32">
                <p className="text-red-500">{errorPlans}</p>
              </div>
            ) : medicationPlans.length === 0 ? (
              <div className="flex justify-center items-center h-32">
                <p className="text-gray-500">暂无计划</p>
              </div>
            ) : (
              medicationPlans.map((plan) => (
                <PlanCard key={plan.id} plan={plan} />
              ))
            )}
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
            {isLoadingMedicines ? (
              <div className="flex justify-center items-center h-32">
                <p className="text-gray-500">加载中...</p>
              </div>
            ) : errorMedicines ? (
              <div className="flex justify-center items-center h-32">
                <p className="text-red-500">{errorMedicines}</p>
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
