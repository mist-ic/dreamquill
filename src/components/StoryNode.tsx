import React from 'react';
import type { Choice } from '../types/story';

interface StoryNodeProps {
  id: string;
  content: string;
  choices: Choice[];
  onChoiceSelect: (nextNodeId: string) => void;
}

export function StoryNode({ id, content, choices, onChoiceSelect }: StoryNodeProps) {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <p className="text-lg mb-6 leading-relaxed dark:text-white">{content}</p>
      <div className="space-y-3">
        {choices.map((choice, index) => (
          <button
            key={`${id}-choice-${index}`}
            onClick={() => onChoiceSelect(choice.nextNodeId)}
            className="w-full p-3 text-left bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200 dark:text-white"
          >
            {choice.text}
          </button>
        ))}
      </div>
    </div>
  );
}