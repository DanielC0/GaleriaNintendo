import type { Game } from '../types/game';

export type GameSort = 'catalog' | 'title-asc' | 'title-desc' | 'year-asc' | 'year-desc';

export interface GameFilterState {
  platform: string;
  genre: string;
  sort: GameSort;
}

export const ALL_OPTIONS = 'all';

export const defaultGameFilters: GameFilterState = {
  platform: ALL_OPTIONS,
  genre: ALL_OPTIONS,
  sort: 'catalog',
};

export function hasActiveGameFilters(filters: GameFilterState): boolean {
  return (
    filters.platform !== ALL_OPTIONS ||
    filters.genre !== ALL_OPTIONS ||
    filters.sort !== 'catalog'
  );
}

export function collectFilterOptions(games: Game[]): { platforms: string[]; genres: string[] } {
  const collator = new Intl.Collator('es', { sensitivity: 'base' });
  const platforms = new Set<string>();
  const genres = new Set<string>();

  for (const game of games) {
    game.platforms.forEach((platform) => platforms.add(platform));
    game.genres.forEach((genre) => genres.add(genre));
  }

  return {
    platforms: [...platforms].sort(collator.compare),
    genres: [...genres].sort(collator.compare),
  };
}

export function sortGames(games: Game[], sort: GameSort): Game[] {
  if (sort === 'catalog') {
    return games;
  }

  const collator = new Intl.Collator('es', { sensitivity: 'base' });
  const sorted = [...games];

  const byTitle = (a: Game, b: Game) => collator.compare(a.title, b.title);

  switch (sort) {
    case 'title-asc':
      sorted.sort(byTitle);
      break;
    case 'title-desc':
      sorted.sort((a, b) => byTitle(b, a));
      break;
    case 'year-asc':
      sorted.sort((a, b) => (a.releaseYear ?? Number.MAX_SAFE_INTEGER) - (b.releaseYear ?? Number.MAX_SAFE_INTEGER) || byTitle(a, b));
      break;
    case 'year-desc':
      sorted.sort((a, b) => (b.releaseYear ?? Number.MIN_SAFE_INTEGER) - (a.releaseYear ?? Number.MIN_SAFE_INTEGER) || byTitle(a, b));
      break;
  }

  return sorted;
}

export function applyGameFilters(games: Game[], filters: GameFilterState): Game[] {
  const filtered = games.filter(
    (game) =>
      (filters.platform === ALL_OPTIONS || game.platforms.includes(filters.platform)) &&
      (filters.genre === ALL_OPTIONS || game.genres.includes(filters.genre)),
  );

  return sortGames(filtered, filters.sort);
}
