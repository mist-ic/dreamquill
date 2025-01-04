import { useEffect } from 'react';
import { useThemeStore } from '../stores/themeStore';

export function useDarkMode() {
  const { isDark, toggle } = useThemeStore();

  useEffect(() => {
    // Set initial dark mode class
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  return { isDark, toggle };
}