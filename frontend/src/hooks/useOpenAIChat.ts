import { useState } from "react";
import { useOpenAI } from "./useOpenAI";

export interface ChatMessage {
  id: string;
  role: "user" | "system";
  content: string;
  timestamp: number;
}

export function useOpenAIChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { askQuestion } = useOpenAI();

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    setLoading(true);
    setError(null);

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await askQuestion([
        ...messages,
        { role: "user", content: content },
      ]);

      // Add AI response
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "system",
        content: response.success ? response.data : response.message,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "发送消息失败，请重试");
    } finally {
      setLoading(false);
    }
  };

  const clearMessages = () => {
    setMessages([]);
    setError(null);
  };

  return {
    messages,
    loading,
    error,
    sendMessage,
    clearMessages,
  };
}
