import { useEffect, useRef } from 'react';
import type { MouseEvent } from 'react';
import { X } from 'lucide-react';
import type { Game } from '../../types/game';
import { Tag } from '../ui/Tag';
import { GameCover } from './GameCover';

interface GameDetailsProps {
  game: Game;
  onClose: () => void;
}

const focusableSelector =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function GameDetails({ game, onClose }: GameDetailsProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocusedRef.current?.focus();
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const dialog = dialogRef.current;
      if (!dialog) {
        return;
      }

      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector));
      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey) {
        if (active === first || !dialog.contains(active)) {
          event.preventDefault();
          last.focus();
        }
      } else if (active === last || !dialog.contains(active)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleBackdropMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="overlay-in fixed inset-0 z-50 flex items-end justify-center overflow-y-auto bg-ink/60 p-0 sm:items-center sm:p-6"
      onMouseDown={handleBackdropMouseDown}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="game-details-title"
        tabIndex={-1}
        className="panel-in relative w-full max-w-2xl rounded-t-xl border border-line bg-surface shadow-2xl sm:rounded-xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4 sm:px-6">
          <div className="min-w-0">
            {game.series ? (
              <p className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-accent-dark">
                {game.series}
              </p>
            ) : null}
            <h2 id="game-details-title" className="mt-1 text-xl font-black leading-tight sm:text-2xl">
              {game.title}
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Cerrar ficha"
            className="grid size-10 shrink-0 place-items-center rounded-md border border-line bg-canvas text-ink transition hover:border-ink/30 hover:bg-accent-tint focus-visible:outline-2 focus-visible:outline-accent"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="flex flex-col gap-5 px-5 py-5 sm:flex-row sm:px-6">
          <div className="w-full shrink-0 sm:w-44">
            <div className="aspect-[3/4] overflow-hidden rounded-lg border border-line bg-canvas">
              <GameCover game={game} />
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <ul className="flex flex-wrap gap-1.5" aria-label="Plataformas">
              {game.platforms.map((platform) => (
                <li key={platform}>
                  <Tag>{platform}</Tag>
                </li>
              ))}
            </ul>

            <p className="mt-4 text-sm leading-relaxed text-ink/90">{game.description}</p>

            <dl className="mt-5 space-y-1.5 text-sm">
              {game.releaseYear != null ? (
                <div className="flex gap-2">
                  <dt className="w-28 shrink-0 font-semibold text-ink-muted">Lanzamiento</dt>
                  <dd className="tabular-nums">{game.releaseYear}</dd>
                </div>
              ) : null}
              {game.genres.length > 0 ? (
                <div className="flex gap-2">
                  <dt className="w-28 shrink-0 font-semibold text-ink-muted">Géneros</dt>
                  <dd>{game.genres.join(', ')}</dd>
                </div>
              ) : null}
              {game.developer ? (
                <div className="flex gap-2">
                  <dt className="w-28 shrink-0 font-semibold text-ink-muted">Desarrollador</dt>
                  <dd>{game.developer}</dd>
                </div>
              ) : null}
              {game.publisher ? (
                <div className="flex gap-2">
                  <dt className="w-28 shrink-0 font-semibold text-ink-muted">Distribuidor</dt>
                  <dd>{game.publisher}</dd>
                </div>
              ) : null}
            </dl>
          </div>
        </div>

        <p className="border-t border-line px-5 py-3 text-xs text-ink-muted sm:px-6">
          Pulsa Esc o el botón de cerrar para volver a la galería.
        </p>
      </div>
    </div>
  );
}
