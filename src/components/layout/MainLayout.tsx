import type { ReactNode } from 'react';
import type { Theme } from '../../lib/theme';
import type { MainView } from '../../types/navigation';
import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';

interface MainLayoutProps {
  activeView: MainView;
  savedCount: number;
  theme: Theme;
  onNavigate: (view: MainView) => void;
  onToggleTheme: () => void;
  children: ReactNode;
}

export function MainLayout({
  activeView,
  savedCount,
  theme,
  onNavigate,
  onToggleTheme,
  children,
}: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-canvas"
      >
        Saltar al contenido
      </a>
      <SiteHeader
        activeView={activeView}
        savedCount={savedCount}
        theme={theme}
        onNavigate={onNavigate}
        onToggleTheme={onToggleTheme}
      />
      <main id="contenido" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
