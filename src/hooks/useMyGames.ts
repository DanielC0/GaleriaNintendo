import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  MY_GAMES_STORAGE_KEY,
  isStorageAvailable,
  readStoredGameIds,
  writeStoredGameIds,
} from '../lib/storage';

export interface MyGamesCollection {
  gameIds: string[];
  savedCount: number;
  isPersistent: boolean;
  hasGame: (gameId: string) => boolean;
  toggleGame: (gameId: string) => void;
  removeGame: (gameId: string) => void;
  pruneMissingGames: (availableIds: readonly string[]) => void;
}

export function useMyGames(): MyGamesCollection {
  const [gameIds, setGameIds] = useState<string[]>(() => readStoredGameIds() ?? []);
  const [isPersistent] = useState(() => isStorageAvailable());

  useEffect(() => {
    if (!isPersistent) {
      return;
    }
    writeStoredGameIds(gameIds);
  }, [gameIds, isPersistent]);

  useEffect(() => {
    if (!isPersistent || typeof window === 'undefined') {
      return;
    }

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== null && event.key !== MY_GAMES_STORAGE_KEY) {
        return;
      }

      const nextIds = readStoredGameIds();
      if (nextIds !== null) {
        setGameIds(nextIds);
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [isPersistent]);

  const savedIdSet = useMemo(() => new Set(gameIds), [gameIds]);

  const hasGame = useCallback((gameId: string) => savedIdSet.has(gameId), [savedIdSet]);

  const toggleGame = useCallback((gameId: string) => {
    setGameIds((current) =>
      current.includes(gameId)
        ? current.filter((id) => id !== gameId)
        : [...current, gameId],
    );
  }, []);

  const removeGame = useCallback((gameId: string) => {
    setGameIds((current) => current.filter((id) => id !== gameId));
  }, []);

  const pruneMissingGames = useCallback((availableIds: readonly string[]) => {
    const available = new Set(availableIds);
    setGameIds((current) => {
      const next = current.filter((id) => available.has(id));
      return next.length === current.length ? current : next;
    });
  }, []);

  return {
    gameIds,
    savedCount: gameIds.length,
    isPersistent,
    hasGame,
    toggleGame,
    removeGame,
    pruneMissingGames,
  };
}
