
import { GoogleGenAI, Type } from "@google/genai";
import { FormData } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const reportSchema = {
    type: Type.OBJECT,
    properties: {
        executiveSummary: { 
            type: Type.STRING, 
            description: "A brief, high-level summary of the entire report." 
        },
        processAnalysis: { 
            type: Type.STRING, 
            description: "A detailed analysis of the provided industrial process description." 
        },
        bottlenecks: { 
            type: Type.STRING, 
            description: "Identification of key challenges, bottlenecks, and inefficiencies based on the input." 
        },
        optimizationSuggestions: {
            type: Type.ARRAY,
            description: "A list of concrete, actionable optimization suggestions.",
            items: {
                type: Type.OBJECT,
                properties: {
                    suggestion: { type: Type.STRING, description: "The specific suggestion for improvement." },
                    justification: { type: Type.STRING, description: "The reasoning and expected benefits behind the suggestion." }
                },
                required: ["suggestion", "justification"]
            }
        },
        recommendedTechnologies: {
            type: Type.ARRAY,
            description: "A list of technologies or tools that could be implemented.",
            items: { type: Type.STRING }
        },
        conclusion: { 
            type: Type.STRING, 
            description: "A concluding paragraph summarizing the key takeaways and next steps." 
        },
    },
    required: ["executiveSummary", "processAnalysis", "bottlenecks", "optimizationSuggestions", "recommendedTechnologies", "conclusion"]
};

export const generateReport = async (formData: FormData): Promise<string> => {
  const { processName, processDescription, kpis, challenges, equipment, dataCollection } = formData;

  const prompt = `
    Based on the following information about an industrial process, act as a senior industrial automation consultant and generate a detailed technical report.
    The report should provide actionable suggestions for optimization and improvement.

    **Process Name:** ${processName}
    **Process Description:** ${processDescription}
    **Key Performance Indicators (KPIs):** ${kpis}
    **Current Challenges / Bottlenecks:** ${challenges}
    **Equipment Used:** ${equipment}
    **Data Collection Methods:** ${dataCollection}

    Please structure your response according to the provided JSON schema. The tone should be professional, technical, and analytical.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: reportSchema,
        temperature: 0.5,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate report from AI service.");
  }
};
