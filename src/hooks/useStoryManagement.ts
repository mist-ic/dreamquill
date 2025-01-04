import { useState, useEffect } from 'react';
import { generateRandomStory, generateStoryFromPrompt } from '../utils/storyGenerator';
import { saveStoryProgress, loadStoryProgress, clearStoryProgress } from '../utils/storage';
import { exportStoryToPDF } from '../utils/pdfExporter';
import type { Story } from '../types/story';

export function useStoryManagement() {
  const [story, setStory] = useState<Story | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  
  const currentNode = story ? story.nodes[story.currentNodeId] : null;

  useEffect(() => {
    if (story) {
      const savedProgress = loadStoryProgress(story.id);
      if (savedProgress && story.nodes[savedProgress]) {
        setStory(prev => prev ? { ...prev, currentNodeId: savedProgress } : null);
      }
    }
  }, [story?.id]);

  const handleRandomStory = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const newStory = await generateRandomStory();
      setStory(newStory);
    } catch (err) {
      setError('Failed to generate story. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCustomStory = async (prompt: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const newStory = await generateStoryFromPrompt(prompt);
      setStory(newStory);
    } catch (err) {
      setError('Failed to generate story. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChoiceSelect = async (nextNodeId: string) => {
    if (nextNodeId === 'generate_new') {
      // Clear current story and show welcome screen
      setStory(null);
      return;
    }
    setStory(prev => prev ? { ...prev, currentNodeId: nextNodeId } : null);
  };

  const handleSave = () => {
    if (story) {
      saveStoryProgress(story.id, story.currentNodeId);
      alert('Progress saved!');
    }
  };

  const handleExport = async () => {
    if (!story) return;
    
    setIsExporting(true);
    try {
      await exportStoryToPDF(story);
    } catch (err) {
      console.error('Failed to export PDF:', err);
      alert('Failed to export PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleReset = () => {
    if (story && confirm('Are you sure you want to reset the story?')) {
      clearStoryProgress(story.id);
      setStory(prev => prev ? { ...prev, currentNodeId: prev.startNodeId } : null);
    }
  };

  return {
    story,
    currentNode,
    isLoading,
    isExporting,
    error,
    handleRandomStory,
    handleCustomStory,
    handleChoiceSelect,
    handleSave,
    handleExport,
    handleReset
  };
}