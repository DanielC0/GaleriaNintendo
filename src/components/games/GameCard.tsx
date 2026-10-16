import { BookmarkCheck } from 'lucide-react';
import type { Game } from '../../types/game';
import { Tag } from '../ui/Tag';
import { CollectionButton } from './CollectionButton';
import { GameCover } from './GameCover';

interface GameCardProps {
  game: Game;
  isSaved: boolean;
  onOpenDetails: (gameId: string) => void;
  onToggleCollection: (gameId: string) => void;
}

export function GameCard({ game, isSaved, onOpenDetails, onToggleCollection }: GameCardProps) {
  return (
    <article
      className={`group relative overflow-hidden rounded-lg border shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-ink/25 hover:shadow-md ${
        isSaved ? 'border-accent/45' : 'border-line'
      }`}
    >
      <button
        type="button"
        onClick={() => onOpenDetails(game.id)}
        aria-label={`Ver ficha de ${game.title}`}
        className="block w-full text-left focus-visible:outline-2 focus-visible:outline-accent focus-visible:-outline-offset-2"
      >
        <div className="aspect-[3/4] overflow-hidden border-b border-line bg-canvas">
          <GameCover
            game={game}
            className="transition duration-300 group-hover:scale-[1.03]"
          />
        </div>
        <div className="flex flex-col gap-2 p-3.5">
          {game.series ? (
            <span className="font-display text-[10px] font-bold uppercase tracking-[0.16em] text-ink-muted">
              {game.series}
            </span>
          ) : null}
          <h3 className="text-[15px] font-bold leading-snug">{game.title}</h3>
          <div className="flex flex-wrap items-center gap-1.5">
            {game.platforms.map((platform) => (
              <Tag key={platform}>{platform}</Tag>
            ))}
            {game.releaseYear != null ? (
              <span className="text-xs tabular-nums text-ink-muted">{game.releaseYear}</span>
            ) : null}
            {isSaved ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-accent-dark">
                <BookmarkCheck size={12} aria-hidden="true" />
                Guardado
              </span>
            ) : null}
          </div>
        </div>
      </button>
      <div className="absolute right-2.5 top-2.5">
        <CollectionButton
          gameTitle={game.title}
          isSaved={isSaved}
          onToggle={() => onToggleCollection(game.id)}
        />
      </div>
    </article>
  );
}
