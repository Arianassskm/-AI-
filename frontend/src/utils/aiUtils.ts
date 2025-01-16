import { AI_CONFIG } from "../config/aiConfig";
import { Medicine } from "@/services/medicineService";

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
  experience: string,
  levelOfTheGuidelines: string
): string {
  return `作为一个专业的医疗AI助手,请为以下用药情况提供专业的指导建议:
当前的用药类型: ${medication}, 我的使用经验: ${experience}，指导的详细程度: ${levelOfTheGuidelines}
请根据我提供的信息，为我生成以下内容：
根据用户经验选择合适的问候语]
简介: [药物介绍和重要性说明]
准备工作：[所需物品清单]
使用步骤：[详细的步骤说明]
注意事项：[安全警示和注意事项]
储存建议：[储存方法和维护建议]
视频指引：[推荐视频搜索建议]
温馨鼓励：[根据用户经验的结束语]
请用专业但易懂的语言回答, 
始终保持专业、温和、关怀的语气；
根据用户经验调整内容深度；
根据详细程度调整解释的详细性；
确保每个步骤清晰可执行；
适时加入温馨提示和鼓励
`;
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
    我目前的慢性病是：${diseaseType}，已服用过的药物：${
    medicines === "" ? "无" : medicines
  }，既往病史：${
    medicalHistory === "" ? "无" : medicalHistory
  }，现在的身体情况是：${physicalCondition === "" ? "正常" : physicalCondition}
    请根据我提供的信息，为我生成以下内容：

    1. 病情概述📝
    - 慢性病类型及病程
    - 既往病史摘要
    - 当前用药情况

    2. 近期情况🏥
    - 当前身体状况分析
    - 用药依从性评估
    - 可能存在的问题点

    3. 复诊建议👨‍⚕️
    - 需要重点关注的症状变化
    - 合理的复诊诉求建议
    - 是否需要调整用药方案
    - 是否需要调整服药剂量

    4. 注意事项⚠️
    - 需要特别关注的指标
    - 生活方式建议
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
  return `
  1. 家庭成员：${familyMember}
2. 预算金额：${budget}元
3. 存储空间：${space}
4. 储存条件：${condition}

请生成如下格式的专业评估报告：

尊敬的用户：
感谢您使用家庭药箱定制服务，基于您的家庭情况，我们为您定制了以下方案：

**1. 药箱选型推荐**
|--------------------|------------------------|
|推荐型号            |{根据空间和预算匹配}    |
|容量说明            |{根据家庭人数匹配}      |
|特色功能            |{根据储存条件匹配}      |
|参考价格            |{根据预算范围给出}      |

**2. 基础药品配置**
|分类|品名|规格|价格区间|品牌选择|适用人群|
|----|----|----|--------|--------|--------|
[根据家庭成员构成推荐必备药品]

**3. 专项药品配置**
🔸 成人用药（{成人数量}人）：
[根据成人数量推荐药品清单]

🔸 儿童用药（{儿童数量}人）：
[根据儿童数量推荐药品清单]

🔸 老年用药（{老人数量}人）：
[根据老年人数量推荐药品清单]

🔸 宠物用药（{宠物数量}只）：
[根据宠物情况推荐药品清单]

**4. 存储方案**
🏠 推荐位置：[根据储存条件给出建议]
🌡️ 温度要求：[根据储存条件给出具体温度范围]
📦 分区建议：[根据药品类型给出分区方案]

**5. 用药安全提醒**
⚠️ [根据家庭成员特点给出安全提示]
⚠️ [根据储存条件给出保管建议]
⚠️ [根据药品特性给出使用提醒]

💝 温馨提示：
1. 定期检查药品有效期
2. 保持药箱干燥整洁
3. {根据具体情况补充合适的建议}

如需专业建议，请随时咨询我们的药师团队。
祝您和家人身体健康！`;
}

/**
 * 药箱评估提示词
 * @param medicines
 * @returns
 */
export function generateAssessmentOfPillboxesPrompt(medicines: Medicine[]) {
  let currentMedicines = "";
  for (const medicine of medicines) {
    if (medicine.currentQuantity < 0) {
      continue;
    }
    currentMedicines += `${medicine.name}-${medicine.currentQuantity}-${medicine.unit},`;
  }

  return `作为一个专业的医疗AI助手,请为以下用药情况提供专业的指导建议:
  我目前现有的药品有：${currentMedicines !== "" ? currentMedicines : "无"}
  请根据我提供的信息，对我的备药进行简单的打分(1~100分)，请求必须返回评分结果。
  结果格式：
  评分：{评分结果}
  评分理由：{评分理由}
  并为我推荐当前季节还可以备哪些药品。
  推荐药品格式：
  {药品名称}-{药品规格}-{药品功能}-{药品价格}-{推荐原因}
  请用专业但易懂的语言回答。`;
}
