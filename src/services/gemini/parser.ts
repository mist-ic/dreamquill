import { createGeminiError } from './errors';
import type { GeminiStoryResponse } from './types';

function cleanJsonString(text: string): string {
  // Remove any markdown code block syntax
  text = text.replace(/```json\n?|\n?```/g, '');
  
  // Find the first '{' and last '}'
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  
  if (start === -1 || end === -1) {
    throw createGeminiError('No valid JSON object found in response');
  }
  
  // Extract just the JSON object
  return text.slice(start, end + 1);
}

export function extractJsonFromResponse(text: string): any {
  try {
    const cleanedJson = cleanJsonString(text);
    return JSON.parse(cleanedJson);
  } catch (error) {
    throw createGeminiError('Failed to parse JSON response', error);
  }
}

export function validateStoryStructure(data: any): data is GeminiStoryResponse {
  if (!data?.title || typeof data.title !== 'string') {
    throw createGeminiError('Missing or invalid title');
  }

  if (!data?.nodes || typeof data.nodes !== 'object') {
    throw createGeminiError('Missing or invalid nodes object');
  }

  if (!data.nodes.start) {
    throw createGeminiError('Missing start node');
  }

  // Validate each node
  Object.entries(data.nodes).forEach(([nodeId, node]: [string, any]) => {
    if (!node.content || typeof node.content !== 'string') {
      throw createGeminiError(`Node ${nodeId}: Missing or invalid content`);
    }

    if (!Array.isArray(node.choices)) {
      throw createGeminiError(`Node ${nodeId}: Missing or invalid choices array`);
    }

    // Validate each choice in non-ending nodes
    if (node.choices.length > 0) {
      node.choices.forEach((choice: any, index: number) => {
        if (!choice.text || typeof choice.text !== 'string') {
          throw createGeminiError(`Node ${nodeId}, Choice ${index}: Invalid or missing text`);
        }
        if (!choice.nextNodeId || typeof choice.nextNodeId !== 'string') {
          throw createGeminiError(`Node ${nodeId}, Choice ${index}: Invalid or missing nextNodeId`);
        }
      });
    }
  });

  return true;
}