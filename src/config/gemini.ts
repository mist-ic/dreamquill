import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API client
export const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const storyModel = genAI.getGenerativeModel({ model: 'gemini-pro' });