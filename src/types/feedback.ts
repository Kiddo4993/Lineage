export interface DrawingFeedback {
  strengths: string[];
  improvements: string[];
  next: string;
}

export interface AnalyzeDrawingRequest {
  imageBase64: string;
  prompt: string;
}

export interface AnalyzeDrawingResponse {
  feedback: DrawingFeedback;
}
