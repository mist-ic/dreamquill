export interface StoryNode {
  id: string;
  content: string;
  choices: Choice[];
}

export interface Choice {
  text: string;
  nextNodeId: string;
}

export interface Story {
  id: string;
  title: string;
  startNodeId: string;
  nodes: Record<string, StoryNode>;
  currentNodeId: string;
}