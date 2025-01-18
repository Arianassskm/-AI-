import { useRef, useEffect } from "react";
import { useAIChat } from "../hooks/useAIChat";
import { AIChatHeader } from "./chat/AIChatHeader";
import { AIChatMessage } from "./chat/AIChatMessage";
import { AIChatInput } from "./chat/AIChatInput";
import { AIChatFeatures } from "./chat/AIChatFeatures";
import { useOpenAIChat } from "@/hooks/useOpenAIChat";
import { useOpenAIChatPreSet } from "@/hooks/useOpenAIChatPreSet";

interface AIChatExpandedProps {
  onClose: () => void;
}

export function AIChatExpanded({ onClose }: AIChatExpandedProps) {
  const { messages, loading, error, sendMessage, sendRoleSetting } =
    useOpenAIChatPreSet();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFeatureClick = (feature: string) => {
    sendRoleSetting(feature);
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-teal-100/80 via-blue-100/80 to-purple-100/80 backdrop-blur-md z-50 flex flex-col">
      <AIChatHeader onClose={onClose} />

      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="p-4 space-y-6">
            {/* AI Introduction Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                  AI
                </div>
                <div>
                  <h1 className="text-xl font-semibold mb-1">您好，我是康康</h1>
                  <p className="text-sm text-gray-600">
                    我是你的智能用药管家，我能帮助你解决所有用药问题
                  </p>
                </div>
              </div>
            </div>

            <AIChatFeatures onFeatureClick={handleFeatureClick} />

            <p className="text-sm text-gray-600 text-center">
              试着就用药问题向我交流
            </p>
          </div>
        ) : (
          <div className="py-4">
            {messages.map((message) => (
              <AIChatMessage key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}

        {error && (
          <div className="px-4 py-3 mx-4 mb-4 bg-red-50 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}
      </div>

      <AIChatInput onSend={sendMessage} disabled={loading} />
    </div>
  );
}
