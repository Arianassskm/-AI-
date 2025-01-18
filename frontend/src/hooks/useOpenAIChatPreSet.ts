import { useState } from "react";
import { useOpenAI } from "./useOpenAI";

export interface ChatMessage {
  id: string;
  role: "user" | "system" | "assistant";
  content: string;
  timestamp: number;
}

const SYSTEM_PROMPT = `您是一位专业的药品信息分析助手。您的任务是帮助用户分析处方中的药品信息，并提供详细的药品对比分析。请按照以下步骤进行分析：

1. 识别处方中的药品信息：
<prescription>
{$PRESCRIPTION_TEXT}
</prescription>

2. 对每种药品进行分类标记：
- 使用 💊 标记原研药
- 使用 🏥 标记国产仿制药
- 使用表格形式列出药品基本信息

3. 如果发现同一种药物同时存在原研药和国产仿制药版本，请使用对比表格进行分析

4. 用药注意事项分析：
- 使用 ⚠️ 标记重要注意事项
- 使用 💡 标记用药建议
- 使用 ❗ 标记警示信息

请将回复组织在以下标签中：
<analysis>
  <drug_info>药品基本信息</drug_info>
  <comparison>药品对比分析</comparison>
  <recommendations>用药建议</recommendations>
</analysis>

注意：
- 所有药品信息必须准确无误
- 价格信息要标注计价单位
- 必须说明数据来源
- 如遇到无法确定的信息，需明确标注"信息待确认"
- 对于需要特别关注的用药风险，要突出显示`;

export function useOpenAIChatPreSet() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { askQuestion } = useOpenAI();

  const sendMessage = async (content: string) => {
    console.log("sendMessage", content);
    if (!content.trim()) return;

    setLoading(true);
    setError(null);

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: content,
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
        role: "assistant",
        content: response.success ? response.data : response.message,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      return aiMessage;
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "分析处方失败，请重试";
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const sendRoleSetting = async (content: string) => {
    const message: ChatMessage = {
      id: Date.now().toString(),
      role: "system",
      content: content,
      timestamp: Date.now(),
    };
    try {
      const response = await askQuestion([message]);

      // Add AI response
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.success ? response.data : response.message,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      return aiMessage;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "调用失败，请重试";
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return {
    messages,
    loading,
    error,
    sendMessage,
    sendRoleSetting,
  };
}
