import { Bookmark, Gamepad2, LayoutGrid } from 'lucide-react';
import type { MainView } from '../../types/navigation';

interface SiteHeaderProps {
  activeView: MainView;
  savedCount: number;
  onNavigate: (view: MainView) => void;
}

const navItemBase =
  'inline-flex min-h-10 items-center gap-1.5 rounded-md px-3 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';

export function SiteHeader({ activeView, savedCount, onNavigate }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <button
          type="button"
          onClick={() => onNavigate('gallery')}
          className="flex items-center gap-2.5 rounded-md text-left transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          aria-label="Ir a la galería"
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-md bg-accent-dark text-white">
            <Gamepad2 size={20} aria-hidden="true" />
          </span>
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="font-display text-[13px] font-black uppercase tracking-[0.16em] sm:text-sm">
              Galería Nintendo
            </span>
            <span className="hidden text-[11px] text-ink-muted sm:block">
              Archivo independiente de videojuegos
            </span>
          </span>
        </button>

        <nav aria-label="Principal" className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={() => onNavigate('gallery')}
            aria-current={activeView === 'gallery' ? 'page' : undefined}
            className={
              activeView === 'gallery'
                ? `${navItemBase} bg-accent-dark text-white shadow-sm`
                : `${navItemBase} text-ink hover:bg-accent-tint`
            }
          >
            <LayoutGrid size={16} aria-hidden="true" />
            <span>Galería</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('my-games')}
            aria-current={activeView === 'my-games' ? 'page' : undefined}
            className={
              activeView === 'my-games'
                ? `${navItemBase} bg-accent-dark text-white shadow-sm`
                : `${navItemBase} text-ink hover:bg-accent-tint`
            }
          >
            <Bookmark size={16} aria-hidden="true" />
            <span>Mis juegos</span>
            {savedCount > 0 ? (
              <>
                <span
                  aria-hidden="true"
                  className={`inline-flex min-w-5 items-center justify-center rounded-full px-1.5 py-0.5 text-[11px] font-bold tabular-nums ${
                    activeView === 'my-games' ? 'bg-white text-accent-dark' : 'bg-accent-dark text-white'
                  }`}
                >
                  {savedCount}
                </span>
                <span className="sr-only">, {savedCount} guardados</span>
              </>
            ) : null}
          </button>
        </nav>
      </div>
    </header>
  );
}
