import type { AnalyzeDrawingResponse, DrawingFeedback } from "../types/feedback";

/**
 * Calls the /api/analyze-drawing serverless function for real AI feedback.
 * Returns null on any failure so callers can fall back to canned feedback.
 */
export async function analyzeDrawing(
  imageBase64: string,
  prompt: string
): Promise<DrawingFeedback | null> {
  try {
    const res = await fetch("/api/analyze-drawing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageBase64, prompt }),
    });
    if (!res.ok) return null;
    const data: AnalyzeDrawingResponse = await res.json();
    return data.feedback ?? null;
  } catch {
    return null;
  }
}
