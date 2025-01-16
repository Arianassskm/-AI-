import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import { MedicationCabinetScore } from "../components/MedicationCabinetScore";
import { MedicationCategoryCard } from "../components/MedicationCategoryCard";
import { InventoryStats } from "../components/inventory/InventoryStats";
import { InventoryCard } from "../components/inventory/InventoryCard";
import { InventoryUpdateModal } from "../components/inventory/InventoryUpdateModal";
import { Input } from "../components/ui/Input";
import { medicineService, Medicine } from "@/services/medicineService";
import { useToast } from "@/hooks/useToast";
import { AssessmentOfPillboxes } from "@/components/AssessmentOfPillboxes";
import { useOpenAI } from "@/hooks/useOpenAI";
import LoadingOverlay from "@/components/loading/LoadingOverlay";
import { userService } from "@/services/userService";
import { getValue, useLocalStorageListener } from "@/hooks/useLocalStorage";

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
  const [selectedMedication, setSelectedMedication] = useState<number | null>(
    null
  );
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { assessmentOfPillboxes } = useOpenAI();
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useLocalStorageListener("userInfo", null);
  const [score, setScore] = useState(getValue("userInfo")?.score || 0);

  const fetchMedicines = async () => {
    try {
      const ret = await medicineService.getAllMedicines();
      if (ret.success) {
        setMedicines(ret.data);
      } else {
        toast(ret.message, "error");
      }
    } catch (error) {
      toast("获取药品列表失败", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const handleImprove = async () => {
    setIsLoading(true);
    try {
      const ret = await assessmentOfPillboxes();
      const regex = /评分：{(\d+)\s*分}/;
      const match = ret.match(regex);
      const score = match ? parseInt(match[1]) : 0;
      console.log("score", score);
      setAnalysisResult(ret);
      setIsLoading(false);
      setIsAssessmentOpen(true);
      if (score) {
        setScore(score);
        const ret = await userService.updateScore(score);
        if (ret.success) {
          // 重新刷新userInfo
          const userInfo = await userService.getUser();
          if (userInfo.success) {
            setUserInfo(userInfo.data);
          }
        }
      }
    } catch (error) {
      setIsLoading(false);
      toast("评估失败", "error");
    }
  };

  const handleCloseAssessment = () => {
    setIsAssessmentOpen(false);
    setAnalysisResult("");
  };

  const handleUpdateInventory = (id: string) => {
    setSelectedMedication(id);
  };

  const handleUpdateSuccess = async () => {
    // 刷新
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
        <MedicationCabinetScore score={score} onImprove={handleImprove} />
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
          onSuccess={handleUpdateSuccess}
          medicine={medicines.find((m) => m.id === selectedMedication)!}
        />
      )}

      <AssessmentOfPillboxes
        isOpen={isAssessmentOpen}
        result={analysisResult}
        onClose={handleCloseAssessment}
      />

      <LoadingOverlay isLoading={isLoading} />
    </div>
  );
}
