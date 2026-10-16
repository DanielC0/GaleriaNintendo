import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { App } from './App';
import { MY_GAMES_STORAGE_KEY } from '../lib/storage';
import { THEME_STORAGE_KEY } from '../lib/theme';

describe('App', () => {
  it('guarda un juego desde la galería y lo conserva al volver a montar la aplicación', async () => {
    const user = userEvent.setup();
    const firstRender = render(<App />);

    await user.click(screen.getByRole('button', { name: 'Guardar «Tetris» en Mis juegos' }));

    expect(JSON.parse(window.localStorage.getItem(MY_GAMES_STORAGE_KEY) ?? '[]')).toEqual([
      'tetris',
    ]);
    expect(screen.getByRole('button', { name: /^Mis juegos/ })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /^Mis juegos/ }));
    expect(screen.getByRole('heading', { name: 'Tetris' })).toBeInTheDocument();
    expect(screen.getByText('1 juego guardado')).toBeInTheDocument();

    firstRender.unmount();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /^Mis juegos/ }));
    expect(screen.getByRole('heading', { name: 'Tetris' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Quitar «Tetris» de Mis juegos' })).toBeInTheDocument();
  });

  it('abre la ficha de un juego desde la galería y la cierra con Escape', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /^Ver ficha de Tetris/ }));

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAccessibleName('Tetris');
    expect(dialog).toHaveAccessibleDescription(/Bloques de cuatro cuadros/);

    await user.keyboard('{Escape}');

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('permite cambiar al tema oscuro y lo aplica a la raíz del documento', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Cambiar al tema oscuro' }));

    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
    expect(screen.getByRole('button', { name: 'Cambiar al tema claro' })).toBeInTheDocument();
  });
});
