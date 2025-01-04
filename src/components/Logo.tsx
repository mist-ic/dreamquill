import React from 'react';

interface LogoProps {
  className?: string;
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <div className={`text-center ${className}`}>
      <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
        DreamQuill
      </h1>
      <p className="mt-2 text-gray-600 dark:text-gray-300">Interactive Story Creator</p>
    </div>
  );
}