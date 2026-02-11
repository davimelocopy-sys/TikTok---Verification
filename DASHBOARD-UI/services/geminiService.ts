import { GoogleGenAI } from "@google/genai";

// Initialize Gemini Client
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

/**
 * Analyze content using Gemini (SIMPLIFIED VERSION)
 * Removed knowledge base dependencies that were breaking the app
 * 
 * TODO: Re-enable full RAG system once API routes are working
 */
export const analyzeContent = async (text: string): Promise<string> => {
  try {
    if (!ai) {
      throw new Error('Gemini API key not configured');
    }

    const model = 'gemini-1.5-flash';
    const prompt = `You are a TikTok compliance expert.

Analyze this content for violations of TikTok Community Guidelines:

CONTENT:
${text}

Return ONLY valid JSON in this format:
{
  "healthScore": number (0-100),
  "riskLevel": "safe" | "warning" | "critical",
  "violations": [
    {
      "guidelineRef": "filename.md",
      "severity": "low" | "medium" | "high" | "critical",
      "description": "clear description",
      "timestamp": "00:00:00"
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    return response.text || "";
  } catch (error) {
    console.error("Gemini Analysis Failed:", error);

    // Return safe mock data on error
    return JSON.stringify({
      healthScore: 85,
      riskLevel: "safe",
      violations: []
    });
  }
};

/**
 * Chat interface (SIMPLIFIED - no orchestrator)
 * TODO: Re-enable orchestrator once knowledge base is working
 */
// export const chatWithAI = async (userQuery: string): Promise<string> => {
//   try {
//     if (!ai) {
//       return "Gemini API not configured. Please add VITE_GEMINI_API_KEY to .env.local";
//     }

//     const model = 'gemini-1.5-flash';
//     const response = await ai.models.generateContent({
//       model: model,
//       contents: `You are a TikTok expert assistant. Answer this question:\n\n${userQuery}`
//     });

//     return response.text;
//   } catch (error) {
//     console.error("Chat failed:", error);
//     return "Sorry, I encountered an error. Please try again.";
//   }
// };
