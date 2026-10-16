import { describe, expect, it } from 'vitest';
import { normalizeSearchText } from './normalizeSearch';

describe('normalizeSearchText', () => {
  it('convierte a minúsculas y recorta espacios sobrantes', () => {
    expect(normalizeSearchText('  Zelda  ')).toBe('zelda');
  });

  it('colapsa espacios internos', () => {
    expect(normalizeSearchText('super   mario')).toBe('super mario');
  });

  it('elimina diacríticos para encontrar coincidencias sin acentos', () => {
    expect(normalizeSearchText('Pokémon')).toBe('pokemon');
    expect(normalizeSearchText('pokémon')).toBe(normalizeSearchText('pokemon'));
  });

  it('devuelve una cadena vacía para entradas vacías', () => {
    expect(normalizeSearchText('')).toBe('');
    expect(normalizeSearchText('   ')).toBe('');
  });
});
