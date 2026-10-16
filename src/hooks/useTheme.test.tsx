import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useTheme } from './useTheme';
import { THEME_STORAGE_KEY } from '../lib/theme';

describe('useTheme', () => {
  it('empieza en el tema claro cuando no hay preferencia guardada', () => {
    const { result } = renderHook(() => useTheme());

    expect(result.current.theme).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('lee el tema guardado y lo aplica al montar', () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, 'dark');

    const { result } = renderHook(() => useTheme());

    expect(result.current.theme).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('alterna el tema, aplica la clase y lo conserva en el navegador', () => {
    const { result } = renderHook(() => useTheme());

    act(() => result.current.toggleTheme());

    expect(result.current.theme).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');

    act(() => result.current.toggleTheme());

    expect(result.current.theme).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('light');
  });

  it('no guarda una preferencia mientras siga la del sistema', () => {
    renderHook(() => useTheme());

    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBeNull();
  });

  it('sincroniza el tema cuando otra pestaña lo cambia', () => {
    const { result } = renderHook(() => useTheme());

    act(() => {
      window.localStorage.setItem(THEME_STORAGE_KEY, 'dark');
      window.dispatchEvent(
        new StorageEvent('storage', { key: THEME_STORAGE_KEY, newValue: 'dark' }),
      );
    });

    expect(result.current.theme).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});
