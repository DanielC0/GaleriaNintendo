import { AlertTriangle, ArrowLeft, BookOpen, Bookmark, Trash2 } from 'lucide-react';
import { games } from '../data/games';
import type { Game } from '../types/game';
import { EmptyState } from '../components/ui/EmptyState';
import { Tag } from '../components/ui/Tag';
import { GameCover } from '../components/games/GameCover';

interface MyGamesPageProps {
  gameIds: string[];
  isPersistent: boolean;
  onOpenDetails: (gameId: string) => void;
  onRemove: (gameId: string) => void;
  onPruneMissing: () => void;
  onExploreGallery: () => void;
}

const secondaryButtonClass =
  'inline-flex min-h-10 items-center justify-center gap-1.5 rounded-md border border-line bg-canvas px-3 py-2 text-sm font-semibold text-ink transition hover:border-ink/30 hover:bg-accent-tint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';

const dangerButtonClass =
  'inline-flex min-h-10 items-center justify-center gap-1.5 rounded-md border border-line bg-canvas px-3 py-2 text-sm font-semibold text-ink transition hover:border-accent/40 hover:bg-accent-tint hover:text-accent-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';

export function MyGamesPage({
  gameIds,
  isPersistent,
  onOpenDetails,
  onRemove,
  onPruneMissing,
  onExploreGallery,
}: MyGamesPageProps) {
  const savedGames = gameIds
    .map((gameId) => games.find((game) => game.id === gameId))
    .filter((game): game is Game => game != null);
  const missingCount = gameIds.length - savedGames.length;

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <header className="max-w-2xl">
        <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-accent-dark">
          Tu colección
        </p>
        <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Mis juegos</h1>
        <p className="mt-3 leading-relaxed text-ink-muted">
          Los títulos que guardes aparecerán aquí para encontrarlos rápido. La colección se guarda
          únicamente en este navegador.
        </p>
        <p className="mt-4 text-sm text-ink-muted" role="status">
          {savedGames.length === 0
            ? 'No has guardado ningún título todavía.'
            : `${savedGames.length} ${savedGames.length === 1 ? 'juego guardado' : 'juegos guardados'}`}
        </p>
      </header>

      {!isPersistent ? (
        <div
          className="mt-6 flex items-start gap-3 rounded-lg border border-accent/30 bg-accent-tint p-4"
          role="status"
        >
          <AlertTriangle size={18} className="mt-0.5 shrink-0 text-accent-dark" aria-hidden="true" />
          <p className="text-sm leading-relaxed text-ink">
            Este navegador no permite guardar datos de forma permanente. La colección seguirá
            funcionando, pero se perderá al cerrar esta pestaña.
          </p>
        </div>
      ) : null}

      {missingCount > 0 ? (
        <div
          className="mt-6 flex flex-col gap-3 rounded-lg border border-dashed border-line bg-surface p-4 sm:flex-row sm:items-center sm:justify-between"
          role="status"
        >
          <p className="text-sm leading-relaxed text-ink-muted">
            {missingCount === 1
              ? 'Hay 1 entrada en la colección que ya no existe en el catálogo.'
              : `Hay ${missingCount} entradas en la colección que ya no existen en el catálogo.`}
          </p>
          <button type="button" onClick={onPruneMissing} className={secondaryButtonClass}>
            Limpiar entradas
          </button>
        </div>
      ) : null}

      {savedGames.length > 0 ? (
        <ul className="mt-8 space-y-4">
          {savedGames.map((game) => (
            <li
              key={game.id}
              className="flex flex-col gap-4 rounded-lg border border-line bg-surface p-3.5 sm:flex-row sm:items-center"
            >
              <div className="flex min-w-0 flex-1 items-center gap-4">
                <div
                  aria-hidden="true"
                  className="aspect-[3/4] w-16 shrink-0 overflow-hidden rounded-md border border-line bg-canvas"
                >
                  <GameCover game={game} />
                </div>
                <div className="min-w-0">
                  {game.series ? (
                    <p className="font-display text-[10px] font-bold uppercase tracking-[0.16em] text-ink-muted">
                      {game.series}
                    </p>
                  ) : null}
                  <h2 className="text-base font-bold leading-snug">{game.title}</h2>
                  <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                    {game.platforms.map((platform) => (
                      <Tag key={platform}>{platform}</Tag>
                    ))}
                    {game.releaseYear != null ? (
                      <span className="text-xs tabular-nums text-ink-muted">{game.releaseYear}</span>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="flex shrink-0 flex-wrap gap-2 sm:justify-end">
                <button
                  type="button"
                  onClick={() => onOpenDetails(game.id)}
                  className={secondaryButtonClass}
                >
                  <BookOpen size={16} aria-hidden="true" />
                  Ver ficha
                </button>
                <button
                  type="button"
                  onClick={() => onRemove(game.id)}
                  aria-label={`Quitar «${game.title}» de Mis juegos`}
                  className={dangerButtonClass}
                >
                  <Trash2 size={16} aria-hidden="true" />
                  Quitar
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-8">
          <EmptyState
            icon={<Bookmark size={22} />}
            title="Tu colección todavía está vacía"
            message="Todavía no has guardado ningún título. Explora la galería y vuelve aquí cuando quieras armar tu lista."
            action={{
              label: 'Explorar la galería',
              onAction: onExploreGallery,
            }}
          />
        </div>
      )}

      {savedGames.length > 0 ? (
        <div className="mt-8">
          <button
            type="button"
            onClick={onExploreGallery}
            className="inline-flex min-h-10 items-center gap-2 rounded-md px-1 text-sm font-semibold text-ink-muted transition hover:text-accent-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Seguir explorando la galería
          </button>
        </div>
      ) : null}
    </section>
  );
}
