import { describe, expect, it, vi } from 'vitest';
import {
  THEME_STORAGE_KEY,
  applyThemeClass,
  getPreferredTheme,
  readStoredTheme,
  writeStoredTheme,
} from './theme';

function mockMatchMedia(matches: boolean) {
  vi.spyOn(window, 'matchMedia').mockImplementation(
    (query: string) =>
      ({
        matches,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }) as unknown as MediaQueryList,
  );
}

describe('theme storage', () => {
  it('devuelve null cuando no hay una preferencia guardada', () => {
    expect(readStoredTheme()).toBeNull();

    window.localStorage.setItem(THEME_STORAGE_KEY, 'sepia');
    expect(readStoredTheme()).toBeNull();
  });

  it('guarda y recupera el tema elegido', () => {
    expect(writeStoredTheme('dark')).toBe(true);
    expect(readStoredTheme()).toBe('dark');
  });

  it('degrada de forma segura si el almacenamiento falla', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('storage blocked');
    });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('storage blocked');
    });

    expect(readStoredTheme()).toBeNull();
    expect(writeStoredTheme('dark')).toBe(false);
  });
});

describe('getPreferredTheme', () => {
  it('prioriza la preferencia guardada sobre la del sistema', () => {
    mockMatchMedia(true);
    window.localStorage.setItem(THEME_STORAGE_KEY, 'light');

    expect(getPreferredTheme()).toBe('light');
  });

  it('usa la preferencia del sistema cuando no hay nada guardado', () => {
    mockMatchMedia(true);
    expect(getPreferredTheme()).toBe('dark');

    mockMatchMedia(false);
    expect(getPreferredTheme()).toBe('light');
  });
});

describe('applyThemeClass', () => {
  it('añade o quita la clase dark en el elemento raíz', () => {
    applyThemeClass('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    applyThemeClass('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});
