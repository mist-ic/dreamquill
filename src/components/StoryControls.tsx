import React from 'react';
import { Download, Save, RotateCcw } from 'lucide-react';

interface StoryControlsProps {
  onSave: () => void;
  onExport: () => void;
  onReset: () => void;
  isExporting?: boolean;
}

export function StoryControls({ onSave, onExport, onReset, isExporting = false }: StoryControlsProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg p-4">
      <div className="max-w-2xl mx-auto flex justify-between">
        <button
          onClick={onSave}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Save size={20} />
          Save Progress
        </button>
        <button
          onClick={onExport}
          disabled={isExporting}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download size={20} />
          {isExporting ? 'Exporting...' : 'Export PDF'}
        </button>
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
        >
          <RotateCcw size={20} />
          Reset Story
        </button>
      </div>
    </div>
  );
}