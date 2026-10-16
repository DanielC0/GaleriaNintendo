import { X } from 'lucide-react';
import { ALL_OPTIONS } from '../../lib/filterGames';
import type { GameSort } from '../../lib/filterGames';

interface GameFiltersProps {
  platforms: string[];
  genres: string[];
  platform: string;
  genre: string;
  sort: GameSort;
  hasActiveFilters: boolean;
  onPlatformChange: (value: string) => void;
  onGenreChange: (value: string) => void;
  onSortChange: (value: GameSort) => void;
  onClear: () => void;
}

const labelClass =
  'font-display text-xs font-bold uppercase tracking-[0.16em] text-ink-muted';

const selectClass =
  'mt-2 w-full rounded-md border border-line bg-surface px-3 py-2.5 text-sm text-ink shadow-sm transition hover:border-ink/30 focus:border-accent focus:outline-2 focus:outline-accent';

const sortOptions: { value: GameSort; label: string }[] = [
  { value: 'catalog', label: 'Orden del catálogo' },
  { value: 'title-asc', label: 'Título: A a Z' },
  { value: 'title-desc', label: 'Título: Z a A' },
  { value: 'year-asc', label: 'Año: más antiguos' },
  { value: 'year-desc', label: 'Año: más recientes' },
];

const sortValues = new Set<string>(sortOptions.map((option) => option.value));

export function GameFilters({
  platforms,
  genres,
  platform,
  genre,
  sort,
  hasActiveFilters,
  onPlatformChange,
  onGenreChange,
  onSortChange,
  onClear,
}: GameFiltersProps) {
  const handleSortChange = (value: string) => {
    if (sortValues.has(value)) {
      onSortChange(value as GameSort);
    }
  };

  return (
    <section aria-label="Filtros y orden" className="mt-6 max-w-3xl">
      <div className="grid gap-3 sm:grid-cols-3">
        <div>
          <label htmlFor="filter-platform" className={labelClass}>
            Plataforma
          </label>
          <select
            id="filter-platform"
            value={platform}
            onChange={(event) => onPlatformChange(event.target.value)}
            className={selectClass}
          >
            <option value={ALL_OPTIONS}>Todas las plataformas</option>
            {platforms.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="filter-genre" className={labelClass}>
            Género
          </label>
          <select
            id="filter-genre"
            value={genre}
            onChange={(event) => onGenreChange(event.target.value)}
            className={selectClass}
          >
            <option value={ALL_OPTIONS}>Todos los géneros</option>
            {genres.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="filter-sort" className={labelClass}>
            Ordenar por
          </label>
          <select
            id="filter-sort"
            value={sort}
            onChange={(event) => handleSortChange(event.target.value)}
            className={selectClass}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {hasActiveFilters ? (
        <button
          type="button"
          onClick={onClear}
          className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-md px-1 text-sm font-semibold text-ink-muted transition hover:text-accent-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <X size={16} aria-hidden="true" />
          Limpiar filtros
        </button>
      ) : null}
    </section>
  );
}
