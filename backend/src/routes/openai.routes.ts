import { Router } from "express";
import { OpenAI } from "openai";
const router = Router();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_BASE =
  process.env.OPENAI_API_BASE ||
  "https://ark.cn-beijing.volces.com/api/v3/chat/completions";
const OPENAI_API_MODEL = process.env.OPENAI_API_MODEL;
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  baseURL: OPENAI_API_BASE,
});

// 代理 chat/completions 请求
router.post("/chat", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const messages = [
      { role: "system", content: prompt },
      //   { role: "user", content: question },
    ];

    const completion = await openai.chat.completions.create({
      model: OPENAI_API_MODEL,
      messages: messages,
    });

    return res.json({
      success: true,
      data: completion.choices[0]?.message?.content,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "豆包AI调用失败，请稍后重试",
    });
  }
});

export { router as openaiRouter };
