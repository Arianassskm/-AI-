import { useState } from "react";
import {
  X,
  ChevronRight,
  Users,
  Thermometer,
  Box,
  DollarSign,
} from "lucide-react";
import { useAI } from "../hooks/useAI";
import LoadingOverlay from "./loading/LoadingOverlay";

interface MedicationCabinetAssessmentProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FamilyMember {
  type: "adult" | "elder" | "child" | "pet";
  label: string;
  icon: string;
  count: number;
}

interface StorageCondition {
  id: string;
  label: string;
  icon: string;
  description: string;
}

export function MedicationCabinetAssessment({
  isOpen,
  onClose,
}: MedicationCabinetAssessmentProps) {
  const [step, setStep] = useState(1);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    { type: "adult", label: "成人", icon: "👤", count: 0 },
    { type: "elder", label: "老人", icon: "👴", count: 0 },
    { type: "child", label: "儿童", icon: "👶", count: 0 },
    { type: "pet", label: "宠物", icon: "🐱", count: 0 },
  ]);
  const [budget, setBudget] = useState<number>(500);
  const [storageSpace, setStorageSpace] = useState<number>(2);
  const [selectedConditions, setSelectedConditions] = useState<Set<string>>(
    new Set()
  );

  const storageConditions: StorageCondition[] = [
    { id: "room", label: "常温", icon: "🌡️", description: "15-25°C" },
    { id: "cool", label: "阴凉", icon: "❄️", description: "10-20°C" },
    { id: "refrigerated", label: "冷藏", icon: "🧊", description: "2-8°C" },
    { id: "dark", label: "避光", icon: "🌑", description: "避免阳光直射" },
  ];

  const [analysisResult, setAnalysisResult] = useState<string | null>(null);

  const { pillboxSssessments, loading, error } = useAI();
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const updateFamilyMember = (type: string, delta: number) => {
    setFamilyMembers((prev) =>
      prev.map((member) =>
        member.type === type
          ? { ...member, count: Math.max(0, member.count + delta) }
          : member
      )
    );
  };

  const toggleStorageCondition = (id: string) => {
    setSelectedConditions((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleSubmit = async () => {
    const assessment = {
      familyMembers,
      budget,
      storageSpace,
      storageConditions: Array.from(selectedConditions),
    };
    console.log("Assessment Data:", assessment);
    setIsLoading(true);
    try {
      let members: string = "";
      for (const member of familyMembers) {
        members = members.concat(member.label + ":" + member.count + (member.label ==='宠物'? "只":"人，"));
      }
      console.log("Members Data:", members);
      let conditions: string = "";
      for (const condition of storageConditions) {
        console.log(condition);
        conditions = conditions.concat(
          condition.label + condition.description + ","
        );
      }
      console.log("Conditions:", conditions);
      const result = await pillboxSssessments(
        members,
        budget + "",
        storageSpace + "",
        conditions
      );
      setIsLoading(false);
      setAnalysisResult(result);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setAnalysisResult("");
    setStep(1);
    setFamilyMembers([
      { type: "adult", label: "成人", icon: "👤", count: 0 },
      { type: "elder", label: "老人", icon: "👴", count: 0 },
      { type: "child", label: "儿童", icon: "👶", count: 0 },
      { type: "pet", label: "宠物", icon: "🐱", count: 0 },
    ]);
    setBudget(500);
    setStorageSpace(2);
    setSelectedConditions(new Set());
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-[90%] max-w-md overflow-hidden shadow-xl">
        {/* Header */}
        <div className="relative h-32 bg-gradient-to-r from-blue-500 to-blue-600 p-6">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-sm text-white"
          >
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-2xl font-bold text-white mt-8">药箱方案定制</h2>
          <p className="text-blue-100">为您的家庭定制专属药箱方案</p>
        </div>

        {analysisResult && (
          <div className="p-4 bg-blue-50 rounded-xl max-h-96 overflow-auto">
            <p className="text-sm text-gray-600 whitespace-pre-line">
              {analysisResult}
            </p>
          </div>
        )}

        {!analysisResult && (
          <div>
            <div className="px-6 pt-4">
              <div className="flex justify-between mb-6">
                {[1, 2, 3, 4].map((s) => (
                  <div
                    key={s}
                    className={`w-1/4 h-1 rounded-full ${
                      s <= step ? "bg-blue-500" : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="px-6 pb-6">
              {step === 1 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-gray-800">
                    <Users className="w-5 h-5" />
                    <h3 className="font-medium">家庭成员</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {familyMembers.map((member) => (
                      <div
                        key={member.type}
                        className="bg-gray-50 rounded-xl p-4"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-2xl">{member.icon}</span>
                          <span className="font-medium text-gray-800">
                            {member.label}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <button
                            onClick={() => updateFamilyMember(member.type, -1)}
                            className="w-8 h-8 rounded-full bg-white text-gray-600 shadow-sm"
                          >
                            -
                          </button>
                          <span className="text-xl font-medium text-gray-800">
                            {member.count}
                          </span>
                          <button
                            onClick={() => updateFamilyMember(member.type, 1)}
                            className="w-8 h-8 rounded-full bg-blue-500 text-white shadow-sm"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-gray-800">
                    <DollarSign className="w-5 h-5" />
                    <h3 className="font-medium">预算范围</h3>
                  </div>
                  <div className="space-y-4">
                    <input
                      type="range"
                      min="100"
                      max="2000"
                      step="100"
                      value={budget}
                      onChange={(e) => setBudget(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>￥100</span>
                      <span className="text-blue-500 font-medium">
                        ￥{budget}
                      </span>
                      <span>￥2000</span>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-gray-800">
                    <Box className="w-5 h-5" />
                    <h3 className="font-medium">存储空间</h3>
                  </div>
                  <div className="space-y-4">
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={storageSpace}
                      onChange={(e) => setStorageSpace(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>小型</span>
                      <span className="text-blue-500 font-medium">
                        {storageSpace}格
                      </span>
                      <span>大型</span>
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-gray-800">
                    <Thermometer className="w-5 h-5" />
                    <h3 className="font-medium">存储条件</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {storageConditions.map((condition) => (
                      <button
                        key={condition.id}
                        onClick={() => toggleStorageCondition(condition.id)}
                        className={`p-4 rounded-xl text-left transition-all ${
                          selectedConditions.has(condition.id)
                            ? "bg-blue-50 border-2 border-blue-500"
                            : "bg-gray-50 border-2 border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl">{condition.icon}</span>
                          <span className="font-medium text-gray-800">
                            {condition.label}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {condition.description}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="px-6 pb-6">
              <button
                onClick={() => {
                  if (step < 4) {
                    setStep(step + 1);
                  } else {
                    handleSubmit();
                  }
                }}
                className="w-full py-3 bg-blue-500 text-white rounded-xl font-medium flex items-center justify-center gap-2"
              >
                {step < 4 ? "下一步" : "完成"}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
      <LoadingOverlay isLoading={isLoading} />
    </div>
  );
}
