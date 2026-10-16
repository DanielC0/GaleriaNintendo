import { Gamepad2 } from 'lucide-react';
import { games } from '../data/games';
import { GameGrid } from '../components/games/GameGrid';
import { EmptyState } from '../components/ui/EmptyState';

interface GalleryPageProps {
  onOpenDetails: (gameId: string) => void;
}

export function GalleryPage({ onOpenDetails }: GalleryPageProps) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <header className="max-w-2xl">
        <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-accent-dark">
          Archivo independiente
        </p>
        <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
          Una colección curada de videojuegos de Nintendo
        </h1>
        <p className="mt-3 leading-relaxed text-ink-muted">
          Explora clásicos y lanzamientos recientes. Abre cualquier ficha para conocer su historia,
          sus plataformas y su jugabilidad.
        </p>
        {games.length > 0 ? (
          <p className="mt-4 text-sm text-ink-muted">
            {games.length} {games.length === 1 ? 'título disponible' : 'títulos disponibles'}
          </p>
        ) : null}
      </header>

      <div className="mt-8">
        {games.length > 0 ? (
          <GameGrid games={games} onOpenDetails={onOpenDetails} />
        ) : (
          <EmptyState
            icon={<Gamepad2 size={22} />}
            title="La galería está vacía"
            message="Todavía no hay títulos publicados. Vuelve más tarde cuando el catálogo esté disponible."
          />
        )}
      </div>
    </section>
  );
}
