import { useState, useEffect } from "react";
import { Camera, X } from "lucide-react";
import { Medication } from "@/services/medication";
import { useToast } from "@/hooks/useToast";

export interface MedicineInfo {
  id: number;
  name: string;
  manufacturer: string;
  specification: string;
  packageInfo: string;
  approvalNumber: string;
  batchNumber: string;
  expiryDate: string;
  unit: string;
  totalQuantity: number;
  currentQuantity: number;
  storageCondition: string;
  description?: string;
  image?: string;
}

interface MedicineConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (medicineInfo: Medication) => void;
  medicineInfo?: Partial<Medication>;
}

export default function MedicineConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  medicineInfo: initialMedicineInfo,
}: MedicineConfirmationModalProps) {
  const { toast } = useToast();
  const [medicineInfo, setMedicineInfo] = useState<Medication>({
    name: "",
    manufacturer: "",
    specification: "",
    packageInfo: "",
    approvalNumber: "",
    batchNumber: "",
    expiryDate: "",
    unit: "片",
    totalQuantity: 1,
    currentQuantity: 1,
    storageCondition: "",
    description: "",
  });

  useEffect(() => {
    if (initialMedicineInfo) {
      setMedicineInfo((prevInfo) => ({
        ...prevInfo,
        ...initialMedicineInfo,
      }));
    }
  }, [initialMedicineInfo]);

  const handleInputChange = (field: keyof Medication, value: string) => {
    setMedicineInfo((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    const requiredFields = [
      { key: "name", label: "药品名称" },
      { key: "manufacturer", label: "生产厂家" },
      { key: "specification", label: "规格" },
      { key: "packageInfo", label: "包装" },
      { key: "batchNumber", label: "批号" },
      { key: "expiryDate", label: "有效期" },
      { key: "unit", label: "单位" },
      { key: "currentQuantity", label: "当前数量" },
      { key: "storageCondition", label: "储存条件" },
    ];

    for (const field of requiredFields) {
      if (!medicineInfo[field.key as keyof Medication]) {
        toast(`请填写${field.label}`, "error");
        return false;
      }
    }

    if (medicineInfo.currentQuantity <= 0) {
      toast("当前数量必须大于0", "error");
      return false;
    }

    return true;
  };

  const handleConfirm = () => {
    if (validateForm()) {
      onConfirm(medicineInfo);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <header className="sticky top-0 bg-white z-10 px-4 py-3 border-b flex items-center justify-between">
          <h2 className="text-lg font-medium">确认药品信息</h2>
          <button onClick={onClose} className="p-1">
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="p-4 space-y-6">
          <div className="flex justify-center mb-4">
            {medicineInfo.image ? (
              <div className="relative w-32 h-32">
                <img
                  src={medicineInfo.image}
                  alt={medicineInfo.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ) : (
              <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                <Camera className="h-10 w-10 text-gray-400" />
              </div>
            )}
          </div>

          <div className="space-y-4">
            {[
              { key: "name", label: "药品名称", required: true },
              { key: "manufacturer", label: "生产厂家", required: true },
              { key: "specification", label: "规格", required: true },
              { key: "packageInfo", label: "包装", required: true },
              { key: "approvalNumber", label: "批准文号" },
              { key: "batchNumber", label: "批号", required: true },
              {
                key: "expiryDate",
                label: "有效期",
                type: "date",
                required: true,
              },
              { key: "unit", label: "单位", required: true },
              {
                key: "currentQuantity",
                label: "当前数量",
                type: "number",
                required: true,
              },
              {
                key: "totalQuantity",
                label: "总数量",
                type: "number",
                required: true,
              },
              { key: "storageCondition", label: "储存条件", required: true },
            ].map(({ key, label, type = "text", required }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {label} {required && <span className="text-red-500">*</span>}
                </label>
                {key === "totalQuantity" ? (
                  <input
                    disabled={true}
                    type={type}
                    value={medicineInfo["totalQuantity"]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : key === "currentQuantity" ? (
                  <input
                    type={type}
                    value={medicineInfo["currentQuantity"]}
                    onChange={(e) => {
                      handleInputChange("currentQuantity", e.target.value);
                      handleInputChange("totalQuantity", e.target.value);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <input
                    type={type}
                    value={medicineInfo[key as keyof Medication]}
                    onChange={(e) =>
                      handleInputChange(key as keyof Medication, e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                )}
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                药品说明
              </label>
              <textarea
                value={medicineInfo.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                rows={5}
              />
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white px-4 py-3 border-t">
          <button
            onClick={handleConfirm}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            确认添加到药箱
          </button>
        </div>
      </div>
    </div>
  );
}
