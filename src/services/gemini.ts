import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface Question {
  id: string;
  title: string;
  content: string; // Markdown with LaTeX
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Extreme';
  source: string;
  tags: string[];
  type: 'Choice' | 'Fill' | 'Solution';
  analysis: string; // Detailed solution/explanation
}

export async function fetchQuestions(subject: string = '数学', topic: string = '函数'): Promise<Question[]> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate 5 high-quality Chinese high school ${subject} problems related to ${topic}. 
      Mimic the style of "Gaokao" (National College Entrance Examination) or provincial simulation exams.
      
      IMPORTANT: All content (title, question body, source, tags, analysis) MUST be in Simplified Chinese (zh-CN).
      
      Include:
      1. A title (e.g., "2024北京海淀一模").
      2. The problem content in Markdown, using LaTeX for math (e.g., $f(x)$).
      3. Difficulty level (Easy, Medium, Hard, Extreme).
      4. Source (e.g., "2023衡水金卷").
      5. Tags (e.g., "导数", "几何").
      6. Question Type (Choice, Fill, Solution).
      7. Analysis: A detailed step-by-step solution or explanation in Markdown with LaTeX.
      
      Ensure the math is complex and realistic.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              content: { type: Type.STRING },
              difficulty: { type: Type.STRING, enum: ['Easy', 'Medium', 'Hard', 'Extreme'] },
              source: { type: Type.STRING },
              tags: { type: Type.ARRAY, items: { type: Type.STRING } },
              type: { type: Type.STRING, enum: ['Choice', 'Fill', 'Solution'] },
              analysis: { type: Type.STRING }
            }
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as Question[];
    }
    return [];
  } catch (error) {
    console.error("Failed to fetch questions:", error);
    return [];
  }
}
