import { useMemo, useState } from 'react';
import { Gamepad2, SearchX } from 'lucide-react';
import { games } from '../data/games';
import { useGameSearch } from '../hooks/useGameSearch';
import {
  applyGameFilters,
  collectFilterOptions,
  defaultGameFilters,
  hasActiveGameFilters,
} from '../lib/filterGames';
import type { GameFilterState, GameSort } from '../lib/filterGames';
import { GameFilters } from '../components/games/GameFilters';
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
  const [filters, setFilters] = useState<GameFilterState>(defaultGameFilters);
  const [collectionStatus, setCollectionStatus] = useState('');

  const filterOptions = useMemo(() => collectFilterOptions(games), []);
  const filtersActive = hasActiveGameFilters(filters);
  const visibleGames = useMemo(() => applyGameFilters(results, filters), [results, filters]);

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

  const handlePlatformChange = (platform: string) => {
    setFilters((current) => ({ ...current, platform }));
  };

  const handleGenreChange = (genre: string) => {
    setFilters((current) => ({ ...current, genre }));
  };

  const handleSortChange = (sort: GameSort) => {
    setFilters((current) => ({ ...current, sort }));
  };

  const handleClearFilters = () => {
    setFilters(defaultGameFilters);
  };

  const handleClearSearchAndFilters = () => {
    setQuery('');
    setFilters(defaultGameFilters);
  };

  const resultsLabel = isSearching || filtersActive
    ? `${visibleGames.length} ${visibleGames.length === 1 ? 'resultado' : 'resultados'}${
        isSearching ? ` para «${query.trim()}»` : ''
      }${filtersActive ? ' con los filtros actuales' : ''}`
    : `${games.length} títulos disponibles`;

  const emptyMessage = isSearching && filtersActive
    ? `No encontramos juegos que coincidan con «${query.trim()}» con los filtros actuales. Prueba otra búsqueda o limpia los filtros.`
    : isSearching
      ? `No encontramos juegos que coincidan con «${query.trim()}». Prueba con otro nombre o revisa la ortografía.`
      : 'No hay títulos que coincidan con la plataforma o el género seleccionados. Cambia los filtros para ver más juegos.';

  const emptyActionLabel = isSearching && filtersActive
    ? 'Limpiar búsqueda y filtros'
    : isSearching
      ? 'Limpiar búsqueda'
      : 'Limpiar filtros';

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

          <GameFilters
            platforms={filterOptions.platforms}
            genres={filterOptions.genres}
            platform={filters.platform}
            genre={filters.genre}
            sort={filters.sort}
            hasActiveFilters={filtersActive}
            onPlatformChange={handlePlatformChange}
            onGenreChange={handleGenreChange}
            onSortChange={handleSortChange}
            onClear={handleClearFilters}
          />

          <p className="mt-4 text-sm text-ink-muted" role="status">
            {resultsLabel}
          </p>
          <p className="sr-only" role="status">
            {collectionStatus}
          </p>

          <div className="mt-6">
            {visibleGames.length > 0 ? (
              <GameGrid
                games={visibleGames}
                isGameSaved={isGameSaved}
                onOpenDetails={onOpenDetails}
                onToggleCollection={handleToggleCollection}
              />
            ) : (
              <EmptyState
                icon={<SearchX size={22} />}
                title="No hay coincidencias"
                message={emptyMessage}
                action={{
                  label: emptyActionLabel,
                  onAction: handleClearSearchAndFilters,
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
