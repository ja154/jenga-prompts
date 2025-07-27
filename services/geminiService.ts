import { GoogleGenAI } from "@google/genai";
import { PromptMode } from '../types';

interface EnhancePromptParams {
  userPrompt: string;
  mode: PromptMode;
  options: Record<string, any>;
}

const checkApiKey = () => {
  if (!process.env.API_KEY) {
    throw new Error("API key is not set. Please ensure the API_KEY environment variable is configured.");
  }
};

const buildSystemPrompt = (mode: PromptMode, options: Record<string, any>): string => {
    let basePrompt = `You are a world-class prompt engineer, a specialist in crafting detailed, effective prompts for AI models. Your task is to take a user's basic idea and transform it into a "master prompt" optimized for a specific modality.`;
    
    switch (mode) {
        case PromptMode.Video:
            return `${basePrompt}
            **Modality: Video Generation (e.g., Sora, Veo, Runway)**
            **Task:** Write a "master prompt" as a single, dense paragraph (150-250 words) that functions as a detailed screenplay shot description for an 8-second video. It must be evocative, precise, and describe a complete micro-narrative.
            **Directives:**
            - Content Tone: ${options.contentTone}
            - Point of View: ${options.pov}
            - Quality: ${options.resolution}
            - **Key Requirements:** Establish a narrative arc (beginning, middle, end). Be visually explicit about subjects, actions, environment, and cinematography. Define the atmosphere with powerful adjectives.
            **Output Format:** A single paragraph starting directly with the description. No introductory text or markdown.`;
        
        case PromptMode.Image:
            return `${basePrompt}
            **Modality: Image Generation (e.g., Imagen, Midjourney, DALL-E)**
            **Task:** Transform the user's concept into an extremely dense, comma-separated list of keywords and phrases. The prompt should be rich in technical and artistic terms.
            **Directives:**
            - Style: ${options.imageStyle}
            - Tone & Mood: ${options.contentTone}
            - Lighting: ${options.lighting}
            - Framing: ${options.framing}
            - Camera Angle: ${options.cameraAngle}
            - Quality: ${options.resolution}
            - Aspect Ratio: ${options.aspectRatio}
            - Additional Details: "${options.additionalDetails}"
            **Key Requirements:** Use descriptive keywords, not full sentences. Incorporate professional terminology from photography and art.
            **Output Format:** A single, comma-separated string of keywords. No preamble, explanation, or markdown.`;

        case PromptMode.Text:
             return `${basePrompt}
            **Modality: Text Generation (Large Language Models, e.g., Gemini, GPT-4)**
            **Task:** Refine the user's prompt to be more specific, structured, and effective for an LLM. Clarify intent, add constraints, and define the desired output format.
            **Directives:**
            - Tone: ${options.contentTone}
            - Desired Output Format: ${options.outputFormat}
            **Key Requirements:** Enhance the original prompt by adding context, specifying a persona for the AI, providing examples (if applicable), and setting clear boundaries to prevent vague responses.
            **Output Format:** The complete, enhanced text prompt, ready to be used.`;

        case PromptMode.Audio:
            return `${basePrompt}
            **Modality: Audio Generation (e.g., Suno, ElevenLabs)**
            **Task:** Create a rich, descriptive prompt for generating audio. This could be for music, speech, or sound effects.
            **Directives:**
            - Audio Type: ${options.audioType}
            - Vibe / Mood: ${options.audioVibe}
            - Tone: ${options.contentTone}
            **Key Requirements:** If music, describe genre, tempo, instrumentation, and vocals. If speech, describe the speaker's voice, emotion, and pacing. If SFX, describe the sound's characteristics and environment.
            **Output Format:** A descriptive paragraph tailored for an audio generation model.`;

        case PromptMode.Code:
            return `${basePrompt}
            **Modality: Code Generation (e.g., Copilot, CodeWhisperer)**
            **Task:** Convert a natural language request into a precise and clear instruction for a code generation model.
            **Directives:**
            - Programming Language: ${options.codeLanguage}
            - Task: ${options.codeTask}
            **Key Requirements:** Be unambiguous. Specify function names, parameters, expected return values, and logic. If debugging, provide the broken code and describe the error. If refactoring, state the goals (e.g., improve performance, readability).
            **Output Format:** A well-commented, clear, and actionable prompt for a code generation AI.`;

        default:
            return 'You are a helpful assistant.';
    }
};

export const getEnhancedPrompt = async ({ userPrompt, mode, options }: EnhancePromptParams): Promise<string> => {
  checkApiKey();
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const systemPrompt = buildSystemPrompt(mode, options);
  const finalUserPrompt = `Here is my core idea. Please generate the master prompt based on the instructions you have been given.
  
  **Core Idea:** "${userPrompt}"`;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: finalUserPrompt,
        config: {
          systemInstruction: systemPrompt,
        },
    });
    
    const text = response.text;
    if (!text) {
        throw new Error("The AI returned an empty response. Please try modifying your prompt.");
    }
    return text.trim();
  } catch (error) {
    console.error(`Error calling Gemini API for ${mode} prompt:`, error);
    if (error instanceof Error) {
        throw new Error(`Failed to get response from AI: ${error.message}`);
    }
    throw new Error('An unknown error occurred while communicating with the AI model.');
  }
};
