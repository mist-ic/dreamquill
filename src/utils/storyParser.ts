import type { Story } from '../types/story';
import { generateId } from './idGenerator';
import { sampleStory } from './storyData';

export async function parseGeminiResponse(response: string): Promise<Story> {
  try {
    // Extract JSON from the response (it might be wrapped in code blocks)
    const jsonMatch = response.match(/```json\n?(.*?)\n?```/s) || response.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      throw new Error('No valid JSON found in response');
    }

    const jsonStr = jsonMatch[1] || jsonMatch[0];
    const parsed = JSON.parse(jsonStr.trim());
    
    // Validate required structure
    if (!parsed.title || !parsed.nodes || !parsed.nodes.start) {
      throw new Error('Invalid story structure');
    }

    // Ensure all referenced nodes exist
    const validateNodes = (nodes: any) => {
      Object.values(nodes).forEach((node: any) => {
        if (!node.content || !Array.isArray(node.choices)) {
          throw new Error('Invalid node structure');
        }
        node.choices.forEach((choice: any) => {
          if (!choice.text || !choice.nextNodeId || !nodes[choice.nextNodeId]) {
            throw new Error('Invalid choice structure or missing referenced node');
          }
        });
      });
    };

    validateNodes(parsed.nodes);
    
    return {
      id: generateId(),
      title: parsed.title,
      startNodeId: 'start',
      currentNodeId: 'start',
      nodes: parsed.nodes
    };
  } catch (error) {
    console.error('Error parsing Gemini response:', error);
    return {
      ...sampleStory,
      title: 'Generated Story (Fallback)'
    };
  }
}