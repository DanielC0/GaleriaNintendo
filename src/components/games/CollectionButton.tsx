import { Bookmark, BookmarkCheck } from 'lucide-react';

interface CollectionButtonProps {
  gameTitle: string;
  isSaved: boolean;
  onToggle: () => void;
  variant?: 'icon' | 'block';
}

export function CollectionButton({
  gameTitle,
  isSaved,
  onToggle,
  variant = 'icon',
}: CollectionButtonProps) {
  const label = isSaved
    ? `Quitar «${gameTitle}» de Mis juegos`
    : `Guardar «${gameTitle}» en Mis juegos`;

  if (variant === 'block') {
    return (
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={isSaved}
        className={
          isSaved
            ? 'flex w-full items-center justify-center gap-2 rounded-md border border-line bg-canvas px-4 py-2.5 text-sm font-semibold text-ink transition hover:border-ink/30 hover:bg-accent-tint hover:text-accent-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'
            : 'flex w-full items-center justify-center gap-2 rounded-md bg-accent-dark px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'
        }
      >
        {isSaved ? (
          <BookmarkCheck size={16} aria-hidden="true" />
        ) : (
          <Bookmark size={16} aria-hidden="true" />
        )}
        <span>{isSaved ? 'Guardado en Mis juegos' : 'Guardar en Mis juegos'}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isSaved}
      aria-label={label}
      className={
        isSaved
          ? 'grid size-9 place-items-center rounded-md border border-accent/40 bg-accent-tint text-accent-dark shadow-sm transition hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'
          : 'grid size-9 place-items-center rounded-md border border-line bg-surface/95 text-ink-muted shadow-sm transition hover:border-ink/30 hover:text-accent-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'
      }
    >
      {isSaved ? (
        <BookmarkCheck size={17} aria-hidden="true" />
      ) : (
        <Bookmark size={17} aria-hidden="true" />
      )}
    </button>
  );
}
