import { useCallback, useEffect, useRef, useState } from 'react';
import {
  THEME_STORAGE_KEY,
  applyThemeClass,
  getPreferredTheme,
  readStoredTheme,
  writeStoredTheme,
} from '../lib/theme';
import type { Theme } from '../lib/theme';

export interface ThemeControl {
  theme: Theme;
  toggleTheme: () => void;
}

export function useTheme(): ThemeControl {
  const [theme, setTheme] = useState<Theme>(() => getPreferredTheme());
  const hasUserChoiceRef = useRef(false);

  useEffect(() => {
    applyThemeClass(theme);

    if (hasUserChoiceRef.current) {
      writeStoredTheme(theme);
    }
  }, [theme]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== null && event.key !== THEME_STORAGE_KEY) {
        return;
      }

      const nextTheme = readStoredTheme();
      if (nextTheme !== null) {
        setTheme(nextTheme);
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSchemeChange = () => {
      if (readStoredTheme() === null) {
        setTheme(mediaQuery.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleSchemeChange);
    return () => mediaQuery.removeEventListener('change', handleSchemeChange);
  }, []);

  const toggleTheme = useCallback(() => {
    hasUserChoiceRef.current = true;
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  }, []);

  return { theme, toggleTheme };
}
