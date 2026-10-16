import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { MyGamesPage } from './MyGamesPage';

type MyGamesPageProps = Parameters<typeof MyGamesPage>[0];

function renderMyGames(overrides: Partial<MyGamesPageProps> = {}) {
  const props: MyGamesPageProps = {
    gameIds: [],
    isPersistent: true,
    onOpenDetails: vi.fn(),
    onRemove: vi.fn(),
    onPruneMissing: vi.fn(),
    onExploreGallery: vi.fn(),
    ...overrides,
  };

  render(<MyGamesPage {...props} />);
  return props;
}

describe('MyGamesPage', () => {
  it('muestra los juegos guardados con su ficha y su acción de quitar', async () => {
    const user = userEvent.setup();
    const props = renderMyGames({ gameIds: ['tetris', 'the-legend-of-zelda'] });

    expect(screen.getByText('2 juegos guardados')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Tetris' })).toBeInTheDocument();

    const fichaButtons = screen.getAllByRole('button', { name: 'Ver ficha' });
    expect(fichaButtons).toHaveLength(2);

    await user.click(fichaButtons[0]);
    expect(props.onOpenDetails).toHaveBeenCalledWith('tetris');

    await user.click(screen.getByRole('button', { name: 'Quitar «Tetris» de Mis juegos' }));
    expect(props.onRemove).toHaveBeenCalledWith('tetris');
  });

  it('ignora los identificadores obsoletos y ofrece limpiarlos', async () => {
    const user = userEvent.setup();
    const props = renderMyGames({ gameIds: ['tetris', 'juego-que-no-existe'] });

    expect(screen.getByText('1 juego guardado')).toBeInTheDocument();
    expect(screen.getByText(/1 entrada en la colección/)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Limpiar entradas' }));
    expect(props.onPruneMissing).toHaveBeenCalled();
  });

  it('invita a explorar la galería cuando la colección está vacía', async () => {
    const user = userEvent.setup();
    const props = renderMyGames();

    expect(screen.getByRole('heading', { name: 'Tu colección todavía está vacía' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Explorar la galería' }));
    expect(props.onExploreGallery).toHaveBeenCalled();
  });

  it('avisa cuando el navegador no permite guardar de forma permanente', () => {
    renderMyGames({ isPersistent: false });

    expect(screen.getByText(/no permite guardar datos de forma permanente/)).toBeInTheDocument();
  });
});
