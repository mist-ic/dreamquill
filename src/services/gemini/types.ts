export interface GeminiStoryResponse {
  title: string;
  nodes: {
    [key: string]: {
      content: string;
      choices: {
        text: string;
        nextNodeId: string;
      }[];
    };
  };
}