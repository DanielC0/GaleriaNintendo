import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useMyGames } from './useMyGames';
import { MY_GAMES_STORAGE_KEY } from '../lib/storage';

describe('useMyGames', () => {
  it('empieza con una colección vacía si no hay datos guardados', () => {
    const { result } = renderHook(() => useMyGames());

    expect(result.current.gameIds).toEqual([]);
    expect(result.current.savedCount).toBe(0);
    expect(result.current.isPersistent).toBe(true);
  });

  it('añade juegos sin duplicarlos y los quita al alternar de nuevo', () => {
    const { result } = renderHook(() => useMyGames());

    act(() => result.current.toggleGame('tetris'));
    act(() => result.current.toggleGame('tetris'));

    expect(result.current.gameIds).toEqual([]);
    expect(result.current.hasGame('tetris')).toBe(false);

    act(() => result.current.toggleGame('tetris'));
    act(() => result.current.toggleGame('zelda'));

    expect(result.current.gameIds).toEqual(['tetris', 'zelda']);
    expect(result.current.hasGame('zelda')).toBe(true);
  });

  it('quita juegos concretos de la colección', () => {
    const { result } = renderHook(() => useMyGames());

    act(() => result.current.toggleGame('tetris'));
    act(() => result.current.toggleGame('zelda'));
    act(() => result.current.removeGame('tetris'));

    expect(result.current.gameIds).toEqual(['zelda']);
  });

  it('lee la colección existente y la conserva en localStorage', () => {
    window.localStorage.setItem(MY_GAMES_STORAGE_KEY, JSON.stringify(['zelda']));

    const { result } = renderHook(() => useMyGames());

    expect(result.current.gameIds).toEqual(['zelda']);

    act(() => result.current.toggleGame('tetris'));

    expect(JSON.parse(window.localStorage.getItem(MY_GAMES_STORAGE_KEY) ?? '[]')).toEqual([
      'zelda',
      'tetris',
    ]);
  });

  it('ignora y limpia identificadores que ya no existen en el catálogo', () => {
    window.localStorage.setItem(MY_GAMES_STORAGE_KEY, JSON.stringify(['zelda', 'borrado']));

    const { result } = renderHook(() => useMyGames());

    expect(result.current.gameIds).toEqual(['zelda', 'borrado']);

    act(() => result.current.pruneMissingGames(['zelda', 'tetris']));

    expect(result.current.gameIds).toEqual(['zelda']);
  });

  it('sincroniza la colección cuando otra pestaña modifica el almacenamiento', () => {
    const { result } = renderHook(() => useMyGames());

    act(() => {
      window.localStorage.setItem(MY_GAMES_STORAGE_KEY, JSON.stringify(['zelda']));
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: MY_GAMES_STORAGE_KEY,
          newValue: JSON.stringify(['zelda']),
        }),
      );
    });

    expect(result.current.gameIds).toEqual(['zelda']);
  });

  it('no rompe la sesión cuando el almacenamiento no está disponible', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('storage blocked');
    });

    const { result } = renderHook(() => useMyGames());

    expect(result.current.isPersistent).toBe(false);

    act(() => result.current.toggleGame('tetris'));

    expect(result.current.gameIds).toEqual(['tetris']);
    expect(window.localStorage.getItem(MY_GAMES_STORAGE_KEY)).toBeNull();
  });
});
