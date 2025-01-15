import { useEffect, useState } from "react";
import { Search, Plus } from "lucide-react";
import { medicineService, Medicine } from "@/services/medicineService";
import { useToast } from "@/hooks/useToast";
import { MedicinePlanDetail } from "@/services/medicinePlanService";

interface MedicineInfo extends Medicine, MedicinePlanDetail {}

interface MedicineSelectorProps {
  selectedMedicines: MedicineInfo[];
  onMedicinesChange: (medicines: Medicine[]) => void;
}

export function MedicineSelector({
  selectedMedicines,
  onMedicinesChange,
}: MedicineSelectorProps) {
  const toast = useToast();
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [availableMedicines, setAvailableMedicines] = useState<Medicine[]>([]);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const ret = await medicineService.getAllMedicines();
        if (ret.success) {
          setMedicines(ret.data);
          setAvailableMedicines(ret.data);
        } else {
          toast(ret.message, "error");
        }
      } catch (err) {
        toast("获取药品数据失败", "error");
      }
    };

    fetchMedicines();
  }, []);

  const handleSearch = (query: string) => {
    setAvailableMedicines(
      medicines.filter((medicine) =>
        medicine.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const toggleMedicine = (medicine: Medicine) => {
    const isSelected = selectedMedicines.some(
      (m) => m.medicineId === medicine.id
    );
    if (isSelected) {
      onMedicinesChange(
        selectedMedicines.filter((m) => m.medicineId !== medicine.id)
      );
    } else {
      onMedicinesChange([
        ...selectedMedicines,
        {
          id: null,
          planId: null,
          medicineId: medicine.id,

          dosage: 1,
          frequency: "每日1次",
          timing: "饭后服用",

          name: medicine.name,
          image: medicine.image,
          unit: medicine.unit,
        },
      ]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="text"
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="搜索药品..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      </div>

      <div className="space-y-3">
        {availableMedicines.map((medicine) => {
          const isSelected = selectedMedicines.some(
            (m) => m.medicineId === medicine.id
          );
          return (
            <div
              key={medicine.id}
              onClick={() => toggleMedicine(medicine)}
              className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-all ${
                isSelected
                  ? "bg-blue-50 border-2 border-blue-500"
                  : "bg-gray-50 border-2 border-transparent hover:bg-gray-100"
              }`}
            >
              <img
                src={medicine.image}
                alt={medicine.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-medium text-gray-800">{medicine.name}</h3>
                <p className="text-sm text-gray-500">
                  {medicine.currentQuantity}/{medicine.totalQuantity}
                  {medicine.unit}
                </p>
              </div>
              <div
                className={`w-6 h-6 rounded-full border-2 ${
                  isSelected ? "border-blue-500 bg-blue-500" : "border-gray-300"
                }`}
              />
            </div>
          );
        })}
      </div>

      <button
        type="button"
        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors flex items-center justify-center gap-2"
      >
        <Plus className="w-5 h-5" />
        添加其他药品
      </button>
    </div>
  );
}
