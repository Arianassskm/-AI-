import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import { MedicationCabinetScore } from "../components/MedicationCabinetScore";
import { MedicationCategoryCard } from "../components/MedicationCategoryCard";
import { InventoryStats } from "../components/inventory/InventoryStats";
import { InventoryCard } from "../components/inventory/InventoryCard";
import { InventoryUpdateModal } from "../components/inventory/InventoryUpdateModal";
import { Input } from "../components/ui/Input";
import { useLocalStorageListener } from "../hooks/useLocalStorage";
import { MedicineInfo } from "../components/MedicineConfirmationModal";

// Mock data
// const medications = [
//   {
//     id: "1",
//     name: "连花清瘟胶囊",
//     imageUrl:
//       "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop",
//     currentQuantity: 24,
//     totalQuantity: 36,
//     expiryDate: "2025-12-20",
//     unit: "粒",
//     category: "cold",
//   },
//   {
//     id: "2",
//     name: "布洛芬缓释胶囊",
//     imageUrl:
//       "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=300&h=300&fit=crop",
//     currentQuantity: 4,
//     totalQuantity: 20,
//     expiryDate: "2024-06-20",
//     unit: "粒",
//     category: "fever",
//   },
// ];

const categories = [
  { id: "all", icon: "🏥", title: "全部", count: 25 },
  { id: "fever", icon: "🌡️", title: "退烧药", count: 4 },
  { id: "cold", icon: "🤧", title: "感冒药", count: 6 },
  { id: "chronic", icon: "💊", title: "慢性病药", count: 8 },
  { id: "first-aid", icon: "🚑", title: "急救药品", count: 5 },
  { id: "equipment", icon: "🔧", title: "医疗器械", count: 2 },
];

export function MedicationCabinetPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMedication, setSelectedMedication] = useState<string | null>(
    null
  );
  const [medicines, setMedicines] = useLocalStorageListener<MedicineInfo[]>(
    "medicines",
    []
  );

  const handleImprove = () => {
    alert("正在分析您的药箱，即将为您提供改进建议...");
  };

  const handleUpdateInventory = (id: string) => {
    setSelectedMedication(id);
  };

  const handleConfirmUpdate = async (data: {
    id: number;
    quantity: number;
    type: "add" | "subtract";
    reason?: string;
  }) => {
    const { id, quantity, type } = data;

    console.log("Update data:", data);
    let medicine: MedicineInfo = medicines.find((med) => med.id === id);
    if (!medicine) {
      return;
    }
    let isUpdate = false;
    for (let med of medicines) {
      if (med.id !== id) {
        continue;
      }

      med.currentQuantity =
        type === "add"
          ? Number(med?.currentQuantity) + quantity
          : Number(med?.currentQuantity) >= quantity
          ? Number(med?.currentQuantity) - quantity
          : 0;
      isUpdate = true;
    }
    if (isUpdate) {
      setMedicines([...medicines]);
    }
    setSelectedMedication(null);
  };

  const filteredMedications = medicines.filter(
    (med) =>
      (selectedCategory === "all" || med.category === selectedCategory) &&
      (searchQuery === "" ||
        med.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const stats = {
    totalMedications: medicines.length,
    lowStockCount: medicines.filter(
      (m) => m.currentQuantity / m.totalQuantity < 0.2
    ).length,
    expiringCount: medicines.filter((m) => {
      const daysUntilExpiry = Math.ceil(
        (new Date(m.expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
      );
      return daysUntilExpiry <= 30;
    }).length,
  };

  return (
    <div className="min-h-screen bg-gradient-mesh">
      {/* Header with Score */}
      <div className="relative bg-gradient-to-r from-blue-500 to-blue-600">
        <div className="absolute top-4 left-4 z-10">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full bg-white/10 backdrop-blur-sm text-white"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
        </div>
        <MedicationCabinetScore score={70} onImprove={handleImprove} />
      </div>

      <div className="max-w-2xl mx-auto px-4 -mt-4 pb-20">
        {/* Stats */}
        <InventoryStats {...stats} />

        {/* Search Bar */}
        <div className="my-6">
          <Input
            icon={<Search className="w-5 h-5" />}
            placeholder="搜索药品..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Categories */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex gap-3 pb-2 scrollbar-hide">
            {categories.map((category) => (
              <MedicationCategoryCard
                key={category.id}
                {...category}
                isSelected={selectedCategory === category.id}
                onClick={() => setSelectedCategory(category.id)}
              />
            ))}
          </div>
        </div>

        {/* Medications List */}
        <div className="space-y-4">
          {filteredMedications.map((medication) => (
            <InventoryCard
              key={medication.id}
              medication={medication}
              onUpdate={() => handleUpdateInventory(medication.id)}
            />
          ))}
        </div>
      </div>

      {/* Update Modal */}
      {selectedMedication && (
        <InventoryUpdateModal
          isOpen={true}
          onClose={() => setSelectedMedication(null)}
          onConfirm={handleConfirmUpdate}
          medication={medicines.find((m) => m.id === selectedMedication)!}
        />
      )}
    </div>
  );
}
