import type { Story } from '../../types/story';
import type { PDFContent } from './types';

export function formatStoryForPDF(story: Story): PDFContent {
  const sections: PDFContent['sections'] = [];
  const visitedNodes = new Set<string>();

  function processNode(nodeId: string, path: string[] = []) {
    if (visitedNodes.has(nodeId)) return;
    visitedNodes.add(nodeId);

    const node = story.nodes[nodeId];
    if (!node) return;

    sections.push({
      content: `${path.length > 0 ? `Path: ${path.join(' → ')}\n\n` : ''}${node.content}`,
      choices: node.choices.map((choice, index) => {
        const newPath = [...path, choice.text];
        processNode(choice.nextNodeId, newPath);
        return `${index + 1}. ${choice.text}`;
      })
    });
  }

  processNode(story.startNodeId);

  return {
    title: story.title,
    sections
  };
}