import { X, ArrowLeft, Video, MessageSquare, Loader2 } from "lucide-react";
import { useState } from "react";
import { useAI } from "@/hooks/useAI";
import { useOpenAI } from "@/hooks/useOpenAI";

interface MedicationGuideDetailProps {
  planName: string;
  onClose: () => void;
  onBack: () => void;
}

export function MedicationGuideDetail({
  planName,
  onClose,
  onBack,
}: MedicationGuideDetailProps) {
  const [activeTab, setActiveTab] = useState<"video" | "ai">("video");
  const [question, setQuestion] = useState("");
  const [aiResponses, setAiResponses] = useState<string[]>([]);
  const { generateMedicationGuide, loading } = useOpenAI();

  const handleAskQuestion = async () => {
    if (!question.trim()) return;

    const guide = await generateMedicationGuide(planName, question);
    if (guide) {
      setAiResponses((prev) => [...prev, guide]);
      setQuestion("");
    }
  };

  const guideContent = {
    video: [
      {
        title: "雾化器使用指南",
        thumbnail:
          "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&h=300&fit=crop",
        duration: "3:45",
      },
      {
        title: "正确注射胰岛素",
        thumbnail:
          "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400&h=300&fit=crop",
        duration: "5:20",
      },
      {
        title: "伤口清创与换药",
        thumbnail:
          "https://images.unsplash.com/photo-1583324113626-70df0f4deaab?w=400&h=300&fit=crop",
        duration: "4:15",
      },
    ],
  };

  return (
    <div className="fixed inset-0 bg-white z-50">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-500" />
          </button>
          <h2 className="text-lg font-semibold text-gray-800">{planName}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("video")}
            className={`flex-1 py-3 text-sm font-medium ${
              activeTab === "video"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500"
            }`}
          >
            <Video className="w-4 h-4 inline-block mr-2" />
            视频指导
          </button>
          <button
            onClick={() => setActiveTab("ai")}
            className={`flex-1 py-3 text-sm font-medium ${
              activeTab === "ai"
                ? "text-green-600 border-b-2 border-green-600"
                : "text-gray-500"
            }`}
          >
            <MessageSquare className="w-4 h-4 inline-block mr-2" />
            AI指导
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === "video" ? (
            <div className="space-y-4">
              {guideContent.video.map((video, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl overflow-hidden"
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-medium text-gray-800 mb-2">
                      {video.title}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <Video className="w-4 h-4 mr-2" />
                      <span>{video.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {aiResponses.map((response, index) => (
                <div key={index} className="bg-green-50 rounded-xl p-4">
                  <p className="text-gray-700 whitespace-pre-line">
                    {response}
                  </p>
                </div>
              ))}

              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-start gap-4">
                  <MessageSquare className="w-6 h-6 text-green-600 mt-1" />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800 mb-2">智能问答</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      有任何用药相关问题都可以随时询问AI助手
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="输入您的问题..."
                        className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            handleAskQuestion();
                          }
                        }}
                      />
                      <button
                        onClick={handleAskQuestion}
                        disabled={loading || !question.trim()}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            处理中
                          </>
                        ) : (
                          "发送"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
