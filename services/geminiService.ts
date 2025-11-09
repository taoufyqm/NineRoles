
import { GoogleGenAI } from "@google/genai";
import { Role, Task } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("Gemini API key not found. Smart features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const getSmartSuggestion = async (
  role: Role,
  task: Task
): Promise<string> => {
    if (!API_KEY) {
        return Promise.resolve("Smart suggestion feature is disabled. Please set up your Gemini API key.");
    }

  const model = 'gemini-2.5-flash';
  
  const prompt = `
    You are an expert productivity coach for a video content creator using an app called "The Nine Roles". Your response must be in English.
    
    Current user context:
    - Role: ${role.name} (${role.description})
    - Current Task: "${task.title}"

    Based on this context, suggest the single most effective and realistic SUB-TASK for them to work on right now related to their main task.
    
    Your suggestion should:
    1.  Be a small, actionable step that contributes to completing "${task.title}".
    2.  Provide a brief, encouraging reason why this sub-task is a good choice.
    3.  Format your response clearly. Start with the suggested sub-task, then the reasoning.
    
    Example response format:
    **Suggested Sub-Task:** Draft the introduction (the first 30 seconds).
    **Reasoning:** Starting with the hook is a small win that can build momentum for the rest of the script.
    `;

  try {
    const response = await ai.models.generateContent({
        model: model,
        contents: prompt,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to fetch suggestion from Gemini API.");
  }
};


export const performResearch = async (topic: string): Promise<string> => {
    if (!API_KEY) {
        return Promise.resolve("Smart research feature is disabled. Please set up your Gemini API key.");
    }

    const model = 'gemini-2.5-flash';
    
    const prompt = `
        You are a highly efficient research assistant for a YouTube content creator. Your response must be in English.
        The user wants to research the following topic for their next video: "${topic}".

        Please provide a concise yet comprehensive summary of the topic. Structure your response as follows:
        1.  **Key Summary:** A brief, engaging paragraph summarizing the most important points.
        2.  **Key Points:** A bulleted list of 3-5 crucial facts, statistics, or concepts.
        3.  **Hook Ideas:** Suggest 2-3 interesting questions or surprising facts to use as a video intro.
        4.  **Credible Sources:** Provide links to 2-3 reliable articles or studies for further reading.

        Ensure the information is accurate, up-to-date, and easy to understand for a general audience.
    `;

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
        });
        return response.text.trim();
    } catch (error) {
        console.error("Error calling Gemini API for research:", error);
        throw new Error("Failed to fetch research from Gemini API.");
    }
};