import { describe, expect, it } from 'vitest';
import type { Game } from '../types/game';
import {
  applyGameFilters,
  collectFilterOptions,
  defaultGameFilters,
  hasActiveGameFilters,
  sortGames,
} from './filterGames';

const catalog: Game[] = [
  {
    id: 'pokemon',
    title: 'Pokémon Rojo',
    description: 'Descripción de prueba.',
    platforms: ['Game Boy'],
    releaseYear: 1998,
    genres: ['Rol'],
    series: 'Pokémon',
  },
  {
    id: 'zelda',
    title: 'The Legend of Zelda',
    description: 'Descripción de prueba.',
    platforms: ['NES'],
    releaseYear: 1986,
    genres: ['Aventura'],
  },
  {
    id: 'kart',
    title: 'Super Mario Kart',
    description: 'Descripción de prueba.',
    platforms: ['SNES'],
    genres: ['Carreras'],
  },
];

describe('collectFilterOptions', () => {
  it('reúne plataformas y géneros únicos ordenados en español', () => {
    expect(collectFilterOptions(catalog)).toEqual({
      platforms: ['Game Boy', 'NES', 'SNES'],
      genres: ['Aventura', 'Carreras', 'Rol'],
    });
  });
});

describe('hasActiveGameFilters', () => {
  it('detecta cuándo hay filtros o un orden distintos del valor por defecto', () => {
    expect(hasActiveGameFilters(defaultGameFilters)).toBe(false);
    expect(hasActiveGameFilters({ ...defaultGameFilters, platform: 'NES' })).toBe(true);
    expect(hasActiveGameFilters({ ...defaultGameFilters, genre: 'Rol' })).toBe(true);
    expect(hasActiveGameFilters({ ...defaultGameFilters, sort: 'title-asc' })).toBe(true);
  });
});

describe('sortGames', () => {
  it('ordena por título ignorando mayúsculas y acentos', () => {
    const sorted = sortGames(catalog, 'title-asc').map((game) => game.title);
    expect(sorted).toEqual(['Pokémon Rojo', 'Super Mario Kart', 'The Legend of Zelda']);
  });

  it('ordena por año y deja los títulos sin año al final', () => {
    const sorted = sortGames(catalog, 'year-asc').map((game) => game.id);
    expect(sorted).toEqual(['zelda', 'pokemon', 'kart']);

    const descending = sortGames(catalog, 'year-desc').map((game) => game.id);
    expect(descending).toEqual(['pokemon', 'zelda', 'kart']);
  });

  it('conserva el orden del catálogo por defecto', () => {
    expect(sortGames(catalog, 'catalog').map((game) => game.id)).toEqual(['pokemon', 'zelda', 'kart']);
  });
});

describe('applyGameFilters', () => {
  it('combina plataforma y género sin modificar el array original', () => {
    const filtered = applyGameFilters(catalog, { ...defaultGameFilters, platform: 'Game Boy' });
    expect(filtered.map((game) => game.id)).toEqual(['pokemon']);

    const byGenre = applyGameFilters(catalog, { ...defaultGameFilters, genre: 'Aventura' });
    expect(byGenre.map((game) => game.id)).toEqual(['zelda']);

    expect(catalog.map((game) => game.id)).toEqual(['pokemon', 'zelda', 'kart']);
  });

  it('aplica el orden después de filtrar', () => {
    const filtered = applyGameFilters(catalog, {
      platform: 'all',
      genre: 'all',
      sort: 'title-desc',
    });
    expect(filtered.map((game) => game.id)).toEqual(['zelda', 'kart', 'pokemon']);
  });
});
