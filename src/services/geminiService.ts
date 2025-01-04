import { storyModel } from '../config/gemini';
import { STORY_GENERATION_PROMPT } from './gemini/prompts';
import { extractJsonFromResponse, validateStoryStructure } from './gemini/parser';
import { createGeminiError } from './gemini/errors';
import { Logger } from './gemini/logger';
import type { Story } from '../types/story';
import { sampleStory } from '../utils/storyData';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

async function attemptStoryGeneration(prompt: string, attempt: number): Promise<Story> {
  try {
    Logger.info(`Attempting to generate story (attempt ${attempt + 1}/${MAX_RETRIES})`);
    
    const result = await storyModel.generateContent(
      `${STORY_GENERATION_PROMPT}\nPrompt: "${prompt}"`
    );
    
    if (!result.response) {
      throw createGeminiError('No response received from API');
    }

    const text = result.response.text();
    if (!text) {
      throw createGeminiError('Empty response from API');
    }
    
    const parsed = extractJsonFromResponse(text);
    
    if (validateStoryStructure(parsed)) {
      Logger.info('Successfully generated and validated story');
      return {
        id: crypto.randomUUID(),
        title: parsed.title,
        startNodeId: 'start',
        currentNodeId: 'start',
        nodes: parsed.nodes
      };
    }
    
    throw createGeminiError('Invalid story structure');
  } catch (error) {
    throw createGeminiError('Story generation failed', error);
  }
}

export async function generateStoryWithGemini(prompt: string): Promise<Story> {
  if (!import.meta.env.VITE_GEMINI_API_KEY) {
    Logger.warn('No Gemini API key found. Using sample story.');
    return { ...sampleStory, id: crypto.randomUUID(), title: prompt };
  }

  let lastError: Error | null = null;
  
  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      return await attemptStoryGeneration(prompt, i);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error');
      Logger.error(`Story generation attempt ${i + 1} failed`, lastError, i + 1);
      
      if (i < MAX_RETRIES - 1) {
        Logger.info(`Waiting ${RETRY_DELAY}ms before next attempt...`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      }
    }
  }

  Logger.error(`All ${MAX_RETRIES} attempts failed. Using fallback story.`, lastError);
  return {
    ...sampleStory,
    id: crypto.randomUUID(),
    title: `${prompt} (Fallback Story)`
  };
}