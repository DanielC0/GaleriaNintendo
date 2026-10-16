import { useState } from 'react';
import { Gamepad2, SearchX } from 'lucide-react';
import { games } from '../data/games';
import { useGameSearch } from '../hooks/useGameSearch';
import { GameGrid } from '../components/games/GameGrid';
import { GameSearch } from '../components/games/GameSearch';
import { EmptyState } from '../components/ui/EmptyState';

interface GalleryPageProps {
  isGameSaved: (gameId: string) => boolean;
  onOpenDetails: (gameId: string) => void;
  onToggleCollection: (gameId: string) => void;
}

export function GalleryPage({ isGameSaved, onOpenDetails, onToggleCollection }: GalleryPageProps) {
  const { query, setQuery, results, isSearching } = useGameSearch(games);
  const [collectionStatus, setCollectionStatus] = useState('');

  const handleToggleCollection = (gameId: string) => {
    const game = games.find((item) => item.id === gameId);
    const wasSaved = isGameSaved(gameId);

    onToggleCollection(gameId);

    if (game) {
      setCollectionStatus(
        wasSaved
          ? `«${game.title}» se quitó de Mis juegos.`
          : `«${game.title}» se guardó en Mis juegos.`,
      );
    }
  };

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <header className="max-w-2xl">
        <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-accent-dark">
          Archivo independiente
        </p>
        <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
          Una colección especial de videojuegos de Nintendo
        </h1>
        <p className="mt-3 leading-relaxed text-ink-muted">
          Explora clásicos y lanzamientos recientes. Abre cualquier ficha para conocer su historia,
          sus plataformas y su jugabilidad.
        </p>
      </header>

      {games.length > 0 ? (
        <>
          <GameSearch value={query} onChange={setQuery} />
          <p className="mt-4 text-sm text-ink-muted" role="status">
            {isSearching
              ? `${results.length} ${results.length === 1 ? 'resultado' : 'resultados'} para «${query.trim()}»`
              : `${games.length} títulos disponibles`}
          </p>
          <p className="sr-only" role="status">
            {collectionStatus}
          </p>

          <div className="mt-6">
            {results.length > 0 ? (
              <GameGrid
                games={results}
                isGameSaved={isGameSaved}
                onOpenDetails={onOpenDetails}
                onToggleCollection={handleToggleCollection}
              />
            ) : (
              <EmptyState
                icon={<SearchX size={22} />}
                title="No hay coincidencias"
                message={`No encontramos juegos que coincidan con «${query.trim()}». Prueba con otro nombre o revisa la ortografía.`}
                action={{
                  label: 'Limpiar búsqueda',
                  onAction: () => setQuery(''),
                }}
              />
            )}
          </div>
        </>
      ) : (
        <div className="mt-8">
          <EmptyState
            icon={<Gamepad2 size={22} />}
            title="La galería está vacía"
            message="Todavía no hay títulos publicados. Vuelve más tarde cuando el catálogo esté disponible."
          />
        </div>
      )}
    </section>
  );
}
