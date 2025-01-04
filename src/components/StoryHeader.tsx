import React from 'react';
import { Book } from 'lucide-react';

interface StoryHeaderProps {
  title: string;
}

export function StoryHeader({ title }: StoryHeaderProps) {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-2">
          <Book className="text-blue-600 dark:text-blue-400" size={24} />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
        </div>
      </div>
    </header>
  );
}