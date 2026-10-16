import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { GalleryPage } from './GalleryPage';
import { games } from '../data/games';

type GalleryPageProps = Parameters<typeof GalleryPage>[0];

function renderGallery(overrides: Partial<GalleryPageProps> = {}) {
  const props: GalleryPageProps = {
    isGameSaved: () => false,
    onOpenDetails: vi.fn(),
    onToggleCollection: vi.fn(),
    ...overrides,
  };

  render(<GalleryPage {...props} />);
  return props;
}

describe('GalleryPage', () => {
  it('muestra el catálogo completo y su contador', () => {
    renderGallery();

    expect(screen.getByText(`${games.length} títulos disponibles`)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Tetris' })).toBeInTheDocument();
  });

  it('filtra por nombre mientras se escribe y permite borrar la búsqueda', async () => {
    const user = userEvent.setup();
    renderGallery();

    await user.type(screen.getByLabelText('Buscar por nombre'), '  zelda  ');

    expect(screen.getByText(/3 resultados para «zelda»/)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'The Legend of Zelda' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Tetris' })).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Borrar búsqueda' }));

    expect(screen.getByText(`${games.length} títulos disponibles`)).toBeInTheDocument();
  });

  it('ofrece una salida cuando la búsqueda no tiene coincidencias', async () => {
    const user = userEvent.setup();
    renderGallery();

    await user.type(screen.getByLabelText('Buscar por nombre'), 'zzzz');

    expect(screen.getByRole('heading', { name: 'No hay coincidencias' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Limpiar búsqueda' }));

    expect(screen.getByText(`${games.length} títulos disponibles`)).toBeInTheDocument();
  });

  it('filtra por plataforma y limpia los filtros', async () => {
    const user = userEvent.setup();
    renderGallery();

    await user.selectOptions(screen.getByLabelText('Plataforma'), 'NES');

    expect(screen.getByText('2 resultados con los filtros actuales')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Super Mario Bros.' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Tetris' })).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Limpiar filtros' }));

    expect(screen.getByText(`${games.length} títulos disponibles`)).toBeInTheDocument();
  });

  it('ordena los títulos de la A a la Z', async () => {
    const user = userEvent.setup();
    renderGallery();

    await user.selectOptions(screen.getByLabelText('Ordenar por'), 'title-asc');

    const titles = screen.getAllByRole('heading', { level: 2 }).map((node) => node.textContent);
    expect(titles[0]).toBe('Animal Crossing: New Horizons');
    expect(titles[titles.length - 1]).toBe('The Legend of Zelda: Ocarina of Time');
  });

  it('permite guardar un juego desde su tarjeta y lo comunica en voz alta', async () => {
    const user = userEvent.setup();
    const props = renderGallery();

    await user.click(screen.getByRole('button', { name: 'Guardar «Tetris» en Mis juegos' }));

    expect(props.onToggleCollection).toHaveBeenCalledWith('tetris');
    expect(screen.getByText('«Tetris» se guardó en Mis juegos.')).toBeInTheDocument();
  });
});
