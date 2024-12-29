import { supabase } from '../lib/supabase';

const API_KEY = '7211113158e20f1f9d77a8ba387b0636.738UAjJ72ANkrV3u';
const API_URL = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIResponse {
  data: {
    choices: {
      message: Message;
    }[];
  };
}

interface AIError {
  message: string;
}

export const aiService = {
  async sendMessage(
    message: string,
    context: Message[] = []
  ): Promise<{ response: string | null; error: AIError | null }> {
    try {
      const response = await fetch(AI_CONFIG.API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${AI_CONFIG.API_KEY}`
        },
        body: JSON.stringify({
          model: AI_CONFIG.MODEL,
          messages: [
            ...context,
            { role: 'user', content: message }
          ],
          temperature: AI_CONFIG.TEMPERATURE,
          max_tokens: AI_CONFIG.MAX_TOKENS,
          stream: false
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        response: data.choices[0].message.content,
        error: null
      };
    } catch (err) {
      console.error('AI Service Error:', err);
      return {
        response: null,
        error: { 
          message: err instanceof Error 
            ? err.message 
            : '与AI助手通信失败，请稍后重试'
        }
      };
    }
  },


  /**
   * 分析药物相互作用
   */
  async analyzeMedicationInteraction(
    medicationOne: string,
    medicationTwo: string
  ): Promise<{ analysis: string | null; error: AIError | null }> {
    const prompt = `请分析以下两种药物之间可能存在的相互作用：
    药物1: ${medicationOne}
    药物2: ${medicationTwo}
    
    请从以下几个方面进行分析：
    1. 是否存在相互作用
    2. 相互作用的类型和严重程度
    3. 可能产生的影响
    4. 使用建议和注意事项`;

    const { response, error } = await this.sendMessage(prompt);

    if (error) {
      return { analysis: null, error };
    }

    // 记录分析结果到数据库
    try {
      await supabase
        .from('medication_interaction_records')
        .insert([{
          medication_one: medicationOne,
          medication_two: medicationTwo,
          analysis: response
        }]);
    } catch (err) {
      console.error('Failed to save interaction analysis:', err);
    }

    return { analysis: response, error: null };
  },

  /**
   * 生成用药指导建议
   */
  async generateMedicationGuide(
    medication: string,
    condition: string
  ): Promise<{ guide: string | null; error: AIError | null }> {
    const prompt = `请为以下用药情况提供专业的指导建议：
    药品名称: ${medication}
    病症/情况: ${condition}
    
    请包含以下内容：
    1. 用药方法和剂量建议
    2. 最佳服用时间
    3. 注意事项和禁忌
    4. 可能的副作用
    5. 需要及时就医的警示症状`;

    const { response, error } = await this.sendMessage(prompt);

    if (error) {
      return { guide: null, error };
    }

    // 记录指导建议到数据库
    try {
      await supabase
        .from('medication_guide_records')
        .insert([{
          medication_name: medication,
          condition: condition,
          guide_content: response
        }]);
    } catch (err) {
      console.error('Failed to save medication guide:', err);
    }

    return { guide: response, error: null };
  },

  /**
   * 评估用药计划
   */
  async evaluateMedicationPlan(
    medications: string[],
    schedule: string,
    userCondition: string
  ): Promise<{ evaluation: string | null; error: AIError | null }> {
    const prompt = `请评估以下用药计划的合理性：
    药品清单: ${medications.join(', ')}
    服用计划: ${schedule}
    患者情况: ${userCondition}
    
    请从以下方面进行评估：
    1. 用药组合的合理性
    2. 服药时间安排的合适性
    3. 是否存在潜在风险
    4. 改进建议
    5. 需要特别注意的事项`;

    const { response, error } = await this.sendMessage(prompt);
    return { evaluation: response, error };
  }
};