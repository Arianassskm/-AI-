"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, Camera, X } from "lucide-react";

interface MedicineInfo {
  name: string;
  specification: string;
  manufacturer: string;
  expiryDate: string;
  batchNumber: string;
  packageInfo: string;
}

interface MedicineConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (
    medicineInfo: MedicineInfo,
    dosage: { amount: string; unit: string; frequency: string }
  ) => void;
  medicineInfo?: Partial<MedicineInfo>;
}

export default function MedicineConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  medicineInfo: initialMedicineInfo,
}: MedicineConfirmationModalProps) {
  const [medicineInfo, setMedicineInfo] = useState<MedicineInfo>({
    name: "",
    specification: "",
    manufacturer: "",
    expiryDate: "",
    batchNumber: "",
    packageInfo: "",
  });

  const [dosage, setDosage] = useState({
    amount: "1",
    unit: "粒",
    frequency: "3",
  });

  useEffect(() => {
    if (initialMedicineInfo) {
      setMedicineInfo((prevInfo) => ({
        ...prevInfo,
        ...initialMedicineInfo,
      }));
    }
  }, [initialMedicineInfo]);

  const handleInputChange = (field: keyof MedicineInfo, value: string) => {
    setMedicineInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleDosageChange = (field: keyof typeof dosage, value: string) => {
    setDosage((prev) => ({ ...prev, [field]: value }));
  };

  const calculateConsumption = (): string => {
    const match = medicineInfo.packageInfo.match(/(\d+)\s*[*×]\s*(\d+)/);
    if (!match) return "无法计算";

    const totalUnits = parseInt(match[1]) * parseInt(match[2]);
    const dailyConsumption =
      parseInt(dosage.amount) * parseInt(dosage.frequency);
    const daysLeft = Math.floor(totalUnits / dailyConsumption);

    return `约${daysLeft}天`;
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
            <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
              <Camera className="h-10 w-10 text-gray-400" />
            </div>
          </div>

          {Object.entries(medicineInfo).map(([key, value]) => (
            <div key={key}>
              <label
                htmlFor={key}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {key === "name"
                  ? "药品名称"
                  : key === "specification"
                  ? "规格"
                  : key === "manufacturer"
                  ? "生产厂家"
                  : key === "expiryDate"
                  ? "有效期"
                  : key === "batchNumber"
                  ? "批号"
                  : "包装信息"}
              </label>
              <input
                id={key}
                type="text"
                value={value}
                onChange={(e) =>
                  handleInputChange(key as keyof MedicineInfo, e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          ))}

          <div>
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              数量
            </label>
            <input
              id="quantity"
              type="number"
              defaultValue={1}
              min={1}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="usage"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              用法用量
            </label>
            <select
              id="usage"
              defaultValue="oral"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="oral">口服</option>
              <option value="external">外用</option>
              <option value="injection">注射</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="medicationTime"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              服用时间
            </label>
            <select
              id="medicationTime"
              defaultValue="afterMeal"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="beforeMeal">餐前</option>
              <option value="afterMeal">餐后</option>
              <option value="withMeal">随餐</option>
              <option value="emptyStomach">空腹</option>
              <option value="beforeSleep">睡前</option>
              <option value="other">其他</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              服用频率
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={dosage.amount}
                onChange={(e) => handleDosageChange("amount", e.target.value)}
                className="w-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                min={0.5}
                step={0.5}
              />
              <select
                value={dosage.unit}
                onChange={(e) => handleDosageChange("unit", e.target.value)}
                className="w-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="粒">粒</option>
                <option value="片">片</option>
                <option value="丸">丸</option>
                <option value="ml">ml</option>
              </select>
              <span>/次，</span>
              <input
                type="number"
                value={dosage.frequency}
                onChange={(e) =>
                  handleDosageChange("frequency", e.target.value)
                }
                className="w-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                min={1}
              />
              <span>次/日</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              预计可用天数
            </label>
            <div className="text-sm">{calculateConsumption()}</div>
          </div>

          <div>
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              备注
            </label>
            <textarea
              id="notes"
              placeholder="添加备注信息（选填）"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
            />
          </div>
        </div>

        <div className="sticky bottom-0 bg-white px-4 py-3 border-t">
          <button
            onClick={() => onConfirm(medicineInfo, dosage)}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            确认添加到药箱
          </button>
        </div>
      </div>
    </div>
  );
}
