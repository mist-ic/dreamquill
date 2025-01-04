import type { Story } from '../../types/story';
import { validateChoices, createEndingChoices, isEndingNode } from './nodeValidator';

function validateNode(nodeId: string, node: any): string[] {
  const errors: string[] = [];
  
  if (!node.content || typeof node.content !== 'string') {
    errors.push(`Node ${nodeId}: Missing or invalid content`);
  }

  if (!Array.isArray(node.choices)) {
    errors.push(`Node ${nodeId}: Choices must be an array`);
    return errors;
  }

  // Add ending choices for nodes with empty choices array
  if (isEndingNode(node.choices)) {
    node.choices = createEndingChoices();
  } else {
    errors.push(...validateChoices(node.choices, nodeId));
  }

  return errors;
}

export function validateStory(data: any): { isValid: boolean; errors: string[]; story?: Story } {
  const errors: string[] = [];

  // Validate basic structure
  if (!data?.title || typeof data.title !== 'string') {
    errors.push('Missing or invalid title');
  }

  if (!data?.nodes || typeof data.nodes !== 'object') {
    errors.push('Missing or invalid nodes object');
  }

  if (!data?.nodes?.start) {
    errors.push('Missing start node');
  }

  // Create a set of valid node IDs
  const nodeIds = new Set(Object.keys(data.nodes || {}));

  // Validate each node and fix references
  Object.entries<any>(data.nodes || {}).forEach(([nodeId, node]) => {
    // Add ID to node object
    node.id = nodeId;
    
    const nodeErrors = validateNode(nodeId, node);
    errors.push(...nodeErrors);

    // Fix references to non-existent nodes
    if (Array.isArray(node.choices)) {
      node.choices.forEach((choice: any) => {
        if (choice.nextNodeId && !nodeIds.has(choice.nextNodeId) && choice.nextNodeId !== 'generate_new') {
          errors.push(`Invalid node reference: ${choice.nextNodeId} in node ${nodeId}`);
        }
      });
    }
  });

  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  const story: Story = {
    id: crypto.randomUUID(),
    title: data.title,
    startNodeId: 'start',
    currentNodeId: 'start',
    nodes: data.nodes
  };

  return { isValid: true, errors: [], story };
}