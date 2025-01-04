export function saveStoryProgress(storyId: string, currentNodeId: string): void {
  localStorage.setItem(`story_${storyId}`, currentNodeId);
}

export function loadStoryProgress(storyId: string): string | null {
  return localStorage.getItem(`story_${storyId}`);
}

export function clearStoryProgress(storyId: string): void {
  localStorage.removeItem(`story_${storyId}`);
}