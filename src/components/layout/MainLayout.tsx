import type { ReactNode } from 'react';
import type { MainView } from '../../types/navigation';
import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';

interface MainLayoutProps {
  activeView: MainView;
  onNavigate: (view: MainView) => void;
  children: ReactNode;
}

export function MainLayout({ activeView, onNavigate, children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Saltar al contenido
      </a>
      <SiteHeader activeView={activeView} onNavigate={onNavigate} />
      <main id="contenido" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
