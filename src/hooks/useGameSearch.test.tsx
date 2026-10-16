import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useGameSearch } from './useGameSearch';
import type { Game } from '../types/game';

const catalog: Game[] = [
  {
    id: 'pokemon',
    title: 'Pokémon Rojo y Azul',
    description: 'Descripción de prueba.',
    platforms: ['Game Boy'],
    genres: ['Rol'],
    series: 'Pokémon',
  },
  {
    id: 'zelda',
    title: 'The Legend of Zelda',
    description: 'Descripción de prueba.',
    platforms: ['NES'],
    genres: ['Aventura'],
    series: 'The Legend of Zelda',
  },
  {
    id: 'kart',
    title: 'Mario Kart 8 Deluxe',
    description: 'Descripción de prueba.',
    platforms: ['Nintendo Switch'],
    genres: ['Carreras'],
    series: 'Mario Kart',
  },
];

describe('useGameSearch', () => {
  it('devuelve todo el catálogo cuando la consulta está vacía', () => {
    const { result } = renderHook(() => useGameSearch(catalog));
    expect(result.current.results).toHaveLength(3);
    expect(result.current.isSearching).toBe(false);
  });

  it('filtra por una parte del nombre sin distinguir mayúsculas ni acentos', () => {
    const { result } = renderHook(() => useGameSearch(catalog));

    act(() => result.current.setQuery('  pokemon  '));

    expect(result.current.results.map((game) => game.id)).toEqual(['pokemon']);
    expect(result.current.isSearching).toBe(true);
  });

  it('encuentra títulos por el nombre completo y también por su serie', () => {
    const { result } = renderHook(() => useGameSearch(catalog));

    act(() => result.current.setQuery('ZELDA'));
    expect(result.current.results.map((game) => game.id)).toEqual(['zelda']);

    act(() => result.current.setQuery('mario kart'));
    expect(result.current.results.map((game) => game.id)).toEqual(['kart']);
  });

  it('devuelve una lista vacía cuando no hay coincidencias', () => {
    const { result } = renderHook(() => useGameSearch(catalog));

    act(() => result.current.setQuery('metroid'));

    expect(result.current.results).toEqual([]);
  });
});
