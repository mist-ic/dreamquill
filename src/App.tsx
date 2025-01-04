import React from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { StoryNode } from './components/StoryNode';
import { StoryControls } from './components/StoryControls';
import { StoryHeader } from './components/StoryHeader';
import { ThemeToggle } from './components/ThemeToggle';
import { useStoryManagement } from './hooks/useStoryManagement';
import { ErrorBoundary } from './components/ErrorBoundary';

export function App() {
  const {
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
  } = useStoryManagement();

  if (!story || !currentNode) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
        <ThemeToggle />
        <WelcomeScreen
          onRandomStory={handleRandomStory}
          onCustomStory={handleCustomStory}
          isLoading={isLoading}
          error={error}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <ErrorBoundary>
        <ThemeToggle />
        <StoryHeader title={story.title} />
        
        <main className="max-w-7xl mx-auto px-4 py-8 mb-20">
          <StoryNode
            id={currentNode.id}
            content={currentNode.content}
            choices={currentNode.choices}
            onChoiceSelect={handleChoiceSelect}
          />
        </main>

        <StoryControls
          onSave={handleSave}
          onExport={handleExport}
          onReset={handleReset}
          isExporting={isExporting}
        />
      </ErrorBoundary>
    </div>
  );
}