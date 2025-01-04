import { useState, useEffect } from "react";
import { X, Activity, Calendar, FileText, MessageCircle } from "lucide-react";
import { VoiceInput } from "./VoiceInput";
import { StepNavigation } from "./StepNavigation";
import { MedicationHistorySelector } from "./MedicationHistorySelector";
import { useAI } from "../hooks/useAI";

interface ChronicDiseaseAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChronicDiseaseAssistant({
  isOpen,
  onClose,
}: ChronicDiseaseAssistantProps) {
  const [step, setStep] = useState(1);
  const [diseaseType, setDiseaseType] = useState<string[]>([]);
  const [medicationHistory, setMedicationHistory] = useState("");
  const [selectedPlans, setSelectedPlans] = useState<string[]>([]);
  const [medicalHistory, setMedicalHistory] = useState("");
  const [currentCondition, setCurrentCondition] = useState("");
  const [isListening, setIsListening] = useState(false);

  const diseases = [
    { id: "diabetes", name: "糖尿病", icon: "🩺" },
    { id: "hypertension", name: "高血压", icon: "❤️" },
    { id: "heart", name: "心脏病", icon: "💗" },
    { id: "arthritis", name: "关节炎", icon: "🦴" },
    { id: "asthma", name: "哮喘", icon: "🫁" },
    { id: "other", name: "其他", icon: "➕" },
  ];

  const { chronicDiseaseFollowup, loading: loa, error } = useAI();
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);

  useEffect(() => {
    if (isListening) {
      // Mock voice recognition - in a real app, use Web Speech API
      const timer = setTimeout(() => {
        setIsListening(false);
        alert("语音识别功能正在开发中...");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isListening]);

  const toggleDisease = (id: string) => {
    setDiseaseType((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  const togglePlan = (planName: string) => {
    setSelectedPlans((prev) =>
      prev.includes(planName)
        ? prev.filter((p) => p !== planName)
        : [...prev, planName]
    );
  };

  const handleVoiceInput = (text: string) => {
    switch (step) {
      case 2:
        setMedicationHistory((prev) => prev + " " + text);
        break;
      case 3:
        setMedicalHistory((prev) => prev + " " + text);
        break;
      case 4:
        setCurrentCondition((prev) => prev + " " + text);
        break;
    }
  };

  const generateReport = async () => {
    const report = {
      diseases: diseaseType,
      medicationHistory,
      selectedPlans,
      medicalHistory,
      currentCondition,
    };

    console.log("Generated Report:", report);
    try {
      const result = await chronicDiseaseFollowup(
        diseaseType.length > 0 ? diseaseType.join(",") : "",
        "",
        medicalHistory,
        currentCondition
      );
      if (result) {
        setAnalysisResult(result);
      }
    } catch (e) {
      console.error("Failed to generate report:", e);
    }

    // onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-[90%] max-w-md overflow-hidden shadow-xl">
        {/* Header */}
        <div className="relative h-32 bg-gradient-to-r from-green-500 to-emerald-600 p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-sm text-white"
          >
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-2xl font-bold text-white mt-8">慢病助手</h2>
          <p className="text-green-100">帮您生成专业的复诊交流内容</p>
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
            {/* Progress Steps */}
            <div className="px-6 pt-4">
              <div className="flex justify-between mb-6">
                {[1, 2, 3, 4].map((s) => (
                  <div
                    key={s}
                    className={`w-1/4 h-1 rounded-full ${
                      s <= step ? "bg-green-500" : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="px-6 pb-6">
              {step === 1 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-gray-800">
                    <Activity className="w-5 h-5" />
                    <h3 className="font-medium">选择慢性病类型</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {diseases.map(({ id, name, icon }) => (
                      <button
                        key={id}
                        onClick={() => toggleDisease(id)}
                        className={`p-4 rounded-xl text-left transition-all ${
                          diseaseType.includes(id)
                            ? "bg-green-50 border-2 border-green-500"
                            : "bg-gray-50 border-2 border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{icon}</span>
                          <span className="font-medium text-gray-800">
                            {name}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-gray-800">
                    <Calendar className="w-5 h-5" />
                    <h3 className="font-medium">当前服药记录</h3>
                  </div>

                  <MedicationHistorySelector
                    selectedPlans={selectedPlans}
                    onTogglePlan={togglePlan}
                  />

                  <div className="relative">
                    <textarea
                      value={medicationHistory}
                      onChange={(e) => setMedicationHistory(e.target.value)}
                      placeholder="请输入或使用语音描述其他服用的药物..."
                      className="w-full h-40 p-4 rounded-xl bg-gray-50 text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-green-500 pr-12"
                    />
                    <VoiceInput
                      onTranscript={handleVoiceInput}
                      isListening={isListening}
                      onToggleListening={() => setIsListening(!isListening)}
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-gray-800">
                    <FileText className="w-5 h-5" />
                    <h3 className="font-medium">既往病史</h3>
                  </div>
                  <div className="relative">
                    <textarea
                      value={medicalHistory}
                      onChange={(e) => setMedicalHistory(e.target.value)}
                      placeholder="请输入或使用语音描述您的既往病史..."
                      className="w-full h-40 p-4 rounded-xl bg-gray-50 text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-green-500 pr-12"
                    />
                    <VoiceInput
                      onTranscript={handleVoiceInput}
                      isListening={isListening}
                      onToggleListening={() => setIsListening(!isListening)}
                    />
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-gray-800">
                    <MessageCircle className="w-5 h-5" />
                    <h3 className="font-medium">当前身体状况</h3>
                  </div>
                  <div className="relative">
                    <textarea
                      value={currentCondition}
                      onChange={(e) => setCurrentCondition(e.target.value)}
                      placeholder="请输入或使用语音描述您最近的身体状况..."
                      className="w-full h-40 p-4 rounded-xl bg-gray-50 text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-green-500 pr-12"
                    />
                    <VoiceInput
                      onTranscript={handleVoiceInput}
                      isListening={isListening}
                      onToggleListening={() => setIsListening(!isListening)}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 pb-6">
              <StepNavigation
                currentStep={step}
                totalSteps={4}
                onNext={() => setStep(step + 1)}
                onPrev={() => setStep(step - 1)}
                onComplete={generateReport}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
