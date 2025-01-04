export const STORY_GENERATION_PROMPT = `Create an interactive story with multiple paths and proper endings.
The story must strictly follow this JSON structure and rules:

{
  "title": "Story Title",
  "nodes": {
    "start": {
      "content": "Opening paragraph...",
      "choices": [
        { "text": "First choice", "nextNodeId": "path1" },
        { "text": "Second choice", "nextNodeId": "path2" }
      ]
    },
    "path1": {
      "content": "Path 1 content...",
      "choices": [
        { "text": "Continue", "nextNodeId": "ending1" }
      ]
    },
    "ending1": {
      "content": "Ending content...",
      "choices": [
        { "text": "Start Over", "nextNodeId": "start" },
        { "text": "Generate a New Story", "nextNodeId": "generate_new" }
      ]
    }
  }
}

CRITICAL RULES:
1. Every non-ending node MUST have 2-3 choices
2. All ending nodes MUST have exactly these two choices:
   - "Start Over" with nextNodeId: "start"
   - "Generate a New Story" with nextNodeId: "generate_new"
3. Each choice MUST have "text" and "nextNodeId"
4. All nextNodeId values MUST reference existing nodes (except "generate_new")
5. Keep content concise (2-3 sentences per node)
6. Create at least 2 different endings
7. Maximum story depth: 3-4 nodes from start to end`;