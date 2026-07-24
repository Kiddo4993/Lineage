import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenAI } from "@google/genai";

function buildPrompt(taskPrompt: string) {
  return `You are a friendly, encouraging drawing coach reviewing a student's practice drawing for a beginner drawing course.

Task context: ${taskPrompt}

Look carefully at the uploaded image and give specific, concrete feedback — reference actual things you see in the drawing, not generic tips. Return strictly valid JSON with exactly these fields:
- "strengths": an array of exactly 2 short strings, specific things the student did well
- "improvements": an array of exactly 2 short strings, specific and actionable things to improve
- "next": one short string suggesting a next practice challenge

Keep each string under 20 words. Be warm but honest.`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { imageBase64, prompt } = (req.body ?? {}) as {
    imageBase64?: string;
    prompt?: string;
  };

  if (!imageBase64 || !prompt) {
    res.status(400).json({ error: "imageBase64 and prompt are required" });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "Server is missing GEMINI_API_KEY" });
    return;
  }

  const mimeMatch = imageBase64.match(/^data:(image\/\w+);base64,/);
  const mimeType = mimeMatch ? mimeMatch[1] : "image/png";
  const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");

  try {
    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: [
        {
          role: "user",
          parts: [
            { text: buildPrompt(prompt) },
            { inlineData: { mimeType, data: base64Data } },
          ],
        },
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            strengths: { type: "array", items: { type: "string" } },
            improvements: { type: "array", items: { type: "string" } },
            next: { type: "string" },
          },
          required: ["strengths", "improvements", "next"],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("Empty response from Gemini");
    }

    const feedback = JSON.parse(text);
    res.status(200).json({ feedback });
  } catch (err) {
    console.error("analyze-drawing error", err);
    res.status(502).json({ error: "AI analysis failed" });
  }
}
