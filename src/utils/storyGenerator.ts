import { generateStoryWithGemini } from '../services/geminiService';
import { sampleStory } from './storyData';
import type { Story } from '../types/story';

export async function generateRandomStory(): Promise<Story> {
  const prompts = [
    'A space adventure on a mysterious planet',
    'A detective solving a magical mystery',
    'A journey through an enchanted forest',
    'A time traveler in a paradox'
  ];
  
  const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
  
  try {
    return await generateStoryWithGemini(randomPrompt);
  } catch (error) {
    console.error('Failed to generate random story:', error);
    // Fallback to sample story if API fails
    return sampleStory;
  }
}

export async function generateStoryFromPrompt(prompt: string): Promise<Story> {
  try {
    return await generateStoryWithGemini(prompt);
  } catch (error) {
    console.error('Failed to generate story from prompt:', error);
    // Fallback to sample story with custom title if API fails
    return {
      ...sampleStory,
      title: prompt
    };
  }
}