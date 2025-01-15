import { useState } from "react";
import { X, Plus, Calendar, Clock, Pill } from "lucide-react";
import { MedicineSelector } from "./MedicineSelector";
import { DateRangeSelector } from "./DateRangeSelector";
import { DosageScheduler } from "./DosageScheduler";
import {
  medicinePlanService,
  MedicinePlan,
  MedicinePlanDetail,
} from "@/services/medicinePlanService";
import { useToast } from "@/hooks/useToast";
import { getValue } from "@/hooks/useLocalStorage";
interface CreatePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export interface NewPlanData {
  name: string;
  startDate: string;
  endDate: string;
  details: MedicinePlanDetail[];
}

export function CreatePlanModal({
  isOpen,
  onClose,
  onSubmit,
}: CreatePlanModalProps) {
  const [step, setStep] = useState(1);
  const [planData, setPlanData] = useState<NewPlanData>({
    name: "",
    startDate: "",
    endDate: "",
    details: [],
  });
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("创建计划", planData);
    const userInfo = getValue("userInfo");
    if (userInfo === undefined || userInfo.id === undefined) {
      toast("请先登录", "error");
      setIsLoading(false);
      return;
    }
    planData.userId = userInfo.id;
    for (const detail of planData.details) {
      detail.dosage = Number(detail.dosage);
    }

    const ret = await medicinePlanService.createPlan(planData);
    console.log("创建计划结果", ret);
    setIsLoading(false);
    if (ret.success) {
      toast("创建计划成功", "success");
      handleClose();
      onSubmit();
    } else {
      toast("创建计划失败", "error");
    }
  };

  const handleMedicinePlanDetailsChange = (
    medicinePlanDetails: MedicinePlanDetail[]
  ) => {
    setPlanData((prev: MedicinePlan) => ({
      ...prev,
      details: medicinePlanDetails,
    }));
    console.log("更新用药计划", medicinePlanDetails);
  };

  const handleClose = () => {
    setStep(1);
    setPlanData({
      name: "",
      startDate: "",
      endDate: "",
      details: [],
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-[90%] max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 z-10 bg-white border-b border-gray-100">
          <div className="p-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">
              创建用药计划
            </h2>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="px-4 pb-4">
            <div className="flex justify-between">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`w-1/3 h-1 rounded-full ${
                    s <= step ? "bg-blue-500" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  计划名称
                </label>
                <input
                  type="text"
                  value={planData.name}
                  onChange={(e) =>
                    setPlanData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="例如：感冒治疗"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <DateRangeSelector
                startDate={planData.startDate}
                endDate={planData.endDate}
                onStartDateChange={(date) =>
                  setPlanData((prev) => ({ ...prev, startDate: date }))
                }
                onEndDateChange={(date) =>
                  setPlanData((prev) => ({ ...prev, endDate: date }))
                }
              />
            </div>
          )}

          {step === 2 && (
            <MedicineSelector
              selectedMedicines={planData.details}
              onMedicinesChange={handleMedicinePlanDetailsChange}
            />
          )}

          {step === 3 && (
            <DosageScheduler
              medicines={planData.details}
              onMedicinesChange={handleMedicinePlanDetailsChange}
            />
          )}

          <div className="flex gap-3">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="flex-1 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50"
              >
                上一步
              </button>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="flex-1 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                下一步
              </button>
            ) : (
              <button
                disabled={isLoading}
                type="submit"
                className="flex-1 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                创建计划
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
