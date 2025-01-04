import type { Choice } from '../../types/story';

export function validateChoice(choice: any, index: number, nodeId: string): string[] {
  const errors: string[] = [];
  
  if (!choice.text || typeof choice.text !== 'string') {
    errors.push(`Node ${nodeId}, Choice ${index}: Invalid or missing text`);
  }
  
  if (!choice.nextNodeId || typeof choice.nextNodeId !== 'string') {
    errors.push(`Node ${nodeId}, Choice ${index}: Invalid or missing nextNodeId`);
  }

  return errors;
}

export function validateChoices(choices: any[], nodeId: string): string[] {
  if (!Array.isArray(choices)) {
    return [`Node ${nodeId}: Choices must be an array`];
  }

  // For non-ending nodes, ensure there are 2-3 choices
  if (choices.length > 0 && (choices.length < 2 || choices.length > 3)) {
    return [`Node ${nodeId}: Non-ending nodes must have 2-3 choices`];
  }

  return choices.flatMap((choice, index) => validateChoice(choice, index, nodeId));
}

export function createEndingChoices(): Choice[] {
  return [
    {
      text: "Start Over",
      nextNodeId: "start"
    },
    {
      text: "Generate a New Story",
      nextNodeId: "generate_new"
    }
  ];
}

export function isEndingNode(choices: Choice[]): boolean {
  return choices.length === 0;
}