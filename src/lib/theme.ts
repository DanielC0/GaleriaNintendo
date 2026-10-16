export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'galeria-nintendo:theme:v1';

const darkModeQuery = '(prefers-color-scheme: dark)';

function prefersDark(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }

  return window.matchMedia(darkModeQuery).matches;
}

export function readStoredTheme(): Theme | null {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return stored === 'light' || stored === 'dark' ? stored : null;
  } catch {
    return null;
  }
}

export function writeStoredTheme(theme: Theme): boolean {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    return true;
  } catch {
    return false;
  }
}

export function getPreferredTheme(): Theme {
  return readStoredTheme() ?? (prefersDark() ? 'dark' : 'light');
}

export function applyThemeClass(theme: Theme): void {
  if (typeof document === 'undefined') {
    return;
  }

  document.documentElement.classList.toggle('dark', theme === 'dark');
}
