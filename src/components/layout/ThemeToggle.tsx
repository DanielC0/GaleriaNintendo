import { Moon, Sun } from 'lucide-react';
import type { Theme } from '../../lib/theme';

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const isDark = theme === 'dark';
  const label = isDark ? 'Cambiar al tema claro' : 'Cambiar al tema oscuro';

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isDark}
      aria-label={label}
      title={label}
      className="grid size-10 place-items-center rounded-md border border-line bg-surface text-ink-muted shadow-sm transition hover:border-ink/30 hover:text-accent-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      {isDark ? (
        <Sun size={18} aria-hidden="true" />
      ) : (
        <Moon size={18} aria-hidden="true" />
      )}
    </button>
  );
}
