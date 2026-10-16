import { describe, expect, it, vi } from 'vitest';
import {
  MY_GAMES_STORAGE_KEY,
  isStorageAvailable,
  readStoredGameIds,
  writeStoredGameIds,
} from './storage';

describe('storage', () => {
  it('devuelve una colección vacía cuando no hay datos guardados', () => {
    expect(readStoredGameIds()).toEqual([]);
  });

  it('guarda y recupera la lista de identificadores', () => {
    expect(writeStoredGameIds(['tetris', 'zelda'])).toBe(true);
    expect(readStoredGameIds()).toEqual(['tetris', 'zelda']);
  });

  it('elimina duplicados y entradas no válidas al leer', () => {
    window.localStorage.setItem(
      MY_GAMES_STORAGE_KEY,
      JSON.stringify(['tetris', 'tetris', 42, '', null, 'zelda']),
    );

    expect(readStoredGameIds()).toEqual(['tetris', 'zelda']);
  });

  it('devuelve null cuando el JSON es inválido o no es una lista', () => {
    window.localStorage.setItem(MY_GAMES_STORAGE_KEY, '{esto no es json');
    expect(readStoredGameIds()).toBeNull();

    window.localStorage.setItem(MY_GAMES_STORAGE_KEY, JSON.stringify({ ids: ['tetris'] }));
    expect(readStoredGameIds()).toBeNull();
  });

  it('degrada de forma segura cuando el almacenamiento no está disponible', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('storage blocked');
    });

    expect(isStorageAvailable()).toBe(false);
    expect(readStoredGameIds()).toBeNull();
    expect(writeStoredGameIds(['tetris'])).toBe(false);
  });
});
