import { AI_CONFIG } from "../config/aiConfig";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export async function sendAIRequest(
  message: string,
  context: Message[] = []
): Promise<string> {
  const response = await fetch(AI_CONFIG.API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AI_CONFIG.API_KEY}`,
    },
    body: JSON.stringify({
      model: AI_CONFIG.MODEL,
      messages: [...context, { role: "user", content: message }],
      temperature: AI_CONFIG.TEMPERATURE,
      max_tokens: AI_CONFIG.MAX_TOKENS,
      stream: false,
    }),
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  const data = await response.json();

  if (!data.choices?.[0]?.message?.content) {
    throw new Error("Invalid response from AI service");
  }

  return data.choices[0].message.content;
}

/**
 * 用药指导
 * @param medication
 * @param experience 使用经验
 * @param levelOfTheGuidelines 指导水平
 * @returns
 */
export function generateMedicationPrompt(
  medication: string,
  experience: string;
  levelOfTheGuidelines: string
): string {
  return `作为一个专业的医疗AI助手,请为以下用药情况提供专业的指导建议:

请从以下几个方面进行分析和建议:
1. 用药方法和具体剂量
2. 最佳服用时间和注意事项
3. 可能的禁忌症和副作用
4. 需要警惕的症状
5. 建议就医的情况

请用专业但易懂的语言回答。`;
}

/**
 * 药品相互作用提示词
 * @param medicationOne
 * @param medicationTwo
 * @returns
 */
export function generateInteractionPrompt(
  medicationOne: string,
  medicationTwo: string
): string {
  return `作为一个专业的医疗AI助手,请分析以下两种药物之间可能存在的相互作用:

药物1: ${medicationOne}
药物2: ${medicationTwo}

请从以下几个方面进行分析:
1. 是否存在相互作用
2. 相互作用的类型和严重程度
3. 可能产生的影响
4. 使用建议和注意事项

请用专业但易懂的语言回答。`;
}

/**
 * 慢性病提示词
 * @param diseaseType
 * @param medicines
 * @param medicalHistory
 * @param physicalCondition
 * @returns
 */
export function generateDiseasePrompt(
  diseaseType: string,
  medicines: string,
  medicalHistory: string,
  physicalCondition: string
): string {
  return `作为一个专业的医疗AI助手,请为以下用药情况提供专业的指导建议:


请从以下几个方面进行分析和建议:
1. 用药方法和具体剂量
2. 最佳服用时间和注意事项
3. 可能的禁忌症和副作用
4. 需要警惕的症状
5. 建议就医的情况

请用专业但易懂的语言回答。`;
}

/**
 * 药箱提示词
 * @param familyMember
 * @param budget
 * @param space
 * @param condition
 */
export function generatePillboxPrompt(
  familyMember: string,
  budget: string,
  space: string,
  condition: string
) {
  return `作为一个专业的医��AI助手, 请为以下用��情况提供专业的指导建议:`;
}
