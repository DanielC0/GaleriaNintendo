import { useMemo, useState } from 'react';
import type { Game } from '../types/game';
import { normalizeSearchText } from '../lib/normalizeSearch';

export function useGameSearch(catalog: Game[]) {
  const [query, setQuery] = useState('');
  const normalizedQuery = normalizeSearchText(query);

  const results = useMemo(() => {
    if (normalizedQuery === '') {
      return catalog;
    }

    return catalog.filter((game) => {
      const haystack = normalizeSearchText(`${game.title} ${game.series ?? ''}`);
      return haystack.includes(normalizedQuery);
    });
  }, [catalog, normalizedQuery]);

  return {
    query,
    setQuery,
    results,
    isSearching: normalizedQuery !== '',
  };
}
