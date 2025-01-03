import { useState } from "react";
import { Camera, PenLine, Calendar, Bell, X } from "lucide-react";
import { cn } from "../utils/cn";
import { ScanTypeSelector } from "./scanner/ScanTypeSelector";
import { MedicineScanGuide } from "./scanner/MedicineScanGuide";
import { PrescriptionScanGuide } from "./scanner/PrescriptionScanGuide";
import { CreatePlanModal } from "./plans/CreatePlanModal";
import MedicineConfirmationModal from "./MedicineConfirmationModal";
import { MedicineInfo } from "./MedicineConfirmationModal";
import { useNavigate } from "react-router-dom";
import type { NewPlanData } from "./plans/CreatePlanModal";
import { useLocalStorageListener } from "../hooks/useLocalStorage";
import type { MedicationPlan } from "../types/medicationPlan";
import LoadingOverlay from "./loading/LoadingOverlay";
import {
  accessToken,
  extractTask,
  pollingTask,
  ExtractResult,
} from "../services/ocrService";

interface CreateActionSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateActionSheet({ isOpen, onClose }: CreateActionSheetProps) {
  const [showScanSelector, setShowScanSelector] = useState(false);
  const [showMedicineScan, setShowMedicineScan] = useState(false);
  const [showPrescriptionScan, setShowPrescriptionScan] = useState(false);
  const [showCreatePlan, setShowCreatePlan] = useState(false);
  const [showMedicineConfirmation, setShowMedicineConfirmation] =
    useState(false);
  const [passMedicineInfo, setPassMedicineInfo] = useState({
    name: "",
    specification: "",
    manufacturer: "",
    expiryDate: "",
    batchNumber: "",
    packageInfo: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const [plans, setPlans] = useLocalStorageListener<MedicationPlan[]>(
    "plans",
    []
  );
  const [token, setToken] = useLocalStorageListener<string>("ocr_token", "");
  const [medicines, setMedicines] = useLocalStorageListener<MedicineInfo[]>(
    "medicines",
    []
  );

  const navigate = useNavigate();

  async function extractPictures(token: string, capturedPhotos: string[]) {
    setIsLoading(true);
    let taskIds = [];
    for (const pic of capturedPhotos) {
      const ret = await extractTask(
        token,
        pic,
        "440691ca34f59687432e3987f6241c1.jpg"
      );

      taskIds.push(ret.result.taskId);
    }
    // 图片抽取
    let result: ExtractResult[] = [];
    for (const task of taskIds) {
      const ret = await pollingTask(token, task);
      result = result.concat(ret);
    }

    // 处理数据
    console.log("图片抽取结果", JSON.stringify(result));
    let data = {};
    result.forEach((item) => {
      const keys = Object.keys(item.data.singleKey);

      for (const key of keys) {
        const value = item.data.singleKey[key];
        let words = "";
        for (const val of value) {
          words = words.concat(val.word);
        }
        console.log(`Key: ${key}, Value:${words}`);
        data[key] = words;
      }
    });
    console.log(data);
    console.log("传入", {
      name: data["名称"],
      specification: data["规格"],
      manufacturer: data["生产企业"],
      expiryDate: data["过期日期"],
      batchNumber: data["批次"],
      packageInfo: data["包装"],
    });
    // 跳转到药品确认/处方确认页面
    setPassMedicineInfo({
      name: data["名称"],
      specification: data["规格"],
      manufacturer: data["生产企业"],
      expiryDate: data["过期日期"],
      batchNumber: data["批次"],
      packageInfo: data["包装"],
    });

    setIsLoading(false);
    setShowMedicineConfirmation(true);
  }

  const handleScanTypeSelect = (type: "medicine" | "prescription") => {
    setShowScanSelector(false);
    if (type === "medicine") {
      setShowMedicineScan(true);
    } else {
      setShowPrescriptionScan(true);
    }
  };

  const handleScanComplete = (images: string[]) => {
    setShowMedicineScan(false);
    setShowPrescriptionScan(false);
    console.log("Captured images:", images);
    onClose();
  };

  /**
   * 扫描药品
   * @param images
   */
  const handleMedicineScanComplete = async (images: string[]) => {
    try {
      setShowMedicineScan(false);
      setShowPrescriptionScan(false);
      console.log("Captured images:", images);
      if (images.length > 0) {
        if (token) {
          extractPictures(token, images);
        } else {
          alert("token过期");
          // 刷新token
          const ret = await accessToken();
          console.log("token", ret.access_token);
          setToken(ret.access_token);
          extractPictures(ret.access_token, images);
        }
      }
    } catch (e) {
      console.error("Failed to extract medicine data:", e);
    }
  };

  const handleMedicineConfirmationConfirm = (medicineInfo, dosage) => {
    console.log("添加到药品", medicineInfo, dosage);
    const medi = {
      ...medicineInfo,
      id: medicines.length + 1,
      progress: Math.floor(Math.random() * 100),
      color: "bg-amber-500",
      imageUrl:
        "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=500&h=500&fit=crop",
      currentQuantity: dosage.amount,
      totalQuantity: Math.floor(Math.random() * 500),
      unit: dosage.unit,
    };
    console.log(medi);
    setPassMedicineInfo({
      name: "",
      specification: "",
      manufacturer: "",
      expiryDate: "",
      batchNumber: "",
      packageInfo: "",
    });

    setShowMedicineConfirmation(false);
    setMedicines([medi].concat(medicines));
    onClose();
  };

  const handleMedicineConfirmationClose = () => {
    setShowMedicineConfirmation(false);
    onClose();
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
      onClose();
    } catch (error) {
      console.error("Failed to create plan:", error);
    }
  };

  const handleSelect = (actionId: string) => {
    if (actionId === "scan") {
      setShowScanSelector(true);
    } else if (actionId === "manual") {
      navigate("/manual-entry");
      onClose();
    } else if (actionId === "plan") {
      setShowCreatePlan(true);
    } else if (actionId === "reminder") {
      navigate("/reminder");
      onClose();
    }
  };

  if (!isOpen) return null;

  const actions = [
    {
      id: "scan",
      icon: Camera,
      title: "扫描添加",
      description: "扫描药品或处方快速录入",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      gradient: "from-blue-50/50 to-blue-100/30",
    },
    {
      id: "manual",
      icon: PenLine,
      title: "手动录入",
      description: "手动输入药品信息",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      gradient: "from-purple-50/50 to-purple-100/30",
    },
    {
      id: "plan",
      icon: Calendar,
      title: "新建计划",
      description: "创建用药计划",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      gradient: "from-emerald-50/50 to-emerald-100/30",
    },
    {
      id: "reminder",
      icon: Bell,
      title: "新建提醒",
      description: "设置用药提醒",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      gradient: "from-amber-50/50 to-amber-100/30",
    },
  ];

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 touch-none"
        onClick={onClose}
      >
        <div
          className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl"
          style={{
            animation: "modalIn 0.3s ease-out",
            transform: "translate3d(0, 0, 0)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative px-4 pt-6 pb-8">
            {/* Handle */}
            <div className="absolute left-1/2 -top-3 -translate-x-1/2 w-12 h-1.5 bg-gray-300/80 rounded-full" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            {/* Title */}
            <h2 className="text-lg font-semibold text-gray-800 mb-6">新建</h2>

            {/* Actions Grid */}
            <div className="grid grid-cols-2 gap-3">
              {actions.map(
                ({
                  id,
                  icon: Icon,
                  title,
                  description,
                  color,
                  bgColor,
                  gradient,
                }) => (
                  <button
                    key={id}
                    onClick={() => handleSelect(id)}
                    className={cn(
                      "relative overflow-hidden rounded-xl p-4 text-left transition-all duration-300",
                      "hover:shadow-lg active:scale-[0.98]"
                    )}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${gradient}`}
                    />
                    <div className="relative">
                      <div
                        className={`w-10 h-10 rounded-xl ${bgColor} flex items-center justify-center mb-3`}
                      >
                        <Icon className={`w-5 h-5 ${color}`} />
                      </div>
                      <h3 className="text-base font-medium text-gray-800 mb-1">
                        {title}
                      </h3>
                      <p className="text-sm text-gray-500">{description}</p>
                    </div>
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      <ScanTypeSelector
        isOpen={showScanSelector}
        onClose={() => setShowScanSelector(false)}
        onSelect={handleScanTypeSelect}
      />

      <MedicineScanGuide
        isOpen={showMedicineScan}
        onClose={() => setShowMedicineScan(false)}
        onComplete={handleMedicineScanComplete}
      />

      <PrescriptionScanGuide
        isOpen={showPrescriptionScan}
        onClose={() => setShowPrescriptionScan(false)}
        onComplete={handleScanComplete}
      />

      <CreatePlanModal
        isOpen={showCreatePlan}
        onClose={() => setShowCreatePlan(false)}
        onSubmit={handleCreatePlan}
      />

      <MedicineConfirmationModal
        isOpen={showMedicineConfirmation}
        medicineInfo={passMedicineInfo}
        onClose={handleMedicineConfirmationClose}
        onConfirm={handleMedicineConfirmationConfirm}
      ></MedicineConfirmationModal>

      <LoadingOverlay isLoading={isLoading} />
    </>
  );
}
