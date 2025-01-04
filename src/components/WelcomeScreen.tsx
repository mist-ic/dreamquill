import React, { useState } from 'react';
import { Sparkles, Type } from 'lucide-react';
import { LoadingSpinner } from './LoadingSpinner';
import { Logo } from './Logo';

interface WelcomeScreenProps {
  onRandomStory: () => void;
  onCustomStory: (prompt: string) => void;
  isLoading?: boolean;
  error?: string | null;
}

export function WelcomeScreen({ 
  onRandomStory, 
  onCustomStory, 
  isLoading = false,
  error = null 
}: WelcomeScreenProps) {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onCustomStory(prompt);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <Logo className="mx-auto mb-8" />
        <div className="py-12">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <Logo className="mx-auto mb-8" />
      
      <div className="space-y-8">
        <button
          onClick={onRandomStory}
          disabled={isLoading}
          className="w-full p-6 bg-blue-50 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-gray-600 rounded-lg flex items-center gap-4 transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Sparkles className="text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" size={24} />
          <div className="text-left">
            <h2 className="text-xl font-semibold mb-1 dark:text-white">Generate Random Story</h2>
            <p className="text-gray-600 dark:text-gray-300">Let AI create a unique adventure for you</p>
          </div>
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">or</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="prompt" className="block text-xl font-semibold mb-2 dark:text-white">
              Create Your Own Story
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter a story idea..."
                disabled={isLoading}
                className="flex-1 p-3 border dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!prompt.trim() || isLoading}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Type size={20} />
                Create Story
              </button>
            </div>
          </div>
        </form>

        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}